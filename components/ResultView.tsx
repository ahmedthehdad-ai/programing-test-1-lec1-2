
import React from 'react';

interface ResultViewProps {
  score: number;
  total: number;
  onRestart: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ score, total, onRestart }) => {
  const percentage = Math.round((score / total) * 100);
  
  let message = "";
  let icon = "";
  let color = "";

  if (percentage >= 90) {
    message = "Outstanding! You're a Tech Guru!";
    icon = "fa-trophy";
    color = "text-yellow-500";
  } else if (percentage >= 70) {
    message = "Great Job! You really know your stuff.";
    icon = "fa-star";
    color = "text-indigo-500";
  } else if (percentage >= 50) {
    message = "Good effort! Keep learning.";
    icon = "fa-thumbs-up";
    color = "text-blue-500";
  } else {
    message = "Don't give up! Every expert was once a beginner.";
    icon = "fa-book-open";
    color = "text-slate-500";
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center animate-in zoom-in duration-500">
      <div className={`text-6xl mb-6 ${color}`}>
        <i className={`fa-solid ${icon}`}></i>
      </div>
      <h2 className="text-3xl font-black text-slate-800 mb-2">Quiz Complete!</h2>
      <p className="text-slate-500 mb-8">{message}</p>
      
      <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
        <div className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-1">Your Score</div>
        <div className="text-5xl font-black text-indigo-600">{score}<span className="text-2xl text-slate-300"> / {total}</span></div>
        <div className="mt-4 flex items-center justify-center gap-2">
            <div className="h-2 w-32 bg-slate-200 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-indigo-500 transition-all duration-1000" 
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            <span className="text-sm font-bold text-slate-500">{percentage}%</span>
        </div>
      </div>

      <button
        onClick={onRestart}
        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
      >
        <i className="fa-solid fa-rotate-left"></i>
        Try Again
      </button>
    </div>
  );
};

export default ResultView;
