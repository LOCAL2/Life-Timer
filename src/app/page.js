"use client";

import { useState, useEffect } from "react";
import { differenceInYears, differenceInMonths, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";

export default function Home() {
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState(null);
  const [animate, setAnimate] = useState(false);
  const [nextMilestone, setNextMilestone] = useState(null);
  const [nextBirthdayDay, setNextBirthdayDay] = useState("");

  useEffect(()=>{
    if(birthDate){
      const updateAge = () => {
        const now = new Date();
        const birth = new Date(birthDate);
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
  }, [birthDate]);

  const getTotalDays = () => {
    if (!birthDate) return 0;
    return differenceInDays(new Date(), new Date(birthDate));
  };

  const formatBirthDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return `${date.toLocaleDateString('th-TH', options)} (${date.getFullYear()})`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className={`bg-white/90 rounded-3xl p-8 max-w-xl w-full shadow-2xl transform transition-all duration-300 hover:scale-[1.02]`}>
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6">
            <span className="inline-block animate-bounce text-5xl mr-3">⏳</span>
            Life Journey Timer
          </h1>
          <p className="text-lg text-gray-700 font-medium mb-6">เริ่มต้นการเดินทางของคุณ</p>
          <div className="w-full max-w-md relative mb-8">
            <input
              type="date"
              className="w-full px-6 py-4 text-lg border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-center text-gray-700"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          {age && (
            <div className="w-full space-y-6 animate-fadeIn">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6">
                <p className="text-xl text-gray-800 font-medium mb-4">✨ คุณเกิดวันที่ {formatBirthDate(birthDate)}</p>
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                  <p>อายุ {age.years} ปี {age.months} เดือน {age.days} วัน</p>
                  <p>{age.hours} ชั่วโมง {age.minutes} นาที {age.seconds} วินาที</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-2xl p-6 transform transition-all hover:scale-105">
                  <p className="text-blue-600 text-lg font-semibold">
                    🌟 {getTotalDays().toLocaleString()} วัน
                  </p>
                </div>
                <div className="bg-pink-50 rounded-2xl p-6 transform transition-all hover:scale-105">
                  <p className="text-pink-600 text-lg font-semibold">
                    ⏰ {(getTotalDays() * 24 + age?.hours || 0).toLocaleString()} ชั่วโมง
                  </p>
                </div>
                <div className="bg-red-50 rounded-2xl p-6 transform transition-all hover:scale-105">
                  <p className="text-red-600 text-lg font-semibold">
                    ⚡️ {(getTotalDays() * 24 * 60 + age?.hours * 60 + age?.minutes || 0).toLocaleString()} นาที
                  </p>
                </div>
                <div className="bg-orange-50 rounded-2xl p-6 transform transition-all hover:scale-105">
                  <p className="text-orange-600 text-lg font-semibold">
                    🔥 {(getTotalDays() * 24 * 60 * 60 + age?.hours * 60 * 60 + age?.minutes * 60 + age?.seconds || 0).toLocaleString()} วินาที
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6 transform transition-all hover:scale-105">
                <p className="text-emerald-600 text-xl font-semibold">
                  🎂 อีก {nextMilestone} วันจะถึงวันเกิดของคุณ ซึ่งตรงกับ{nextBirthdayDay}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}