import type { Metadata } from "next";
import "../../globals.css";
const switchThemeDuration = "transition-colors duration-300 ease-in-out"; 
import { ThemeProvider } from "../../theme-provider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import localFont from "next/font/local";
import { promises as fs } from "fs"; 
import path from "path";
import Image from "next/image";

interface IQuizData {
  title: string;
  icon: string;
}

interface IQuizzesData {
  quizzes: IQuizData[];
}

export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
  const defaultTitle = "Quiz | Quiz App";
  const defaultDescription = "A quiz app for frontend mentor by Muiz Uvais";
  const quizSlug = params.slug[0];

  const filePath = path.join(process.cwd(), "public", "data.json"); 
  try {
    const file = await fs.readFile(filePath, "utf8");
    const { quizzes }: IQuizzesData = JSON.parse(file);
    const quiz = quizzes.find(({ title }) => title === quizSlug);

    if (quiz) {
      return {
        title: `${quiz.title} Quiz | Quiz App`, // Specific title
        description: `Take the ${quiz.title} quiz! ${defaultDescription}`, 
      };
    } else {
        console.warn(`Quiz "${quizSlug}" not found for metadata generation.`);
         return {
            title: defaultTitle,
            description: defaultDescription,
         }
    }
  } catch (error) {
     console.error("Failed to read data for metadata:", error);
     return {
        title: defaultTitle,
        description: defaultDescription,
     };
  }
}

const rubik = localFont({
  src: [
    {
      path: "../../../../public/fonts/Rubik-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
    {
      path: "../../../../public/fonts/Rubik-VariableFont_wght.ttf",
      style: "normal",
    },
  ],
  variable: "--font-rubik",
});

// --- Layout Component ---
export default async function QuizLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string[] }; 
}) {
  let title = "Quiz";
  let icon = "/images/icon-default.svg"; 
  const quizSlug = params.slug[0];

  try {
      const filePath = path.join(process.cwd(), "public", "data.json");

      const file = await fs.readFile(filePath, "utf8");
      const { quizzes }: IQuizzesData = JSON.parse(file);
      const currentQuiz = quizzes.find((q: IQuizData) => q.title === quizSlug);

      if (currentQuiz) {
        title = currentQuiz.title;
        icon = currentQuiz.icon;
      } else {
         console.warn(`Quiz with title "${quizSlug}" not found in data.json for layout header.`);
      }
  } catch (error) {
     console.error("Error reading data.json in layout:", error);
  }


  return (
    <html lang="en" className={`${rubik.variable} font-sans`}>
      <body
        className={` ${rubik.variable} font-sans bg-slate-50 bg-[#f4f6fa] dark:bg-[#313e51] dark:bg-[url(/images/pattern-background-desktop-dark.svg)] bg-[url(/images/pattern-background-desktop-light.svg)] ${switchThemeDuration}
         light:bg-[url('/images/pattern-background-mobile-light.svg')] dark:bg-[url('/images/pattern-background-mobile-dark.svg')]
         md:light:bg-[url('/images/pattern-background-tablet-light.svg')] md:dark:bg-[url('/images/pattern-background-tablet-dark.svg')]
         lg:light:bg-[url('/images/pattern-background-desktop-light.svg')] lg:dark:bg-[url('/images/pattern-background-desktop-dark.svg')]
         bg-no-repeat bg-cover
        `}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="p-6 md:p-10 lg:p-20 flex justify-between max-w-6xl mx-auto">
            <div className="flex justify-between items-center gap-4 md:gap-6 lg:gap-10 text-xl">
              {icon && title && (
                <>
                  <Image src={icon} height={56} width={56} alt={title} className="w-10 h-10 md:w-14 md:h-14"/>
                  <p className="text-lg md:text-xl lg:text-2xl font-medium text-[#313e51] dark:text-white">{title}</p>
                </>
              )}
            </div>
            <ThemeSwitcher />
          </header>
          <main className="max-w-6xl mx-auto">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}