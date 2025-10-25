import React, { useState, useEffect } from 'react';
import { Brain, Star, Play, Loader2, AlertCircle } from 'lucide-react';
import { QuizComponent } from './components/quiz_components/QuizComponent';
import { LeaderboardComponent } from './components/quiz_components/LeaderBoardComponent';
import { Button } from './components/ui/button';
import question from "./questions/questions.json";

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  console.log("questions", question.questions)
  // console.log("prase questions", JSON.parse(question))

  useEffect(() => {
    getQuestions();
    loadLeaderboard();
  }, []);

  const getQuestions = () => {
    setLoading(true)
    // const allQuestions = JSON.parse(question);

    // console.log("allQuestions", allQuestions);
    const shuffled = [...question.questions];

    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Return the first 'count' questions
    console.log("shuffled", shuffled)

    if (shuffled.length === 0 || shuffled.length < 5) {
      setLoading(false)
      setError("Something went wrong")
    } else {
      setLoading(false)
      setQuestions(shuffled.slice(0, 5));
    }
    // return shuffled.slice(0, 5);
  };

  const loadLeaderboard = () => {
    try {
      const stored = localStorage.getItem('quiz-leaderboard');
      if (stored) {
        setLeaderboard(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Error loading leaderboard:', err);
    }
  };

  // const saveToLeaderboard = (score, totalQuestions) => {
  //   try {
  //     const newEntry = {
  //       id: Date.now().toString(),
  //       playerName: 'Player', // You can implement name input
  //       score,
  //       date: new Date().toISOString(),
  //       totalQuestions,
  //     };

  //     const updatedLeaderboard = [...leaderboard, newEntry]
  //       .sort((a, b) => b.score - a.score)
  //       .slice(0, 10); // Keep top 10

  //     setLeaderboard(updatedLeaderboard);
  //     localStorage.setItem('quiz-leaderboard', JSON.stringify(updatedLeaderboard));
  //   } catch (err) {
  //     console.error('Error saving to leaderboard:', err);
  //   }
  // };

  const clearLeaderboard = () => {
    setLeaderboard([]);
    localStorage.removeItem('quiz-leaderboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-blue-500 mx-auto mb-4" size={48} />
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Quiz</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={getQuestions}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (showLeaderboard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <LeaderboardComponent
          entries={leaderboard}
          onClose={() => setShowLeaderboard(false)}
          onClear={clearLeaderboard}
        />
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <Brain className="text-blue-500 mx-auto mb-6" size={64} />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Quiz Game</h1>
          <p className="text-gray-600 mb-2">
            Test your knowledge with {questions.length} questions
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Various topics • Multiple difficulties • Timer included
          </p>

          <div className="space-y-4">
            <Button
              onClick={() => setGameStarted(true)}
              className="w-full py-6 text-lg"
            >
              <Play size={20} className="mr-2" />
              Start Quiz
            </Button>

            <Button
              onClick={() => setShowLeaderboard(true)}
              variant="outline"
              className="w-full"
            >
              <Star size={16} className="mr-2" />
              View Leaderboard
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3">Features:</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              <div>✅ Timer</div>
              <div>✅ Score Tracking</div>
              <div>✅ Instant Feedback</div>
              {/* <div>✅ Leaderboard</div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <QuizComponent
      questions={questions}
      onShowLeaderboard={() => setShowLeaderboard(true)}
    />
  );
}

export default App;