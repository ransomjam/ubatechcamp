import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, User, ArrowRight, BookOpen, Edit, Plus } from "lucide-react";
import { format } from "date-fns";
import BlogSubmissionForm from "@/components/blog-submission-form";

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

export default function BlogPage() {
  const [activeTab, setActiveTab] = useState("posts");
  
  const { data: blogResponse, isLoading } = useQuery<{data: BlogPost[]}>({
    queryKey: ["/api/blog"],
  });

  const blogPosts = blogResponse?.data || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-10 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">UBa Tech Camp Blog</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Insights, stories, and updates from our tech education community
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
              <TabsTrigger value="posts" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Blog Posts
              </TabsTrigger>
              <TabsTrigger value="submit" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Write a Post
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="mt-0">
          {blogPosts.length === 0 ? (
            <div className="text-center py-8 md:py-12">
              <BookOpen className="w-24 h-24 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Blog Posts Yet</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                We're working on creating amazing content for you. Check back soon for insights and stories from our tech community!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  {post.featuredImage && (
                    <div className="h-48 bg-gray-200 overflow-hidden">
                      <img 
                        src={post.featuredImage} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <CardHeader className="pb-3">
                    {post.category && (
                      <Badge variant="secondary" className="w-fit mb-2">
                        {post.category}
                      </Badge>
                    )}
                    <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center text-sm text-gray-500 mb-4">
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
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="outline" className="w-full group">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
              </div>
            )}
            </TabsContent>

            <TabsContent value="submit" className="mt-0">
              <BlogSubmissionForm />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}