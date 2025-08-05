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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, User, Check, X, Eye, Settings } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
export default function AdminPage() {
    const [expandedPost, setExpandedPost] = useState(null);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { data: unapprovedResponse, isLoading: loadingUnapproved } = useQuery({
        queryKey: ["/api/blog/unapproved"],
    });
    const { data: publishedResponse, isLoading: loadingPublished } = useQuery({
        queryKey: ["/api/blog"],
    });
    const unapprovedPosts = (unapprovedResponse === null || unapprovedResponse === void 0 ? void 0 : unapprovedResponse.data) || [];
    const publishedPosts = (publishedResponse === null || publishedResponse === void 0 ? void 0 : publishedResponse.data) || [];
    const approveMutation = useMutation({
        mutationFn: (postId) => __awaiter(this, void 0, void 0, function* () {
            return apiRequest("POST", `/api/blog/${postId}/approve`);
        }),
        onSuccess: () => {
            toast({
                title: "Post Approved!",
                description: "The blog post has been published and will appear first in the blog feed.",
            });
            queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
            queryClient.invalidateQueries({ queryKey: ["/api/blog/unapproved"] });
        },
        onError: (error) => {
            toast({
                title: "Approval Failed",
                description: error.message || "Failed to approve blog post.",
                variant: "destructive",
            });
        },
    });
    const handleApprove = (postId) => {
        approveMutation.mutate(postId);
    };
    const toggleExpanded = (postId) => {
        setExpandedPost(expandedPost === postId ? null : postId);
    };
    const renderBlogPost = (post, showApproval = false) => (_jsxs(Card, { className: "mb-4", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [post.category && (_jsx(Badge, { variant: "secondary", children: post.category })), !post.isPublished && (_jsx(Badge, { variant: "outline", className: "text-orange-600 border-orange-600", children: "Pending Approval" }))] }), _jsx(CardTitle, { className: "text-xl mb-2", children: post.title }), _jsxs("div", { className: "flex items-center text-sm text-gray-500 mb-2", children: [_jsx(User, { className: "w-4 h-4 mr-1" }), _jsx("span", { className: "mr-4", children: post.authorName }), _jsx(Calendar, { className: "w-4 h-4 mr-1" }), _jsx("span", { children: post.publishedAt
                                                ? format(new Date(post.publishedAt), 'MMM dd, yyyy')
                                                : format(new Date(post.createdAt), 'MMM dd, yyyy') })] }), post.tags && post.tags.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-1 mb-2", children: post.tags.map((tag) => (_jsx(Badge, { variant: "outline", className: "text-xs", children: tag }, tag))) }))] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: () => toggleExpanded(post.id), children: [_jsx(Eye, { className: "w-4 h-4 mr-1" }), expandedPost === post.id ? 'Hide' : 'Preview'] }), showApproval && (_jsxs(Button, { onClick: () => handleApprove(post.id), disabled: approveMutation.isPending, size: "sm", children: [_jsx(Check, { className: "w-4 h-4 mr-1" }), "Approve"] }))] })] }) }), _jsxs(CardContent, { children: [post.excerpt && (_jsx("p", { className: "text-gray-600 mb-3", children: post.excerpt })), expandedPost === post.id && (_jsxs("div", { className: "mt-4 p-4 bg-gray-50 rounded-lg", children: [_jsx("h4", { className: "font-medium mb-2", children: "Full Content:" }), _jsx("div", { className: "prose prose-sm max-w-none", children: _jsx("div", { dangerouslySetInnerHTML: {
                                        __html: post.content.replace(/\n/g, '<br />')
                                    }, className: "text-gray-700" }) })] }))] })] }, post.id));
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx("section", { className: "bg-gradient-to-r from-primary to-blue-700 text-white py-12", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [_jsx(Settings, { className: "w-12 h-12 mx-auto mb-4" }), _jsx("h1", { className: "text-3xl md:text-4xl font-bold mb-2", children: "Blog Administration" }), _jsx("p", { className: "text-xl text-blue-100", children: "Manage and approve blog post submissions" })] }) }), _jsx("section", { className: "py-12", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs(Tabs, { defaultValue: "pending", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-2 max-w-md mx-auto mb-8", children: [_jsxs(TabsTrigger, { value: "pending", className: "flex items-center gap-2", children: [_jsx(X, { className: "w-4 h-4" }), "Pending (", unapprovedPosts.length, ")"] }), _jsxs(TabsTrigger, { value: "published", className: "flex items-center gap-2", children: [_jsx(Check, { className: "w-4 h-4" }), "Published (", publishedPosts.length, ")"] })] }), _jsx(TabsContent, { value: "pending", children: loadingUnapproved ? (_jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" }), _jsx("p", { className: "mt-4 text-gray-600", children: "Loading pending posts..." })] })) : unapprovedPosts.length === 0 ? (_jsxs("div", { className: "text-center py-12", children: [_jsx(Check, { className: "w-16 h-16 text-gray-300 mx-auto mb-4" }), _jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: "No Pending Posts" }), _jsx("p", { className: "text-gray-600", children: "All blog posts have been reviewed and approved!" })] })) : (_jsx("div", { className: "space-y-4", children: unapprovedPosts.map((post) => renderBlogPost(post, true)) })) }), _jsx(TabsContent, { value: "published", children: loadingPublished ? (_jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" }), _jsx("p", { className: "mt-4 text-gray-600", children: "Loading published posts..." })] })) : publishedPosts.length === 0 ? (_jsxs("div", { className: "text-center py-12", children: [_jsx(Settings, { className: "w-16 h-16 text-gray-300 mx-auto mb-4" }), _jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: "No Published Posts" }), _jsx("p", { className: "text-gray-600", children: "Published blog posts will appear here." })] })) : (_jsx("div", { className: "space-y-4", children: publishedPosts.map((post) => renderBlogPost(post, false)) })) })] }) }) })] }));
}
