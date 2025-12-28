import { BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, ResponsiveContainer, YAxis, Cell } from 'recharts';
import { SessionResult } from '../../types';

interface ExerciseCompletionCardProps {
  history: SessionResult[];
}

const ExerciseCompletionCard: React.FC<ExerciseCompletionCardProps> = ({ history }) => {
  const data = history.slice(-6).map((h, i) => ({
    name: `${h.score}%`,
    value: h.score
  }));

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <BarChart3 className="w-4 h-4 text-chart-cyan" />
        <span>Exercise Completion</span>
      </div>

      <div className="h-28">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.length > 0 ? data : [{ name: '0%', value: 0 }]} margin={{ top: 5, right: 5, left: 5, bottom: 0 }}>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700, fontFamily: 'monospace' }}
            />
            <YAxis hide domain={[0, 100]} />
            <Bar
              dataKey="value"
              radius={[2, 2, 0, 0]}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
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

export default ExerciseCompletionCard;
