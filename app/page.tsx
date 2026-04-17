import Animation404 from "@/components/Animation404";

export default function Home() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main
                className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start">
                <div className="flex flex-col max-w-4xl items-center gap-6 text-center mx-auto">
                    <div>
                        <h1 className="bg-yellow-300 w-fit mx-auto text-5xl leading-none font-semibold text-black rounded-sm shadow shadow-zinc-900/40 py-1 px-5 mb-3">
                            DotLottie
                        </h1>
                        <h2 className="text-4xl leading-tight font-semibold tracking-tight text-black mb-3">
                            De Toekomst van Webanimatie
                        </h2>
                    </div>
                        <p className="leading-6 text-zinc-600 dark:text-zinc-400">
                            Ervaar de kracht van vector-gebaseerde beweging. In tegenstelling tot zware GIF's of wazige
                            video's, biedt Lottie haarscherpe 60fps animaties in een JSON-formaat dat kleiner is dan een
                            gemiddelde afbeelding. Perfecte scherpte op elk scherm, van smartphone tot 4K-monitor.
                        </p>
                    <Animation404/>
                </div>

            </main>
        </div>
    );
}
