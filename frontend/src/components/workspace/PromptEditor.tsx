
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Send, Mic, RotateCcw } from "lucide-react";
import { PromptEdit } from "@/pages/Workspace";

interface PromptEditorProps {
  onPromptSubmit: (prompt: string) => void;
  promptHistory: PromptEdit[];
  onRevert: (edit: PromptEdit) => void;
}

export const PromptEditor = ({ 
  onPromptSubmit, 
  promptHistory, 
  onRevert 
}: PromptEditorProps) => {
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = () => {
    if (prompt.trim()) {
      setIsProcessing(true);
      onPromptSubmit(prompt.trim());
      setPrompt("");
      setTimeout(() => setIsProcessing(false), 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      {/* Prompt Input */}
      <Card>
        <CardHeader>
          <CardTitle>Edit with Natural Language</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., Add a stone path on the right side, include more colorful flowers, make the lawn greener..."
            className="min-h-[100px]"
            disabled={isProcessing}
          />
          
          <div className="flex gap-2">
            <Button
              onClick={handleSubmit}
              disabled={!prompt.trim() || isProcessing}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 flex-1"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Apply Prompt
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
            >
              <Mic className="w-4 h-4" />
            </Button>
          </div>

          <p className="text-sm text-gray-500">
            Tip: Press Ctrl+Enter to submit quickly
          </p>
        </CardContent>
      </Card>

      {/* Prompt History */}
      {promptHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Edit History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {promptHistory.map((edit) => (
                <div
                  key={edit.id}
                  className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        "{edit.prompt}"
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {formatTime(edit.timestamp)}
                        </Badge>
                        {edit.resultImage && (
                          <Badge variant="outline" className="text-xs text-emerald-600">
                            ✓ Applied
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {edit.resultImage && (
                      <Button
                        onClick={() => onRevert(edit)}
                        variant="ghost"
                        size="sm"
                        className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                      >
                        <RotateCcw className="w-3 h-3 mr-1" />
                        Revert
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[
              "Add more flowers",
              "Include a water feature",
              "Make it more colorful",
              "Add outdoor seating",
              "Include stone pathways",
              "Add more trees"
            ].map((suggestion) => (
              <Badge
                key={suggestion}
                variant="outline"
                className="cursor-pointer hover:bg-emerald-50 hover:border-emerald-300"
                onClick={() => setPrompt(suggestion)}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
