import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TradeSignal {
  type: 'BUY' | 'SELL';
  trigger: string;
  confidence: number;
  timestamp: Date;
}

interface TradeSignalCardProps {
  signal: TradeSignal | null;
  isLive: boolean;
}

export const TradeSignalCard = ({ signal, isLive }: TradeSignalCardProps) => {
  return (
    <Card className="backdrop-blur-md bg-gradient-glass border-border/50 shadow-glass">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-primary">
          <TrendingUp className="w-5 h-5" />
          Actionable Signal
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!signal ? (
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            {isLive ? "Monitoring market conditions..." : "Bot offline"}
          </div>
        ) : (
          <div className="animate-slide-up">
            {/* Signal Type */}
            <div className={`flex items-center justify-center gap-3 p-6 rounded-lg border-2 mb-4 ${
              signal.type === 'BUY' 
                ? 'bg-success/10 border-success text-success' 
                : 'bg-destructive/10 border-destructive text-destructive'
            }`}>
              {signal.type === 'BUY' ? (
                <TrendingUp className="w-8 h-8" />
              ) : (
                <TrendingDown className="w-8 h-8" />
              )}
              <span className="text-2xl font-bold">{signal.type}</span>
            </div>

            {/* Signal Details */}
            <div className="space-y-3">
              <div>
                <span className="text-sm text-muted-foreground">Trigger:</span>
                <p className="text-sm font-medium mt-1">{signal.trigger}</p>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm text-muted-foreground">Confidence:</span>
                  <span className="ml-2 text-sm font-bold text-primary">
                    {(signal.confidence * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {signal.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};