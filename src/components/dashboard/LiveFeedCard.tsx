import { Activity, Waves } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LiveFeedCardProps {
  isLive: boolean;
}

export const LiveFeedCard = ({ isLive }: LiveFeedCardProps) => {
  return (
    <Card className="backdrop-blur-md bg-gradient-glass border-border/50 shadow-glass">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-primary">
          <Waves className="w-5 h-5" />
          Listening To
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">Bloomberg TV Live Feed</span>
          {isLive && (
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-success animate-pulse" />
              <span className="text-sm text-success">Active</span>
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Real-time financial news and market commentary
        </p>
      </CardContent>
    </Card>
  );
};