export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">CarpenterPro</h3>
              <p className="text-gray-400">
                Tools and calculators for professional carpenters and furniture makers.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="/calculators" className="text-gray-400 hover:text-white">Calculators</a></li>
                <li><a href="/design" className="text-gray-400 hover:text-white">Design</a></li>
                <li><a href="/pricing" className="text-gray-400 hover:text-white">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">Email: support@carpenterpro.com</li>
                <li className="text-gray-400">Phone: +91 9876543210</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>© {new Date().getFullYear()} CarpenterPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
  }