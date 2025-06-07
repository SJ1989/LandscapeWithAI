
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Save, Copy } from "lucide-react";
import { DesignStyle } from "@/pages/Workspace";

interface DesignPreviewProps {
  beforeImage: string;
  afterImage: string | null;
  isGenerating: boolean;
  selectedStyle: DesignStyle;
}

export const DesignPreview = ({ 
  beforeImage, 
  afterImage, 
  isGenerating, 
  selectedStyle 
}: DesignPreviewProps) => {
  const handleSave = () => {
    console.log("Saving design...");
  };

  const handleDownload = () => {
    if (afterImage) {
      const link = document.createElement('a');
      link.href = afterImage;
      link.download = 'landscape-design.jpg';
      link.click();
    }
  };

  const handleCreateVersion = () => {
    console.log("Creating new version...");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Design Preview: {selectedStyle.name}</span>
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                variant="outline"
                size="sm"
                disabled={!afterImage}
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button
                onClick={handleDownload}
                variant="outline"
                size="sm"
                disabled={!afterImage}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                onClick={handleCreateVersion}
                variant="outline"
                size="sm"
                disabled={!afterImage}
              >
                <Copy className="w-4 h-4 mr-2" />
                New Version
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isGenerating ? (
            <div className="flex items-center justify-center h-80 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Generating Your Design
                </h3>
                <p className="text-gray-600">
                  Our AI is creating a beautiful {selectedStyle.name} transformation...
                </p>
              </div>
            </div>
          ) : afterImage ? (
            <BeforeAfterSlider
              beforeImage={beforeImage}
              afterImage={afterImage}
              beforeLabel="Original"
              afterLabel="AI Generated"
            />
          ) : (
            <div className="flex items-center justify-center h-80 bg-gray-100 rounded-lg">
              <p className="text-gray-500">No design generated yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {afterImage && (
        <Card>
          <CardHeader>
            <CardTitle>Style Applied: {selectedStyle.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <img
                src={selectedStyle.thumbnail}
                alt={selectedStyle.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h4 className="font-semibold">{selectedStyle.name}</h4>
                <p className="text-sm text-gray-600">{selectedStyle.category}</p>
                <p className="text-sm text-emerald-600 mt-1">✓ Successfully applied</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
