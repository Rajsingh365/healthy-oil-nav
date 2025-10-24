import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Heart, Brain, Flame, Shield } from "lucide-react";

const educationalContent = [
  {
    icon: Heart,
    title: "Why too much oil harms your heart ❤️",
    description: "Excessive oil consumption can lead to cholesterol buildup and increase heart disease risk.",
    fullContent: "When we consume too much oil, especially saturated and trans fats, it can lead to the buildup of cholesterol in our arteries. This increases the risk of heart disease, stroke, and other cardiovascular problems. By reducing oil intake and choosing healthier oils like mustard or olive oil, we can significantly improve our heart health and overall wellbeing.",
  },
  {
    icon: Brain,
    title: "Better oils for brain health 🧠",
    description: "Some oils contain omega-3 fatty acids that support cognitive function and memory.",
    fullContent: "Oils rich in omega-3 fatty acids, such as flaxseed oil and fish oil, are excellent for brain health. These healthy fats support cognitive function, improve memory, and may reduce the risk of neurodegenerative diseases. Incorporating these oils in moderation while reducing overall oil consumption can lead to better mental clarity and brain health.",
  },
  {
    icon: Flame,
    title: "Smart cooking reduces oil absorption 🔥",
    description: "The way you cook can significantly impact how much oil your food absorbs.",
    fullContent: "Cooking methods matter! Deep frying absorbs the most oil, while steaming, grilling, or air frying use much less. When you must use oil, heat your pan properly before adding food - this creates a seal that prevents excessive absorption. Also, avoid reusing cooking oil as it breaks down and becomes harmful with repeated heating.",
  },
  {
    icon: Shield,
    title: "Choosing the right oil matters 🛡️",
    description: "Not all oils are created equal - some are healthier than others for Indian cooking.",
    fullContent: "For Indian cooking, mustard oil, rice bran oil, and groundnut oil are excellent choices. They have high smoke points suitable for our cooking methods and contain beneficial nutrients. Avoid palm oil and coconut oil in excess as they're high in saturated fats. Always check for cold-pressed or expeller-pressed labels for the most nutritious options.",
  },
];

const Learn = () => {
  return (
    <MobileLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Learn About Healthy Oils 📚</h1>
          <p className="text-muted-foreground">
            Discover tips and facts about cooking with less oil
          </p>
        </div>

        <div className="grid gap-4">
          {educationalContent.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {item.description}
                  </CardDescription>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full">
                        Read More
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[90vw] rounded-lg">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Icon className="h-5 w-5 text-primary" />
                          {item.title}
                        </DialogTitle>
                      </DialogHeader>
                      <DialogDescription className="text-foreground leading-relaxed">
                        {item.fullContent}
                      </DialogDescription>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 p-6">
          <div className="space-y-2 text-center">
            <p className="text-2xl">💡</p>
            <p className="font-semibold text-foreground">Did you know?</p>
            <p className="text-sm text-muted-foreground">
              Reducing oil intake by just 10ml per day can save over 3.6 liters of oil per year!
            </p>
          </div>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default Learn;
