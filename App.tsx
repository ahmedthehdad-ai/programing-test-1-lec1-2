
import React, { useState } from 'react';
import { QUESTIONS } from './constants';
import { GameStatus, QuizState } from './types';
import QuizCard from './components/QuizCard';
import ProgressBar from './components/ProgressBar';
import ResultView from './components/ResultView';

const App: React.FC = () => {
  const [state, setState] = useState<QuizState>({
    currentIndex: 0,
    score: 0,
    selectedOption: null,
    isAnswered: false,
    status: GameStatus.LANDING,
    userAnswers: Array(QUESTIONS.length).fill(null),
  });

  const startQuiz = () => {
    setState({
      currentIndex: 0,
      score: 0,
      selectedOption: null,
      isAnswered: false,
      status: GameStatus.PLAYING,
      userAnswers: Array(QUESTIONS.length).fill(null),
    });
    window.scrollTo(0, 0);
  };

  const handleSelect = (index: number) => {
    if (state.isAnswered) return;

    const isCorrect = index === QUESTIONS[state.currentIndex].correctAnswer;
    
    setState(prev => ({
      ...prev,
      selectedOption: index,
      isAnswered: true,
      score: isCorrect ? prev.score + 1 : prev.score,
      userAnswers: prev.userAnswers.map((ans, i) => i === prev.currentIndex ? index : ans)
    }));
  };

  const handleNext = () => {
    if (state.currentIndex === QUESTIONS.length - 1) {
      setState(prev => ({ ...prev, status: GameStatus.FINISHED }));
    } else {
      setState(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
        isAnswered: false,
        selectedOption: null
      }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const shareApp = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'CompQuest: Computer Basics Quiz',
          text: 'Check out this awesome Computer Basics quiz I am taking!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      alert("Copy this link to your friend: " + window.location.href);
    }
  };

  const renderContent = () => {
    switch (state.status) {
      case GameStatus.LANDING:
        return (
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-12 max-w-lg w-full text-center animate-in fade-in duration-700 mx-4">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-laptop-code text-3xl md:text-4xl text-indigo-600"></i>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-4 tracking-tight">CompQuest</h1>
            <p className="text-slate-500 mb-8 md:mb-10 leading-relaxed text-base md:text-lg">
              Master computer fundamentals with 87 detailed questions. Perfect for students and tech enthusiasts.
            </p>
            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-10 text-left">
              <div className="bg-slate-50 p-3 md:p-4 rounded-2xl border border-slate-100">
                <div className="text-indigo-600 font-bold text-lg">87</div>
                <div className="text-[10px] md:text-xs text-slate-400 uppercase font-semibold">Questions</div>
              </div>
              <div className="bg-slate-50 p-3 md:p-4 rounded-2xl border border-slate-100">
                <div className="text-indigo-600 font-bold text-lg">Pro</div>
                <div className="text-[10px] md:text-xs text-slate-400 uppercase font-semibold">Curriculum</div>
              </div>
            </div>
            <div className="space-y-3">
              <button
                onClick={startQuiz}
                className="w-full py-4 md:py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-200 transition-all hover:scale-[1.02] active:scale-[0.95] flex items-center justify-center gap-3"
              >
                Start Quiz
                <i className="fa-solid fa-play"></i>
              </button>
              <button
                onClick={shareApp}
                className="w-full py-3 bg-white border-2 border-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-share-nodes"></i>
                Share with Friends
              </button>
            </div>
          </div>
        );

      case GameStatus.PLAYING:
        return (
          <div className="flex flex-col items-center w-full max-w-4xl px-4 pb-20">
            <div className="w-full max-w-2xl mb-6 md:mb-8">
                <ProgressBar current={state.currentIndex} total={QUESTIONS.length} />
            </div>
            <QuizCard 
              question={QUESTIONS[state.currentIndex]}
              selectedOption={state.selectedOption}
              isAnswered={state.isAnswered}
              onSelect={handleSelect}
              onNext={handleNext}
              isLast={state.currentIndex === QUESTIONS.length - 1}
            />
            <div className="mt-6 text-slate-400 text-xs md:text-sm flex items-center gap-2">
                <i className="fa-solid fa-circle-info"></i>
                Select an option to verify your answer
            </div>
          </div>
        );

      case GameStatus.FINISHED:
        return (
          <div className="px-4 w-full flex flex-col items-center gap-4">
            <ResultView 
              score={state.score} 
              total={QUESTIONS.length} 
              onRestart={startQuiz} 
            />
            <button
              onClick={shareApp}
              className="max-w-md w-full py-4 bg-white border-2 border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-share-nodes"></i>
              Share My Result
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-6 md:py-12">
      {renderContent()}
      
      <footer className="mt-8 mb-4 text-slate-400 text-[10px] md:text-xs flex flex-col items-center gap-2 px-4 text-center">
        <p className="font-medium">CompQuest Mobile Edition • v1.1</p>
        <div className="flex gap-4">
          <span className="flex items-center gap-1 font-semibold">
            <i className="fa-solid fa-check-circle text-emerald-500"></i> {state.score} Correct
          </span>
          <span className="flex items-center gap-1 font-semibold">
            <i className="fa-solid fa-layer-group text-indigo-400"></i> {state.currentIndex + 1}/{QUESTIONS.length}
          </span>
        </div>
      </footer>
    </div>
  );
};

export default App;
