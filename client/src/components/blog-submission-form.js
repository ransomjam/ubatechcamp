var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
    content: z.string().min(1, "Content is required"),
    authorName: z.string().min(2, "Author name is required"),
    category: z.string().min(1, "Please select a category"),
    tags: z.array(z.string()).optional(),
    featuredImage: z.string().optional(),
    contentImages: z.array(z.string()).optional(),
});
export default function BlogSubmissionForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState([]);
    const [featuredImage, setFeaturedImage] = useState(null);
    const [contentImages, setContentImages] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const featuredImageInputRef = useRef(null);
    const contentImagesInputRef = useRef(null);
    const form = useForm({
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
        mutationFn: (data) => __awaiter(this, void 0, void 0, function* () {
            return apiRequest("POST", "/api/blog", data);
        }),
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
    const removeTag = (tagToRemove) => {
        const newTags = tags.filter(tag => tag !== tagToRemove);
        setTags(newTags);
        form.setValue("tags", newTags);
    };
    const uploadImageMutation = useMutation({
        mutationFn: (file) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const response = yield apiRequest("POST", "/api/upload", {
                            file: reader.result,
                            filename: file.name,
                        });
                        const responseData = yield response.json();
                        resolve(responseData.data.url);
                    }
                    catch (error) {
                        reject(error);
                    }
                });
                reader.onerror = () => reject(new Error("Failed to read file"));
                reader.readAsDataURL(file);
            });
        }),
        onError: (error) => {
            toast({
                title: "Upload Failed",
                description: error.message || "Failed to upload image.",
                variant: "destructive",
            });
            setIsUploading(false);
        },
    });
    const handleFeaturedImageUpload = (e) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file)
            return;
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
            const imageUrl = yield uploadImageMutation.mutateAsync(file);
            setFeaturedImage(imageUrl);
            form.setValue("featuredImage", imageUrl);
            toast({
                title: "Image Uploaded",
                description: "Featured image uploaded successfully.",
            });
        }
        catch (error) {
            // Error handling is done in the mutation
        }
        finally {
            setIsUploading(false);
        }
    });
    const handleContentImageUpload = (e) => __awaiter(this, void 0, void 0, function* () {
        const files = Array.from(e.target.files || []);
        if (!files.length)
            return;
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
        if (!validFiles.length)
            return;
        setIsUploading(true);
        try {
            const uploadPromises = validFiles.map(file => uploadImageMutation.mutateAsync(file));
            const imageUrls = yield Promise.all(uploadPromises);
            const newContentImages = [...contentImages, ...imageUrls];
            setContentImages(newContentImages);
            form.setValue("contentImages", newContentImages);
            toast({
                title: "Images Uploaded",
                description: `${imageUrls.length} image(s) uploaded successfully.`,
            });
        }
        catch (error) {
            // Error handling is done in the mutation
        }
        finally {
            setIsUploading(false);
        }
    });
    const removeFeaturedImage = () => {
        setFeaturedImage(null);
        form.setValue("featuredImage", "");
    };
    const removeContentImage = (indexToRemove) => {
        const newContentImages = contentImages.filter((_, index) => index !== indexToRemove);
        setContentImages(newContentImages);
        form.setValue("contentImages", newContentImages);
    };
    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');
    };
    const onSubmit = (data) => {
        setIsSubmitting(true);
        const slug = generateSlug(data.title);
        submitBlogMutation.mutate(Object.assign(Object.assign({}, data), { slug, tags: tags.length > 0 ? tags : undefined, featuredImage: featuredImage || undefined, contentImages: contentImages.length > 0 ? contentImages : undefined }));
    };
    return (_jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(FileText, { className: "w-6 h-6" }), "Submit Your Blog Post"] }), _jsx("p", { className: "text-gray-600", children: "Share your knowledge and experiences with the UBa Tech Camp community. All submissions will be reviewed before publication." })] }), _jsx(CardContent, { children: _jsx(Form, Object.assign({}, form, { children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-6", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsx(FormField, { control: form.control, name: "title", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Blog Title *" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ placeholder: "Enter an engaging title for your blog post" }, field)) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "authorName", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Your Name *" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ placeholder: "Your full name" }, field)) }), _jsx(FormMessage, {})] })) })] }), _jsx(FormField, { control: form.control, name: "category", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Category *" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select a category for your blog post" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "Tutorials", children: "Tutorials" }), _jsx(SelectItem, { value: "Data Science", children: "Data Science" }), _jsx(SelectItem, { value: "Web Development", children: "Web Development" }), _jsx(SelectItem, { value: "Mobile Development", children: "Mobile Development" }), _jsx(SelectItem, { value: "AI & Machine Learning", children: "AI & Machine Learning" }), _jsx(SelectItem, { value: "Career Advice", children: "Career Advice" }), _jsx(SelectItem, { value: "Student Stories", children: "Student Stories" }), _jsx(SelectItem, { value: "Industry Insights", children: "Industry Insights" }), _jsx(SelectItem, { value: "Announcements", children: "Announcements" })] })] }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "excerpt", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Brief Summary *" }), _jsx(FormControl, { children: _jsx(Textarea, Object.assign({ placeholder: "Write a compelling summary that will appear on the blog listing page (20-200 characters)", className: "min-h-[80px]" }, field)) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "content", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Blog Content *" }), _jsx(FormControl, { children: _jsx(Textarea, Object.assign({ placeholder: "Write your blog post content here. You can use basic formatting like **bold** and *italic*. Minimum 100 characters.", className: "min-h-[300px]" }, field)) }), _jsx(FormMessage, {})] })) }), _jsxs("div", { children: [_jsx(FormLabel, { children: "Tags (Optional)" }), _jsxs("div", { className: "flex gap-2 mt-2", children: [_jsx(Input, { placeholder: "Add a tag and press Enter", value: tagInput, onChange: (e) => setTagInput(e.target.value), onKeyPress: (e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        addTag();
                                                    }
                                                }, className: "flex-1" }), _jsx(Button, { type: "button", variant: "outline", size: "sm", onClick: addTag, disabled: !tagInput.trim() || tags.length >= 5, children: _jsx(Plus, { className: "w-4 h-4" }) })] }), tags.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-2 mt-3", children: tags.map((tag) => (_jsxs(Badge, { variant: "secondary", className: "flex items-center gap-1", children: [tag, _jsx("button", { type: "button", onClick: () => removeTag(tag), className: "ml-1 hover:text-red-500", children: _jsx(X, { className: "w-3 h-3" }) })] }, tag))) })), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Add up to 5 tags to help readers find your content" })] }), _jsxs("div", { children: [_jsx(FormLabel, { children: "Featured Image (Optional)" }), _jsx("div", { className: "mt-2", children: featuredImage ? (_jsxs("div", { className: "relative", children: [_jsx("img", { src: featuredImage, alt: "Featured", className: "w-full h-48 object-cover rounded-lg border" }), _jsx(Button, { type: "button", variant: "destructive", size: "sm", className: "absolute top-2 right-2", onClick: removeFeaturedImage, children: _jsx(Trash2, { className: "w-4 h-4" }) })] })) : (_jsxs("div", { className: "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center", children: [_jsx(ImageIcon, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), _jsx("p", { className: "text-gray-600 mb-2", children: "Upload a featured image for your blog post" }), _jsx(Button, { type: "button", variant: "outline", onClick: () => { var _a; return (_a = featuredImageInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); }, disabled: isUploading, children: isUploading ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2" }), "Uploading..."] })) : (_jsxs(_Fragment, { children: [_jsx(Upload, { className: "w-4 h-4 mr-2" }), "Choose Image"] })) }), _jsx("input", { ref: featuredImageInputRef, type: "file", accept: "image/*", onChange: handleFeaturedImageUpload, className: "hidden" })] })) }), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: "This image will appear at the top of your blog post and in the blog listing" })] }), _jsxs("div", { children: [_jsx(FormLabel, { children: "Content Images (Optional)" }), _jsxs("div", { className: "mt-2", children: [_jsxs("div", { className: "border-2 border-dashed border-gray-300 rounded-lg p-4 text-center", children: [_jsx(ImageIcon, { className: "w-8 h-8 text-gray-400 mx-auto mb-2" }), _jsx("p", { className: "text-gray-600 mb-2 text-sm", children: "Upload images to include in your blog content" }), _jsx(Button, { type: "button", variant: "outline", size: "sm", onClick: () => { var _a; return (_a = contentImagesInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); }, disabled: isUploading, children: isUploading ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2" }), "Uploading..."] })) : (_jsxs(_Fragment, { children: [_jsx(Upload, { className: "w-4 h-4 mr-2" }), "Add Images"] })) }), _jsx("input", { ref: contentImagesInputRef, type: "file", accept: "image/*", multiple: true, onChange: handleContentImageUpload, className: "hidden" })] }), contentImages.length > 0 && (_jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4 mt-4", children: contentImages.map((imageUrl, index) => (_jsxs("div", { className: "relative", children: [_jsx("img", { src: imageUrl, alt: `Content ${index + 1}`, className: "w-full h-24 object-cover rounded border" }), _jsx(Button, { type: "button", variant: "destructive", size: "sm", className: "absolute top-1 right-1 p-1 h-6 w-6", onClick: () => removeContentImage(index), children: _jsx(X, { className: "w-3 h-3" }) })] }, index))) }))] }), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: "You can reference these images in your content. Max 5MB per image." })] }), _jsxs("div", { className: "bg-blue-50 p-4 rounded-lg", children: [_jsx("h4", { className: "font-medium text-blue-900 mb-2", children: "Submission Guidelines" }), _jsxs("ul", { className: "text-sm text-blue-800 space-y-1", children: [_jsx("li", { children: "\u2022 Your post will be reviewed by our team before publication" }), _jsx("li", { children: "\u2022 Approved posts will appear at the top of the blog feed" }), _jsx("li", { children: "\u2022 Please ensure your content is original and relevant to tech education" }), _jsx("li", { children: "\u2022 Include practical examples and actionable insights when possible" }), _jsx("li", { children: "\u2022 Images should be relevant to your content and under 5MB each" }), _jsx("li", { children: "\u2022 All uploaded images will be reviewed along with your content" })] })] }), _jsx(Button, { type: "submit", className: "w-full", disabled: isSubmitting || isUploading, children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" }), "Submitting..."] })) : (_jsxs(_Fragment, { children: [_jsx(Send, { className: "w-4 h-4 mr-2" }), "Submit for Review"] })) })] }) })) })] }));
}
