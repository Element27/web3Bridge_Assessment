import React from 'react';
import { Trophy, Star, RotateCcw, Home } from 'lucide-react';
import { Button } from '../ui/button';


export const ScoreComponent = ({
  score,
  totalQuestions,
  onRestart,
  onShowLeaderboard,
}) => {
  const percentage = (score / totalQuestions) * 100;

  const getScoreMessage = () => {
    if (percentage >= 90) return "Outstanding! 🎉";
    if (percentage >= 70) return "Excellent! 👏";
    if (percentage >= 50) return "Good job! 👍";
    if (percentage >= 30) return "Not bad! 😊";
    return "Keep practicing! 💪";
  };

  const getScoreColor = () => {
    if (percentage >= 70) return "text-green-600";
    if (percentage >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="max-w-md mx-auto p-8 text-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
        {/* Trophy Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <Trophy size={80} className="text-yellow-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-lg">{score}</span>
            </div>
          </div>
        </div>

        {/* Score */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {getScoreMessage()}
          </h2>
          <p className="text-gray-600 mb-4">
            You completed the quiz!
          </p>
          <div className={`text-4xl font-bold ${getScoreColor()} mb-2`}>
            {score}/{totalQuestions}
          </div>
          <div className="text-lg text-gray-500">
            ({percentage.toFixed(1)}%)
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-1000 ${percentage >= 70 ? 'bg-green-500' :
              percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        {/* Actions */}
        <div className="flex flex-col space-y-3 pt-4">
          <Button onClick={onRestart} className="w-full">
            <RotateCcw size={16} className="mr-2" />
            Play Again
          </Button>
          <Button onClick={onShowLeaderboard} variant="outline" className="w-full">
            <Star size={16} className="mr-2" />
            View Leaderboard
          </Button>
        </div>
      </div>
    </div>
  );
};