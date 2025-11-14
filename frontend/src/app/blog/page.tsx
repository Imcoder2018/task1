import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Calendar, User, Eye } from 'lucide-react'

// Mock blog data
const blogPosts = [
  {
    id: '1',
    title: '15 Best Places To Unwind',
    excerpt: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
    image: 'https://preview.colorlib.com/theme/hepta/images/slider-1.jpg.webp',
    author: 'John Doe',
    date: '2024-11-10',
    views: 1234,
    category: 'Travel Tips'
  },
  {
    id: '2',
    title: 'Mountain Adventures Around The World',
    excerpt: 'Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.',
    image: 'https://preview.colorlib.com/theme/hepta/images/slider-2.jpg.webp',
    author: 'Jane Smith',
    date: '2024-11-08',
    views: 987,
    category: 'Adventure'
  },
  {
    id: '3',
    title: 'Cultural Experiences That Transform',
    excerpt: 'A small river named Duden flows by their place and supplies it with the necessary regelialia.',
    image: 'https://preview.colorlib.com/theme/hepta/images/slider-3.jpg.webp',
    author: 'Mike Johnson',
    date: '2024-11-05',
    views: 2156,
    category: 'Culture'
  },
  {
    id: '4',
    title: 'Beach Paradises You Must Visit',
    excerpt: 'It is a paradisematic country, in which roasted parts of sentences fly into your mouth.',
    image: 'https://preview.colorlib.com/theme/hepta/images/slider-4.jpg.webp',
    author: 'Sarah Wilson',
    date: '2024-11-03',
    views: 1876,
    category: 'Beach'
  },
  {
    id: '5',
    title: 'Urban Exploration: City Guide',
    excerpt: 'Even the all-powerful Pointing has no control about the blind texts it is an almost.',
    image: 'https://preview.colorlib.com/theme/hepta/images/slider-5.jpg.webp',
    author: 'Chris Brown',
    date: '2024-11-01',
    views: 1543,
    category: 'Urban'
  },
  {
    id: '6',
    title: 'Wildlife Safari Adventures',
    excerpt: 'Question Marks and devious Semikoli, but the Little Blind Text did not listen.',
    image: 'https://preview.colorlib.com/theme/hepta/images/slider-6.jpg.webp',
    author: 'Emma Davis',
    date: '2024-10-28',
    views: 2234,
    category: 'Wildlife'
  }
]

const categories = ['All', 'Travel Tips', 'Adventure', 'Culture', 'Beach', 'Urban', 'Wildlife']

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-teal-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Recent Blog Posts</h1>
          <p className="text-xl opacity-90">
            Discover travel stories, tips, and inspiration from around the world
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === 'All' ? 'default' : 'outline'}
                size="sm"
                className={category === 'All' ? '' : 'hover:bg-primary hover:text-white'}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Featured Post</h2>
          </div>
          
          <Card className="overflow-hidden mb-12">
            <div className="grid lg:grid-cols-2">
              <div className="relative h-64 lg:h-full">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {blogPosts[0].category}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-2xl lg:text-3xl">{blogPosts[0].title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-6 space-x-6">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {blogPosts[0].author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(blogPosts[0].date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {blogPosts[0].views.toLocaleString()} views
                    </div>
                  </div>
                  <Button asChild>
                    <Link href={`/blog/${blogPosts[0].id}`}>Read More</Link>
                  </Button>
                </CardContent>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Latest Posts</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur px-2 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg hover:text-primary transition-colors">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center text-xs text-gray-500 mb-4 space-x-4">
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/blog/${post.id}`}>Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 opacity-90">
            Subscribe to our newsletter for the latest travel stories and tips
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md text-gray-900"
            />
            <Button variant="secondary">Subscribe</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
