
import { useState } from "react";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";

const designCategories = [
  {
    name: "Zen Garden",
    designs: [
      { id: 1, before: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop", after: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop" },
      { id: 2, before: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=300&h=200&fit=crop", after: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=300&h=200&fit=crop" },
      { id: 3, before: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=300&h=200&fit=crop", after: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=300&h=200&fit=crop" },
    ]
  },
  {
    name: "Tropical Retreat",
    designs: [
      { id: 4, before: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop", after: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop" },
      { id: 5, before: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop", after: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=300&h=200&fit=crop" },
      { id: 6, before: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=300&h=200&fit=crop", after: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=300&h=200&fit=crop" },
    ]
  },
  {
    name: "Modern Minimalist",
    designs: [
      { id: 7, before: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=300&h=200&fit=crop", after: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop" },
      { id: 8, before: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=300&h=200&fit=crop", after: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop" },
      { id: 9, before: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=300&h=200&fit=crop", after: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=300&h=200&fit=crop" },
    ]
  }
];

export const DesignShowcase = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="showcase" className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Stunning Design Transformations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our AI-generated landscape designs across different styles. 
            Each transformation is just one click away.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-full p-2 flex space-x-2">
            {designCategories.map((category, index) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(index)}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeCategory === index
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Design Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {designCategories[activeCategory].designs.map((design) => (
            <div key={design.id} className="rounded-xl overflow-hidden shadow-lg">
              <BeforeAfterSlider 
                beforeImage={design.before}
                afterImage={design.after}
                beforeLabel="Before"
                afterLabel="After"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
