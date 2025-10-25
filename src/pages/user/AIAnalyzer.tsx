import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Sparkles, CheckCircle, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AIAnalyzer = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isLogged, setIsLogged] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const healthTips = [
    "Try using less oil while frying!",
    // "Consider steaming or grilling instead!",
    // "Use non-stick cookware to reduce oil needs!",
    // "Try air-frying for crispy results with less oil!",
    // "Add vegetables to reduce oil absorption!",
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysisResult(null);
        setIsLogged(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const simulateAIAnalysis = () => {
    setIsAnalyzing(true);

    // Simulate AI processing time
    setTimeout(() => {
      const estimatedOil = Math.floor(Math.random() * 40) + 20; // 20-60ml
      const randomTip =
        healthTips[Math.floor(Math.random() * healthTips.length)];

      setAnalysisResult({
        oilContent: estimatedOil,
        tip: randomTip,
        confidence: Math.floor(Math.random() * 20) + 80, // 80-100%
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleLogMeal = () => {
    setIsLogged(true);
    // In a real app, this would update the daily summary
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
    setIsLogged(false);
  };

  return (
    <MobileLayout>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">🤖 AI Oil Intake Analyzer</h1>
          <p className="text-muted-foreground">
            Upload a photo of your meal for instant oil content analysis
          </p>
        </div>

        {/* Image Upload Section */}
        {!selectedImage ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8 text-center border-2 border-dashed border-muted-foreground/25">
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Camera className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Capture Your Meal
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Take a photo or upload an image of your meal
                  </p>
                </div>
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={handleCameraClick}
                    className="flex items-center gap-2"
                  >
                    <Camera className="h-4 w-4" />
                    Take Photo
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCameraClick}
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Upload
                  </Button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-4">
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={selectedImage}
                    alt="Meal"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetAnalysis}
                    className="absolute top-2 right-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>

                {!analysisResult && !isAnalyzing && (
                  <Button
                    onClick={simulateAIAnalysis}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Analyze with AI
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Loading Animation */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6 text-center">
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                    <Sparkles className="h-8 w-8 text-white animate-spin" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Analyzing Your Meal...
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Our AI is examining the oil content in your food
                    </p>
                  </div>

                  {/* Shimmer Effect */}
                  <div className="space-y-2">
                    <div className="h-2 bg-muted rounded animate-pulse"></div>
                    <div className="h-2 bg-muted rounded animate-pulse w-3/4 mx-auto"></div>
                    <div className="h-2 bg-muted rounded animate-pulse w-1/2 mx-auto"></div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Analysis Result */}
        <AnimatePresence>
          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200 dark:border-green-800">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-3">
                      <CheckCircle className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">
                      Analysis Complete!
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                        {analysisResult.oilContent}ml 🍳
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Estimated Oil Content
                      </p>
                    </div>

                    <div className="p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                      <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">
                        💡 Health Tip:
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        {analysisResult.tip}
                      </p>
                    </div>

                    <div className="text-center text-xs text-muted-foreground">
                      Confidence: {analysisResult.confidence}%
                    </div>
                  </div>

                  {!isLogged ? (
                    <Button
                      onClick={handleLogMeal}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Log Meal
                    </Button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center"
                    >
                      <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                        <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-green-700 dark:text-green-300">
                          Meal logged successfully!
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Redirecting to home...
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <div className="text-center space-y-2">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300">
                🤖 How it works
              </h4>
              <p className="text-sm text-muted-foreground">
                Our AI analyzes your meal photos to estimate oil content and
                provides personalized health tips for better cooking habits.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </MobileLayout>
  );
};

export default AIAnalyzer;
