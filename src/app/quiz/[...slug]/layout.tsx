import type { Metadata } from "next";
import "../../globals.css";
import { switchThemeDuration } from "../../constants/switch-theme-duration";
import { ThemeProvider } from "../../theme-provider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import localFont from "next/font/local";
import { promises as fs } from "fs";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Quiz App",
  description: "A quiz app for frontend mentor by Muiz Uvais",
};

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

export default async function QuizLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const file = await fs.readFile(process.cwd() + "/data.json", "utf8");
  const { quizzes } = JSON.parse(file);
  const { title, icon } = quizzes.find(
    ({ title }: { title: string }) => title === params.slug[0]
  );

  return (
    <html lang="en" className={`${rubik.variable} font-sans`}>
      <body
        className={` ${rubik.variable} font-sans bg-slate-50 bg-[#f4f6fa] dark:bg-[#313e51] dark:bg-[url(/images/pattern-background-desktop-dark.svg)] bg-[url(/images/pattern-background-desktop-light.svg)] ${switchThemeDuration}
        light:bg-[url('/images/pattern-background-mobile-light.svg')] dark:bg-[url('/images/pattern-background-mobile-dark.svg')]
        md:light:bg-[url('/images/pattern-background-tablet-light.svg')] md:dark:bg-[url('/images/pattern-background-tablet-dark.svg')]
        lg:light:bg-[url('/images/pattern-background-desktop-light.svg')] lg:dark:bg-[url('/images/pattern-background-desktop-dark.svg')]
        `}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="p-20 flex justify-between">
            <div className="flex justify-between gap-10 text-xl">
              <Image src={icon} height={20} width={20} alt={title} />
              <p>{title}</p>
            </div>
            <ThemeSwitcher />
          </div>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
