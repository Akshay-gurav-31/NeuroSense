import { Brain } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, XAxis, Cell, YAxis } from 'recharts';
import { SessionResult, TherapyType } from '../../types';

interface MemoryScoreCardProps {
  history: SessionResult[];
}

const colors = ['#48c1cf', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const MemoryScoreCard: React.FC<MemoryScoreCardProps> = ({ history }) => {
  const brainHistory = history
    .filter(h => h.type === TherapyType.BRAIN)
    .slice(-5)
    .map((h, i) => ({
      name: new Date(h.timestamp).toLocaleDateString(undefined, { weekday: 'short' }),
      value: h.score
    }));

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <Brain className="w-4 h-4 text-chart-cyan" />
        <span>Cognitive Score</span>
      </div>

      <div className="h-20">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={brainHistory.length > 0 ? brainHistory : [{ name: 'Empty', value: 0 }]} margin={{ top: 5, right: 5, left: 5, bottom: 0 }}>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700, fontFamily: 'monospace' }}
            />
            <YAxis hide domain={[0, 100]} />
            <Bar dataKey="value" radius={[2, 2, 0, 0]}>
              {brainHistory.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.value >= 80 ? '#10b981' : entry.value >= 50 ? '#f59e0b' : '#ef4444'}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth={1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MemoryScoreCard;
