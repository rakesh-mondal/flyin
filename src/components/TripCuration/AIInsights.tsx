import React from 'react';
import { Info, AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

interface InsightProps {
  type: 'info' | 'warning' | 'price-drop' | 'price-rise';
  content: string;
}

const Insight = ({ type, content }: InsightProps) => {
  const getIcon = () => {
    switch (type) {
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'price-drop':
        return <TrendingDown className="h-4 w-4 text-green-500" />;
      case 'price-rise':
        return <TrendingUp className="h-4 w-4 text-red-500" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'info':
        return 'bg-blue-50';
      case 'warning':
        return 'bg-amber-50';
      case 'price-drop':
        return 'bg-green-50';
      case 'price-rise':
        return 'bg-red-50';
    }
  };

  return (
    <div className={`flex items-center gap-2 rounded-lg ${getBgColor()} p-3`}>
      {getIcon()}
      <p className="text-sm">{content}</p>
    </div>
  );
};

interface AIInsightsProps {
  insights: InsightProps[];
}

export default function AIInsights({ insights }: AIInsightsProps) {
  return (
    <Card className="mb-4 border-dashed">
      <CardContent className="p-4">
        <h3 className="mb-3 text-sm font-medium">AI Flight Insights</h3>
        <div className="space-y-2">
          {insights.map((insight, index) => (
            <Insight key={index} type={insight.type} content={insight.content} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
