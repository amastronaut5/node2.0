"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Upload,
  Users,
  Eye,
  ChefHat,
  Home,
  Stethoscope,
  HeartHandshake,
  Trophy,
  Heart,
  MessageCircle,
  Plus,
  LogIn,
  UserPlus,
  Clock,
  Camera,
  Shield,
} from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  isGuest?: boolean
}

interface IntelPost {
  id: string
  author: string
  authorId: string
  timeAgo: string
  title: string
  image: string
  characterAnalysis?: {
    trustworthiness: number
    personalityTraits: string[]
    appearance: string[]
    observedBehavior: string[]
    marriageProspect?: number
    verdict: string
  }
  comments: Comment[]
  likes: number
  isLiked: boolean
  location: string
}

interface Comment {
  id: string
  author: string
  authorId: string
  content: string
  timeAgo: string
  likes: number
  isLiked: boolean
  type: "gossip" | "warning" | "info" | "recommendation"
}

interface Recipe {
  id: string
  name: string
  ingredients: string[]
  method: string
  traditionalTips: string
  author: string
  authorId: string
  region: string
  difficulty: "Easy" | "Medium" | "Hard"
  cookingTime: string
  likes: number
  isLiked: boolean
  comments: Comment[]
}

interface HouseholdTip {
  id: string
  problem: string
  solution: string
  author: string
  effectiveness: number
  category: "Cleaning" | "Organization" | "Maintenance" | "Kitchen" | "Laundry"
}

interface MedicalTip {
  id: string
  ailment: string
  remedy: string
  ingredients: string[]
  preparation: string
  author: string
  region: string
  caution?: string
}

interface MatrimonialProfile {
  id: string
  name: string
  age: number
  profession: string
  education: string
  family: string
  qualities: string[]
  compatibility: string[]
  auntyRating: number
  region: string
}

interface SharmaJiKaBeta {
  name: string
  age: number
  achievements: string[]
  currentStatus: string
  parentExpectations: string[]
  realityCheck: string
  auntyVerdict: string
  comparisonPoints: string[]
}

