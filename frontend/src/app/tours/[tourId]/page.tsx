'use client'

import { use } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getTourById } from '@/data/tours'

interface PageProps {
  params: Promise<{ tourId: string }>
}

export default function TourDetailPage({ params }: PageProps) {
  const { tourId } = use(params)
  const tour = getTourById(tourId)
  
  if (!tour) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 pb-16 flex items-center justify-center">
          <div className="max-w-md w-full mx-4 bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tour Not Found</h2>
            <p className="text-gray-600 mb-6">The tour you're looking for doesn't exist.</p>
            <Link href="/tours" className="inline-block bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md">Browse All Tours</Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/tours" className="text-teal-600 hover:text-teal-700">← Back to Tours</Link>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{tour.name}</h1>
        <p className="text-gray-600 mb-6">{tour.description}</p>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Tour Details</h3>
              <p><strong>Duration:</strong> {tour.duration} days</p>
              <p><strong>Max Group:</strong> {tour.maxGroupSize} people</p>
              <p><strong>Difficulty:</strong> {tour.difficulty}</p>
              <p><strong>Rating:</strong> {tour.ratingsAverage}/5 ({tour.ratingsQuantity} reviews)</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Pricing</h3>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                ${tour.discountPrice || tour.price}
              </div>
              <button 
                className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white py-2 px-4 rounded-md"
                onClick={() => alert(`Booking ${tour.name}!`)}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
