
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { NavBar } from "@/components/NavBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Guide = () => {
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
          <h1 className="text-3xl font-bold">Crop Disease Guide</h1>
          <p className="text-muted-foreground mt-1">
            Learn about common crop diseases and their treatments
          </p>
        </div>

        <Tabs defaultValue="rice" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="rice">Rice</TabsTrigger>
            <TabsTrigger value="wheat">Wheat</TabsTrigger>
            <TabsTrigger value="corn">Corn</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rice">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Bacterial Leaf Blight</CardTitle>
                  <CardDescription>Xanthomonas oryzae pv. oryzae</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Bacterial leaf blight is a destructive bacterial disease of rice. It causes wilting of seedlings and yellowing and drying of leaves.
                  </p>
                  <h4 className="font-medium mb-2">Symptoms:</h4>
                  <ul className="list-disc pl-5 mb-4 space-y-1">
                    <li>Water-soaked lesions on leaf margins</li>
                    <li>Lesions turn yellow to white as they develop</li>
                    <li>Leaves dry out and die</li>
                  </ul>
                  <h4 className="font-medium mb-2">Treatment:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Use resistant varieties</li>
                    <li>Apply copper-based bactericides</li>
                    <li>Maintain field hygiene</li>
                    <li>Ensure proper drainage</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Brown Spot</CardTitle>
                  <CardDescription>Cochliobolus miyabeanus</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Brown spot is a fungal disease that affects rice plants at all growth stages. It is one of the most prevalent rice diseases.
                  </p>
                  <h4 className="font-medium mb-2">Symptoms:</h4>
                  <ul className="list-disc pl-5 mb-4 space-y-1">
                    <li>Circular to oval brown lesions</li>
                    <li>Lesions have gray centers and dark brown margins</li>
                    <li>Seedling blight if infection occurs early</li>
                  </ul>
                  <h4 className="font-medium mb-2">Treatment:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Use fungicides containing propiconazole or azoxystrobin</li>
                    <li>Ensure balanced nutrition (especially potassium)</li>
                    <li>Use disease-free seeds</li>
                    <li>Proper spacing of plants for good air circulation</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="wheat">
            <div className="text-center p-12 text-muted-foreground">
              Wheat disease information will be added soon.
            </div>
          </TabsContent>
          
          <TabsContent value="corn">
            <div className="text-center p-12 text-muted-foreground">
              Corn disease information will be added soon.
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Guide;
