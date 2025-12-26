import { Calendar } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { SessionResult } from '../../types';

interface SessionComplianceCardProps {
  history: SessionResult[];
}

const SessionComplianceCard: React.FC<SessionComplianceCardProps> = ({ history }) => {
  // Group sessions by day for the last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toLocaleDateString(undefined, { weekday: 'short' });
  });

  const dailyCounts = last7Days.map(day => {
    const count = history.filter(h =>
      new Date(h.timestamp).toLocaleDateString(undefined, { weekday: 'short' }) === day
    ).length;
    return { day, count };
  });

  const totalSessions = history.length;
  const sessionsThisWeek = dailyCounts.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="dashboard-card h-full flex flex-col">
      <div className="dashboard-card-header shrink-0">
        <Calendar className="w-4 h-4 text-chart-cyan" />
        <span>Session Compliance</span>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-4 mb-3 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20 uppercase font-black">Total: {totalSessions}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#48c1cf] uppercase font-black">This Week: {sessionsThisWeek}</span>
        </div>
        {/* Progress indicator */}
        <div className="flex-1 h-3 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              background: 'linear-gradient(90deg, #48c1cf, #10b981)',
              width: `${Math.min(100, (sessionsThisWeek / 10) * 100)}%`
            }}
          />
        </div>
      </div>

      {/* Chart */}
      <div className="flex-grow min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dailyCounts} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="complianceGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 9, fontWeight: 700, fontFamily: 'monospace' }}
            />
            <YAxis hide domain={[0, 'auto']} />
            <Line
              type="step"
              dataKey="count"
              stroke="url(#complianceGradient)"
              strokeWidth={3}
              dot={{ fill: '#06b6d4', r: 3, strokeWidth: 0 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SessionComplianceCard;
