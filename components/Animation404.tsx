'use client';
import clsx from 'clsx';
import React from 'react';
import {useState, useEffect, useRef} from 'react';
import {PlayIcon, PauseIcon, StopIcon} from '@heroicons/react/24/solid'
import {DotLottieReact, DotLottie} from '@lottiefiles/dotlottie-react';

export default function Animation404() {
    const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);
    const [currentFrame, setCurrentFrame] = useState<number>(0);
    const [isScrubbing, setIsScrubbing] = useState<boolean>(false);
    const progressBarRef = useRef<HTMLDivElement>(null);

    // Deze functie wordt aangeroepen zodra de player klaar is
    const lottieRefCallback = (instance: DotLottie) => {
        setDotLottie(instance);
    };

    useEffect(() => {
        if (!dotLottie) return;

        const handleFrame = () => {
            setCurrentFrame(Math.floor(dotLottie.currentFrame));
        };

        dotLottie.addEventListener('frame', handleFrame);

        return () => {
            dotLottie.removeEventListener('frame', handleFrame);
        };
    }, [dotLottie]);

    const handlePlay = () => {
        dotLottie?.setSegment(0, dotLottie.totalFrames);
        dotLottie?.play();
        dotLottie?.setLoop(true);
    };
    const handlePause = () => dotLottie?.pause();
    const handleStop = () => {
        dotLottie?.stop(); // Back to frame 0
        dotLottie?.setFrame(0); // Force if fails
    }
    const handleFirstPart = () => {
        dotLottie?.setFrame(0);
        dotLottie?.setSegment(0, 180);
        dotLottie?.play();
        dotLottie?.setLoop(false);
    }
    const handleLastPart = () => {
        dotLottie?.setFrame(180);
        dotLottie?.setSegment(180, 360);
        dotLottie?.play();
        dotLottie?.setLoop(false);
    }

    const handleScrub = (clientX: number) => {
        if (!dotLottie || !progressBarRef.current) return;

        const rect = progressBarRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percentage = x / rect.width;
        const frame = Math.floor(percentage * dotLottie.totalFrames);

        dotLottie.pause();
        dotLottie.setFrame(frame);
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsScrubbing(true);
        handleScrub(e.clientX);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isScrubbing) {
            handleScrub(e.clientX);
        }
    };

    const handleMouseUp = () => {
        setIsScrubbing(false);
    };

    useEffect(() => {
        if (isScrubbing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isScrubbing, dotLottie]);

    return (
        <div className="w-full">
            <div className="w-full">
                <DotLottieReact
                    src="/animations/error-404.lottie" // Pad vanaf de public map
                    loop
                    autoplay
                    dotLottieRefCallback={lottieRefCallback}
                />
            </div>
            {dotLottie ? (
                <div className="flex items-center text-xs text-zinc-700 gap-4 w-full max-w-lg mx-auto">
                    <span className="min-w-8 text-end">{currentFrame}</span>
                    <div
                        ref={progressBarRef}
                        className="grow w-full bg-zinc-200 rounded-xs h-2 overflow-hidden shadow-inner shadow-zinc-300 cursor-pointer"
                        onMouseDown={handleMouseDown}>
                        <div
                            className="h-full bg-yellow-300 pointer-events-none"
                            style={{width: `${(currentFrame / (dotLottie.totalFrames)) * 100}%`}}
                        />
                    </div>
                    <span className="min-w-8 text-start">{dotLottie.totalFrames}</span>
                </div>
            ) : (
                <span className="text-xs font-mono uppercase">Loading...</span>
            )}
            <div className="flex items-center justify-center gap-3 mt-4">
                <button onClick={handlePlay}
                        className="group/button p-2 rounded-lg hover:bg-yellow-300 transition-colors">
                    <PlayIcon className="size-6 text-zinc-700 group-hover/button:text-zinc-950 transition-colors"/>
                </button>
                <button onClick={handlePause}
                        className="group/button p-2 rounded-lg hover:bg-yellow-300 transition-colors">
                    <PauseIcon className="size-6 text-zinc-700 group-hover/button:text-zinc-950 transition-colors"/>
                </button>
                <button onClick={handleStop}
                        className="group/button p-2 rounded-lg hover:bg-yellow-300 transition-colors">
                    <StopIcon className="size-6 text-zinc-700 group-hover/button:text-zinc-950 transition-colors"/>
                </button>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
                <button onClick={handleFirstPart}
                        className={clsx(
                            "block py-1.5 px-3 text-xs font-mono uppercase rounded-sm bg-zinc-700",
                            "hover:bg-zinc-950 text-white hover:text-yellow-300 transition-colors"
                        )}>
                    Play first half
                </button>
                <button onClick={handleLastPart}
                        className={clsx(
                            "block py-1.5 px-3 text-xs font-mono uppercase rounded-sm bg-zinc-700",
                            "hover:bg-zinc-950 text-white hover:text-yellow-300 transition-colors"
                        )}>
                    Play last half
                </button>
            </div>
        </div>
    );
};
