
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { NavBar } from "@/components/NavBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2 } from "lucide-react";

// Mock history data (in a real app this would come from a database)
const mockHistoryData = [
  {
    id: "1",
    date: "2023-06-15",
    cropType: "Rice",
    prediction: "Bacterial Leaf Blight",
    confidence: 92.5,
    imageUrl: "https://placehold.co/100x100/22c55e/FFFFFF/png",
  },
  {
    id: "2",
    date: "2023-06-10",
    cropType: "Wheat",
    prediction: "Healthy",
    confidence: 98.2,
    imageUrl: "https://placehold.co/100x100/22c55e/FFFFFF/png",
  },
  {
    id: "3",
    date: "2023-06-05",
    cropType: "Corn",
    prediction: "Leaf Smut",
    confidence: 85.7,
    imageUrl: "https://placehold.co/100x100/22c55e/FFFFFF/png",
  },
];

const History = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

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
          <h1 className="text-3xl font-bold">Prediction History</h1>
          <p className="text-muted-foreground mt-1">
            View and manage your previous crop disease predictions
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Predictions</CardTitle>
            <CardDescription>Your last crop analyses</CardDescription>
          </CardHeader>
          <CardContent>
            {mockHistoryData.length > 0 ? (
              <div className="divide-y">
                {mockHistoryData.map((item) => (
                  <div key={item.id} className="py-4 flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img 
                        src={item.imageUrl} 
                        alt={item.prediction} 
                        className="h-16 w-16 object-cover rounded-md" 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {item.cropType}
                      </p>
                      <div className="flex items-center mt-1">
                        {item.prediction === "Healthy" ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-amber-500 mr-1" />
                        )}
                        <span className="text-sm">{item.prediction}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Confidence: {item.confidence}%
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.date}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No prediction history available yet
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default History;
