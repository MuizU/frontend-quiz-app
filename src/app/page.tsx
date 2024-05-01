import HeroSection from "@/components/HeroSection";
import { promises as fs } from "fs";

export default async function Home() {
  const file = await fs.readFile(process.cwd() + "/data.json", "utf8");
  const { quizzes } = JSON.parse(file);
  return (
    <>
      <main className="flex min-h-screen items-start justify-between px-24 py-12 text-[#313e51] dark:text-white">
        <div className="flex flex-col justify-start text-7xl">
          <p className="font-thin">Welcome to the</p>
          <p className="font-semibold">Frontend Quiz!</p>

          <p className="mt-10 italic text-base">
            Pick a subject to get started
          </p>
        </div>
        <HeroSection quizzes={quizzes} />
      </main>
    </>
  );
}
