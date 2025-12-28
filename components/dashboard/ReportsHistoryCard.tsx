import { FileText, Download, Users, Settings } from 'lucide-react';
import { SessionResult } from '../../types';

interface ReportsHistoryCardProps {
  history: SessionResult[];
}

const ReportsHistoryCard: React.FC<ReportsHistoryCardProps> = ({ history }) => {
  const displayHistory = history.slice(0, 5).map(entry => ({
    date: new Date(entry.timestamp).toLocaleDateString(undefined, { month: 'short', day: '2-digit' }),
    event: `Therapy: ${entry.type} session complete`,
    time: new Date(entry.timestamp).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
  }));

  return (
    <div className="dashboard-card row-span-2">
      <div className="flex items-center justify-between mb-3">
        <div className="dashboard-card-header mb-0">
          <FileText className="w-4 h-4 text-chart-cyan" />
          <span>Reports & History</span>
        </div>
        <Settings className="w-4 h-4 text-muted-foreground" />
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mb-4">
        <button className="flex items-center gap-2 px-3 py-1.5 bg-secondary/50 hover:bg-secondary rounded-lg text-xs text-foreground border border-border/50 transition-colors">
          <Download className="w-4 h-4 text-chart-cyan" />
          Export PDF
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-secondary/50 hover:bg-secondary rounded-lg text-xs text-foreground border border-border/50 transition-colors">
          <Users className="w-4 h-4 text-chart-cyan" />
          Comparison
        </button>
      </div>

      {/* History list */}
      <div className="space-y-3">
        {displayHistory.length > 0 ? displayHistory.map((item, index) => (
          <div key={index} className="flex items-center gap-3 text-[10px]">
            <span className="text-muted-foreground w-10">{item.date}</span>
            <span className="flex-1 text-foreground truncate">{item.event}</span>
            <span className="text-muted-foreground text-[8px]">{item.time}</span>
          </div>
        )) : (
          <div className="text-center py-4 text-xs text-muted-foreground italic">No historical data available</div>
        )}
      </div>
    </div>
  );
};

export default ReportsHistoryCard;
