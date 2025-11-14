import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Users, MapPin, Star, Clock } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Hepta Travel</h1>
          <p className="text-xl opacity-90">Discover our story and passion for travel</p>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://preview.colorlib.com/theme/hepta/images/slider-2.jpg.webp"
                alt="Mountain adventure"
                className="rounded-lg shadow-lg w-full h-[400px] object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Welcome To Our Website
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, 
                there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the 
                Semantics, a large language ocean.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                A small river named Duden flows by their place and supplies it with the necessary regelialia.
              </p>
              <Button size="lg" className="bg-teal-500 hover:bg-teal-600">
                Watch The Video
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-gray-600">Successful Trips</div>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="text-4xl font-bold text-primary mb-2">2000+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-gray-600">Destinations</div>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="text-4xl font-bold text-primary mb-2">15</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our passionate travel experts are here to make your dreams come true
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-gray-50 rounded-lg p-6">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sarah Johnson</h3>
              <p className="text-gray-600 mb-2">Travel Director</p>
              <p className="text-sm text-gray-500">
                15+ years of experience in creating unforgettable travel experiences
              </p>
            </div>
            
            <div className="text-center bg-gray-50 rounded-lg p-6">
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <MapPin className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Michael Chen</h3>
              <p className="text-gray-600 mb-2">Tour Guide Expert</p>
              <p className="text-sm text-gray-500">
                Local expert with deep knowledge of hidden gems and cultural insights
              </p>
            </div>
            
            <div className="text-center bg-gray-50 rounded-lg p-6">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Star className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Emily Rodriguez</h3>
              <p className="text-gray-600 mb-2">Customer Success</p>
              <p className="text-sm text-gray-500">
                Dedicated to ensuring every traveler has the perfect experience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let us help you create memories that will last a lifetime
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/tours">Browse Tours</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
