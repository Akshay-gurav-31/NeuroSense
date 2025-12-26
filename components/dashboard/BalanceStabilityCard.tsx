import { Compass } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } from 'recharts';
import { SessionResult, TherapyType } from '../../types';

interface BalanceStabilityCardProps {
  history: SessionResult[];
}

const BalanceStabilityCard: React.FC<BalanceStabilityCardProps> = ({ history }) => {
  const bodySessions = history.filter(h => h.type === TherapyType.BODY).slice(-6);

  const data = bodySessions.length > 0
    ? bodySessions.map((h, i) => ({
      subject: new Date(h.timestamp).toLocaleDateString(undefined, { weekday: 'short' }),
      value: h.score,
    }))
    : Array.from({ length: 6 }, (_, i) => ({ subject: `S${i + 1}`, value: 0 }));

  return (
    <div className="dashboard-card h-full flex flex-col">
      <div className="dashboard-card-header shrink-0">
        <Compass className="w-4 h-4 text-chart-cyan" />
        <span>Balance Stability</span>
      </div>

      <div className="flex-grow min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            <defs>
              <filter id="radarGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <PolarGrid
              stroke="rgba(255,255,255,0.1)"
              strokeDasharray="3 3"
            />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 700, fontFamily: 'monospace' }}
            />
            <PolarRadiusAxis hide domain={[0, 100]} />
            <Radar
              dataKey="value"
              stroke="#48c1cf"
              fill="#48c1cf"
              fillOpacity={0.4}
              strokeWidth={2}
              filter="url(#radarGlow)"
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 text-center">
        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Stability Vector v1.2</span>
      </div>
    </div>
  );
};

export default BalanceStabilityCard;
