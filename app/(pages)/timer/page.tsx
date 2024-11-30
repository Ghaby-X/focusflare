'use client'
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, SkipForward, Timer } from 'lucide-react';

const page = () => {
    let WORK_DURATION = Number(localStorage.getItem('WORK_DURATION')) * 60
    let SHORT_BREAK_DURATION = Number(localStorage.getItem('SHORT_BREAK_DURATION')) * 60
    let LONG_BREAK_DURATION = Number(localStorage.getItem('LONG_BREAK_DURATION')) * 60
    // SETTING DURATIONS
    useEffect(() => {


        if (WORK_DURATION <= 0 || Number.isNaN(WORK_DURATION)) {
            WORK_DURATION = 25 * 60
        }
        if (SHORT_BREAK_DURATION <= 0 || Number.isNaN(SHORT_BREAK_DURATION)) {
            SHORT_BREAK_DURATION = 5 * 60
        }
        if (LONG_BREAK_DURATION <= 0 || Number.isNaN(LONG_BREAK_DURATION)) {
            LONG_BREAK_DURATION = 15 * 60
        }
    }, [])

    const [timeRemaining, setTimeRemaining] = useState(WORK_DURATION);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState('work1'); // 'work1', 'short-break', 'work2', 'long-break'
    const [completedCycles, setCompletedCycles] = useState(0);
    const [sessionNumber, setSessionNumber] = useState(1);
    const [autostart, setAutostart] = useState(false);


    // Timer logic
    useEffect(() => {
        let interval: any = null;

        if (isRunning && timeRemaining > 0) {
            interval = setInterval(() => {
                setTimeRemaining(prev => prev - 1);
            }, 1000);
        } else if (timeRemaining === 0) {
            handleTimerComplete();
        }

        return () => clearInterval(interval);
    }, [isRunning, timeRemaining]);

    const advanceSession = () => {
        // Cycle progression logic
        switch (mode) {
            case 'work1':
                setMode('short-break');
                setTimeRemaining(SHORT_BREAK_DURATION);
                setSessionNumber(2);
                break;
            case 'short-break':
                setMode('work2');
                setTimeRemaining(WORK_DURATION);
                setSessionNumber(3);
                break;
            case 'work2':
                setMode('long-break');
                setTimeRemaining(LONG_BREAK_DURATION);
                setSessionNumber(4);
                break;
            case 'long-break':
                setMode('work1');
                setTimeRemaining(WORK_DURATION);
                setCompletedCycles(prev => prev + 1);
                setSessionNumber(1);
                break;
        }
    };

    const handleTimerComplete = () => {
        setIsRunning(false);
        advanceSession();

        // Autostart next session if enabled
        if (autostart) {
            setIsRunning(true);
        }
    };


    const toggleTimer = () => {
        setIsRunning(prev => !prev);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setTimeRemaining(WORK_DURATION);
        setMode('work1');
        setCompletedCycles(0);
        setSessionNumber(1);
    };

    // Format time as mm:ss
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Color and icon based on current mode
    const getModeDetails = () => {
        switch (mode) {
            case 'work1':
            case 'work2':
                return {
                    color: 'bg-red-500',
                    icon: <Timer className="w-10 h-10" />,
                    text: mode === 'work1' ? 'Focus 1' : 'Focus 2'
                };
            case 'short-break':
                return {
                    color: 'bg-green-500',
                    icon: <Play className="w-10 h-10" />,
                    text: 'Short Break'
                };
            case 'long-break':
                return {
                    color: 'bg-blue-500',
                    icon: <Play className="w-10 h-10" />,
                    text: 'Long Break'
                };
        }
    };

    const { color, icon, text } = getModeDetails();

    const progress = (mode == "work1" || mode == 'work2') ?
        ((WORK_DURATION - timeRemaining) / WORK_DURATION) * 100 : mode == "short-break" ?
            ((SHORT_BREAK_DURATION - timeRemaining) / SHORT_BREAK_DURATION) * 100 :
            ((LONG_BREAK_DURATION - timeRemaining) / LONG_BREAK_DURATION) * 100

    const radius = 120;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
            <div className='relative'>
                <svg className="transform -rotate-90 w-72 h-72">
                    {/* Background circle */}
                    <circle
                        cx="144"
                        cy="144"
                        r={radius}
                        className="fill-none stroke-slate-200"
                        strokeWidth="12"
                    />
                    {/* Progress circle */}
                    <circle
                        cx="144"
                        cy="144"
                        r={radius}
                        className={`fill-none ${!isRunning ? 'stroke-green-500' : 'stroke-orange-500'}`}
                        strokeWidth="12"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                    />
                </svg>

                {/* Timer Display */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <h2 className="text-2xl font-semibold mb-2 text-slate-600">
                        {text}
                    </h2>
                    <div className="text-5xl font-bold text-slate-800">
                        {formatTime(timeRemaining)}
                    </div>
                </div>
            </div>


            {/* Controls */}
            <div className="mt-8 flex gap-4">
                <button
                    onClick={toggleTimer}
                    className={`p-4 rounded-full ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                        } text-white transition-colors`}
                >
                    {isRunning ? <Pause size={24} /> : <Play size={24} />}
                </button>

                <button
                    onClick={resetTimer}
                    className="p-4 rounded-full bg-slate-500 hover:bg-slate-600 text-white transition-colors"
                >
                    <RotateCcw size={24} />
                </button>

                <button
                    onClick={advanceSession}
                    className="p-4 rounded-full bg-slate-500 hover:bg-slate-600 text-white transition-colors"
                >
                    <SkipForward size={24} />
                </button>
            </div>

            {/* Stats */}
            <div className="mt-8 text-center text-slate-600">
                <p className="text-lg">Completed Cycles: {completedCycles}</p>
                <p className="text-sm mt-2">
                    {completedCycles * 25} minutes of focus time
                </p>
            </div>
        </div>

    )
}

export default page