var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertTestimonialSchema } from "@shared/schema";
import { Upload, Check, Camera, X } from "lucide-react";
const formSchema = insertTestimonialSchema.extend({
    photoFile: z.any().optional(),
});
const facultyOptions = [
    "Medicine and Health Sciences",
    "Engineering",
    "Computing Sciences",
    "Agriculture",
    "Science",
    "Social Sciences"
];
const graduationYears = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - i).toString());
export function TestimonialForm({ onSuccess } = {}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState("");
    const fileInputRef = useRef(null);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const form = useForm({
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
    const handlePhotoSelect = (event) => {
        var _a;
        const file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            setSelectedPhoto(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                var _a;
                setPhotoPreview((_a = e.target) === null || _a === void 0 ? void 0 : _a.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const removePhoto = () => {
        setSelectedPhoto(null);
        setPhotoPreview("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };
    const testimonialMutation = useMutation({
        mutationFn: (data) => __awaiter(this, void 0, void 0, function* () {
            // For now, we'll use a placeholder URL and handle the photo upload separately
            // In a production app, you'd upload to a service like Cloudinary or AWS S3
            const testimonialData = Object.assign(Object.assign({}, data), { photoUrl: selectedPhoto ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150" : "", photoFile: undefined });
            return yield apiRequest("POST", "/api/testimonials", testimonialData);
        }),
        onSuccess: () => {
            setIsSubmitted(true);
            form.reset();
            queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
            toast({
                title: "Thank you!",
                description: "Your testimonial has been submitted and is pending approval.",
            });
            onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: "Failed to submit testimonial. Please try again.",
                variant: "destructive",
            });
        },
    });
    const onSubmit = (data) => {
        testimonialMutation.mutate(data);
    };
    const handleClose = () => {
        setIsOpen(false);
        setIsSubmitted(false);
        setSelectedPhoto(null);
        setPhotoPreview("");
        form.reset();
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };
    if (isSubmitted) {
        return (_jsxs(Dialog, { open: isOpen, onOpenChange: handleClose, children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", size: "lg", className: "bg-blue-600 text-white hover:bg-blue-700 border-blue-600", children: "Share Your Story" }) }), _jsx(DialogContent, { className: "max-w-md", children: _jsxs("div", { className: "text-center py-6", children: [_jsx("div", { className: "mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4", children: _jsx(Check, { className: "w-8 h-8 text-green-600" }) }), _jsxs(DialogHeader, { children: [_jsx(DialogTitle, { className: "text-xl", children: "Thank You!" }), _jsx(DialogDescription, { className: "text-gray-600", children: "Your testimonial has been submitted successfully and is pending approval. We'll review it soon and it will appear in our Alumni Network section." })] }), _jsx(Button, { onClick: handleClose, className: "mt-4", children: "Close" })] }) })] }));
    }
    return (_jsxs(Dialog, { open: isOpen, onOpenChange: setIsOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", size: "lg", className: "bg-blue-600 text-white hover:bg-blue-700 border-blue-600", children: "Share Your Story" }) }), _jsxs(DialogContent, { className: "max-w-2xl max-h-[90vh] overflow-y-auto", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { className: "text-2xl font-bold", children: "Share Your UBa Tech Camp Experience" }), _jsx(DialogDescription, { children: "Help inspire future participants by sharing your journey and achievements after UBa Tech Camp." })] }), _jsx(Form, Object.assign({}, form, { children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsx(FormField, { control: form.control, name: "fullName", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Full Name *" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ placeholder: "Your full name" }, field)) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "email", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Email *" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ type: "email", placeholder: "your.email@example.com" }, field)) }), _jsx(FormMessage, {})] })) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsx(FormField, { control: form.control, name: "graduationYear", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Graduation Year *" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select year" }) }) }), _jsx(SelectContent, { children: graduationYears.map((year) => (_jsx(SelectItem, { value: year, children: year }, year))) })] }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "faculty", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Faculty *" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select faculty" }) }) }), _jsx(SelectContent, { children: facultyOptions.map((faculty) => (_jsx(SelectItem, { value: faculty, children: faculty }, faculty))) })] }), _jsx(FormMessage, {})] })) })] }), _jsx(FormField, { control: form.control, name: "testimonialText", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Your Experience *" }), _jsx(FormControl, { children: _jsx(Textarea, Object.assign({ placeholder: "Share how UBa Tech Camp impacted your career and life. What skills did you gain? How has it helped you professionally?", className: "min-h-[120px]" }, field)) }), _jsx(FormMessage, {})] })) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsx(FormField, { control: form.control, name: "currentRole", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Current Role" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ placeholder: "e.g., Software Engineer" }, field)) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "company", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Company/Organization" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ placeholder: "Where you work" }, field)) }), _jsx(FormMessage, {})] })) })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(FormLabel, { children: "Profile Photo" }), _jsxs("div", { className: "flex items-center space-x-4", children: [photoPreview ? (_jsxs("div", { className: "relative", children: [_jsx("img", { src: photoPreview, alt: "Preview", className: "w-20 h-20 rounded-full object-cover border-2 border-gray-200" }), _jsx("button", { type: "button", onClick: removePhoto, className: "absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors", children: _jsx(X, { className: "w-3 h-3" }) })] })) : (_jsx("div", { className: "w-20 h-20 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center", children: _jsx(Camera, { className: "w-8 h-8 text-gray-400" }) })), _jsxs("div", { className: "flex-1", children: [_jsxs(Button, { type: "button", variant: "outline", onClick: () => { var _a; return (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); }, className: "w-full", children: [_jsx(Upload, { className: "w-4 h-4 mr-2" }), selectedPhoto ? "Change Photo" : "Upload Photo"] }), _jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Upload a professional photo (JPG, PNG - Max 5MB)" })] })] }), _jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", onChange: handlePhotoSelect, className: "hidden" })] }), _jsx(FormField, { control: form.control, name: "linkedinUrl", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "LinkedIn Profile" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ placeholder: "https://linkedin.com/in/yourprofile" }, field)) }), _jsx(FormMessage, {})] })) }), _jsx("div", { className: "bg-blue-50 p-4 rounded-lg", children: _jsxs("p", { className: "text-sm text-blue-800", children: [_jsx("strong", { children: "Note:" }), " Your testimonial will be reviewed before appearing on our website. We aim to review submissions within 2-3 business days."] }) }), _jsxs("div", { className: "flex gap-3 pt-4", children: [_jsx(Button, { type: "submit", disabled: testimonialMutation.isPending, className: "flex-1", children: testimonialMutation.isPending ? "Submitting..." : "Submit Testimonial" }), _jsx(Button, { type: "button", variant: "outline", onClick: handleClose, children: "Cancel" })] })] }) }))] })] }));
}
