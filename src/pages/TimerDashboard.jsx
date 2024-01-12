import React, { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const TimerDashboard = () => {
  const { logOut, user } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  }
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // 25 minutes timer completed, reset and start 5 minutes break
            clearInterval(interval);
            setMinutes(5);
            setSeconds(0);
            setIsActive(false);
            setTimeout(() => {
              setIsActive(true);
            }, 1000);
          } else {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <div className="-mt-10 p-10 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0 mx-auto">
      <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
        <h1 className='text-center text-2xl font-bold pt-12'>Let's Start</h1>
        <div className='w-3/2 py-4 '>
          <p>Hello, {user?.displayName} !!!</p>
        </div>
        <div>
      <div className="px-4 py-4 text-6xl font-bold">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <button className="border py-2 px-4 rounded-lg bg-green-500 mr-4 text-gray-50 text-xl shadow-sm text-center" onClick={startTimer}>Start</button>
      <button className="bg-blue-500 mr-4 py-2 px-4 rounded-lg text-gray-50 text-xl shadow-sm text-center" onClick={pauseTimer}>Pause</button>
      <button className="bg-yellow-500 mr-4 mb-4 py-2 px-4 rounded-lg text-gray-50 text-xl shadow-sm text-center" onClick={resetTimer}>Reset</button>
    </div>
        <button className="border bg-red-500 py-2 rounded-lg text-gray-50 text-xl shadow-sm text-center" onClick={handleSignOut}>LogOut</button>
      </div>
    </div>
  )
}

export default TimerDashboard