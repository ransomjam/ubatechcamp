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
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import { format } from "date-fns";
export default function BlogPostPage() {
    const [match, params] = useRoute("/blog/:slug");
    const slug = params === null || params === void 0 ? void 0 : params.slug;
    const { data: blogResponse, isLoading, error } = useQuery({
        queryKey: [`/api/blog/${slug}`],
        enabled: !!slug,
    });
    const blogPost = blogResponse === null || blogResponse === void 0 ? void 0 : blogResponse.data;
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 py-12", children: _jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto" }), _jsx("p", { className: "mt-4 text-gray-600", children: "Loading blog post..." })] }) }) }));
    }
    if (error || !blogPost) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 py-12", children: _jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Blog Post Not Found" }), _jsx("p", { className: "text-gray-600 mb-8", children: "The blog post you're looking for doesn't exist or has been removed." }), _jsx(Link, { href: "/blog", children: _jsxs(Button, { children: [_jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }), "Back to Blog"] }) })] }) }));
    }
    const handleShare = () => __awaiter(this, void 0, void 0, function* () {
        if (navigator.share) {
            try {
                yield navigator.share({
                    title: blogPost.title,
                    text: blogPost.excerpt || 'Check out this blog post from UBa Tech Camp',
                    url: window.location.href,
                });
            }
            catch (error) {
                console.log('Error sharing:', error);
            }
        }
        else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    });
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx("div", { className: "bg-white border-b", children: _jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4", children: _jsx(Link, { href: "/blog", children: _jsxs(Button, { variant: "ghost", size: "sm", children: [_jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }), "Back to Blog"] }) }) }) }), blogPost.featuredImage && (_jsx("div", { className: "h-64 md:h-96 bg-gray-200 overflow-hidden", children: _jsx("img", { src: blogPost.featuredImage, alt: blogPost.title, className: "w-full h-full object-cover" }) })), _jsxs("article", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [_jsxs("header", { className: "mb-8", children: [blogPost.category && (_jsx(Badge, { variant: "secondary", className: "mb-4", children: blogPost.category })), _jsx("h1", { className: "text-3xl md:text-4xl font-bold text-gray-900 mb-4", children: blogPost.title }), blogPost.excerpt && (_jsx("p", { className: "text-xl text-gray-600 mb-6", children: blogPost.excerpt })), _jsxs("div", { className: "flex items-center justify-between flex-wrap gap-4", children: [_jsxs("div", { className: "flex items-center text-sm text-gray-500", children: [_jsx(User, { className: "w-4 h-4 mr-1" }), _jsx("span", { className: "mr-4", children: blogPost.authorName }), _jsx(Calendar, { className: "w-4 h-4 mr-1" }), _jsx("span", { children: blogPost.publishedAt
                                                    ? format(new Date(blogPost.publishedAt), 'MMMM dd, yyyy')
                                                    : format(new Date(blogPost.createdAt), 'MMMM dd, yyyy') })] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: handleShare, children: [_jsx(Share2, { className: "w-4 h-4 mr-2" }), "Share"] })] }), blogPost.tags && blogPost.tags.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-2 mt-4", children: blogPost.tags.map((tag) => (_jsx(Badge, { variant: "outline", children: tag }, tag))) }))] }), _jsx("div", { className: "prose prose-lg max-w-none", children: _jsx("div", { dangerouslySetInnerHTML: { __html: blogPost.content.replace(/\n/g, '<br />') }, className: "text-gray-700 leading-relaxed" }) }), blogPost.contentImages && blogPost.contentImages.length > 0 && (_jsxs("div", { className: "mt-12", children: [_jsx("h3", { className: "text-xl font-semibold mb-6 text-gray-900", children: "Additional Images" }), _jsx("div", { className: "grid md:grid-cols-2 gap-6", children: blogPost.contentImages.map((imageUrl, index) => (_jsx("div", { className: "bg-white rounded-lg shadow-md overflow-hidden", children: _jsx("img", { src: imageUrl, alt: `Content image ${index + 1}`, className: "w-full h-48 object-cover hover:scale-105 transition-transform duration-300" }) }, index))) })] })), _jsx("footer", { className: "mt-12 pt-8 border-t border-gray-200", children: _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-gray-600 mb-4", children: "Want to share your own tech journey story?" }), _jsx(Link, { href: "/#testimonials", children: _jsx(Button, { children: "Share Your Experience" }) })] }) })] })] }));
}
