import { Sparkles, Check, AlertCircle } from 'lucide-react';
import { SessionResult, TherapyType } from '../../types';

interface AIRecommendationsCardProps {
  history: SessionResult[];
}

const AIRecommendationsCard: React.FC<AIRecommendationsCardProps> = ({ history }) => {
  const getRecommendations = () => {
    if (history.length === 0) return ['Complete your first session to get AI recommendations'];

    const recs = [];
    const latestScores = Object.values(TherapyType).map(type => {
      const typeHistory = history.filter(h => h.type === type);
      return { type, score: typeHistory.length > 0 ? typeHistory[0].score : null };
    });

    const lowScores = latestScores.filter(s => s.score !== null && s.score < 60);

    if (lowScores.length > 0) {
      lowScores.forEach(s => recs.push(`Focus on ${s.type.toLowerCase()} therapy to improve score`));
    } else {
      recs.push('Focus on brain therapy to improve score');
      recs.push('Maintain current exercise frequency');
      recs.push('Consider increasing difficulty in brain games');
    }

    if (history.length < 3) recs.push('Complete 3 more sessions for deeper analysis');

    return recs.slice(0, 3);
  };

  const recommendations = getRecommendations();

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <Sparkles className="w-4 h-4 text-chart-cyan" />
        <span>AI Recommendations</span>
      </div>

      <div className="space-y-2">
        {recommendations.map((rec, index) => (
          <div key={index} className="flex items-start gap-2">
            {history.length > 0 ? (
              <Check className="w-3 h-3 text-status-good mt-1 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-3 h-3 text-status-warning mt-1 flex-shrink-0" />
            )}
            <span className="text-[10px] text-muted-foreground leading-tight">{rec}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendationsCard;
