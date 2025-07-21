import { useState, useEffect } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { LiveFeedCard } from "./LiveFeedCard";
import { TranscriptionCard } from "./TranscriptionCard";
import { SentimentGauge } from "./SentimentGauge";
import { TradeSignalCard } from "./TradeSignalCard";
import { TradeHistoryCard } from "./TradeHistoryCard";

interface TradeSignal {
  type: 'BUY' | 'SELL';
  trigger: string;
  confidence: number;
  timestamp: Date;
}

interface Trade {
  id: string;
  asset: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  timestamp: Date;
}

export const TradingDashboard = () => {
  const [isLive, setIsLive] = useState(false);
  const [transcription, setTranscription] = useState<string[]>([]);
  const [sentiment, setSentiment] = useState(0);
  const [currentSignal, setCurrentSignal] = useState<TradeSignal | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);

  // Mock transcription data
  const mockTranscriptionLines = [
    "Market analysts are reporting strong bullish sentiment across major cryptocurrency exchanges...",
    "Bitcoin has broken through the $65,000 resistance level with significant volume...",
    "Institutional investors continue to show increased interest in digital assets...",
    "Ethereum's upcoming network upgrades are generating positive market reactions...",
    "Federal Reserve comments suggest a more favorable stance toward digital currencies...",
    "Major investment firms are announcing new cryptocurrency trading desks...",
    "Regulatory clarity improvements are boosting investor confidence significantly...",
    "Technical analysis indicates a potential continuation of the current uptrend...",
    "Options markets are showing increased call activity in Bitcoin futures...",
    "Macroeconomic factors appear to be supporting risk-on sentiment in crypto markets...",
    "Trading volumes have increased 45% over the past week across all major pairs...",
    "Sentiment indicators are reaching levels not seen since the previous bull cycle..."
  ];

  // Simulation intervals
  useEffect(() => {
    if (!isLive) {
      return;
    }

    // Add transcription every 2-3 seconds
    const transcriptionInterval = setInterval(() => {
      const randomLine = mockTranscriptionLines[Math.floor(Math.random() * mockTranscriptionLines.length)];
      setTranscription(prev => {
        const newTranscription = [...prev, randomLine];
        return newTranscription.slice(-15); // Keep last 15 lines
      });
    }, 2500);

    // Update sentiment every 3-5 seconds
    const sentimentInterval = setInterval(() => {
      // Generate sentiment with some momentum (trending behavior)
      setSentiment(prev => {
        const momentum = (Math.random() - 0.5) * 0.3;
        const baseChange = (Math.random() - 0.5) * 0.2;
        const newSentiment = Math.max(-1, Math.min(1, prev + momentum + baseChange));
        return newSentiment;
      });
    }, 3500);

    return () => {
      clearInterval(transcriptionInterval);
      clearInterval(sentimentInterval);
    };
  }, [isLive]);

  // Generate trade signals based on sentiment
  useEffect(() => {
    if (!isLive) return;

    const signalTimeout = setTimeout(() => {
      // Strong sentiment triggers signals
      if (Math.abs(sentiment) > 0.7) {
        const signal: TradeSignal = {
          type: sentiment > 0 ? 'BUY' : 'SELL',
          trigger: `${sentiment > 0 ? 'High positive' : 'Strong negative'} sentiment (${sentiment.toFixed(2)}) detected for Bitcoin`,
          confidence: Math.min(0.95, Math.abs(sentiment) + Math.random() * 0.2),
          timestamp: new Date()
        };
        
        setCurrentSignal(signal);

        // Execute trade
        const trade: Trade = {
          id: Date.now().toString(),
          asset: 'BTC/USD',
          type: signal.type,
          quantity: Math.random() * 0.5 + 0.1,
          price: 65000 + (Math.random() - 0.5) * 2000,
          timestamp: new Date()
        };

        setTrades(prev => [trade, ...prev.slice(0, 19)]); // Keep last 20 trades

        // Clear signal after 8 seconds
        setTimeout(() => setCurrentSignal(null), 8000);
      }
    }, 1000);

    return () => clearTimeout(signalTimeout);
  }, [sentiment, isLive]);

  const handleToggleLive = () => {
    setIsLive(!isLive);
    if (isLive) {
      // Reset when stopping
      setCurrentSignal(null);
    }
  };

  return (
    <div className="min-h-screen bg-trading-bg relative">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-glow opacity-20 pointer-events-none" />
      
      <div className="relative z-10">
        <DashboardHeader isLive={isLive} onToggleLive={handleToggleLive} />
        
        <main className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Column 1: Live Feed */}
            <div className="space-y-6">
              <LiveFeedCard isLive={isLive} />
              <TranscriptionCard transcription={transcription} isLive={isLive} />
            </div>

            {/* Column 2: Analysis & Signals */}
            <div className="space-y-6">
              <SentimentGauge sentiment={sentiment} isLive={isLive} />
              <TradeSignalCard signal={currentSignal} isLive={isLive} />
            </div>

            {/* Column 3: History */}
            <div className="space-y-6">
              <TradeHistoryCard trades={trades} isLive={isLive} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};