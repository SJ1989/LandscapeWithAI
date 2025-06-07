
import { Button } from "@/components/ui/button";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-24 pb-12 px-6">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Transform Your{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                  Yard
                </span>{" "}
                with AI
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Upload a photo of your space and apply stunning, editable design templates — instantly. 
                No expensive consultants needed.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 text-lg"
                onClick={() => navigate('/workspace')}
              >
                Start Designing →
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-8 py-4 text-lg"
                onClick={() => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Demo
              </Button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>No design experience needed</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Instant results</span>
              </div>
            </div>
          </div>

          {/* Hero Image - Before/After Slider */}
          <div className="relative">
            <div className="bg-white p-4 rounded-2xl shadow-2xl">
              <BeforeAfterSlider
                beforeImage="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop"
                afterImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
                beforeLabel="Before"
                afterLabel="After"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
