import { useState, useEffect, useCallback } from 'react';

const TIME_PER_QUESTION = 10;

export const useQuestions = (questions) => {
  const [quizState, setQuizState] = useState({
    currentQuestionIndex: 0,
    score: 0,
    selectedAnswer: null,
    isAnswered: false,
    timeLeft: TIME_PER_QUESTION,
    gameCompleted: false,
  });

  const currentQuestion = questions[quizState.currentQuestionIndex];

  const handleAnswerSelect = useCallback((answerIndex) => {
    if (quizState.isAnswered) return;

    const isCorrect = answerIndex === currentQuestion.answer;

    setQuizState(prev => ({
      ...prev,
      selectedAnswer: answerIndex,
      isAnswered: true,
      score: isCorrect ? prev.score + 1 : prev.score,
    }));
  }, [currentQuestion, quizState.isAnswered]);

  const nextQuestion = useCallback(() => {
    if (quizState.currentQuestionIndex < questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedAnswer: null,
        isAnswered: false,
        timeLeft: TIME_PER_QUESTION,
      }));
    } else {
      setQuizState(prev => ({
        ...prev,
        gameCompleted: true,
      }));
    }
  }, [questions.length, quizState.currentQuestionIndex]);

  // Timer effect
  useEffect(() => {
    if (quizState.isAnswered || quizState.gameCompleted) return;

    const timer = setInterval(() => {
      setQuizState(prev => {
        if (prev.timeLeft <= 1) {
          clearInterval(timer);
          return {
            ...prev,
            isAnswered: true,
            timeLeft: 0,
          };
        }
        return {
          ...prev,
          timeLeft: prev.timeLeft - 1,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizState.isAnswered, quizState.gameCompleted]);

  const restartQuiz = () => {
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      selectedAnswer: null,
      isAnswered: false,
      timeLeft: TIME_PER_QUESTION,
      gameCompleted: false,
    });
  };

  return {
    quizState,
    currentQuestion,
    handleAnswerSelect,
    nextQuestion,
    restartQuiz,
    totalQuestions: questions.length,
  };
};