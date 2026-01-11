
import React from 'react';
import { Question } from '../types.ts';

interface QuizCardProps {
  question: Question;
  selectedOption: number | null;
  isAnswered: boolean;
  onSelect: (index: number) => void;
  onNext: () => void;
  isLast: boolean;
}

const QuizCard: React.FC<QuizCardProps> = ({ 
  question, 
  selectedOption, 
  isAnswered, 
  onSelect, 
  onNext,
  isLast 
}) => {
  const letters = ['A', 'B', 'C', 'D'];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-2xl w-full animate-in fade-in duration-500">
      <div className="mb-2">
        <span className="text-sm font-medium text-indigo-500 uppercase tracking-wider">{question.category}</span>
      </div>
      <h2 className="text-xl md:text-2xl font-bold text-black mb-8 leading-tight">
        {question.text}
      </h2>

      <div className="space-y-4">
        {question.options.map((option, index) => {
          let optionClass = "w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ";
          
          if (!isAnswered) {
            optionClass += "border-slate-100 hover:border-indigo-300 hover:bg-indigo-50 active:scale-[0.98]";
          } else {
            if (index === question.correctAnswer) {
              optionClass += "border-emerald-500 bg-emerald-50";
            } else if (index === selectedOption) {
              optionClass += "border-rose-500 bg-rose-50";
            } else {
              optionClass += "border-slate-100 opacity-50";
            }
          }

          return (
            <button
              key={index}
              disabled={isAnswered}
              onClick={() => onSelect(index)}
              className={optionClass}
            >
              <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                isAnswered && index === question.correctAnswer 
                  ? "bg-emerald-500 text-white" 
                  : isAnswered && index === selectedOption 
                    ? "bg-rose-500 text-white"
                    : "bg-slate-200 text-black"
              }`}>
                {letters[index]}
              </span>
              <span className="flex-grow font-semibold text-black">{option}</span>
              {isAnswered && index === question.correctAnswer && (
                <i className="fa-solid fa-check text-emerald-500 ml-auto"></i>
              )}
              {isAnswered && index === selectedOption && index !== question.correctAnswer && (
                <i className="fa-solid fa-xmark text-rose-500 ml-auto"></i>
              )}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="mt-8 flex justify-end animate-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={onNext}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center gap-2"
          >
            {isLast ? "Finish Quiz" : "Next Question"}
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizCard;
