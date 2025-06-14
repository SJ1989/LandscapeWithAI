
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UploadedImage, DesignStyle } from "@/pages/Workspace";

interface StyleSelectorProps {
  uploadedImage: UploadedImage;
  onStyleSelect: (style: DesignStyle) => void;
}

const designStyles: DesignStyle[] = [
  {
    id: "zen-garden-1",
    name: "Peaceful Zen",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
    category: "Zen Garden"
  },
  {
    id: "zen-garden-2",
    name: "Bamboo Serenity",
    thumbnail: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=300&h=200&fit=crop",
    category: "Zen Garden"
  },
  {
    id: "tropical-1",
    name: "Tropical Paradise",
    thumbnail: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=300&h=200&fit=crop",
    category: "Tropical Retreat"
  },
  {
    id: "tropical-2",
    name: "Palm Oasis",
    thumbnail: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=300&h=200&fit=crop",
    category: "Tropical Retreat"
  },
  {
    id: "minimalist-1",
    name: "Clean Lines",
    thumbnail: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop",
    category: "Minimalist Patio"
  },
  {
    id: "minimalist-2",
    name: "Modern Simplicity",
    thumbnail: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=300&h=200&fit=crop",
    category: "Minimalist Patio"
  },
  {
    id: "desert-1",
    name: "Desert Escape",
    thumbnail: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop",
    category: "Desert Xeriscape"
  },
  {
    id: "desert-2",
    name: "Cactus Garden",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
    category: "Desert Xeriscape"
  }
];

const categories = ["All", "Zen Garden", "Tropical Retreat", "Minimalist Patio", "Desert Xeriscape"];

export const StyleSelector = ({ uploadedImage, onStyleSelect }: StyleSelectorProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredStyles = selectedCategory === "All" 
    ? designStyles 
    : designStyles.filter(style => style.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Choose Your Design Style
        </h2>
        <p className="text-gray-600">
          Select a landscape style that matches your vision. We'll apply it to your uploaded image.
        </p>
      </div>

      {/* Your uploaded image preview */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Your Uploaded Image</h3>
          <div className="flex justify-center">
            <img
              src={uploadedImage.url}
              alt="Your yard"
              className="max-w-md rounded-lg shadow-lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className={`cursor-pointer px-4 py-2 text-sm ${
              selectedCategory === category
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Style grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredStyles.map((style) => (
          <Card
            key={style.id}
            className="cursor-pointer transition-all hover:shadow-lg hover:scale-105"
            onClick={() => onStyleSelect(style)}
          >
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={style.thumbnail}
                  alt={style.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-white/90 text-gray-700">
                    {style.category}
                  </Badge>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{style.name}</h3>
                <p className="text-sm text-gray-500 mt-1">Click to apply this style</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
