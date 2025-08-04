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

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  authorName: string;
  category?: string;
  tags?: string[];
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminPage() {
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: unapprovedResponse, isLoading: loadingUnapproved } = useQuery<{data: BlogPost[]}>({
    queryKey: ["/api/blog/unapproved"],
  });

  const { data: publishedResponse, isLoading: loadingPublished } = useQuery<{data: BlogPost[]}>({
    queryKey: ["/api/blog"],
  });

  const unapprovedPosts = unapprovedResponse?.data || [];
  const publishedPosts = publishedResponse?.data || [];

  const approveMutation = useMutation({
    mutationFn: async (postId: string) => {
      return apiRequest("POST", `/api/blog/${postId}/approve`);
    },
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

  const handleApprove = (postId: string) => {
    approveMutation.mutate(postId);
  };

  const toggleExpanded = (postId: string) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  const renderBlogPost = (post: BlogPost, showApproval = false) => (
    <Card key={post.id} className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {post.category && (
                <Badge variant="secondary">{post.category}</Badge>
              )}
              {!post.isPublished && (
                <Badge variant="outline" className="text-orange-600 border-orange-600">
                  Pending Approval
                </Badge>
              )}
            </div>
            <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <User className="w-4 h-4 mr-1" />
              <span className="mr-4">{post.authorName}</span>
              <Calendar className="w-4 h-4 mr-1" />
              <span>
                {post.publishedAt 
                  ? format(new Date(post.publishedAt), 'MMM dd, yyyy')
                  : format(new Date(post.createdAt), 'MMM dd, yyyy')
                }
              </span>
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleExpanded(post.id)}
            >
              <Eye className="w-4 h-4 mr-1" />
              {expandedPost === post.id ? 'Hide' : 'Preview'}
            </Button>
            {showApproval && (
              <Button
                onClick={() => handleApprove(post.id)}
                disabled={approveMutation.isPending}
                size="sm"
              >
                <Check className="w-4 h-4 mr-1" />
                Approve
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {post.excerpt && (
          <p className="text-gray-600 mb-3">{post.excerpt}</p>
        )}
        
        {expandedPost === post.id && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Full Content:</h4>
            <div className="prose prose-sm max-w-none">
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: post.content.replace(/\n/g, '<br />') 
                }}
                className="text-gray-700"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Settings className="w-12 h-12 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Blog Administration</h1>
          <p className="text-xl text-blue-100">
            Manage and approve blog post submissions
          </p>
        </div>
      </section>

      {/* Admin Content */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <X className="w-4 h-4" />
                Pending ({unapprovedPosts.length})
              </TabsTrigger>
              <TabsTrigger value="published" className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                Published ({publishedPosts.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending">
              {loadingUnapproved ? (
                <div className="text-center py-8 md:py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading pending posts...</p>
                </div>
              ) : unapprovedPosts.length === 0 ? (
                <div className="text-center py-8 md:py-12">
                  <Check className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Pending Posts</h3>
                  <p className="text-gray-600">
                    All blog posts have been reviewed and approved!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {unapprovedPosts.map((post) => renderBlogPost(post, true))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="published">
              {loadingPublished ? (
                <div className="text-center py-8 md:py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading published posts...</p>
                </div>
              ) : publishedPosts.length === 0 ? (
                <div className="text-center py-8 md:py-12">
                  <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Published Posts</h3>
                  <p className="text-gray-600">
                    Published blog posts will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {publishedPosts.map((post) => renderBlogPost(post, false))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}