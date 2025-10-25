import React from 'react';

import { Trophy, Medal, Crown, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';


export const LeaderboardComponent = ({
  entries,
  onClose,
  onClear,
}) => {
  const getRankIcon = (index) => {
    switch (index) {
      case 0: return <Crown className="text-yellow-500" size={24} />;
      case 1: return <Medal className="text-gray-400" size={24} />;
      case 2: return <Medal className="text-orange-600" size={24} />;
      default: return <span className="text-lg font-semibold">{index + 1}</span>;
    }
  };

  const sortedEntries = [...entries].sort((a, b) => b.score - a.score);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Trophy className="text-yellow-500" size={32} />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Leaderboard</h2>
              <p className="text-gray-600">Top scores of all time</p>
            </div>
          </div>
          <Button onClick={onClose} variant="outline" size="sm">
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
        </div>

        {/* Leaderboard List */}
        {sortedEntries.length === 0 ? (
          <div className="text-center py-12">
            <Trophy size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No scores yet</p>
            <p className="text-gray-400">Complete a quiz to appear here!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedEntries.slice(0, 10).map((entry, index) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8">
                    {getRankIcon(index)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">
                      {entry.playerName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(entry.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-blue-600">
                    {entry.score}/{entry.totalQuestions}
                  </div>
                  <div className="text-sm text-gray-500">
                    {((entry.score / entry.totalQuestions) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Clear Button */}
        {sortedEntries.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <Button onClick={onClear} variant="outline" size="sm">
              Clear Leaderboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};