import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import { useRoute, Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  contentImages?: string[];
  authorName: string;
  category?: string;
  tags?: string[];
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export default function BlogPostPage() {
  const [match, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { data: blogResponse, isLoading, error } = useQuery<{data: BlogPost}>({
    queryKey: [`/api/blog/${slug}`],
    enabled: !!slug,
  });

  const blogPost = blogResponse?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blog post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link href="/blog">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blogPost.title,
          text: blogPost.excerpt || 'Check out this blog post from UBa Tech Camp',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/blog">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>

      {/* Featured Image */}
      {blogPost.featuredImage && (
        <div className="h-64 md:h-96 bg-gray-200 overflow-hidden">
          <img 
            src={blogPost.featuredImage} 
            alt={blogPost.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <header className="mb-8">
          {blogPost.category && (
            <Badge variant="secondary" className="mb-4">
              {blogPost.category}
            </Badge>
          )}
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {blogPost.title}
          </h1>
          
          {blogPost.excerpt && (
            <p className="text-xl text-gray-600 mb-6">
              {blogPost.excerpt}
            </p>
          )}
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center text-sm text-gray-500">
              <User className="w-4 h-4 mr-1" />
              <span className="mr-4">{blogPost.authorName}</span>
              <Calendar className="w-4 h-4 mr-1" />
              <span>
                {blogPost.publishedAt 
                  ? format(new Date(blogPost.publishedAt), 'MMMM dd, yyyy')
                  : format(new Date(blogPost.createdAt), 'MMMM dd, yyyy')
                }
              </span>
            </div>
            
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
          
          {blogPost.tags && blogPost.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {blogPost.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div 
            dangerouslySetInnerHTML={{ __html: blogPost.content.replace(/\n/g, '<br />') }}
            className="text-gray-700 leading-relaxed"
          />
        </div>

        {/* Content Images */}
        {blogPost.contentImages && blogPost.contentImages.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6 text-gray-900">Additional Images</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {blogPost.contentImages.map((imageUrl, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img 
                    src={imageUrl} 
                    alt={`Content image ${index + 1}`}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Want to share your own tech journey story?
            </p>
            <Link href="/#testimonials">
              <Button>
                Share Your Experience
              </Button>
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}