export interface Tour {
  id: string
  name: string
  shortDescription: string
  description: string
  price: number
  discountPrice?: number
  duration: number
  difficulty: 'easy' | 'moderate' | 'challenging'
  maxGroupSize: number
  ratingsAverage: number
  ratingsQuantity: number
  imageCover: string
  images: string[]
  startLocation: {
    address: string
    coordinates: [number, number]
  }
  highlights: string[]
  included: string[]
  excluded: string[]
  itinerary: Array<{
    day: number
    title: string
    description: string
    meals: string[]
    accommodation?: string
  }>
  bestTimeToVisit: string
  physicalRequirements: string
}

export const tours: Tour[] = [
  {
    id: '1',
    name: 'Amazing Iceland Adventure',
    shortDescription: 'Explore the stunning landscapes of Iceland with geysers, waterfalls, and northern lights.',
    description: 'Discover the raw beauty of Iceland on this incredible 7-day adventure. From the dramatic waterfalls of Gullfoss and Skógafoss to the otherworldly landscapes of the Blue Lagoon, experience the best of the land of fire and ice. Hunt for the Northern Lights, explore ice caves, and witness the power of geysers in this unforgettable journey.',
    price: 1299,
    discountPrice: 1199,
    duration: 7,
    difficulty: 'moderate',
    maxGroupSize: 12,
    ratingsAverage: 4.8,
    ratingsQuantity: 134,
    imageCover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1531168556467-80ea4d7078da?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1465056836041-7f43ac27dcb9?w=800&h=600&fit=crop'
    ],
    startLocation: {
      address: 'Reykjavik, Iceland',
      coordinates: [-21.9426, 64.1466]
    },
    highlights: [
      'Northern Lights hunting',
      'Blue Lagoon geothermal spa',
      'Golden Circle tour',
      'Glacier hiking experience',
      'Stunning waterfalls visit',
      'Ice cave exploration'
    ],
    included: [
      'Airport transfers',
      'All accommodation',
      'Professional guide',
      'Transportation',
      'Entrance fees',
      'Some meals'
    ],
    excluded: [
      'International flights',
      'Travel insurance',
      'Personal expenses',
      'Optional activities',
      'Meals not mentioned'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Reykjavik',
        description: 'Arrive in Reykjavik and explore the colorful capital city.',
        meals: ['Dinner'],
        accommodation: 'Hotel Reykjavik'
      },
      {
        day: 2,
        title: 'Golden Circle Tour',
        description: 'Visit Gullfoss waterfall, Geysir geothermal area, and Thingvellir National Park.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Hotel Reykjavik'
      },
      {
        day: 3,
        title: 'South Coast Adventure',
        description: 'Explore Skógafoss and Seljalandsfoss waterfalls, black sand beaches.',
        meals: ['Breakfast', 'Dinner'],
        accommodation: 'South Coast Hotel'
      }
    ],
    bestTimeToVisit: 'September to March for Northern Lights, June to August for mild weather',
    physicalRequirements: 'Moderate fitness level required for hiking activities'
  },
  {
    id: '2',
    name: 'Swiss Alps Hiking',
    shortDescription: 'Experience breathtaking mountain views and alpine culture',
    description: 'Embark on an unforgettable journey through the Swiss Alps. Trek through pristine mountain trails, discover charming alpine villages, and immerse yourself in Swiss culture. From the Matterhorn to Jungfraujoch, experience the best of Switzerland\'s natural beauty.',
    price: 1899,
    discountPrice: 1699,
    duration: 10,
    difficulty: 'challenging',
    maxGroupSize: 8,
    ratingsAverage: 4.9,
    ratingsQuantity: 87,
    imageCover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1531168556467-80ea4d7078da?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1465056836041-7f43ac27dcb9?w=800&h=600&fit=crop'
    ],
    startLocation: {
      address: 'Zurich, Switzerland',
      coordinates: [8.5417, 47.3769]
    },
    highlights: [
      'Matterhorn viewpoint',
      'Jungfraujoch - Top of Europe',
      'Alpine hiking trails',
      'Traditional Swiss villages',
      'Cable car experiences',
      'Swiss cuisine tasting'
    ],
    included: [
      'All transportation',
      'Professional mountain guide',
      'Accommodation',
      'Most meals',
      'Cable car tickets',
      'Hiking equipment'
    ],
    excluded: [
      'International flights',
      'Travel insurance',
      'Personal gear',
      'Alcoholic beverages',
      'Tips and gratuities'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Zurich',
        description: 'Welcome to Switzerland! Transfer to the Alps region.',
        meals: ['Dinner'],
        accommodation: 'Alpine Lodge'
      },
      {
        day: 2,
        title: 'Matterhorn Experience',
        description: 'Take the cogwheel train to see the iconic Matterhorn peak.',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Zermatt Hotel'
      }
    ],
    bestTimeToVisit: 'June to September for hiking, December to March for winter sports',
    physicalRequirements: 'Good fitness level required for mountain hiking'
  },
  {
    id: '3',
    name: 'Tokyo Cultural Tour',
    shortDescription: 'Immerse yourself in Japanese culture and cuisine',
    description: 'Discover the fascinating blend of ancient traditions and modern innovation in Tokyo. From historic temples to cutting-edge technology, experience authentic Japanese culture, cuisine, and hospitality in this comprehensive cultural journey.',
    price: 1599,
    duration: 8,
    difficulty: 'easy',
    maxGroupSize: 15,
    ratingsAverage: 4.7,
    ratingsQuantity: 156,
    imageCover: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&h=600&fit=crop'
    ],
    startLocation: {
      address: 'Tokyo, Japan',
      coordinates: [139.6917, 35.6895]
    },
    highlights: [
      'Senso-ji Temple visit',
      'Sushi making class',
      'Traditional tea ceremony',
      'Shibuya crossing experience',
      'Cherry blossom viewing',
      'Authentic Japanese cuisine'
    ],
    included: [
      'All accommodation',
      'Local transportation',
      'Cultural guide',
      'Temple entrance fees',
      'Cooking classes',
      'Some meals'
    ],
    excluded: [
      'International flights',
      'Travel insurance',
      'Personal shopping',
      'Optional activities',
      'Alcoholic drinks'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Welcome to Tokyo',
        description: 'Arrive in Tokyo and explore the vibrant Shibuya district.',
        meals: ['Dinner'],
        accommodation: 'Tokyo City Hotel'
      },
      {
        day: 2,
        title: 'Cultural Immersion',
        description: 'Visit historic temples and participate in a tea ceremony.',
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'Tokyo City Hotel'
      }
    ],
    bestTimeToVisit: 'March to May for cherry blossoms, September to November for pleasant weather',
    physicalRequirements: 'Basic walking ability, mostly city exploration'
  },
  {
    id: '4',
    name: 'Amazon Rainforest Expedition',
    shortDescription: 'Discover the incredible biodiversity of the Amazon',
    description: 'Venture deep into the Amazon rainforest for an extraordinary wildlife expedition. Discover exotic birds, monkeys, and countless species in their natural habitat. Experience life in the jungle with expert naturalist guides.',
    price: 2199,
    discountPrice: 1999,
    duration: 12,
    difficulty: 'challenging',
    maxGroupSize: 10,
    ratingsAverage: 4.6,
    ratingsQuantity: 92,
    imageCover: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1574263867128-b3db6efb9b45?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1616003165915-74a7be4bc37b?w=800&h=600&fit=crop'
    ],
    startLocation: {
      address: 'Manaus, Brazil',
      coordinates: [-60.0261, -3.1190]
    },
    highlights: [
      'Wildlife spotting expeditions',
      'Canopy walkway experience',
      'Indigenous community visit',
      'Night jungle sounds tour',
      'Piranha fishing',
      'Amazon River cruise'
    ],
    included: [
      'All accommodation',
      'Expert naturalist guide',
      'All meals',
      'Transportation',
      'Equipment',
      'Park fees'
    ],
    excluded: [
      'International flights',
      'Travel insurance',
      'Personal items',
      'Tips',
      'Vaccinations'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrive in Manaus',
        description: 'Fly into Manaus and transfer to jungle lodge.',
        meals: ['Dinner'],
        accommodation: 'Amazon Eco Lodge'
      },
      {
        day: 2,
        title: 'First Jungle Trek',
        description: 'Begin your Amazon adventure with a guided forest walk.',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Amazon Eco Lodge'
      }
    ],
    bestTimeToVisit: 'May to October for dry conditions, December to May for high water levels',
    physicalRequirements: 'Good fitness required for jungle trekking and humid conditions'
  },
  {
    id: '5',
    name: 'Santorini Island Getaway',
    shortDescription: 'Relax in the stunning Greek islands',
    description: 'Escape to the romantic island of Santorini with its iconic white-washed buildings, stunning sunsets, and crystal-clear waters. Enjoy wine tastings, explore ancient ruins, and relax on unique volcanic beaches.',
    price: 1099,
    duration: 6,
    difficulty: 'easy',
    maxGroupSize: 12,
    ratingsAverage: 4.8,
    ratingsQuantity: 203,
    imageCover: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&h=600&fit=crop'
    ],
    startLocation: {
      address: 'Santorini, Greece',
      coordinates: [25.4615, 36.3932]
    },
    highlights: [
      'Famous Oia sunset views',
      'Wine tasting tours',
      'Ancient Akrotiri ruins',
      'Volcanic beach exploration',
      'Traditional Greek cuisine',
      'Catamaran sailing trip'
    ],
    included: [
      'Accommodation',
      'Airport transfers',
      'Some meals',
      'Wine tastings',
      'Guided tours',
      'Sunset cruise'
    ],
    excluded: [
      'International flights',
      'Travel insurance',
      'Personal expenses',
      'Most meals',
      'Optional activities'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Paradise',
        description: 'Arrive in Santorini and settle into your accommodation.',
        meals: ['Welcome Dinner'],
        accommodation: 'Sunset Villa'
      },
      {
        day: 2,
        title: 'Oia Exploration',
        description: 'Explore the famous village of Oia and watch the sunset.',
        meals: ['Breakfast'],
        accommodation: 'Sunset Villa'
      }
    ],
    bestTimeToVisit: 'April to October for warm weather, May to September for swimming',
    physicalRequirements: 'Minimal - mostly relaxed activities with some walking'
  },
  {
    id: '6',
    name: 'Morocco Desert Safari',
    shortDescription: 'Experience the magic of the Sahara Desert',
    description: 'Journey through the imperial cities of Morocco and into the vast Sahara Desert. Experience camel trekking, spend nights under the stars, and explore ancient kasbahs in this exotic North African adventure.',
    price: 1399,
    duration: 9,
    difficulty: 'moderate',
    maxGroupSize: 8,
    ratingsAverage: 4.7,
    ratingsQuantity: 76,
    imageCover: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1489749798305-4fea3ae436d0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1508433957232-3107f5fd5995?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1539650116574-75c0c6d73273?w=800&h=600&fit=crop'
    ],
    startLocation: {
      address: 'Marrakech, Morocco',
      coordinates: [-7.9811, 31.6295]
    },
    highlights: [
      'Camel trekking in Sahara',
      'Desert camping experience',
      'Marrakech souks exploration',
      'Atlas Mountains visit',
      'Traditional Berber culture',
      'Historic kasbahs tour'
    ],
    included: [
      'All accommodation',
      'Desert camp experience',
      'Camel trekking',
      'All transportation',
      'Local guides',
      'Most meals'
    ],
    excluded: [
      'International flights',
      'Travel insurance',
      'Tips and gratuities',
      'Personal expenses',
      'Alcoholic beverages'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Marrakech Arrival',
        description: 'Arrive in the red city and explore the famous Jemaa el-Fnaa square.',
        meals: ['Dinner'],
        accommodation: 'Riad Marrakech'
      },
      {
        day: 2,
        title: 'Atlas Mountains',
        description: 'Journey through the High Atlas Mountains to the desert.',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Mountain Lodge'
      }
    ],
    bestTimeToVisit: 'October to April for pleasant temperatures, avoid summer heat',
    physicalRequirements: 'Moderate fitness for camel riding and desert conditions'
  }
]

export function getTourById(id: string): Tour | undefined {
  return tours.find(tour => tour.id === id)
}
