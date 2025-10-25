import React, { useState, useEffect } from 'react';
import { Loader2, AlertCircle, Home, Star } from 'lucide-react';
import { QuestionComponent } from './QuestionComponent';
import { ScoreComponent } from './ScoreComponent';
import { Button } from '../ui/button';
import { useQuestions } from '../../hooks/useQuestion';
import { LeaderboardComponent } from './LeaderBoardComponent';


export const Quiz = ({ questions, onShowLeaderboard }) => {
  const [showScore, setShowScore] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const {
    quizState,
    currentQuestion,
    handleAnswerSelect,
    nextQuestion,
    restartQuiz,
    totalQuestions,
  } = useQuestions(questions);

  // Show score when game is completed
  useEffect(() => {
    if (quizState.gameCompleted) {
      const timer = setTimeout(() => setShowScore(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [quizState.gameCompleted]);

  const handleRestart = () => {
    setShowScore(false);
    restartQuiz();
  };

  if (showScore) {
    return (
      <ScoreComponent
        score={quizState.score}
        totalQuestions={totalQuestions}
        onRestart={handleRestart}
        onShowLeaderboard={() => setShowLeaderboard(true)}
      />
    );
  }

  if (showLeaderboard) {
    return (
      <LeaderboardComponent
        entries={[]} // You can implement local storage for leaderboard
        onClose={() => setShowLeaderboard(false)}
        onClear={() => { }} // Implement clear functionality
      />
    );
  }

  if (quizState.gameCompleted && !showScore) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <Loader2 className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Quiz Game</h1>
            <p className="text-gray-600">
              Question {quizState.currentQuestionIndex + 1} of {totalQuestions}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
              <span className="font-semibold text-blue-600">Score: {quizState.score}</span>
            </div>
            <Button onClick={onShowLeaderboard} variant="outline" size="sm">
              <Star size={16} className="mr-2" />
              Leaderboard
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((quizState.currentQuestionIndex + 1) / totalQuestions) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Question */}
      {currentQuestion && (
        <QuestionComponent
          question={currentQuestion}
          selectedAnswer={quizState.selectedAnswer}
          isAnswered={quizState.isAnswered}
          timeLeft={quizState.timeLeft}
          onAnswerSelect={handleAnswerSelect}
        />
      )}

      {/* Next Button */}
      {quizState.isAnswered && (
        <div className="max-w-2xl mx-auto px-6 mt-6">
          <Button onClick={nextQuestion} className="w-full">
            {quizState.currentQuestionIndex < totalQuestions - 1
              ? 'Next Question'
              : 'See Results'
            }
          </Button>
        </div>
      )}
    </div>
  );
};