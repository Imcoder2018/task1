import { Button } from "@/components/ui/button"
import TourSlider from "@/components/TourSlider"
import Link from "next/link"
import { MapPin, Star, Users, Calendar } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">Hepta</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-white hover:text-gray-300 transition-colors">Home</Link>
              <Link href="/tours" className="text-white hover:text-gray-300 transition-colors">Tours</Link>
              <Link href="/about" className="text-white hover:text-gray-300 transition-colors">About</Link>
              <Link href="/blog" className="text-white hover:text-gray-300 transition-colors">Blog</Link>
              <Link href="/contact" className="text-white hover:text-gray-300 transition-colors">Contact</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-white border-white hover:bg-white hover:text-gray-900" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button className="bg-teal-500 hover:bg-teal-600 text-white" asChild>
                <Link href="/auth/register">Sign Up</Link>
              </Button>
              <div className="md:hidden ml-4">
                <button className="text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('https://preview.colorlib.com/theme/hepta/images/slider-1.jpg.webp')`
          }}
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-wider">
            Travel & Tours
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto font-light">
            A free template by Colorlib. Download and share!
          </p>
          <Button 
            size="lg" 
            className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 text-sm tracking-wider uppercase font-medium"
          >
            Visit Colorlib
          </Button>
        </div>
        
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://preview.colorlib.com/theme/hepta/images/slider-2.jpg.webp"
                alt="Mountain landscape"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
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
              <Button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 flex items-center gap-2">
                <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent"></div>
                Watch The Video
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Experience Once In Your Life Time
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, 
              there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the 
              Semantics, a large language ocean.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Good Foods */}
            <div className="text-center p-8 bg-white rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-teal-500 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-teal-500 rounded-full"></div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Good Foods</h3>
              <p className="text-gray-600 leading-relaxed">
                Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, 
                there live the blind texts.
              </p>
            </div>

            {/* Travel Anywhere */}
            <div className="text-center p-8 bg-white rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-teal-500 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-teal-500" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Travel Anywhere</h3>
              <p className="text-gray-600 leading-relaxed">
                Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, 
                there live the blind texts.
              </p>
            </div>

            {/* Airplane */}
            <div className="text-center p-8 bg-white rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-teal-500 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 text-teal-500">✈</div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Airplane</h3>
              <p className="text-gray-600 leading-relaxed">
                Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, 
                there live the blind texts.
              </p>
            </div>

            {/* Beach Resort */}
            <div className="text-center p-8 bg-white rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-teal-500 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 text-teal-500">🏖</div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Beach Resort</h3>
              <p className="text-gray-600 leading-relaxed">
                Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, 
                there live the blind texts.
              </p>
            </div>

            {/* Mountain Climbing */}
            <div className="text-center p-8 bg-white rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-teal-500 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 text-teal-500">⛰</div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Mountain Climbing</h3>
              <p className="text-gray-600 leading-relaxed">
                Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, 
                there live the blind texts.
              </p>
            </div>

            {/* Hot Air Balloon */}
            <div className="text-center p-8 bg-white rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-teal-500 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 text-teal-500">🎈</div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Hot Air Balloon</h3>
              <p className="text-gray-600 leading-relaxed">
                Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, 
                there live the blind texts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* International Tour Management */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              International Tour Management.
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, 
              there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the 
              Semantics, a large language ocean.
            </p>
          </div>
          
          {/* Image Slider */}
          <TourSlider />
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-20 bg-teal-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Recent Blog Post</h2>
            <p className="text-lg opacity-90 max-w-3xl mx-auto leading-relaxed">
              Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, 
              there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the 
              Semantics, a large language ocean.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden text-gray-900">
              <img
                src="https://preview.colorlib.com/theme/hepta/images/slider-4.jpg.webp"
                alt="Beach destination"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">15 Best Places To Unwind</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, 
                  there live the blind texts.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden text-gray-900">
              <img
                src="https://preview.colorlib.com/theme/hepta/images/slider-5.jpg.webp"
                alt="Mountain adventure"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">15 Best Places To Unwind</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, 
                  there live the blind texts.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden text-gray-900">
              <img
                src="https://preview.colorlib.com/theme/hepta/images/slider-6.jpg.webp"
                alt="City exploration"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">15 Best Places To Unwind</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, 
                  there live the blind texts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Happy Customers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Happy Customers</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b9e0e2fd?w=150&h=150&fit=crop&crop=face" 
                  alt="Clare Gupta"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-gray-600 mb-4 italic leading-relaxed">
                "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, 
                there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the 
                Semantics, a large language ocean."
              </p>
              <p className="text-gray-900 text-sm font-semibold">— Clare Gupta</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
                  alt="Rogie Slater"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-gray-600 mb-4 italic leading-relaxed">
                "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, 
                there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the 
                Semantics, a large language ocean."
              </p>
              <p className="text-gray-900 text-sm font-semibold">— Rogie Slater</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
                  alt="John Doe"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-gray-600 mb-4 italic leading-relaxed">
                "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, 
                there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the 
                Semantics, a large language ocean."
              </p>
              <p className="text-gray-900 text-sm font-semibold">— John Doe</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Destinations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Top Destination</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. In dolor, iusto doloremque quo 
              odio repudiandae sunt eveniet? Enim facilis laborum voluptate id porro, culpa maiores 
              quis blanditiis laboriosam alias. Sed.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <img
                src="https://preview.colorlib.com/theme/hepta/images/slider-1.jpg.webp"
                alt="Food & Wines"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold mb-2">Food & Wines</h3>
                <div className="flex items-center text-yellow-500 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-600">3,200 Reviews</p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <img
                src="https://preview.colorlib.com/theme/hepta/images/slider-2.jpg.webp"
                alt="Resort & Spa"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold mb-2">Resort & Spa</h3>
                <div className="flex items-center text-yellow-500 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-600">4,921 Reviews</p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <img
                src="https://preview.colorlib.com/theme/hepta/images/slider-3.jpg.webp"
                alt="Hotel Rooms"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold mb-2">Hotel Rooms</h3>
                <div className="flex items-center text-yellow-500 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-600">2,112 Reviews</p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <img
                src="https://preview.colorlib.com/theme/hepta/images/slider-4.jpg.webp"
                alt="Mountain Climbing"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold mb-2">Mountain Climbing</h3>
                <div className="flex items-center text-yellow-500 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-600">6,421 Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Quick Link</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms & Conditions</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/help" className="hover:text-white">Help</Link></li>
                <li><Link href="/rooms" className="hover:text-white">Rooms</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/location" className="hover:text-white">Our Location</Link></li>
                <li><Link href="/hosts" className="hover:text-white">The Hosts</Link></li>
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/restaurant" className="hover:text-white">Restaurant</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p><strong>Address:</strong></p>
                <p>98 West 21th Street, Suite 721</p>
                <p>New York NY 10016</p>
                <p className="mt-4"><strong>Phone:</strong></p>
                <p>(+1) 435 3533</p>
                <p className="mt-4"><strong>Email:</strong></p>
                <p>info@yourdomain.com</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Subscribe</h4>
              <p className="text-gray-400 mb-4">Sign up for our newsletter</p>
              <div className="flex">
                <input
                  type="email" 
                  placeholder="Your email..."
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l text-white placeholder-gray-400"
                />
                <button className="bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded-r">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>Copyright ©2024 All rights reserved | This template is made with ❤ by <Link href="#" className="text-teal-500 hover:text-teal-400">Colorlib</Link></p>
          </div>
        </div>
      </footer>
    </div>
  )
}
