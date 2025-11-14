import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { MapPin, Star, Clock, Users } from 'lucide-react'

// Mock data for demonstration
const mockTours = [
  {
    id: '1',
    name: 'Amazing Iceland Adventure',
    shortDescription: 'Explore the stunning landscapes of Iceland with geysers, waterfalls, and northern lights.',
    price: 1299,
    duration: 7,
    difficulty: 'moderate',
    maxGroupSize: 12,
    ratingsAverage: 4.8,
    ratingsQuantity: 134,
    imageCover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    startLocation: {
      address: 'Iceland'
    }
  },
  {
    id: '2',
    name: "Swiss Alps Hiking",
    shortDescription: "Experience breathtaking mountain views and alpine culture",
    price: 1299,
    duration: 10,
    difficulty: 'Moderate',
    maxGroupSize: 8,
    ratingsAverage: 4.9,
    ratingsQuantity: 87,
    imageCover: "https://preview.colorlib.com/theme/hepta/images/slider-2.jpg.webp",
    startLocation: {
      address: 'Swiss Alps'
    }
  },
  {
    id: '3',
    name: "Tokyo Cultural Tour",
    shortDescription: "Immerse yourself in Japanese culture and cuisine",
    price: 1599,
    duration: 8,
    difficulty: 'Easy',
    maxGroupSize: 15,
    ratingsAverage: 4.7,
    ratingsQuantity: 156,
    imageCover: "https://preview.colorlib.com/theme/hepta/images/slider-3.jpg.webp",
    startLocation: {
      address: 'Tokyo, Japan'
    }
  },
  {
    id: '4',
    name: "Amazon Rainforest Expedition",
    shortDescription: "Discover the incredible biodiversity of the Amazon",
    price: 2199,
    duration: 12,
    difficulty: 'Challenging',
    maxGroupSize: 12,
    ratingsAverage: 4.6,
    ratingsQuantity: 92,
    imageCover: "https://preview.colorlib.com/theme/hepta/images/slider-4.jpg.webp",
    startLocation: {
      address: 'Amazon Basin'
    }
  },
  {
    id: '5',
    name: "Santorini Island Getaway",
    shortDescription: "Relax in the stunning Greek islands",
    price: 1099,
    duration: 6,
    difficulty: 'Easy',
    maxGroupSize: 12,
    ratingsAverage: 4.8,
    ratingsQuantity: 203,
    imageCover: "https://preview.colorlib.com/theme/hepta/images/slider-5.jpg.webp",
    startLocation: {
      address: 'Santorini, Greece'
    }
  },
  {
    id: '6',
    name: "Morocco Desert Safari",
    shortDescription: "Experience the magic of the Sahara Desert",
    price: 1399,
    duration: 9,
    difficulty: 'Moderate',
    maxGroupSize: 8,
    ratingsAverage: 4.7,
    ratingsQuantity: 76,
    imageCover: "https://preview.colorlib.com/theme/hepta/images/slider-6.jpg.webp",
    startLocation: {
      address: 'Morocco'
    }
  }
]

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case 'easy': return 'bg-green-100 text-green-800'
    case 'moderate': return 'bg-yellow-100 text-yellow-800'
    case 'difficult': return 'bg-red-100 text-red-800'
    case 'challenging': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export default function ToursPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Amazing Tours
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Choose from our carefully curated selection of world-class adventures
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="lg">
              All Tours
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              Adventure
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              Cultural
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              Nature
            </Button>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockTours.map((tour) => (
              <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={tour.imageCover}
                    alt={tour.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tour.difficulty)}`}>
                      {tour.difficulty}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded text-sm font-semibold">
                    ${tour.price}
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg">{tour.name}</CardTitle>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {tour.shortDescription}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {tour.startLocation.address}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-gray-500" />
                      {tour.duration} days
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1 text-gray-500" />
                      {tour.maxGroupSize} people
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      {tour.ratingsAverage} ({tour.ratingsQuantity})
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="pt-0">
                  <Link href={`/tours/${tour.id}`} className="block">
                    <Button className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700">
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Contact us to create a custom tour experience just for you
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
