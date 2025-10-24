import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type ChatMessage = {
  id: string;
  role: "user" | "coach" | "nudge";
  text: string;
  timestamp: number;
};

const STORAGE_KEY = "healthyoil_coach_chat";
const COACH_NAME = "AarogyaBuddy";

const randomFrom = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const Coach = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const quickReplies = useMemo(
    () => [
      "Suggest a low-oil dinner",
      "How to avoid frying",
      "Healthy snack ideas",
      "Tips to reduce oil",
    ],
    []
  );

  const coachResponses: string[] = [
    "No worries! Maybe try air frying next time 💡",
    "Great job staying aware! Consider steaming today 🫖",
    "Small steps count. Can you reduce a spoon of oil this meal? 🥄",
    "Try mustard oil or olive oil for a healthier swap 🌿",
    "Add vegetables to balance your plate today 🥦",
  ];

  const nudges: string[] = [
    "Try steaming instead of frying today!",
    "Did you drink enough water?",
    "Go for a short walk after meals 🚶",
    "Cook with one spoon less oil today 🥄",
  ];

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      // preload sample conversation
      setMessages([
        {
          id: crypto.randomUUID(),
          role: "coach",
          text: `Hi! I'm ${COACH_NAME} — your friendly health buddy. How can I help today?`,
          timestamp: Date.now(),
        },
        {
          id: crypto.randomUUID(),
          role: "user",
          text: "I ate fried pakoras today 😅",
          timestamp: Date.now(),
        },
        {
          id: crypto.randomUUID(),
          role: "coach",
          text: "No worries, Rajesh! Maybe try air frying next time 💡",
          timestamp: Date.now(),
        },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const playSoftPing = () => {
    try {
      const ctx = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(660, ctx.currentTime);
      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.26);
    } catch {}
  };

  const respond = (prompt: string) => {
    setIsTyping(true);
    // add user message
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "user",
        text: prompt,
        timestamp: Date.now(),
      },
    ]);

    // coach typing delay
    setTimeout(() => {
      const reply = randomFrom(coachResponses);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "coach",
          text: `${reply}`,
          timestamp: Date.now(),
        },
      ]);
      setIsTyping(false);
      playSoftPing();
    }, 900 + Math.random() * 600);
  };

  const send = () => {
    if (!input.trim()) return;
    const txt = input.trim();
    setInput("");
    respond(txt);
  };

  const sendQuick = (q: string) => respond(q);

  // occasional nudge
  useEffect(() => {
    const t = setInterval(() => {
      if (isTyping) return;
      if (Math.random() < 0.25) {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "nudge",
            text: randomFrom(nudges),
            timestamp: Date.now(),
          },
        ]);
        playSoftPing();
      }
    }, 20000);
    return () => clearInterval(t);
  }, [isTyping]);

  return (
    <MobileLayout>
      <div className="flex flex-col h-[calc(100vh-6rem)]">
        {/* header+nav safe area */}
        {/* Header */}
        <div className="px-4 pb-3 pt-1">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">{COACH_NAME}</h1>
              <p className="text-xs text-muted-foreground">
                Your empathetic AI health coach
              </p>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto px-4 space-y-3">
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[78%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : m.role === "nudge"
                      ? "bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200"
                      : "bg-card border border-border"
                  }`}
                >
                  {m.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="bg-card border border-border rounded-2xl px-4 py-2 text-sm shadow-sm">
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 bg-muted-foreground/70 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-muted-foreground/70 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-muted-foreground/70 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={endRef} />
        </div>

        {/* Quick Replies */}
        <div className="px-4 py-2 flex gap-2 overflow-x-auto">
          {quickReplies.map((q) => (
            <Button
              key={q}
              variant="outline"
              size="sm"
              className="whitespace-nowrap"
              onClick={() => sendQuick(q)}
            >
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              {q}
            </Button>
          ))}
        </div>

        {/* Composer */}
        <div className="p-3">
          <Card className="p-2">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") send();
                }}
              />
              <Button onClick={send} disabled={!input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Coach;
