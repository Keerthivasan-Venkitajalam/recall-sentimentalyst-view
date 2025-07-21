import { History, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Trade {
  id: string;
  asset: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  timestamp: Date;
}

interface TradeHistoryCardProps {
  trades: Trade[];
  isLive: boolean;
}

export const TradeHistoryCard = ({ trades, isLive }: TradeHistoryCardProps) => {
  return (
    <Card className="backdrop-blur-md bg-gradient-glass border-border/50 shadow-glass">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-primary">
          <History className="w-5 h-5" />
          Trade History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 overflow-y-auto space-y-3">
          {trades.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              {isLive ? "No trades executed yet" : "Bot offline"}
            </div>
          ) : (
            trades.map((trade) => (
              <div 
                key={trade.id}
                className="flex items-center justify-between p-3 rounded-lg bg-trading-bg/30 border border-border/20 animate-fade-in-scale hover:bg-trading-bg/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {trade.type === 'BUY' ? (
                    <TrendingUp className="w-4 h-4 text-success" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-destructive" />
                  )}
                  <div>
                    <div className="font-medium text-sm">{trade.asset}</div>
                    <div className="text-xs text-muted-foreground">
                      {trade.quantity.toFixed(4)} @ ${trade.price.toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <Badge 
                    variant={trade.type === 'BUY' ? 'default' : 'destructive'}
                    className={trade.type === 'BUY' ? 'bg-success text-success-foreground' : ''}
                  >
                    {trade.type}
                  </Badge>
                  <div className="text-xs text-muted-foreground mt-1">
                    {trade.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};