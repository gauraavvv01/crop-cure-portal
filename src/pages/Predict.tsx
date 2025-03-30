
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud, AlertCircle, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

// Mock disease classes that would be in your TensorFlow model
const diseaseClasses = [
  "Healthy",
  "Bacterial Leaf Blight",
  "Brown Spot",
  "Leaf Smut",
  "Blast",
  "Hispa",
  "Tungro",
  "Bacterial Leaf Streak",
  "Narrow Brown Spot",
  "False Smut",
];

const Predict = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<{
    predicted: string;
    confidence: number;
    recommendations?: string;
  } | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      return;
    }

    const file = e.target.files[0];
    
    // Validate file type
    if (!file.type.match('image.*')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPEG, PNG)",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedFile(file);
    setResult(null);
  };

  const handlePredict = () => {
    if (!selectedFile) return;
    
    setIsLoading(true);
    
    // Simulate model prediction (this would be replaced with actual TensorFlow.js code)
    setTimeout(() => {
      // Generate a random prediction for demo purposes
      const randomIndex = Math.floor(Math.random() * diseaseClasses.length);
      const predictedClass = diseaseClasses[randomIndex];
      const confidence = Math.random() * 0.3 + 0.7; // Random confidence between 70-100%
      
      let recommendations = "";
      if (predictedClass === "Healthy") {
        recommendations = "Your crop appears healthy. Continue with your current care routine.";
      } else if (predictedClass === "Bacterial Leaf Blight") {
        recommendations = "Consider using copper-based bactericides and ensure proper drainage.";
      } else if (predictedClass === "Brown Spot") {
        recommendations = "Apply fungicides containing propiconazole or azoxystrobin. Ensure balanced nutrition.";
      } else {
        recommendations = "Consult with a local agricultural expert for treatment options.";
      }
      
      setResult({
        predicted: predictedClass,
        confidence: confidence * 100,
        recommendations,
      });
      
      setIsLoading(false);
    }, 2000);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Crop Disease Detection</h1>
          <p className="text-muted-foreground mt-1">
            Upload an image of your crop to identify potential diseases
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
              <CardDescription>
                Select a clear image of the affected crop area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                className={`border-2 border-dashed rounded-lg p-6 text-center ${
                  preview ? "" : "hover:bg-muted/50 cursor-pointer"
                }`}
                onClick={() => {
                  if (!preview && !isLoading) {
                    document.getElementById("file-upload")?.click();
                  }
                }}
              >
                {preview ? (
                  <div className="flex flex-col items-center">
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="max-h-[300px] max-w-full object-contain mb-4" 
                    />
                    <Button 
                      variant="outline" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReset();
                      }}
                      disabled={isLoading}
                    >
                      Choose Different Image
                    </Button>
                  </div>
                ) : (
                  <div className="py-12">
                    <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-sm font-medium">
                      Drag and drop an image, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Supports JPG, PNG (max 5MB)
                    </p>
                  </div>
                )}
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/png"
                  onChange={handleFileChange}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                onClick={handlePredict} 
                disabled={!selectedFile || isLoading}
              >
                {isLoading ? "Analyzing..." : "Analyze Image"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
              <CardDescription>
                AI-powered disease detection results
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="py-12 flex flex-col items-center">
                  <div className="mb-4">Analyzing your image...</div>
                  <Progress value={45} className="w-3/4 mb-2" />
                  <div className="text-xs text-muted-foreground">
                    Processing with AI model
                  </div>
                </div>
              ) : result ? (
                <div className="py-4">
                  <div className="flex items-center mb-6">
                    {result.predicted === "Healthy" ? (
                      <CheckCircle2 className="h-10 w-10 text-green-500 mr-4" />
                    ) : (
                      <AlertCircle className="h-10 w-10 text-amber-500 mr-4" />
                    )}
                    <div>
                      <h3 className="text-xl font-medium">
                        {result.predicted}
                      </h3>
                      <div className="text-sm text-muted-foreground">
                        Confidence: {result.confidence.toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Recommendations</h4>
                      <p className="text-sm">{result.recommendations}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-muted-foreground">
                  Upload and analyze an image to see results
                </div>
              )}
            </CardContent>
            {result && (
              <CardFooter className="justify-end">
                <Button 
                  variant="outline"
                  onClick={() => {
                    // Save result logic would go here in a real app
                    toast({
                      title: "Result saved",
                      description: "The analysis has been saved to your history",
                    });
                  }}
                >
                  Save Result
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Predict;
