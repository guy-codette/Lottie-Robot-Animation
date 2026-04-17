import Animation404 from "@/components/Animation404";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col max-w-4xl items-center gap-6 text-center mx-auto">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 ">
            Lottie, de Toekomst van Webanimatie
          </h1>
          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Ervaar de kracht van vector-gebaseerde beweging. In tegenstelling tot zware GIF's of wazige video's, biedt Lottie haarscherpe 60fps animaties in een JSON-formaat dat kleiner is dan een gemiddelde afbeelding. Perfecte scherpte op elk scherm, van smartphone tot 4K-monitor.
          </p>
          <div className="mx-auto">
            <Animation404 />
          </div>
        </div>

      </main>
    </div>
  );
}
