import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SentimentGaugeProps {
  sentiment: number;
  isLive: boolean;
}

export const SentimentGauge = ({ sentiment, isLive }: SentimentGaugeProps) => {
  // Convert sentiment (-1 to 1) to gauge position (0 to 100)
  const gaugeValue = ((sentiment + 1) / 2) * 100;
  
  // Determine sentiment label and color
  const getSentimentInfo = (value: number) => {
    if (value > 0.6) return { label: "Strongly Positive", color: "text-success" };
    if (value > 0.2) return { label: "Positive", color: "text-success" };
    if (value > -0.2) return { label: "Neutral", color: "text-trading-neutral" };
    if (value > -0.6) return { label: "Negative", color: "text-destructive" };
    return { label: "Strongly Negative", color: "text-destructive" };
  };

  const sentimentInfo = getSentimentInfo(sentiment);

  return (
    <Card className="backdrop-blur-md bg-gradient-glass border-border/50 shadow-glass">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-primary">
          <TrendingUp className="w-5 h-5" />
          Market Sentiment
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {/* Gauge Container */}
        <div className="relative w-48 h-24 mb-4">
          {/* Background Arc */}
          <svg className="w-full h-full" viewBox="0 0 192 96">
            <path
              d="M 16 80 A 80 80 0 0 1 176 80"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Colored segments */}
            <path
              d="M 16 80 A 80 80 0 0 1 96 16"
              fill="none"
              stroke="hsl(var(--destructive))"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M 96 16 A 80 80 0 0 1 176 80"
              fill="none"
              stroke="hsl(var(--success))"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.7"
            />
            {/* Progress Arc */}
            <path
              d="M 16 80 A 80 80 0 0 1 176 80"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${gaugeValue * 2.51} 251.2`}
              strokeDashoffset="0"
              className="transition-all duration-1000 ease-out drop-shadow-glow"
            />
          </svg>
          
          {/* Needle */}
          <div 
            className="absolute top-[70px] left-1/2 w-1 h-12 bg-primary origin-bottom transform -translate-x-1/2 transition-transform duration-1000 ease-out"
            style={{ 
              transform: `translateX(-50%) rotate(${(gaugeValue - 50) * 1.8}deg)`,
              transformOrigin: 'center bottom'
            }}
          />
          
          {/* Center Circle */}
          <div className="absolute top-[70px] left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-glow" />
        </div>

        {/* Sentiment Value */}
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">
            {sentiment.toFixed(2)}
          </div>
          <div className={`text-lg font-medium ${sentimentInfo.color}`}>
            {sentimentInfo.label}
          </div>
          {!isLive && (
            <div className="text-sm text-muted-foreground mt-2">
              Analysis paused
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};