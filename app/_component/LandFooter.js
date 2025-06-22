import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, MapPin, Mail, Phone } from "lucide-react"

function FoodDeliveryFooter({ categories = defaultCategories, infoLinks = defaultInfoLinks }) {
  return (
    <footer className="bg-black w-full flex flex-col items-center pt-12 pb-6 text-white">
      {/* Logo and tagline */}
      <div className="w-full max-w-[1400px] px-4 md:px-6 mb-10 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-orange-500 p-2 rounded-full">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 6V2M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 22V18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 9C14.4 8.4 13.2 8 12 8C10.8 8 9.6 8.4 9 9"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold">FoodExpress</h1>
          </div>
          <p className="text-orange-200 text-sm">Delicious food delivered to your doorstep</p>
        </div>
        <div className="flex gap-4">
          <Link href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
            <Facebook size={20} className="text-white" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
            <Instagram size={20} className="text-white" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
            <Twitter size={20} className="text-white" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
            <Youtube size={20} className="text-white" />
            <span className="sr-only">YouTube</span>
          </Link>
        </div>
      </div>

      {/* Popular Categories */}
      <div className="w-full max-w-[1400px] px-4 md:px-6 border-b border-orange-800 pb-8">
        <h2 className="text-xl font-bold mb-6 text-orange-200">Popular Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categories.map((item, key) => (
            <div key={key} className="min-w-[160px]">
              <h3 className="text-orange-300 font-medium mb-3">{item.title}</h3>
              <div className="flex flex-col gap-2">
                {item.Tags.map((tag, index) => (
                  <Link
                    key={index}
                    href={`/category/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-gray-200 text-sm hover:text-orange-400 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Links and App Buttons */}
      <div className="w-full max-w-[1400px] px-4 md:px-6 flex flex-col md:flex-row justify-between items-start mt-8 gap-8">
        {/* Info Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 w-full md:w-auto">
          {infoLinks.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-orange-200 font-bold text-lg mb-4">{section.title}</h2>
              <ul className="flex flex-col gap-3">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-gray-200 hover:text-orange-400 text-sm flex items-center gap-2 transition-colors"
                    >
                      {link.icon && <span>{link.icon}</span>}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* App Store Buttons */}
        <div className="flex flex-col gap-4 w-full md:w-auto">
          <h2 className="text-orange-200 font-bold text-lg mb-2">Get Our App</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#" className="inline-block transform hover:scale-105 transition-transform">
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                className="h-12"
              />
            </a>
            <a href="#" className="inline-block transform hover:scale-105 transition-transform">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-12"
              />
            </a>
          </div>
          <div className="mt-6 bg-orange-800/30 p-4 rounded-lg">
            <h3 className="text-orange-200 font-medium mb-2 text-sm">Subscribe to our newsletter</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 bg-white/10 rounded-l-md text-sm flex-grow focus:outline-none focus:ring-1 focus:ring-orange-400"
              />
              <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-r-md text-white text-sm font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright and Bottom Links */}
      <div className="w-full max-w-[1400px] px-4 md:px-6 mt-12 pt-6 border-t border-orange-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-orange-200/80 text-sm">© {new Date().getFullYear()} FoodExpress. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/terms" className="text-orange-200/80 hover:text-orange-200 text-sm">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-orange-200/80 hover:text-orange-200 text-sm">
            Privacy Policy
          </Link>
          <Link href="/cookies" className="text-orange-200/80 hover:text-orange-200 text-sm">
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  )
}

// Default data for the component
const defaultCategories = [
  {
    title: "Cuisines",
    Tags: ["Italian", "Chinese", "Indian", "Mexican", "Japanese"],
  },
  {
    title: "Meal Types",
    Tags: ["Breakfast", "Lunch", "Dinner", "Desserts", "Snacks"],
  },
  {
    title: "Dietary",
    Tags: ["Vegetarian", "Vegan", "Gluten-Free", "Keto", "Paleo"],
  },
  {
    title: "Popular Dishes",
    Tags: ["Pizza", "Burgers", "Sushi", "Tacos", "Pasta"],
  },
  {
    title: "Quick Options",
    Tags: ["Under 30 min", "Free Delivery", "Highly Rated", "New", "Deals"],
  },
]

const defaultInfoLinks = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Press", href: "/press" },
      { label: "Partner with us", href: "/partners" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Safety", href: "/safety" },
      { label: "FAQs", href: "/faqs" },
      { label: "Contact Us", href: "/contact" },
      { label: "Community Guidelines", href: "/guidelines" },
    ],
  },
  {
    title: "Contact",
    links: [
      {
        label: "123 Food Street, City",
        href: "#",
        icon: <MapPin size={16} />,
      },
      {
        label: "support@foodexpress.com",
        href: "mailto:support@foodexpress.com",
        icon: <Mail size={16} />,
      },
      {
        label: "(555) 123-4567",
        href: "tel:+15551234567",
        icon: <Phone size={16} />,
      },
    ],
  },
]

export default FoodDeliveryFooter
