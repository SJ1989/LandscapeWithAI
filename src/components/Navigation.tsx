
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🌿</span>
            </div>
            <span className="text-xl font-bold text-gray-900">LandscapeAI</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-emerald-600 transition-colors">Features</a>
            <a href="#showcase" className="text-gray-600 hover:text-emerald-600 transition-colors">Gallery</a>
            <a href="#pricing" className="text-gray-600 hover:text-emerald-600 transition-colors">Pricing</a>
            <a href="#testimonials" className="text-gray-600 hover:text-emerald-600 transition-colors">Reviews</a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-600 hover:text-emerald-600">
              Log In
            </Button>
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white">
              Start Designing
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