const getLocationData = (location: string) => {
  const locationDataMap: Record<string, any> = {
    "Koramangala, Bangalore": {
      posts: [
        {
          id: 1,
          author: "Priya Aunty",
          time: "2 hours ago",
          title: "New family moved in next door",
          image: "/indian-neighborhood-street-scene.jpg",
          characterAnalysis: {
            trustworthiness: 8,
            traits: ["Well-educated", "Family-oriented", "Respectful"],
            appearance: ["Well-dressed", "Clean", "Professional look"],
            behavior: ["Polite to neighbors", "Maintains property well", "Children are disciplined"],
            marriageProspect: 9,
            verdict:
              "Good family! The type you want in your building. Husband looks like software engineer, wife has that doctor confidence. Children are well-behaved - definitely good upbringing.",
          },
          intel: [
            {
              author: "Sunita Aunty",
              type: "gossip",
              time: "1 hour ago",
              content: "They have a BMW! Must be very well-off. The husband works in IT, wife is a doctor.",
              likes: 12,
              location: "Block A",
            },
            {
              author: "Kamala Aunty",
              type: "info",
              time: "45 mins ago",
              content: "They have a small child, around 5 years old. Very well-behaved, says namaste to everyone.",
              likes: 8,
            },
            {
              author: "Meera Aunty",
              type: "recommendation",
              time: "30 mins ago",
              content: "Should invite them for Ganesh Chaturthi. They seem like nice people.",
              likes: 15,
            },
          ],
        },
        {
          id: 2,
          author: "Rajesh Uncle",
          time: "4 hours ago",
          title: "Suspicious person near building entrance",
          image: "/suspicious-person-near-building.jpg",
          characterAnalysis: {
            trustworthiness: 3,
            traits: ["Shifty", "Evasive", "Suspicious"],
            appearance: ["Unkempt", "Avoiding eye contact", "Cheap clothes"],
            behavior: ["Looking around nervously", "Asking too many questions", "No proper ID"],
            marriageProspect: 1,
            verdict:
              "Very suspicious! Something is not right about this person. The way he was looking at our building and asking which flats are empty - definitely up to no good. Better inform security.",
          },
          intel: [
            {
              author: "Geeta Aunty",
              type: "warning",
              time: "3 hours ago",
              content: "I saw him yesterday too! He was asking about which flats are empty. Very suspicious.",
              likes: 20,
              location: "Main Gate",
            },
            {
              author: "Sharma Uncle",
              type: "info",
              time: "2 hours ago",
              content: "Security guard says he is from courier company, but no uniform. Better to be careful.",
              likes: 18,
            },
          ],
        },
      ],
      recipes: [
        {
          id: 1,
          title: "Mysore Pak",
          author: "Lakshmi Aunty",
          time: "1 day ago",
          content: "Secret is to use pure ghee and cook on low flame. My grandmother's 100-year-old recipe!",
          likes: 45,
          comments: 12,
        },
        {
          id: 2,
          title: "Bisi Bele Bath",
          author: "Radha Aunty",
          time: "2 days ago",
          content: "Add extra sambar powder and roast the rice well. Pressure cook for exactly 3 whistles!",
          likes: 38,
          comments: 8,
        },
      ],
      medical: [
        {
          id: 1,
          title: "Turmeric milk for cold",
          author: "Dr. Sita Aunty",
          time: "3 hours ago",
          content: "Boil milk with turmeric, black pepper, and jaggery. Drink before bed for quick relief.",
          likes: 67,
          comments: 15,
        },
        {
          id: 2,
          title: "Neem leaves for skin",
          author: "Kamala Aunty",
          time: "1 day ago",
          content: "Boil neem leaves, cool the water and use for face wash. Works better than expensive creams!",
          likes: 52,
          comments: 9,
        },
      ],
    },
    "Bandra, Mumbai": {
      posts: [
        {
          id: 1,
          author: "Meera Tai",
          time: "1 hour ago",
          title: "New Bollywood actor spotted at cafe",
          image: "/indian-neighborhood-street-scene.jpg",
          characterAnalysis: {
            trustworthiness: 7,
            traits: ["Charming", "Well-groomed", "Confident"],
            appearance: ["Designer clothes", "Expensive watch", "Gym-fit"],
            behavior: ["Polite to staff", "Takes selfies with fans", "Tips well"],
            marriageProspect: 8,
            verdict:
              "Looks like a good boy from film industry. Well-mannered, respects elders. But you know how these film people are - here today, gone tomorrow!",
          },
          intel: [
            {
              author: "Priya Tai",
              type: "gossip",
              time: "45 mins ago",
              content: "He was with a girl! Looked like his girlfriend. Very pretty, must be from films too.",
              likes: 28,
              location: "Linking Road",
            },
            {
              author: "Rohit Uncle",
              type: "info",
              time: "30 mins ago",
              content: "My friend works in his building. Says he's very down to earth, always says namaste.",
              likes: 22,
            },
          ],
        },
      ],
      recipes: [
        {
          id: 1,
          title: "Vada Pav Chutney",
          author: "Sushma Tai",
          time: "2 hours ago",
          content: "Dry garlic chutney with red chilies and coconut. The secret ingredient is hing!",
          likes: 89,
          comments: 23,
        },
        {
          id: 2,
          title: "Bombay Duck Curry",
          author: "Mangala Aunty",
          time: "1 day ago",
          content: "Fresh bombil from Sassoon Dock. Cook with kokum and coconut milk. Perfect with rice!",
          likes: 67,
          comments: 18,
        },
      ],
      medical: [
        {
          id: 1,
          title: "Kokum for acidity",
          author: "Dr. Shanti Tai",
          time: "4 hours ago",
          content: "Soak kokum in water overnight. Drink the water in morning for instant acidity relief.",
          likes: 78,
          comments: 19,
        },
        {
          id: 2,
          title: "Sea breeze therapy",
          author: "Lata Aunty",
          time: "2 days ago",
          content: "Walk on Bandstand early morning. The sea air cures half the diseases naturally!",
          likes: 45,
          comments: 12,
        },
      ],
    },
    "CP, Delhi": {
      posts: [
        {
          id: 1,
          author: "Sharma Aunty",
          time: "3 hours ago",
          title: "Government officer's son creating nuisance",
          image: "/suspicious-person-near-building.jpg",
          characterAnalysis: {
            trustworthiness: 4,
            traits: ["Arrogant", "Spoiled", "Entitled"],
            appearance: ["Expensive clothes", "Multiple gold chains", "Branded shoes"],
            behavior: ["Rude to security", "Loud music at night", "Parks anywhere"],
            marriageProspect: 2,
            verdict:
              "Typical babu ka beta! All show, no substance. Parents have spoiled him completely. Any girl who marries him will suffer!",
          },
          intel: [
            {
              author: "Gupta Uncle",
              type: "warning",
              time: "2 hours ago",
              content: "His father is in PWD. Uses government car for personal work. Someone should complain!",
              likes: 34,
              location: "Block C",
            },
            {
              author: "Sita Aunty",
              type: "gossip",
              time: "1 hour ago",
              content: "I heard he failed his CA exam third time. Now father is trying to get him government job.",
              likes: 41,
            },
          ],
        },
      ],
      recipes: [
        {
          id: 1,
          title: "Chole Bhature",
          author: "Pinky Aunty",
          time: "5 hours ago",
          content: "Soak chana overnight. Add tea bags while boiling for dark color. Secret is in the masala!",
          likes: 156,
          comments: 34,
        },
        {
          id: 2,
          title: "Rajma Chawal",
          author: "Neetu Aunty",
          time: "1 day ago",
          content: "Kashmiri rajma is the best. Cook with whole garam masala and finish with cream.",
          likes: 98,
          comments: 21,
        },
      ],
      medical: [
        {
          id: 1,
          title: "Pollution remedy",
          author: "Dr. Agarwal",
          time: "6 hours ago",
          content: "Drink tulsi and ginger tea twice daily. Helps fight Delhi pollution naturally.",
          likes: 123,
          comments: 28,
        },
        {
          id: 2,
          title: "Winter joint pain",
          author: "Kamla Devi",
          time: "1 day ago",
          content: "Heat mustard oil with garlic. Massage on joints before bath. Works like magic!",
          likes: 87,
          comments: 16,
        },
      ],
    },
    "Chinatown, Singapore": {
      posts: [
        {
          id: 1,
          author: "Lata Aunty",
          time: "2 hours ago",
          title: "Indian family struggling with local customs",
          image: "/indian-neighborhood-street-scene.jpg",
          characterAnalysis: {
            trustworthiness: 9,
            traits: ["Hardworking", "Respectful", "Adaptive"],
            appearance: ["Simple clothes", "Clean", "Professional"],
            behavior: ["Learning local language", "Follows rules strictly", "Kids study hard"],
            marriageProspect: 9,
            verdict:
              "Very good family! Came here for better future. Working hard, kids are brilliant in studies. The type of people who make our community proud abroad!",
          },
          intel: [
            {
              author: "Ravi Uncle",
              type: "recommendation",
              time: "1 hour ago",
              content: "We should help them settle. I can teach them about local banking and schools.",
              likes: 18,
              location: "Temple Street",
            },
            {
              author: "Priya Aunty",
              type: "info",
              time: "45 mins ago",
              content: "The husband works in IT, wife is learning Mandarin. Very dedicated people.",
              likes: 15,
            },
          ],
        },
      ],
      recipes: [
        {
          id: 1,
          title: "Singapore-style Curry",
          author: "Meena Aunty",
          time: "4 hours ago",
          content: "Indian curry adapted for local taste. Less spicy, more coconut milk. Kids love it!",
          likes: 67,
          comments: 14,
        },
        {
          id: 2,
          title: "Fusion Roti Prata",
          author: "Sita Aunty",
          time: "1 day ago",
          content: "Make roti with local flour. Serve with curry and sambal. Best of both worlds!",
          likes: 45,
          comments: 9,
        },
      ],
      medical: [
        {
          id: 1,
          title: "Humidity skin care",
          author: "Dr. Lakshmi",
          time: "3 hours ago",
          content: "Use neem face pack twice a week. Singapore humidity needs extra care for skin.",
          likes: 56,
          comments: 12,
        },
        {
          id: 2,
          title: "Homesickness remedy",
          author: "Kamala Aunty",
          time: "2 days ago",
          content: "Video call family daily. Cook Indian food on weekends. Join local Indian community!",
          likes: 78,
          comments: 23,
        },
      ],
    },
    "Jackson Heights, New York": {
      posts: [
        {
          id: 1,
          author: "Sunita Aunty",
          time: "4 hours ago",
          title: "Desi boy showing off his Tesla",
          image: "/suspicious-person-near-building.jpg",
          characterAnalysis: {
            trustworthiness: 6,
            traits: ["Show-off", "Ambitious", "Tech-savvy"],
            appearance: ["Designer clothes", "Apple Watch", "Expensive sneakers"],
            behavior: ["Posts on social media constantly", "Name-drops companies", "Ignores elders"],
            marriageProspect: 5,
            verdict:
              "Typical NRI boy! Good job, good money, but has forgotten Indian values. Parents back home think he's perfect, but we know the reality!",
          },
          intel: [
            {
              author: "Raj Uncle",
              type: "gossip",
              time: "3 hours ago",
              content: "Works at Google but acts like he owns the company. Never helps community events.",
              likes: 29,
              location: "74th Street",
            },
            {
              author: "Kavita Aunty",
              type: "warning",
              time: "2 hours ago",
              content: "My friend's daughter went on date with him. Says he only talks about work and money.",
              likes: 35,
            },
          ],
        },
      ],
      recipes: [
        {
          id: 1,
          title: "American-Indian Fusion Tacos",
          author: "Ritu Aunty",
          time: "6 hours ago",
          content: "Roti with tandoori chicken and mint chutney. Kids love it, husband approves!",
          likes: 89,
          comments: 19,
        },
        {
          id: 2,
          title: "Quinoa Khichdi",
          author: "Priya Aunty",
          time: "1 day ago",
          content: "Healthy version for American lifestyle. Add turmeric and ghee for Indian taste.",
          likes: 67,
          comments: 15,
        },
      ],
      medical: [
        {
          id: 1,
          title: "Winter depression remedy",
          author: "Dr. Sharma",
          time: "5 hours ago",
          content: "Vitamin D supplements and morning sunlight. NYC winters are tough on desi people.",
          likes: 98,
          comments: 22,
        },
        {
          id: 2,
          title: "Stress from work culture",
          author: "Meera Aunty",
          time: "2 days ago",
          content: "Practice yoga and meditation. American work stress needs Indian solutions!",
          likes: 76,
          comments: 18,
        },
      ],
    },
  }

  return locationDataMap[location] || locationDataMap["Koramangala, Bangalore"]
}

