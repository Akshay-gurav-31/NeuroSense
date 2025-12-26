import { Smile } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { SessionResult, TherapyType } from '../../types';

interface MoodTrendCardProps {
  history: SessionResult[];
}

const MoodTrendCard: React.FC<MoodTrendCardProps> = ({ history }) => {
  const mentalHistory = history
    .filter(h => h.type === TherapyType.MENTAL)
    .slice(-6)
    .map((h, i) => ({
      x: new Date(h.timestamp).toLocaleDateString(undefined, { weekday: 'short' }),
      y: h.score
    }));

  const currentMood = mentalHistory.length > 0 ? mentalHistory[mentalHistory.length - 1].y : 0;

  const getEmoji = (s: number) => {
    if (s >= 70) return '😊';
    if (s >= 40) return '😐';
    return '😔';
  };

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <Smile className="w-4 h-4 text-chart-yellow" />
        <span>Mood Trend</span>
      </div>

      {/* Emoji indicators */}
      <div className="flex justify-center gap-3 mb-2">
        <span className={`text-2xl transition-all duration-500 ${currentMood >= 70 ? 'scale-125 opacity-100' : 'scale-75 opacity-20'}`}>😊</span>
        <span className={`text-2xl transition-all duration-500 ${currentMood >= 40 && currentMood < 70 ? 'scale-125 opacity-100' : 'scale-75 opacity-20'}`}>😐</span>
        <span className={`text-2xl transition-all duration-500 ${currentMood < 40 && history.length > 0 ? 'scale-125 opacity-100' : 'scale-75 opacity-20'}`}>😔</span>
      </div>

      <div className="h-10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mentalHistory.length > 0 ? mentalHistory : [{ x: '', y: 0 }]} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
            <XAxis
              dataKey="x"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(215 20% 65%)', fontSize: 8 }}
            />
            <YAxis hide domain={[0, 100]} />
            <Line
              type="monotone"
              dataKey="y"
              stroke="hsl(48 96% 53%)"
              strokeWidth={2}
              dot={false}
              animationDuration={2000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MoodTrendCard;
