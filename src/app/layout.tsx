import type { Metadata } from "next";
import "./globals.css";
import { switchThemeDuration } from "./constants/switch-theme-duration";
import { ThemeProvider } from "./theme-provider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Quiz App",
  description: "A quiz app for frontend mentor by Muiz Uvais",
};

const rubik = localFont({
  src: [
    {
      path: "../../public/fonts/Rubik-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
    {
      path: "../../public/fonts/Rubik-VariableFont_wght.ttf",
      style: "normal",
    },
  ],
  variable: "--font-rubik",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${rubik.variable} font-sans`} >
 <body
        className={` ${rubik.variable} font-sans bg-slate-50 bg-[#f4f6fa] dark:bg-[#313e51] dark:bg-[url(/images/pattern-background-desktop-dark.svg)] bg-[url(/images/pattern-background-desktop-light.svg)] ${switchThemeDuration}
         light:bg-[url('/images/pattern-background-mobile-light.svg')] dark:bg-[url('/images/pattern-background-mobile-dark.svg')]
         md:light:bg-[url('/images/pattern-background-tablet-light.svg')] md:dark:bg-[url('/images/pattern-background-tablet-dark.svg')]
         lg:light:bg-[url('/images/pattern-background-desktop-light.svg')] lg:dark:bg-[url('/images/pattern-background-desktop-dark.svg')]
         bg-no-repeat bg-cover 
        `}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="p-20 flex justify-end">
            <ThemeSwitcher />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
