import SelectionButton from "@/components/SelectionButton";
import { promises as fs } from "fs";
import Image from "next/image";

export default async function Home() {
  const file = await fs.readFile(process.cwd() + "/data.json", "utf8");
  const { quizzes } = JSON.parse(file);
  return (
    <>
      <main className="flex min-h-screen items-start justify-between px-24 py-12">
        <div className="flex flex-col justify-start text-7xl">
          <p className="font-thin">Welcome to the</p>
          <p className="font-semibold">Frontend Quiz!</p>

          <p className="mt-10 italic text-base">
            Pick a subject to get started
          </p>
        </div>
        <div className="flex flex-col gap-5 justify-normal items-center ">
          {quizzes.map(({ title, icon }: { title: string; icon: string }) => (
            <SelectionButton key={title}>
              <Image src={icon} height={20} width={20} alt="title" />
              <span>{title}</span>
            </SelectionButton>
          ))}
        </div>
      </main>
    </>
  );
}
