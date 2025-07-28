import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertTestimonialSchema } from "@shared/schema";
import { Upload, Check } from "lucide-react";

const formSchema = insertTestimonialSchema.extend({
  photoFile: z.any().optional(),
});

type FormData = z.infer<typeof formSchema>;

const facultyOptions = [
  "Medicine and Health Sciences",
  "Engineering",
  "Computing Sciences",
  "Agriculture",
  "Science",
  "Social Sciences"
];

const graduationYears = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - i).toString());

export function TestimonialForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      graduationYear: "",
      faculty: "",
      testimonialText: "",
      photoUrl: "",
      currentRole: "",
      company: "",
      linkedinUrl: "",
    },
  });

  const testimonialMutation = useMutation({
    mutationFn: async (data: FormData) => {
      // For now, we'll handle photo upload as a URL field
      // In a real implementation, you'd upload to a service like Cloudinary
      const testimonialData = {
        ...data,
        photoFile: undefined, // Remove file from data
      };
      
      return await apiRequest("POST", "/api/testimonials", testimonialData);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      toast({
        title: "Thank you!",
        description: "Your testimonial has been submitted and is pending approval.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit testimonial. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    testimonialMutation.mutate(data);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsSubmitted(false);
    form.reset();
  };

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogTrigger asChild>
          <Button variant="outline" size="lg" className="bg-blue-600 text-white hover:bg-blue-700 border-blue-600">
            Share Your Story
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <div className="text-center py-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-xl">Thank You!</DialogTitle>
              <DialogDescription className="text-gray-600">
                Your testimonial has been submitted successfully and is pending approval. 
                We'll review it soon and it will appear in our Alumni Network section.
              </DialogDescription>
            </DialogHeader>
            <Button onClick={handleClose} className="mt-4">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="bg-blue-600 text-white hover:bg-blue-700 border-blue-600">
          Share Your Story
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Share Your UBa Tech Camp Experience</DialogTitle>
          <DialogDescription>
            Help inspire future participants by sharing your journey and achievements after UBa Tech Camp.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="graduationYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Graduation Year *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {graduationYears.map((year) => (
                          <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="faculty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Faculty *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select faculty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {facultyOptions.map((faculty) => (
                          <SelectItem key={faculty} value={faculty}>{faculty}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="testimonialText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Experience *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Share how UBa Tech Camp impacted your career and life. What skills did you gain? How has it helped you professionally?"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="currentRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Role</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Software Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company/Organization</FormLabel>
                    <FormControl>
                      <Input placeholder="Where you work" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="photoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photo URL</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://example.com/your-photo.jpg" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedinUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn Profile</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://linkedin.com/in/yourprofile" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Your testimonial will be reviewed before appearing on our website. 
                We aim to review submissions within 2-3 business days.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                type="submit" 
                disabled={testimonialMutation.isPending}
                className="flex-1"
              >
                {testimonialMutation.isPending ? "Submitting..." : "Submit Testimonial"}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}