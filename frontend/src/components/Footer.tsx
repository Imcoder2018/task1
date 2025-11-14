import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Link</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/help" className="hover:text-white transition-colors">Help</Link></li>
              <li><Link href="/tours" className="hover:text-white transition-colors">Tours</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/location" className="hover:text-white transition-colors">Our Location</Link></li>
              <li><Link href="/hosts" className="hover:text-white transition-colors">The Hosts</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
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
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button className="bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded-r transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>Copyright ©2024 All rights reserved | This template is made with ❤ by <Link href="#" className="text-teal-500 hover:text-teal-400 transition-colors">Colorlib</Link></p>
        </div>
      </div>
    </footer>
  )
}
