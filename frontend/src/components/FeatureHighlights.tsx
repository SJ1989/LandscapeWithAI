
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: "📸",
    title: "Upload Your Photo",
    description: "Simply drag and drop or upload a photo of your yard to get started instantly."
  },
  {
    icon: "🎨",
    title: "Choose Design Style",
    description: "Pick from curated landscape styles including Zen, Tropical, Modern, and more."
  },
  {
    icon: "✏️",
    title: "Edit with AI",
    description: "Use natural language to modify designs: 'Add a stone path' or 'More colorful flowers'."
  },
  {
    icon: "💾",
    title: "Download & Share",
    description: "Save high-resolution images, create multiple versions, and share with contractors."
  }
];

export const FeatureHighlights = () => {
  return (
    <section id="features" className="py-20 px-6 bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600">
            Transform your landscape in four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={feature.title} className="p-8 text-center bg-white hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
              <div className="mt-4 text-sm font-medium text-emerald-600">
                Step {index + 1}
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm">
            <span>⚡</span>
            <span>Average transformation time: 30 seconds</span>
          </div>
        </div>
      </div>
    </section>
  );
};
