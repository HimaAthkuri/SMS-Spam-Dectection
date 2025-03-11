"use client";

import { useState } from "react";
import { 
  MessageSquare, 
  Shield, 
  ShieldAlert, 
  Cpu, 
  Globe2, 
  LineChart, 
  AlertTriangle,
  Ban,
  Flag,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const spamTrendsData = [
  { date: "2024-01", spam: 65, ham: 35 },
  { date: "2024-02", spam: 55, ham: 45 },
  { date: "2024-03", spam: 70, ham: 30 },
  { date: "2024-04", spam: 45, ham: 55 },
];

const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "te", label: "Telugu" },
  { value: "hi", label: "Hindi" },
];

export default function Home() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("en");
  const [result, setResult] = useState<null | {
    prediction: string;
    svcConfidence: number;
    catboostConfidence: number;
    combinedConfidence: number;
    features: string[];
    suggestions: string[];
  }>(null);

  const analyzeMessage = async () => {
    setLoading(true);
    // Simulated API call - replace with actual backend integration
    setTimeout(() => {
      const svcConf = Math.random() * 100;
      const catboostConf = Math.random() * 100;
      const avgConfidence = (svcConf + catboostConf) / 2;
      
      setResult({
        prediction: avgConfidence > 50 ? "spam" : "ham",
        svcConfidence: svcConf,
        catboostConfidence: catboostConf,
        combinedConfidence: avgConfidence,
        features: [
          "Contains suspicious URLs",
          "Unusual character patterns",
          "Common spam keywords detected"
        ],
        suggestions: [
          "Block sender",
          "Report as spam",
          "Add to filter list"
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              SMS Spam Detection
            </h1>
            <p className="text-lg text-muted-foreground">
              Using SVC and CatBoost Machine Learning Algorithms
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Enter Message
              </CardTitle>
              <CardDescription>
                Enter the SMS message you want to analyze for spam detection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Globe2 className="h-4 w-4" />
                  Select Language
                </label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Textarea
                placeholder="Type or paste your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[100px] mb-4"
              />
              <Button 
                onClick={analyzeMessage} 
                disabled={!message || loading}
                className="w-full"
              >
                {loading ? "Analyzing..." : "Analyze Message"}
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Tabs defaultValue="results" className="mb-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="results">Results</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
                <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
              </TabsList>
              
              <TabsContent value="results">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Combined Analysis Result
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className={`text-3xl font-bold mb-2 ${
                          result.prediction === "spam" ? "text-red-500" : "text-green-500"
                        }`}>
                          {result.prediction.toUpperCase()}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Combined confidence: {result.combinedConfidence.toFixed(1)}%
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="flex items-center gap-1">
                              <Shield className="h-4 w-4" /> SVC Confidence
                            </span>
                            <span>{result.svcConfidence.toFixed(1)}%</span>
                          </div>
                          <Progress value={result.svcConfidence} />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="flex items-center gap-1">
                              <Cpu className="h-4 w-4" /> CatBoost Confidence
                            </span>
                            <span>{result.catboostConfidence.toFixed(1)}%</span>
                          </div>
                          <Progress value={result.catboostConfidence} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analysis">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Detection Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {result.features.map((feature, index) => (
                        <Alert key={index}>
                          <AlertTitle>Feature {index + 1}</AlertTitle>
                          <AlertDescription>{feature}</AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="suggestions">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShieldAlert className="h-5 w-5" />
                      Recommended Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {result.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="justify-start"
                          onClick={() => console.log(`Action: ${suggestion}`)}
                        >
                          {index === 0 && <Ban className="h-4 w-4 mr-2" />}
                          {index === 1 && <Flag className="h-4 w-4 mr-2" />}
                          {index === 2 && <Filter className="h-4 w-4 mr-2" />}
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="trends">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LineChart className="h-5 w-5" />
                      Spam Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={spamTrendsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Area
                            type="monotone"
                            dataKey="spam"
                            stackId="1"
                            stroke="#ef4444"
                            fill="#ef4444"
                            fillOpacity={0.6}
                            name="Spam"
                          />
                          <Area
                            type="monotone"
                            dataKey="ham"
                            stackId="1"
                            stroke="#22c55e"
                            fill="#22c55e"
                            fillOpacity={0.6}
                            name="Ham"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          <Card>
            <CardHeader>
              <CardTitle>About the Algorithms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold mb-2">Support Vector Classification (SVC)</h3>
                  <p className="text-sm text-muted-foreground">
                    SVC is a powerful supervised learning algorithm that creates an optimal hyperplane to separate different classes in high-dimensional space, making it effective for text classification tasks.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">CatBoost</h3>
                  <p className="text-sm text-muted-foreground">
                    CatBoost is a gradient boosting algorithm that handles categorical features automatically and provides high accuracy while being robust against overfitting.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}