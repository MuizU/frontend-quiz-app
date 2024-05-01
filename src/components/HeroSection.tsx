"use client";
import SelectionButton from "@/components/SelectionButton";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface IHeroSection {
  quizzes: [];
}

export default function HeroSection({ quizzes }: IHeroSection) {
  const router = useRouter();

  const handleClick = (title: string) => {
    router.push(`/quiz/${title}`);
  };
  return (
    <div className="flex flex-col gap-5 justify-normal items-center ">
      {quizzes.map(({ title, icon }: { title: string; icon: string }) => (
        <SelectionButton key={title} onClick={() => handleClick(title)}>
          <Image src={icon} height={20} width={20} alt="title" />
          <span>{title}</span>
        </SelectionButton>
      ))}
    </div>
  );
}