const AuntyNetworkApp = () => {
  const [selectedLocation, setSelectedLocation] = useState("Koramangala, Bangalore")
  const [activeTab, setActiveTab] = useState("intel")
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [showPostDialog, setShowPostDialog] = useState(false)
  const [newPostImage, setNewPostImage] = useState<string | null>(null)
  const [newPostTitle, setNewPostTitle] = useState("")

  const [intelPosts, setIntelPosts] = useState<IntelPost[]>([
    {
      id: "1",
      author: "Priya Aunty",
      authorId: "priya123",
      timeAgo: "2 hours ago",
      title: "New family moved in next door",
      image: "/indian-neighborhood-street-scene.jpg",
      characterAnalysis: {
        trustworthiness: 8,
        personalityTraits: ["Well-educated", "Family-oriented", "Respectful"],
        appearance: ["Well-dressed", "Clean", "Professional look"],
        observedBehavior: ["Polite to neighbors", "Maintains property well", "Children are disciplined"],
        marriageProspect: 9,
        verdict:
          "Good family! The type you want in your building. Husband looks like software engineer, wife has that doctor confidence. Children are well-behaved - definitely good upbringing.",
      },
      comments: [
        {
          id: "c1",
          author: "Sunita Aunty",
          authorId: "sunita456",
          content: "They have a BMW! Must be very well-off. The husband works in IT, wife is a doctor.",
          timeAgo: "1 hour ago",
          likes: 12,
          isLiked: false,
          type: "gossip",
        },
        {
          id: "c2",
          author: "Kamala Aunty",
          authorId: "kamala789",
          content: "They have a small child, around 5 years old. Very well-behaved, says namaste to everyone.",
          timeAgo: "45 mins ago",
          likes: 8,
          isLiked: true,
          type: "info",
        },
        {
          id: "c3",
          author: "Meera Aunty",
          authorId: "meera101",
          content: "Should invite them for Ganesh Chaturthi. They seem like nice people.",
          timeAgo: "30 mins ago",
          likes: 15,
          isLiked: false,
          type: "recommendation",
        },
      ],
      likes: 24,
      isLiked: true,
      location: "Block A",
    },
    {
      id: "2",
      author: "Rajesh Uncle",
      authorId: "rajesh456",
      timeAgo: "4 hours ago",
      title: "Suspicious person near building entrance",
      image: "/suspicious-person-near-building.jpg",
      characterAnalysis: {
        trustworthiness: 3,
        personalityTraits: ["Shifty", "Evasive", "Suspicious"],
        appearance: ["Unkempt", "Avoiding eye contact", "Cheap clothes"],
        observedBehavior: ["Looking around nervously", "Asking too many questions", "No proper ID"],
        verdict:
          "Very suspicious! Something is not right about this person. The way he was looking at our building and asking which flats are empty - definitely up to no good. Better inform security.",
      },
      comments: [
        {
          id: "c4",
          author: "Geeta Aunty",
          authorId: "geeta789",
          content: "I saw him yesterday too! He was asking about which flats are empty. Very suspicious.",
          timeAgo: "3 hours ago",
          likes: 20,
          isLiked: true,
          type: "warning",
        },
        {
          id: "c5",
          author: "Sharma Uncle",
          authorId: "sharma123",
          content: "Security guard says he is from courier company, but no uniform. Better to be careful.",
          timeAgo: "2 hours ago",
          likes: 18,
          isLiked: false,
          type: "info",
        },
      ],
      likes: 31,
      isLiked: false,
      location: "Main Gate",
    },
  ])

  const [description, setDescription] = useState("")
  const [photoIntels, setPhotoIntels] = useState<any[]>([])

  // ... existing state ...

  const locationData = getLocationData(selectedLocation)

  const locations = [
    "Koramangala, Bangalore",
    "Bandra, Mumbai",
    "CP, Delhi",
    "Park Street, Kolkata",
    "Anna Nagar, Chennai",
    "Jubilee Hills, Hyderabad",
    "Satellite, Ahmedabad",
    "Chinatown, Singapore",
    "Jackson Heights, New York",
    "Southall, London",
    "Little Italy, Toronto",
    "Brick Lane, London",
  ]

  const recipes: Recipe[] = [
    {
      id: "1",
      name: "Nani's Secret Rajma",
      ingredients: ["2 cups rajma", "1 large onion", "3 tomatoes", "Ginger-garlic paste", "Garam masala"],
      method: "Soak rajma overnight. Pressure cook for 6 whistles. Make masala separately with onions and tomatoes.",
      traditionalTips:
        "Add a pinch of hing while pressure cooking. Never add salt while boiling rajma - it won't cook properly!",
      author: "Sudha Aunty",
      authorId: "sudha123",
      region: "Punjab",
      difficulty: "Medium",
      cookingTime: "2 hours",
      likes: 15,
      isLiked: false,
      comments: [],
    },
    {
      id: "2",
      name: "Authentic Sambar",
      ingredients: ["Toor dal", "Drumsticks", "Okra", "Tomatoes", "Sambar powder", "Tamarind"],
      method: "Cook dal separately. Prepare vegetables. Mix tamarind water with sambar powder.",
      traditionalTips: "Roast sambar powder at home for best taste. Add curry leaves at the end for aroma.",
      author: "Lakshmi Aunty",
      authorId: "lakshmi456",
      region: "Tamil Nadu",
      difficulty: "Hard",
      cookingTime: "1.5 hours",
      likes: 22,
      isLiked: true,
      comments: [],
    },
  ]

  const householdTips: HouseholdTip[] = [
    {
      id: "1",
      problem: "Stubborn stains on white clothes",
      solution: "Mix lemon juice with salt, rub on stain, leave for 30 minutes, then wash normally",
      author: "Meera Aunty",
      effectiveness: 9,
      category: "Laundry",
    },
    {
      id: "2",
      problem: "Ants in kitchen",
      solution: "Draw chalk lines around ant entry points. They won't cross chalk lines!",
      author: "Priya Aunty",
      effectiveness: 8,
      category: "Kitchen",
    },
  ]

  const medicalTips: MedicalTip[] = [
    {
      id: "1",
      ailment: "Common Cold",
      remedy: "Kadha (Herbal Tea)",
      ingredients: ["Ginger", "Tulsi leaves", "Black pepper", "Honey", "Turmeric"],
      preparation: "Boil all ingredients except honey for 10 minutes. Add honey after cooling slightly.",
      author: "Kamala Aunty",
      region: "Rajasthan",
      caution: "Consult doctor if fever persists beyond 3 days",
    },
    {
      id: "2",
      ailment: "Acidity",
      remedy: "Jeera Water",
      ingredients: ["Cumin seeds", "Water"],
      preparation: "Soak 1 tsp cumin seeds overnight. Drink the water on empty stomach.",
      author: "Sunita Aunty",
      region: "Gujarat",
    },
  ]

  const matrimonialProfiles: MatrimonialProfile[] = [
    {
      id: "1",
      name: "Rahul Sharma",
      age: 28,
      profession: "Software Engineer at Google",
      education: "IIT Delhi, MS from Stanford",
      family: "Well-settled, father is retired bank manager",
      qualities: ["Respectful", "Family-oriented", "Good salary", "No bad habits"],
      compatibility: ["Homely girl", "Good cook", "Respects elders", "Working is optional"],
      auntyRating: 9,
      region: "Delhi",
    },
    {
      id: "2",
      name: "Priya Patel",
      age: 25,
      profession: "Doctor",
      education: "MBBS from AIIMS",
      family: "Traditional Gujarati family, owns textile business",
      qualities: ["Beautiful", "Educated", "Good family", "Knows cooking"],
      compatibility: ["Well-educated boy", "Stable job", "Joint family okay", "Vegetarian"],
      auntyRating: 10,
      region: "Ahmedabad",
    },
  ]

  const sharmaJiKaBeta: SharmaJiKaBeta = {
    name: "Arjun Sharma",
    age: 24,
    achievements: [
      "AIR 1 in JEE Advanced",
      "Gold Medal in IIT Bombay",
      "Job offer from Microsoft with 50 LPA package",
      "Published 3 research papers",
      "Plays violin and speaks 4 languages",
    ],
    currentStatus: "Working at Microsoft, preparing for MBA from IIM Ahmedabad",
    parentExpectations: [
      "Should get married by 26",
      "Wife should be doctor or engineer",
      "Must give them 2 grandchildren",
      "Should buy house in same society",
      "Must visit parents every weekend",
    ],
    realityCheck:
      "Actually a normal guy who just wants to play video games and eat maggi, but parents have turned him into neighborhood legend",
    auntyVerdict:
      "Perfect boy! But poor thing, so much pressure from parents. Any girl who marries him will have to compete with his mother's expectations.",
    comparisonPoints: [
      "Studies: 10/10 - Makes other parents cry",
      "Behavior: 9/10 - Very respectful, touches everyone's feet",
      "Career: 10/10 - Microsoft job at 24!",
      "Looks: 7/10 - Decent, wears glasses",
      "Marriage Material: 8/10 - Good boy but mama's boy tendencies",
    ],
  }

  const handleGoogleLogin = () => {
    // Mock Google login
    setCurrentUser({
      id: "user123",
      name: "Priya Sharma",
      email: "priya@gmail.com",
    })
    setShowAuthDialog(false)
  }

  const handleGuestLogin = () => {
    setCurrentUser({
      id: "guest" + Date.now(),
      name: "Guest User",
      email: "",
      isGuest: true,
    })
    setShowAuthDialog(false)
  }

  const handleLogout = () => {
    setCurrentUser(null)
  }

  const toggleLike = (postId: string, isComment?: boolean, commentId?: string) => {
    if (isComment && commentId) {
      setIntelPosts((posts) =>
        posts.map((post) => ({
          ...post,
          comments: post.comments.map((comment) =>
            comment.id === commentId
              ? {
                  ...comment,
                  isLiked: !comment.isLiked,
                  likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
                }
              : comment,
          ),
        })),
      )
    } else {
      setIntelPosts((posts) =>
        posts.map((post) =>
          post.id === postId
            ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
            : post,
        ),
      )
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewPostImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmitPost = () => {
    if (newPostImage && newPostTitle && currentUser) {
      const newPost: IntelPost = {
        id: Date.now().toString(),
        author: currentUser.name,
        authorId: currentUser.id,
        timeAgo: "Just now",
        title: newPostTitle,
        image: newPostImage,
        comments: [],
        likes: 0,
        isLiked: false,
        location: selectedLocation,
      }
      setIntelPosts([newPost, ...intelPosts])
      setNewPostImage(null)
      setNewPostTitle("")
      setShowPostDialog(false)
    }
  }

  const getCommentTypeColor = (type: string) => {
    switch (type) {
      case "gossip":
        return "bg-pink-100 text-pink-800"
      case "warning":
        return "bg-red-100 text-red-800"
      case "info":
        return "bg-blue-100 text-blue-800"
      case "recommendation":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderIntelTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-amber-800">Neighborhood Intel</h2>
        <Button onClick={() => setShowPostDialog(true)} className="bg-amber-600 hover:bg-amber-700">
          <Plus className="w-4 h-4 mr-2" />
          Share Something Interesting
        </Button>
      </div>

      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 flex justify-center flex-col items-center">
        <div className="flex items-center gap-2 mb-2 justify-center">
          <Camera className="w-5 h-5 text-amber-600" />
          <span className="font-medium text-amber-800">Upload a photo</span>
        </div>
        <p className="text-amber-700 text-sm">Share what you saw in the neighborhood</p>
      </div>

      <div className="space-y-6">
        {locationData.posts.map((post: any) => (
          <div key={post.id} className="bg-white rounded-lg border border-amber-200 overflow-hidden">
            <div className="p-4 border-b border-amber-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center font-bold text-amber-800">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{post.author}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.time}
                  </p>
                </div>
              </div>
              <h4 className="mt-3 text-lg font-medium text-gray-900">{post.title}</h4>
            </div>

            <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-64 object-cover" />

            <div className="p-4 bg-amber-50 border-b border-amber-200">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-amber-600" />
                <h4 className="font-semibold text-amber-800">Aunty Network Character Analysis</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-4 h-4 text-amber-600" />
                    <span className="font-medium text-gray-700">Trustworthiness Score</span>
                    <span
                      className={`px-2 py-1 rounded text-sm font-bold ${
                        post.characterAnalysis.trustworthiness >= 7
                          ? "bg-green-100 text-green-800"
                          : post.characterAnalysis.trustworthiness >= 4
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {post.characterAnalysis.trustworthiness}/10
                    </span>
                  </div>

                  <div className="mb-3">
                    <h5 className="font-medium text-gray-700 mb-1">Personality Traits</h5>
                    <div className="flex flex-wrap gap-1">
                      {post.characterAnalysis.traits.map((trait: string, index: number) => (
                        <span key={index} className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-sm">
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <h5 className="font-medium text-gray-700 mb-1">Appearance</h5>
                    <div className="flex flex-wrap gap-1">
                      {post.characterAnalysis.appearance.map((item: string, index: number) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-3">
                    <h5 className="font-medium text-gray-700 mb-1">Observed Behavior</h5>
                    <div className="flex flex-wrap gap-1">
                      {post.characterAnalysis.behavior.map((behavior: string, index: number) => (
                        <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm">
                          {behavior}
                        </span>
                      ))}
                    </div>
                  </div>

                  {post.characterAnalysis.marriageProspect && (
                    <div className="flex items-center gap-2 mb-3">
                      <Heart className="w-4 h-4 text-pink-600" />
                      <span className="font-medium text-gray-700">Marriage Prospect</span>
                      <span
                        className={`px-2 py-1 rounded text-sm font-bold ${
                          post.characterAnalysis.marriageProspect >= 7
                            ? "bg-pink-100 text-pink-800"
                            : post.characterAnalysis.marriageProspect >= 4
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {post.characterAnalysis.marriageProspect}/10
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <p className="font-medium text-yellow-800 mb-1">Aunty Network Verdict:</p>
                <p className="text-yellow-700 italic">"{post.characterAnalysis.verdict}"</p>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-5 h-5 text-gray-600" />
                <h4 className="font-semibold text-gray-800 focus">Aunty Network Intel ({post.intel.length})</h4>
              </div>

              <div className="space-y-3">
                {post.intel.map((intel: any, index: number) => (
                  <div key={index} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center font-bold text-amber-800 text-sm">
                      {intel.author.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">{intel.author}</span>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            intel.type === "gossip"
                              ? "bg-pink-100 text-pink-800"
                              : intel.type === "warning"
                                ? "bg-red-100 text-red-800"
                                : intel.type === "recommendation"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {intel.type}
                        </span>
                        <span className="text-xs text-gray-500">{intel.time}</span>
                        {intel.location && <span className="text-xs text-gray-500">• {intel.location}</span>}
                      </div>
                      <p className="text-gray-700 text-sm mb-2">{intel.content}</p>
                      <button className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm">
                        <Heart className="w-4 h-4" />
                        {intel.likes}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full mt-4 border-amber-300 text-amber-700 hover:bg-amber-50 bg-transparent"
              >
                Add Intel
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderRecipesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-green-800">Traditional Recipes</h2>
        <Button onClick={() => setShowPostDialog(true)} className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Share Recipe
        </Button>
      </div>

      <div className="grid gap-4">
        {locationData.recipes.map((recipe: any) => (
          <div key={recipe.id} className="bg-white p-6 rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">{recipe.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{recipe.author}</span>
                <span>{recipe.time}</span>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{recipe.content}</p>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 text-red-500 hover:text-red-600">
                <Heart className="w-4 h-4" />
                {recipe.likes}
              </button>
              <button className="flex items-center gap-1 text-blue-500 hover:text-blue-600">
                <MessageCircle className="w-4 h-4" />
                {recipe.comments} comments
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderMedicalTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-blue-800">Traditional Medical Help</h2>
        <Button onClick={() => setShowPostDialog(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Share Remedy
        </Button>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="text-blue-800 text-sm">
          <strong>Disclaimer:</strong> These are traditional home remedies shared by community members. Always consult a
          qualified doctor for serious health issues.
        </p>
      </div>

      <div className="grid gap-4">
        {locationData.medical.map((remedy: any) => (
          <div key={remedy.id} className="bg-white p-6 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">{remedy.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{remedy.author}</span>
                <span>{remedy.time}</span>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{remedy.content}</p>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 text-red-500 hover:text-red-600">
                <Heart className="w-4 h-4" />
                {remedy.likes}
              </button>
              <button className="flex items-center gap-1 text-blue-500 hover:text-blue-600">
                <MessageCircle className="w-4 h-4" />
                {remedy.comments} comments
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Aunty Network</h1>
                <p className="text-sm text-muted-foreground">Your global neighborhood intelligence network</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="india-header" disabled className="font-semibold text-amber-600">
                    🇮🇳 India
                  </SelectItem>
                  {locations.slice(0, 7).map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                  <SelectItem value="international-header" disabled className="font-semibold text-blue-600">
                    🌍 International Aunty Communities
                  </SelectItem>
                  {locations.slice(7).map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {currentUser ? (
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{currentUser.name}</span>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setShowAuthDialog(true)}>
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="intel" className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>Intel</span>
            </TabsTrigger>
            <TabsTrigger value="recipes" className="flex items-center space-x-2">
              <ChefHat className="h-4 w-4" />
              <span>Recipes</span>
            </TabsTrigger>
            <TabsTrigger value="household" className="flex items-center space-x-2">
              <Home className="h-4 w-4" />
              <span>Household</span>
            </TabsTrigger>
            <TabsTrigger value="medical" className="flex items-center space-x-2">
              <Stethoscope className="h-4 w-4" />
              <span>Medical</span>
            </TabsTrigger>
            <TabsTrigger value="matrimonial" className="flex items-center space-x-2">
              <HeartHandshake className="h-4 w-4" />
              <span>Matrimonial</span>
            </TabsTrigger>
            <TabsTrigger value="sharma" className="flex items-center space-x-2">
              <Trophy className="h-4 w-4" />
              <span>Sharma Ji Ka Beta</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="intel">{renderIntelTab()}</TabsContent>

          <TabsContent value="recipes">{renderRecipesTab()}</TabsContent>

          <TabsContent value="household">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Household Jugaad & Solutions</h2>
                <Button>
                  <Home className="h-4 w-4 mr-2" />
                  Share Tip
                </Button>
              </div>

              <div className="grid gap-4">
                {householdTips.map((tip) => (
                  <Card key={tip.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">Problem: {tip.problem}</h3>
                          <p className="text-sm text-muted-foreground mb-2">By {tip.author}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{tip.category}</Badge>
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            {tip.effectiveness}/10 effective
                          </Badge>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-1">Solution:</h4>
                        <p className="text-sm text-blue-700">{tip.solution}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="medical">{renderMedicalTab()}</TabsContent>

          <TabsContent value="matrimonial">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Matrimonial Matches & Compatibility</h2>
                <Button>
                  <HeartHandshake className="h-4 w-4 mr-2" />
                  Add Profile
                </Button>
              </div>

              <div className="grid gap-6">
                {matrimonialProfiles.map((profile) => (
                  <Card key={profile.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl">
                            {profile.name}, {profile.age}
                          </CardTitle>
                          <p className="text-muted-foreground">{profile.profession}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{profile.region}</Badge>
                          <Badge variant="default" className="bg-pink-100 text-pink-800">
                            Aunty Rating: {profile.auntyRating}/10
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Education & Family:</h4>
                          <p className="text-sm text-muted-foreground mb-2">{profile.education}</p>
                          <p className="text-sm text-muted-foreground">{profile.family}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Qualities:</h4>
                          <div className="flex flex-wrap gap-1">
                            {profile.qualities.map((quality, index) => (
                              <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                                {quality}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Looking for:</h4>
                        <div className="flex flex-wrap gap-1">
                          {profile.compatibility.map((trait, index) => (
                            <Badge key={index} variant="outline" className="border-pink-200 text-pink-700">
                              {trait}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sharma">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">The Legendary Sharma Ji Ka Beta</h2>
                <p className="text-muted-foreground">
                  The ultimate benchmark every parent uses to torture their children
                </p>
              </div>

              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl text-amber-800">{sharmaJiKaBeta.name}</CardTitle>
                      <p className="text-amber-600">Age: {sharmaJiKaBeta.age} | The Golden Child</p>
                    </div>
                    <Trophy className="h-12 w-12 text-yellow-500" />
                  </div>
                </CardHeader>

                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                      Legendary Achievements
                    </h3>
                    <div className="grid gap-2">
                      {sharmaJiKaBeta.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center space-x-2 bg-green-50 p-2 rounded">
                          <Badge variant="default" className="bg-green-600">
                            #{index + 1}
                          </Badge>
                          <span className="text-sm text-green-800">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Current Status</h3>
                      <p className="text-sm text-muted-foreground bg-blue-50 p-3 rounded">
                        {sharmaJiKaBeta.currentStatus}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Parent Expectations</h3>
                      <div className="space-y-1">
                        {sharmaJiKaBeta.parentExpectations.map((expectation, index) => (
                          <div key={index} className="text-sm text-red-600 bg-red-50 p-2 rounded">
                            • {expectation}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Reality Check</h3>
                    <p className="text-sm text-muted-foreground bg-yellow-50 p-3 rounded italic">
                      {sharmaJiKaBeta.realityCheck}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Detailed Analysis</h3>
                    <div className="grid gap-2">
                      {sharmaJiKaBeta.comparisonPoints.map((point, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                          <span className="text-sm font-medium">{point.split(":")[0]}:</span>
                          <span className="text-sm text-muted-foreground">{point.split(":")[1]}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-amber-800 mb-2">Final Aunty Network Verdict</h3>
                    <p className="text-sm text-amber-700 italic">"{sharmaJiKaBeta.auntyVerdict}"</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join the Aunty Network</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Button onClick={handleGoogleLogin} className="w-full">
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>
            <Button variant="outline" onClick={handleGuestLogin} className="w-full bg-transparent">
              <UserPlus className="h-4 w-4 mr-2" />
              Continue as Guest
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showPostDialog} onOpenChange={setShowPostDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Something Interesting</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="What did you see? (e.g., New family moved in, Suspicious person, etc.)"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
            />

            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              {newPostImage ? (
                <div className="space-y-4">
                  <img
                    src={newPostImage || "/placeholder.svg"}
                    alt="Selected"
                    className="max-h-64 mx-auto rounded-lg object-cover"
                  />
                  <Button variant="outline" onClick={() => setNewPostImage(null)}>
                    Change Photo
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                  <div>
                    <p className="text-lg font-medium">Upload a photo</p>
                    <p className="text-sm text-muted-foreground">Share what you saw in the neighborhood</p>
                  </div>
                  <Input type="file" accept="image/*" onChange={handleImageUpload} className="max-w-xs mx-auto" />
                </div>
              )}
            </div>

            <Button onClick={handleSubmitPost} className="w-full" disabled={!newPostImage || !newPostTitle.trim()}>
              Share with Network
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AuntyNetworkApp
