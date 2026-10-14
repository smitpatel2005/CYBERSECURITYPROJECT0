import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HARDWARE_QUIZ_QUESTIONS } from '../../data/hardwareData';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Trophy, 
  ArrowRight, 
  Award,
  Sparkles
} from 'lucide-react';

export const HardwareQuickQuiz: React.FC = () => {
  const { language } = useApp();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQ = HARDWARE_QUIZ_QUESTIONS[currentQuestionIndex];
  const selectedOptionIndex = selectedAnswers[currentQuestionIndex];
  const hasAnsweredCurrent = selectedOptionIndex !== undefined;

  const handleSelectOption = (idx: number) => {
    if (hasAnsweredCurrent) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestionIndex]: idx }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < HARDWARE_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setShowExplanation(selectedAnswers[currentQuestionIndex + 1] !== undefined);
    } else {
      setQuizFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setShowExplanation(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setQuizFinished(false);
  };

  // Calculate score
  const calculateScore = () => {
    return HARDWARE_QUIZ_QUESTIONS.reduce((score, q, idx) => {
      return selectedAnswers[idx] === q.correctIndex ? score + 1 : score;
    }, 0);
  };

  const score = calculateScore();
  const total = HARDWARE_QUIZ_QUESTIONS.length;
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
      {/* Background accents */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-800/80 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-xs font-semibold mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{language === 'gu' ? 'ઝડપી નોલેજ ક્વિઝ' : 'Hardware Mastery Check'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            {language === 'gu' ? 'હાર્ડવેર પરીક્ષણ ક્વિઝ' : 'Quick Computer Hardware Quiz'}
          </h3>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            {language === 'gu'
              ? 'RAM, SSD, CPU, SMPS અને ઇનપુટ/આઉટપુટ સાધનો અંગે તમારા જ્ઞાનની ચકાસણી કરો.'
              : 'Test your understanding of volatile vs non-volatile memory, processor architecture, and power delivery.'}
          </p>
        </div>

        {/* Score indicator or reset */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2 text-xs">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400">{language === 'gu' ? 'સ્કોર:' : 'Score:'}</span>
            <span className="font-bold text-white">{score} / {total}</span>
          </div>
          <button
            onClick={handleReset}
            title={language === 'gu' ? 'ફરીથી શરૂ કરો' : 'Restart Quiz'}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!quizFinished ? (
        <div>
          {/* Progress bar */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>
              {language === 'gu'
                ? `પ્રશ્ન ${currentQuestionIndex + 1} / ${total}`
                : `Question ${currentQuestionIndex + 1} of ${total}`}
            </span>
            <span className="font-mono text-cyan-400">
              {Math.round(((currentQuestionIndex + 1) / total) * 100)}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden mb-6 border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / total) * 100}%` }}
            />
          </div>

          {/* Question card */}
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-5 sm:p-6 mb-6">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-5 leading-snug">
              {currentQ.question[language]}
            </h4>

            {/* Options list */}
            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOptionIndex === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let cardStyle = 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700';

                if (hasAnsweredCurrent) {
                  if (isCorrect) {
                    cardStyle = 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200 ring-1 ring-emerald-500';
                  } else if (isSelected && !isCorrect) {
                    cardStyle = 'bg-rose-950/40 border-rose-500/80 text-rose-200 ring-1 ring-rose-500';
                  } else {
                    cardStyle = 'bg-slate-900/30 border-slate-850 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={hasAnsweredCurrent}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${cardStyle}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 text-sm font-medium leading-relaxed">
                      {opt[language]}
                    </span>
                    {hasAnsweredCurrent && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    {hasAnsweredCurrent && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation reveal */}
            {showExplanation && (
              <div
                className={`mt-5 p-4 rounded-xl border text-sm transition-all animate-fadeIn ${
                  selectedOptionIndex === currentQ.correctIndex
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                    : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                }`}
              >
                <div className="flex items-center gap-2 font-semibold mb-1">
                  {selectedOptionIndex === currentQ.correctIndex ? (
                    <>
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span>{language === 'gu' ? 'સાચો જવાબ!' : 'Correct!'}</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-400" />
                      <span>
                        {language === 'gu'
                          ? `ખોટો જવાબ — સાચો વિકલ્પ (${String.fromCharCode(65 + currentQ.correctIndex)}) છે`
                          : `Incorrect — Correct option is (${String.fromCharCode(65 + currentQ.correctIndex)})`}
                      </span>
                    </>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentQ.explanation[language]}
                </p>
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                currentQuestionIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-slate-900 border-slate-800 text-slate-600'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              {language === 'gu' ? '← પાછળ' : '← Previous'}
            </button>

            <button
              onClick={handleNext}
              disabled={!hasAnsweredCurrent}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                !hasAnsweredCurrent
                  ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500 border border-slate-700'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/30'
              }`}
            >
              <span>
                {currentQuestionIndex === total - 1
                  ? language === 'gu'
                    ? 'પરિણામ જુઓ'
                    : 'View Final Results'
                  : language === 'gu'
                  ? 'આગળનો પ્રશ્ન'
                  : 'Next Question'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Results screen */
        <div className="text-center py-8 px-4 bg-slate-950/70 border border-slate-800/80 rounded-2xl">
          <div className="inline-flex p-4 rounded-2xl bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 mb-4">
            {percentage >= 80 ? (
              <Trophy className="w-12 h-12 text-amber-400 animate-bounce" />
            ) : (
              <Award className="w-12 h-12 text-cyan-400" />
            )}
          </div>

          <h4 className="text-2xl font-bold text-white mb-2">
            {percentage >= 80
              ? language === 'gu'
                ? 'અભિનંદન! ઉત્કૃષ્ટ પરિણામ!'
                : 'Outstanding! Hardware Master!'
              : percentage >= 50
              ? language === 'gu'
                ? 'સરસ પ્રયાસ! સારો સ્કોર!'
                : 'Good Job! Solid Foundation!'
              : language === 'gu'
              ? 'ફરીથી પ્રયાસ કરો અને નવું શીખો!'
              : 'Keep Practicing & Learning!'}
          </h4>

          <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
            {language === 'gu'
              ? `તમે ${total} માંથી ${score} પ્રશ્નોના સાચા જવાબ આપ્યા (${percentage}% સફળતા).`
              : `You scored ${score} out of ${total} questions correctly (${percentage}% accuracy).`}
          </p>

          <div className="inline-flex items-center gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-lg shadow-cyan-600/30"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{language === 'gu' ? 'ક્વિઝ ફરીથી આપો' : 'Retake Quiz'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
