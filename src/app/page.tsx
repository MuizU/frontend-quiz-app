import Script from "next/script";

export default function Home() {
  return (
    <>
      <Script src="./dark-mode.ts" />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
      </main>
    </>
  );
}
