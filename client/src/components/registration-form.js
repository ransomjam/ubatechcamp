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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { insertRegistrationSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
const courseOptions = [
    "Computer Literacy",
    "Python Programming",
    "Data Analysis with Excel",
    "SPSS for Social Science",
    "Team Collaboration",
    "Computer Networking"
];
export default function RegistrationForm() {
    const { toast } = useToast();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const form = useForm({
        resolver: zodResolver(insertRegistrationSchema),
        defaultValues: {
            fullName: "",
            email: "",
            institution: "",
            fieldOfStudy: "",
            attendanceMode: "",
            coursesOfInterest: [],
            reasonForJoining: "",
            referralCode: "",
        },
    });
    const registrationMutation = useMutation({
        mutationFn: (data) => __awaiter(this, void 0, void 0, function* () {
            const response = yield apiRequest("POST", "/api/registrations", data);
            return response.json();
        }),
        onSuccess: () => {
            setIsSubmitted(true);
            toast({
                title: "Registration Successful!",
                description: "You'll receive a confirmation email within 3 days.",
            });
            form.reset();
            setSelectedCourses([]);
        },
        onError: (error) => {
            toast({
                title: "Registration Failed",
                description: error.message || "Please try again later.",
                variant: "destructive",
            });
        },
    });
    const onSubmit = (data) => {
        if (selectedCourses.length === 0) {
            toast({
                title: "Validation Error",
                description: "Please select at least one course of interest.",
                variant: "destructive",
            });
            return;
        }
        const submissionData = Object.assign(Object.assign({}, data), { coursesOfInterest: selectedCourses });
        registrationMutation.mutate(submissionData);
    };
    const handleCourseChange = (course, checked) => {
        if (checked) {
            setSelectedCourses(prev => [...prev, course]);
        }
        else {
            setSelectedCourses(prev => prev.filter(c => c !== course));
        }
    };
    if (isSubmitted) {
        return (_jsx("section", { id: "registration", className: "bg-white py-16", children: _jsx("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsx("div", { className: "text-center", children: _jsxs(Card, { className: "p-8", children: [_jsx("h2", { className: "text-3xl font-bold text-green-600 mb-4", children: "Registration Successful!" }), _jsx("p", { className: "text-lg text-gray-600 mb-4", children: "Thank you for registering for UBa Tech Camp 2025. You'll receive a confirmation email within 3 days." }), _jsx(Button, { onClick: () => setIsSubmitted(false), variant: "outline", children: "Register Another Person" })] }) }) }) }));
    }
    return (_jsx("section", { id: "registration", className: "bg-white py-16", children: _jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Register Now" }), _jsx("p", { className: "text-lg text-gray-600", children: "Participation is free but space is limited. Please register before Application Deadline." })] }), _jsx(Card, { className: "p-8", children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-6", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "fullName", children: "Full Name *" }), _jsx(Input, Object.assign({ id: "fullName", placeholder: "Enter your full name" }, form.register("fullName"))), form.formState.errors.fullName && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: form.formState.errors.fullName.message }))] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "email", children: "Email Address *" }), _jsx(Input, Object.assign({ id: "email", type: "email", placeholder: "Enter your email" }, form.register("email"))), form.formState.errors.email && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: form.formState.errors.email.message }))] })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "institution", children: "University/Institution *" }), _jsx(Input, Object.assign({ id: "institution", placeholder: "University of Bamenda" }, form.register("institution"))), form.formState.errors.institution && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: form.formState.errors.institution.message }))] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "fieldOfStudy", children: "Field of Study *" }), _jsx(Input, Object.assign({ id: "fieldOfStudy", placeholder: "e.g., Computer Science, Biology" }, form.register("fieldOfStudy"))), form.formState.errors.fieldOfStudy && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: form.formState.errors.fieldOfStudy.message }))] })] }), _jsxs("div", { children: [_jsx(Label, { children: "Attendance Mode *" }), _jsxs(Select, { onValueChange: (value) => form.setValue("attendanceMode", value), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select attendance mode" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "on-campus", children: "On Campus" }), _jsx(SelectItem, { value: "online", children: "Online" })] })] }), form.formState.errors.attendanceMode && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: form.formState.errors.attendanceMode.message }))] }), _jsxs("div", { children: [_jsx(Label, { children: "Courses of Interest * (Select all that apply)" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2", children: courseOptions.map((course) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: course, checked: selectedCourses.includes(course), onCheckedChange: (checked) => handleCourseChange(course, checked) }), _jsx(Label, { htmlFor: course, className: "text-sm font-normal cursor-pointer", children: course })] }, course))) }), selectedCourses.length === 0 && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: "Please select at least one course" }))] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "reasonForJoining", children: "Brief Reason for Wanting to Join *" }), _jsx(Textarea, Object.assign({ id: "reasonForJoining", placeholder: "Tell us why you want to join UBa Tech Camp and what you hope to achieve...", rows: 4 }, form.register("reasonForJoining"))), form.formState.errors.reasonForJoining && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: form.formState.errors.reasonForJoining.message }))] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "referralCode", children: "Referral Code (Optional)" }), _jsx(Input, Object.assign({ id: "referralCode", placeholder: "Enter referral code if you have one" }, form.register("referralCode")))] }), _jsx(Button, { type: "submit", className: "w-full bg-primary hover:bg-blue-700", disabled: registrationMutation.isPending, children: registrationMutation.isPending ? "Submitting..." : "Submit Registration" }), _jsx("p", { className: "text-xs text-gray-500 text-center", children: "You'll receive a confirmation email within 3 days of registration." })] }) })] }) }));
}
