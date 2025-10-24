import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle, Mail, Phone, ArrowLeft } from "lucide-react";

const Help = () => {
  const faqs = [
    {
      question: "How do I log my oil usage?",
      answer:
        "Go to the Tracker tab and tap the '+' button. Enter the amount of oil used and the type of cooking. Your entry will be saved automatically.",
    },
    {
      question: "How are points calculated?",
      answer:
        "You earn points by logging usage daily, meeting weekly goals, and reducing consumption. Each achievement unlocks different point rewards.",
    },
    {
      question: "Can I track for multiple family members?",
      answer:
        "Yes! You can add family members in Profile settings and log usage separately for each person.",
    },
    {
      question: "What is the recommended oil intake?",
      answer:
        "Health experts recommend 3-4 liters of cooking oil per month for a family of 4. The app helps you stay within healthy limits.",
    },
    {
      question: "How do I change my goal?",
      answer:
        "Navigate to Settings > Goals to adjust your monthly target based on your family size and preferences.",
    },
  ];

  return (
    <MobileLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Help & Support</h1>
        </div>

        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <h2 className="font-semibold mb-2">Need assistance?</h2>
          <p className="text-sm text-muted-foreground">
            Check our FAQs below or contact our support team. We're here to
            help!
          </p>
        </Card>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>
          <Card>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger className="px-4 text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Contact Support</h2>
          <div className="grid gap-3">
            <Card className="p-4 flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-full">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Live Chat</p>
                <p className="text-xs text-muted-foreground">
                  Available 9 AM - 9 PM IST
                </p>
              </div>
            </Card>
            <Card className="p-4 flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-full">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Email Support</p>
                <p className="text-xs text-muted-foreground">
                  support@healthyoil.app
                </p>
              </div>
            </Card>
            <Card className="p-4 flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-full">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Phone Support</p>
                <p className="text-xs text-muted-foreground">
                  1800-123-4567 (Toll-free)
                </p>
              </div>
            </Card>
          </div>
        </div>

        <Card className="p-5">
          <h3 className="font-semibold mb-3">Quick Tips</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Log your usage immediately after cooking for accuracy</li>
            <li>• Check your weekly reports to identify patterns</li>
            <li>• Set realistic goals based on your family size</li>
            <li>• Earn rewards by maintaining consistent tracking</li>
          </ul>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default Help;
