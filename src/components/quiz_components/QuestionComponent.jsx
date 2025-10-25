import React from 'react';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';



export const QuestionComponent = ({
  question,
  selectedAnswer,
  isAnswered,
  timeLeft,
  onAnswerSelect,
}) => {

  console.log("current question", question)
  console.log("current selectedAnswer", selectedAnswer)
  console.log("current selectedAnswer", question.answer)
  const getOptionClasses = (index) => {
    let baseClasses = "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ";

    if (!isAnswered) {
      baseClasses += "hover:bg-blue-50 hover:border-blue-300 border-gray-200";
    } else {
      if (index === question.answer) {
        baseClasses += " bg-green-100 border-green-500 text-green-800";
      } else if (index === selectedAnswer && index !== question.answer) {
        baseClasses += " bg-red-100 border-red-500 text-red-800";
      } else {
        baseClasses += " border-gray-200 opacity-70";
      }
    }

    if (selectedAnswer === index && !isAnswered) {
      baseClasses += " bg-blue-100 border-blue-500";
    }

    return baseClasses;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-500">
            Question {question.id}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
            {question.difficulty}
          </span>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {question.category}
          </span>
        </div>

        {/* Timer */}
        <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${timeLeft < 10 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
          }`}>
          <Clock size={16} />
          <span className="font-mono font-bold">{timeLeft}s</span>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {question.question}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswerSelect(index)}
              disabled={isAnswered}
              className={getOptionClasses(index)}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {isAnswered && index === question.answer && (
                  <CheckCircle2 size={20} className="text-green-600" />
                )}
                {isAnswered && index === selectedAnswer && index !== question.answer && (
                  <XCircle size={20} className="text-red-600" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Feedback */}
      {isAnswered && (
        <div className={`p-4 rounded-lg ${selectedAnswer === question.answer
          ? 'bg-green-100 border border-green-300 text-green-800'
          : 'bg-red-100 border border-red-300 text-red-800'
          }`}>
          <div className="flex items-center space-x-2">
            {selectedAnswer === question.answer ? (
              <CheckCircle2 size={20} />
            ) : (
              <XCircle size={20} />
            )}
            <span className="font-medium">
              {selectedAnswer === question.answer
                ? 'Correct! Well done.'
                : `Incorrect. The correct answer is: ${question.options[question.answer]}`
              }
            </span>
          </div>
        </div>
      )}
    </div>
  );
};