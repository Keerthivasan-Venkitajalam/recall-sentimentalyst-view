import { useState } from "react";
import { Power, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  isLive: boolean;
  onToggleLive: () => void;
}

export const DashboardHeader = ({ isLive, onToggleLive }: DashboardHeaderProps) => {
  return (
    <header className="flex items-center justify-between p-6 border-b border-border/50 backdrop-blur-md bg-gradient-glass">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Sentimentalyst
        </h1>
        <p className="text-muted-foreground text-sm">
          Recall-Driven Trading Agent
        </p>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-success animate-pulse-glow' : 'bg-trading-neutral'}`} />
          <span className={`text-sm font-medium ${isLive ? 'text-success' : 'text-trading-neutral'}`}>
            {isLive ? 'LIVE' : 'OFFLINE'}
          </span>
        </div>
        
        <Button
          onClick={onToggleLive}
          variant={isLive ? "destructive" : "default"}
          className={`flex items-center gap-2 transition-all duration-300 ${
            isLive 
              ? 'bg-destructive hover:bg-destructive/90' 
              : 'bg-gradient-primary hover:shadow-glow'
          }`}
        >
          <Power className="w-4 h-4" />
          {isLive ? 'Stop Bot' : 'Start Bot'}
        </Button>
      </div>
    </header>
  );
};