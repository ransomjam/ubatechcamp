import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { X, Plus, Send, FileText, Upload, Image as ImageIcon, Trash2 } from "lucide-react";

const blogSubmissionSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  excerpt: z.string().min(20, "Excerpt must be at least 20 characters"),
  content: z.string().min(100, "Content must be at least 100 characters"),
  authorName: z.string().min(2, "Author name is required"),
  category: z.string().min(1, "Please select a category"),
  tags: z.array(z.string()).optional(),
  featuredImage: z.string().optional(),
  contentImages: z.array(z.string()).optional(),
});

type BlogSubmissionData = z.infer<typeof blogSubmissionSchema>;

export default function BlogSubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [contentImages, setContentImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const featuredImageInputRef = useRef<HTMLInputElement>(null);
  const contentImagesInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<BlogSubmissionData>({
    resolver: zodResolver(blogSubmissionSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      authorName: "",
      category: "",
      tags: [],
      featuredImage: "",
      contentImages: [],
    },
  });

  const submitBlogMutation = useMutation({
    mutationFn: async (data: BlogSubmissionData & { slug: string }) => {
      return apiRequest("/api/blog", "POST", data);
    },
    onSuccess: () => {
      toast({
        title: "Blog Post Submitted!",
        description: "Your blog post has been submitted for review. It will appear once approved.",
      });
      form.reset();
      setTags([]);
      setFeaturedImage(null);
      setContentImages([]);
      setIsSubmitting(false);
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit blog post. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 5) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      form.setValue("tags", newTags);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
    form.setValue("tags", newTags);
  };

  const uploadImageMutation = useMutation({
    mutationFn: async (file: File) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async () => {
          try {
            const response = await apiRequest("/api/upload", "POST", {
              file: reader.result,
              filename: file.name,
            });
            resolve(response.url);
          } catch (error) {
            reject(error);
          }
        };
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
      });
    },
    onError: (error) => {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload image.",
        variant: "destructive",
      });
      setIsUploading(false);
    },
  });

  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const imageUrl = await uploadImageMutation.mutateAsync(file);
      setFeaturedImage(imageUrl);
      form.setValue("featuredImage", imageUrl);
      toast({
        title: "Image Uploaded",
        description: "Featured image uploaded successfully.",
      });
    } catch (error) {
      // Error handling is done in the mutation
    } finally {
      setIsUploading(false);
    }
  };

  const handleContentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File",
          description: `${file.name} is not an image file.`,
          variant: "destructive",
        });
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: `${file.name} is larger than 5MB.`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    if (!validFiles.length) return;

    setIsUploading(true);
    try {
      const uploadPromises = validFiles.map(file => uploadImageMutation.mutateAsync(file));
      const imageUrls = await Promise.all(uploadPromises);
      const newContentImages = [...contentImages, ...imageUrls];
      setContentImages(newContentImages);
      form.setValue("contentImages", newContentImages);
      toast({
        title: "Images Uploaded",
        description: `${imageUrls.length} image(s) uploaded successfully.`,
      });
    } catch (error) {
      // Error handling is done in the mutation
    } finally {
      setIsUploading(false);
    }
  };

  const removeFeaturedImage = () => {
    setFeaturedImage(null);
    form.setValue("featuredImage", "");
  };

  const removeContentImage = (indexToRemove: number) => {
    const newContentImages = contentImages.filter((_, index) => index !== indexToRemove);
    setContentImages(newContentImages);
    form.setValue("contentImages", newContentImages);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const onSubmit = (data: BlogSubmissionData) => {
    setIsSubmitting(true);
    const slug = generateSlug(data.title);
    
    submitBlogMutation.mutate({
      ...data,
      slug,
      tags: tags.length > 0 ? tags : undefined,
      featuredImage: featuredImage || undefined,
      contentImages: contentImages.length > 0 ? contentImages : undefined,
    });
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-6 h-6" />
          Submit Your Blog Post
        </CardTitle>
        <p className="text-gray-600">
          Share your knowledge and experiences with the UBa Tech Camp community. All submissions will be reviewed before publication.
        </p>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blog Title *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter an engaging title for your blog post"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="authorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your full name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category for your blog post" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Tutorials">Tutorials</SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                      <SelectItem value="Web Development">Web Development</SelectItem>
                      <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                      <SelectItem value="AI & Machine Learning">AI & Machine Learning</SelectItem>
                      <SelectItem value="Career Advice">Career Advice</SelectItem>
                      <SelectItem value="Student Stories">Student Stories</SelectItem>
                      <SelectItem value="Industry Insights">Industry Insights</SelectItem>
                      <SelectItem value="Announcements">Announcements</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brief Summary *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Write a compelling summary that will appear on the blog listing page (20-200 characters)"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Content *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Write your blog post content here. You can use basic formatting like **bold** and *italic*. Minimum 100 characters."
                      className="min-h-[300px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Tags (Optional)</FormLabel>
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Add a tag and press Enter"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={addTag}
                  disabled={!tagInput.trim() || tags.length >= 5}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              <p className="text-sm text-gray-500 mt-1">
                Add up to 5 tags to help readers find your content
              </p>
            </div>

            {/* Featured Image Upload */}
            <div>
              <FormLabel>Featured Image (Optional)</FormLabel>
              <div className="mt-2">
                {featuredImage ? (
                  <div className="relative">
                    <img 
                      src={featuredImage} 
                      alt="Featured" 
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={removeFeaturedImage}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Upload a featured image for your blog post</p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => featuredImageInputRef.current?.click()}
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Image
                        </>
                      )}
                    </Button>
                    <input
                      ref={featuredImageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFeaturedImageUpload}
                      className="hidden"
                    />
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                This image will appear at the top of your blog post and in the blog listing
              </p>
            </div>

            {/* Content Images Upload */}
            <div>
              <FormLabel>Content Images (Optional)</FormLabel>
              <div className="mt-2">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 mb-2 text-sm">Upload images to include in your blog content</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => contentImagesInputRef.current?.click()}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Add Images
                      </>
                    )}
                  </Button>
                  <input
                    ref={contentImagesInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleContentImageUpload}
                    className="hidden"
                  />
                </div>
                
                {contentImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {contentImages.map((imageUrl, index) => (
                      <div key={index} className="relative">
                        <img 
                          src={imageUrl} 
                          alt={`Content ${index + 1}`} 
                          className="w-full h-24 object-cover rounded border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1 p-1 h-6 w-6"
                          onClick={() => removeContentImage(index)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                You can reference these images in your content. Max 5MB per image.
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Submission Guidelines</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Your post will be reviewed by our team before publication</li>
                <li>• Approved posts will appear at the top of the blog feed</li>
                <li>• Please ensure your content is original and relevant to tech education</li>
                <li>• Include practical examples and actionable insights when possible</li>
                <li>• Images should be relevant to your content and under 5MB each</li>
                <li>• All uploaded images will be reviewed along with your content</li>
              </ul>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting || isUploading}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit for Review
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}