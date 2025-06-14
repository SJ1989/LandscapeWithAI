
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 px-6">
      <div className="container mx-auto">
        {/* CTA Section */}
        <div className="text-center mb-16 py-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Transform Your Landscape?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of homeowners who've already designed their dream yards
          </p>
          <Button 
            size="lg" 
            className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
          >
            Start Designing Now
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🌿</span>
              </div>
              <span className="text-xl font-bold">LandscapeAI</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Transform your outdoor spaces with AI-powered landscape design. 
              Beautiful, professional results in minutes.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gallery</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 LandscapeAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
