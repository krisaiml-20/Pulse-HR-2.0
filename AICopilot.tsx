import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, User } from "lucide-react";

export default function AICopilot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "I am Pulse AI. I've analyzed 1,470 employee records across 9 departments using our Gradient Boosting model. How can I help you optimize retention today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const chips = [
    "Highest risk departments?",
    "Sales attrition drivers?",
    "Cost of losing high-risk staff?",
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let reply = "Based on our analysis of 1,470 employees using our Gradient Boosting model, I recommend focusing on targeted interventions rather than blanket approaches.";
      const lower = text.toLowerCase();
      
      if (lower.includes("sales") || lower.includes("highest")) {
        reply = "Sales is currently the highest risk department with a 23.1% attrition rate. The primary driver is Overtime Load, with 67% of high-risk Sales employees consistently working >50 hours/week.";
      } else if (lower.includes("cost") || lower.includes("money")) {
        reply = "With 237 high-risk employees and an average replacement cost of 1.5x salary, your current total portfolio risk exposure is approximately $8.2M annually.";
      }

      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col space-y-4">
      <div className="pb-4 border-b border-border flex-shrink-0">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Bot className="text-primary w-6 h-6" /> HR Copilot
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Powered by Pulse AI · Gradient Boosting v2.1</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 flex-shrink-0">
        {chips.map(chip => (
          <button 
            key={chip}
            onClick={() => handleSend(chip)}
            className="px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors whitespace-nowrap"
          >
            {chip}
          </button>
        ))}
      </div>

      <Card className="flex-1 bg-card border-card-border overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-lg p-4 text-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted/50 border border-border text-foreground leading-relaxed'}`}>
                {msg.content}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div className="bg-muted/50 border border-border rounded-lg p-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-100" />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-200" />
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-border bg-background">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="flex gap-2"
          >
            <Input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Ask anything about your retention data..." 
              className="flex-1 bg-card"
            />
            <Button type="submit" disabled={!input.trim() || isTyping}>
              <Send className="w-4 h-4 mr-2" /> Send
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
