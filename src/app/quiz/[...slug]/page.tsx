'use client'; 
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface IQuestion {
  question: string;
  options: string[];
  answer: string;
}

interface IQuizData {
  title: string;
  icon: string;
  questions: IQuestion[];
}

interface IQuizzesData {
  quizzes: IQuizData[];
}

const getOptionLetter = (index: number) => String.fromCharCode(65 + index);

export default function Quiz({ params }: { params: { slug: string[] } }) {
  const [quizData, setQuizData] = useState<IQuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showSelectionError, setShowSelectionError] = useState(false);

  const quizSlug = params.slug[0]; 


  useEffect(() => {
    async function fetchQuizData() {
      try {
        const response = await fetch('/data.json'); 
        if (!response.ok) {
          throw new Error('Failed to fetch quiz data');
        }

        const allQuizzes: IQuizzesData = await response.json();
        const currentQuiz = allQuizzes.quizzes.find(
          (q) => q.title === quizSlug
        );

        if (currentQuiz) {
          setQuizData(currentQuiz);
        } else {
          setError('Quiz not found');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while loading the quiz.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchQuizData();
  }, [quizSlug]); 

  const handleOptionSelect = (option: string) => {
    if (!isSubmitted) {
      setSelectedOption(option);
      setShowSelectionError(false); 
    }
  };

  const handleSubmitOrNext = () => {
    if (!isSubmitted) {
      if (selectedOption === null) {
        setShowSelectionError(true);
        return; 
      }

      setIsSubmitted(true);
      setShowSelectionError(false); 

      if (selectedOption === quizData?.questions[currentQuestionIndex].answer) {
        setScore((prevScore) => prevScore + 1);
      }
    } else {
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (quizData && nextQuestionIndex < quizData.questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
        setSelectedOption(null);
        setIsSubmitted(false);
      } else {
        setQuizFinished(true);
      }
    }
  };

  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
    setShowSelectionError(false);
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 py-12 text-[#313e51] dark:text-white">
        <p className="text-xl italic">Loading Quiz...</p>
      </main>
    );
  }

  if (error || !quizData) {
    return (
      <main className="flex min-h-screen items-start justify-center px-24 py-12 text-[#313e51] dark:text-white">
        <div className="flex flex-col justify-start text-center">
          <p className="text-3xl font-bold text-red-500">Error</p>
          <p className="mt-2 text-xl">{error || 'Quiz data could not be loaded.'}</p>
        </div>
      </main>
    );
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const totalQuestions = quizData.questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const getOptionClasses = (option: string) => {
    let baseClasses =
      'flex items-center w-full p-3 mb-4 bg-white dark:bg-[#3b4d66] rounded-xl shadow-sm border-[3px] border-transparent cursor-pointer group';
    let stateClasses = '';

    if (!isSubmitted) {
      if (selectedOption === option) {
        stateClasses = 'border-purple-600 dark:border-purple-500';
      } else {
        stateClasses = 'hover:border-purple-400 dark:hover:border-purple-400'; 
      }
    } else {
      const isCorrectAnswer = option === currentQuestion.answer;
      const isSelectedAnswer = option === selectedOption;

      if (isCorrectAnswer) {
        stateClasses = 'border-green-500 dark:border-green-400 cursor-not-allowed'; 
      } else if (isSelectedAnswer && !isCorrectAnswer) {
        stateClasses = 'border-red-500 dark:border-red-400 cursor-not-allowed';
      } else {
        stateClasses = 'cursor-not-allowed opacity-70';
      }
    }
    return `${baseClasses} ${stateClasses}`;
  };

  const getIndicatorClasses = (option: string) => {
    let baseClasses =
      'w-10 h-10 flex-shrink-0 mr-4 rounded-md flex items-center justify-center font-medium text-[#626c7f] group-hover:bg-[#f0e7ff] group-hover:text-purple-600 dark:group-hover:bg-[#5e548e] dark:group-hover:text-white';
    let stateClasses = 'bg-[#f4f6fa]';

    if (!isSubmitted) {
        if (selectedOption === option) {
            stateClasses = 'bg-purple-600 text-white'; 
        }
    } else {
         const isCorrectAnswer = option === currentQuestion.answer;
         const isSelectedAnswer = option === selectedOption;
         if (isCorrectAnswer) {
            stateClasses = 'bg-green-500 text-white'; 
         } else if (isSelectedAnswer && !isCorrectAnswer) {
             stateClasses = 'bg-red-500 text-white'; 
         } else {
            stateClasses = 'bg-[#f4f6fa] dark:bg-[#313e51]'; 
         }
    }
     return `${baseClasses} ${stateClasses}`;
  };

   const renderFeedbackIcon = (option: string) => {
    if (!isSubmitted) return null;

    const isCorrectAnswer = option === currentQuestion.answer;
    const isSelectedAnswer = option === selectedOption;

    if (isCorrectAnswer) {
      return (
        <svg className="ml-auto h-7 w-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    } else if (isSelectedAnswer && !isCorrectAnswer) {
      return (
        <svg className="ml-auto h-7 w-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
    }
    return null;
   }


  if (quizFinished) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-6 py-12 text-[#313e51] dark:text-white">
         <div className="w-full max-w-xl text-center mb-8">
             <h1 className="text-4xl md:text-5xl font-light mb-2">Quiz completed</h1>
             <p className="text-5xl md:text-6xl font-medium">You scored...</p>
         </div>
        <div className="bg-white dark:bg-[#3b4d66] p-8 rounded-xl shadow-md w-full max-w-md text-center mb-8">
          {/* Re-add header section similar to layout if needed */}
           <div className="flex justify-center items-center gap-4 text-xl mb-6">
             <Image src={quizData.icon} height={40} width={40} alt={quizData.title} className="bg-white rounded-md p-1"/>
             <p className="text-2xl font-medium">{quizData.title}</p>
           </div>
          <p className="text-7xl font-medium mb-2">{score}</p>
          <p className="text-lg text-slate-500 dark:text-slate-300">out of {totalQuestions}</p>
        </div>
        <button
          onClick={handlePlayAgain}
          className="w-full max-w-md py-4 px-6 bg-purple-600 text-white rounded-xl text-lg font-medium hover:bg-purple-700 transition duration-200 shadow-sm"
        >
          Play Again
        </button>
      </main>
    );
  }

  return (
    <main className="flex flex-col md:flex-row min-h-[calc(100vh-200px)] items-start justify-between px-6 md:px-16 lg:px-24 py-10 gap-10 md:gap-16 lg:gap-24 text-[#313e51] dark:text-white">
      {/* Left Side: Question Info */}
      <div className="w-full md:w-1/2 flex flex-col justify-start">
        <p className="text-sm italic text-slate-500 dark:text-slate-400 mb-3">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </p>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-medium mb-6 md:mb-10">
          {currentQuestion.question}
        </h2>
        {/* Progress Bar */}
        <div className="w-full bg-white dark:bg-[#3b4d66] rounded-full h-2 shadow-inner">
             <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            />
        </div>
      </div>

      {/* Right Side: Options & Button */}
      <div className="w-full md:w-1/2">
        {/* Options */}
        <div className="mb-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={option}
              onClick={() => handleOptionSelect(option)}
              disabled={isSubmitted}
              className={getOptionClasses(option)}
              aria-pressed={selectedOption === option} 
            >
              <span className={getIndicatorClasses(option)}>
                 {getOptionLetter(index)}
              </span>
              <span className="text-lg font-medium text-left">{option}</span>
              {renderFeedbackIcon(option)}
            </button>
          ))}
        </div>

        {/* Submit/Next Button */}
        <button
          onClick={handleSubmitOrNext}
          className="w-full py-4 px-6 bg-purple-600 text-white rounded-xl text-lg font-medium hover:bg-purple-700 transition duration-200 shadow-sm disabled:opacity-50"
        >
          {isSubmitted
            ? isLastQuestion
              ? 'Show Results'
              : 'Next Question'
            : 'Submit Answer'}
        </button>

        {/* Selection Error Message */}
        {showSelectionError && (
            <div className="mt-4 flex items-center justify-center text-red-500 dark:text-red-400 text-sm font-medium">
                 <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                Please select an answer
            </div>
        )}
      </div>
    </main>
  );
}