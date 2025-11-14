import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl opacity-90">
            Get in touch with our travel experts for personalized assistance
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="john@example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Tour inquiry"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Tell us about your travel plans..."
                      />
                    </div>
                    
                    <Button size="lg" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                <p className="text-gray-600 mb-8">
                  We're here to help you plan your perfect adventure. Contact us through any of the following methods:
                </p>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                        <p className="text-gray-600">
                          123 Travel Street, Suite 456<br />
                          Adventure City, AC 12345<br />
                          United States
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                        <p className="text-gray-600">
                          +1 (555) 123-4567<br />
                          +1 (555) 987-6543
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                        <p className="text-gray-600">
                          info@heptatravel.com<br />
                          support@heptatravel.com
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                        <p className="text-gray-600">
                          Monday - Friday: 9:00 AM - 6:00 PM<br />
                          Saturday: 10:00 AM - 4:00 PM<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Find Us</h2>
            <p className="text-gray-600">Visit our office for in-person consultations</p>
          </div>
          <div className="bg-gray-200 rounded-lg h-96 relative overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095919355!2d-74.00425878459418!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1635959712158!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hepta Travel Office Location"
              className="rounded-lg"
            ></iframe>
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-2 rounded-lg shadow-md">
              <div className="flex items-center text-sm font-medium text-gray-700">
                <MapPin className="w-4 h-4 mr-1 text-teal-600" />
                Hepta Travel HQ
              </div>
              <p className="text-xs text-gray-500 mt-1">98 West 21st Street, New York</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Quick answers to common questions</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How do I book a tour?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  You can book a tour directly through our website, call us, or visit our office. 
                  We'll guide you through the entire process and help you choose the perfect adventure.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What's included in the tour price?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our tour prices typically include accommodation, transportation, meals as specified, 
                  professional guides, and all activities mentioned in the itinerary.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I customize my trip?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Absolutely! We specialize in creating personalized travel experiences. 
                  Contact us to discuss your preferences and we'll create a custom itinerary just for you.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What's your cancellation policy?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our cancellation policy varies by tour and booking date. Generally, we offer 
                  full refunds for cancellations made 30+ days in advance. Contact us for specific details.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
