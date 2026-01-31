import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer() {
  const targetDate = new Date("2026-05-25T17:00:00");

  const calculateTimeLeft = (): TimeLeft => {
    const difference = +targetDate - +new Date();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="r rounded-lg px-6 py-4 min-w-[100px]">
        <div className="text-4xl md:text-5xl font-bold text-[#D4AF37] xl:text-[#CEAB93] font-serif ">
          {String(value).padStart(2, "0")}
        </div>
      </div>
      <div className="text-sm md:text-base md:text-[#AD8B73]/70 mt-2 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );

  return (
    <div className="flex gap-4 md:gap-6 justify-center scale-70">
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}
