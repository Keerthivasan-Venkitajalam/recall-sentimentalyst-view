import { useEffect, useRef } from "react";
import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TranscriptionCardProps {
  transcription: string[];
  isLive: boolean;
}

export const TranscriptionCard = ({ transcription, isLive }: TranscriptionCardProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcription]);

  return (
    <Card className="backdrop-blur-md bg-gradient-glass border-border/50 shadow-glass">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-primary">
          <FileText className="w-5 h-5" />
          Live Transcription
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          ref={scrollRef}
          className="h-64 overflow-y-auto space-y-2 p-3 rounded-lg bg-trading-bg/50 border border-border/30"
        >
          {transcription.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              {isLive ? "Listening for audio..." : "Bot offline"}
            </div>
          ) : (
            transcription.map((line, index) => (
              <div 
                key={index} 
                className={`text-sm font-mono leading-relaxed animate-fade-in-scale ${
                  index === transcription.length - 1 ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {line}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};