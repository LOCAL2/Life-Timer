"use client";

import { useState, useEffect, useRef } from "react";
import { differenceInYears, differenceInMonths, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";
// เพิ่ม import SVG
import Image from 'next/image';

// Animated number counting hook
function useAnimatedNumber(target, duration = 600) {
  const [value, setValue] = useState(target);
  const raf = useRef();
  useEffect(() => {
    let start;
    let prev = value;
    function animate(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const next = Math.round(prev + (target - prev) * progress);
      setValue(next);
      if (progress < 1) raf.current = requestAnimationFrame(animate);
    }
    if (prev !== target) {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line
  }, [target]);
  return value;
}

export default function Home() {
  const [birthDateOnly, setBirthDateOnly] = useState("");
  const [birthTimeOnly, setBirthTimeOnly] = useState("");
  const [age, setAge] = useState(null);
  const [animate, setAnimate] = useState(false);
  const [nextMilestone, setNextMilestone] = useState(null);
  const [nextBirthdayDay, setNextBirthdayDay] = useState("");

  // รวมวันและเวลาเป็น ISO string
  const getBirthDateTimeString = () => {
    if (!birthDateOnly) return "";
    if (!birthTimeOnly) return birthDateOnly + "T00:00";
    return birthDateOnly + "T" + birthTimeOnly;
  };

  useEffect(() => {
    const birthDateTime = getBirthDateTimeString();
    if (birthDateTime) {
      const updateAge = () => {
        const now = new Date();
        const birth = new Date(birthDateTime);
        const years = differenceInYears(now, birth);
        const months = differenceInMonths(now, birth) % 12;
        const days = differenceInDays(now, birth) % 30;
        const hours = differenceInHours(now, birth) % 24;
        const minutes = differenceInMinutes(now, birth) % 60;
        const seconds = differenceInSeconds(now, birth) % 60;
        const nextBirthday = new Date(birth);
        nextBirthday.setFullYear(now.getFullYear() + (now < new Date(now.getFullYear(), birth.getMonth(), birth.getDate()) ? 0 : 1));
        const daysToNextBirthday = Math.ceil(differenceInDays(nextBirthday, now));
        setNextMilestone(daysToNextBirthday);
        setNextBirthdayDay(nextBirthday.toLocaleDateString('th-TH', { weekday: 'long' }));
        setAge({ years, months, days, hours, minutes, seconds });
      };
      updateAge();
      const interval = setInterval(updateAge, 1000);
      return () => clearInterval(interval);
    }
  }, [birthDateOnly, birthTimeOnly]);

  const getTotalDays = () => {
    const birthDateTime = getBirthDateTimeString();
    if (!birthDateTime) return 0;
    return differenceInDays(new Date(), new Date(birthDateTime));
  };

  const formatBirthDate = (dateString, timeString) => {
    if (!dateString) return '';
    let birthString = dateString;
    if (!timeString) {
      birthString = dateString + 'T00:00';
    } else {
      birthString = dateString + 'T' + timeString;
    }
    const date = new Date(birthString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const datePart = date.toLocaleDateString('th-TH', options);
    const timePart = date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', hour12: false });
    return `${datePart} เวลา ${timePart} (${date.getFullYear()})`;
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col items-center justify-center p-0">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mt-8 mb-2 tracking-tight text-center">Life Journey Timer</h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8 text-center">การเดินทางของคุณ</p>
        <div className="w-full flex flex-col items-center mb-10 px-2 sm:px-0">
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
            <div className="flex flex-col w-full sm:w-1/2">
              <label htmlFor="birth-date" className="text-gray-700 text-sm font-medium mb-1 text-center">วันเกิด</label>
              <input
                id="birth-date"
                type="date"
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 text-center text-gray-800 bg-white shadow-sm"
                value={birthDateOnly}
                onChange={(e) => setBirthDateOnly(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full sm:w-1/2">
              <label htmlFor="birth-time" className="text-gray-700 text-sm font-medium mb-1 text-center">เวลาเกิด</label>
              <input
                id="birth-time"
                type="time"
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 text-center text-gray-800 bg-white shadow-sm"
                value={birthTimeOnly}
                onChange={(e) => setBirthTimeOnly(e.target.value)}
              />
            </div>
          </div>
        </div>
        {age && (
          <div className="w-full max-w-6xl flex flex-col gap-10 items-center fade-in-anim px-2 sm:px-4 md:px-8">
            {/* วันเกิด */}
            <div className="w-full flex flex-col items-center mb-2 animate-fadeIn">
              <p className="text-base sm:text-lg text-gray-700 mb-1 text-center">คุณเกิดวันที่</p>
              <p className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-900 tracking-tight text-center">{formatBirthDate(birthDateOnly, birthTimeOnly)}</p>
            </div>
            {/* Grid 6 ช่อง: ปี เดือน วัน ชั่วโมง นาที วินาที */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              <AgeCard label="ปี" value={age.years} color="blue" />
              <AgeCard label="เดือน" value={age.months} color="blue" />
              <AgeCard label="วัน" value={age.days} color="blue" />
              <AgeCard label="ชั่วโมง" value={age.hours} color="blue" />
              <AgeCard label="นาที" value={age.minutes} color="blue" />
              <AgeCard label="วินาที" value={age.seconds} color="blue" showProgressBar />
            </div>
            {/* Section รวมวัน/ชั่วโมง/นาที/วินาที (รวมทั้งหมด) */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 animate-fadeIn">
              <AgeCard label="วัน" value={getTotalDays()} color="gray" />
              <AgeCard label="ชั่วโมง" value={getTotalDays() * 24 + age?.hours || 0} color="gray" />
              <AgeCard label="นาที" value={getTotalDays() * 24 * 60 + age?.hours * 60 + age?.minutes || 0} color="gray" />
              <AgeCard label="วินาที" value={getTotalDays() * 24 * 60 * 60 + age?.hours * 60 * 60 + age?.minutes * 60 + age?.seconds || 0} color="gray" />
            </div>
            {/* วันเกิดถัดไป */}
            <div className="w-full flex items-center justify-center mt-8 animate-fadeIn px-0 sm:px-8">
              <div className="bg-white rounded-xl border border-gray-200 px-4 sm:px-6 py-5 shadow-sm w-full max-w-2xl">
                <p className="text-blue-900 text-base sm:text-lg md:text-xl font-semibold text-center">
                  อีก {nextMilestone} วันจะถึงวันเกิดของคุณ ซึ่งตรงกับ{nextBirthdayDay}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// AgeCard component
function AgeCard({ label, value, color, showProgressBar }) {
  const animated = useAnimatedNumber(value);
  // Progress bar สำหรับวินาที
  const percent = label === "วินาที" ? (value % 60) / 60 : 0;
  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 py-7 flex flex-col items-center justify-center shadow-sm transition-transform duration-200 hover:scale-105 hover:shadow-lg group fade-in-anim`}
      tabIndex={0}
    >
      <div className={`text-3xl md:text-4xl font-bold text-blue-900 mb-1 select-all transition-colors duration-200`}>
        {animated.toLocaleString()}
      </div>
      <div className="text-base text-gray-500 font-medium mb-1">{label}</div>
      {showProgressBar && (
        <div className="w-10/12 h-1.5 bg-gray-200 rounded-full overflow-hidden mt-2">
          <div
            className="h-full bg-blue-400 transition-all duration-200"
            style={{ width: `${percent * 100}%` }}
          />
        </div>
      )}
    </div>
  );
}

// Fade-in animation CSS
<style jsx global>{`
  .fade-in-anim { animation: fadeIn 0.7s cubic-bezier(.39,.575,.565,1) both; }
  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(24px); }
    100% { opacity: 1; transform: none; }
  }
  .animate-fadeIn { animation: fadeIn 0.7s cubic-bezier(.39,.575,.565,1) both; }
  input:focus { box-shadow: 0 0 0 2px #3b82f6 !important; border-color: #3b82f6 !important; }
`}</style>