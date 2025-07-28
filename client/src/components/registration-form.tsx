import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { insertRegistrationSchema, type InsertRegistration } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function RegistrationForm() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<InsertRegistration>({
    resolver: zodResolver(insertRegistrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      institution: "",
      fieldOfStudy: "",
      referralCode: "",
    },
  });

  const registrationMutation = useMutation({
    mutationFn: async (data: InsertRegistration) => {
      const response = await apiRequest("POST", "/api/registrations", data);
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Registration Successful!",
        description: "You'll receive a confirmation email within 3 days.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertRegistration) => {
    registrationMutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <section id="register" className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-green-600 mb-4">Registration Successful!</h2>
              <p className="text-lg text-gray-600 mb-4">
                Thank you for registering for UBa Tech Camp 2025. You'll receive a confirmation email within 3 days.
              </p>
              <Button 
                onClick={() => setIsSubmitted(false)}
                variant="outline"
              >
                Register Another Person
              </Button>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="bg-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Register Now</h2>
          <p className="text-lg text-gray-600">
            Participation is free but space is limited. Please register before Application Deadline.
          </p>
        </div>
        
        <Card className="p-8">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  {...form.register("fullName")}
                />
                {form.formState.errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.fullName.message}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="institution">University/Institution *</Label>
                <Input
                  id="institution"
                  placeholder="University of Bamenda"
                  {...form.register("institution")}
                />
                {form.formState.errors.institution && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.institution.message}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="fieldOfStudy">Field of Study *</Label>
                <Input
                  id="fieldOfStudy"
                  placeholder="e.g., Computer Science, Biology"
                  {...form.register("fieldOfStudy")}
                />
                {form.formState.errors.fieldOfStudy && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.fieldOfStudy.message}
                  </p>
                )}
              </div>
            </div>
            
            <div>
              <Label htmlFor="referralCode">Referral Code (Optional)</Label>
              <Input
                id="referralCode"
                placeholder="Enter referral code if you have one"
                {...form.register("referralCode")}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-blue-700"
              disabled={registrationMutation.isPending}
            >
              {registrationMutation.isPending ? "Submitting..." : "Submit Registration"}
            </Button>
            
            <p className="text-xs text-gray-500 text-center">
              You'll receive a confirmation email within 3 days of registration.
            </p>
          </form>
        </Card>
      </div>
    </section>
  );
}
