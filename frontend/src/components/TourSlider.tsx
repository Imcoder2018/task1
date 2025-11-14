"use client"

import { useState } from 'react'

const images = [
  {
    src: "https://preview.colorlib.com/theme/hepta/images/slider-3.jpg.webp",
    alt: "Beach paradise"
  },
  {
    src: "https://preview.colorlib.com/theme/hepta/images/slider-4.jpg.webp",
    alt: "Mountain adventure"
  },
  {
    src: "https://preview.colorlib.com/theme/hepta/images/slider-5.jpg.webp",
    alt: "Desert exploration"
  },
  {
    src: "https://preview.colorlib.com/theme/hepta/images/slider-6.jpg.webp",
    alt: "City tours"
  },
  {
    src: "https://preview.colorlib.com/theme/hepta/images/slider-1.jpg.webp",
    alt: "Island getaway"
  }
]

export default function TourSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className="w-full h-96 object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>
      
      {/* Slider Navigation */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
      >
        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
      >
        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Slider Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-opacity ${
              index === currentIndex ? 'bg-white opacity-100' : 'bg-white opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
