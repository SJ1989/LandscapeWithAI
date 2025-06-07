
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { ImageUpload } from "@/components/workspace/ImageUpload";
import { StyleSelector } from "@/components/workspace/StyleSelector";
import { DesignPreview } from "@/components/workspace/DesignPreview";
import { PromptEditor } from "@/components/workspace/PromptEditor";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export interface UploadedImage {
  file: File;
  url: string;
}

export interface DesignStyle {
  id: string;
  name: string;
  thumbnail: string;
  category: string;
}

export interface PromptEdit {
  id: string;
  prompt: string;
  timestamp: Date;
  resultImage?: string;
}

const Workspace = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<DesignStyle | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [promptHistory, setPromptHistory] = useState<PromptEdit[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleImageUpload = (image: UploadedImage) => {
    setUploadedImage(image);
    setCurrentStep(2);
  };

  const handleStyleSelect = (style: DesignStyle) => {
    setSelectedStyle(style);
    setCurrentStep(3);
    // Simulate AI generation
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedImage("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop");
      setIsGenerating(false);
    }, 2000);
  };

  const handlePromptSubmit = (prompt: string) => {
    const newEdit: PromptEdit = {
      id: Date.now().toString(),
      prompt,
      timestamp: new Date(),
      resultImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&h=400&fit=crop"
    };
    setPromptHistory([newEdit, ...promptHistory]);
    setGeneratedImage(newEdit.resultImage!);
  };

  const handleRevert = (edit: PromptEdit) => {
    if (edit.resultImage) {
      setGeneratedImage(edit.resultImage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Navigation />
      
      <div className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button 
              variant="ghost" 
              className="mr-4"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Design Workspace</h1>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step 
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white" 
                    : "bg-gray-200 text-gray-600"
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? "bg-emerald-500" : "bg-gray-200"
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          {currentStep === 1 && (
            <ImageUpload onImageUpload={handleImageUpload} />
          )}

          {currentStep === 2 && uploadedImage && (
            <StyleSelector 
              uploadedImage={uploadedImage} 
              onStyleSelect={handleStyleSelect}
            />
          )}

          {currentStep === 3 && uploadedImage && selectedStyle && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <DesignPreview
                  beforeImage={uploadedImage.url}
                  afterImage={generatedImage}
                  isGenerating={isGenerating}
                  selectedStyle={selectedStyle}
                />
              </div>
              <div>
                <PromptEditor
                  onPromptSubmit={handlePromptSubmit}
                  promptHistory={promptHistory}
                  onRevert={handleRevert}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Workspace;
