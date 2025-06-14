
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Homeowner",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
    quote: "Saved me $2,000 in design fees! The AI suggestions were spot-on and my backyard looks amazing.",
    rating: 5
  },
  {
    name: "Mike Chen",
    role: "Property Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    quote: "I use this for all my staging projects. Clients love seeing the before/after possibilities.",
    rating: 5
  },
  {
    name: "Emma Davis",
    role: "Garden Enthusiast",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    quote: "The natural language editing is incredible. I just type what I want and it happens!",
    rating: 5
  }
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Loved by Homeowners & Professionals
          </h2>
          <p className="text-xl text-gray-600">
            See what our users are saying about their landscape transformations
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="p-8 bg-gradient-to-br from-white to-emerald-50 border-emerald-100">
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>

              <blockquote className="text-gray-700 italic leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
