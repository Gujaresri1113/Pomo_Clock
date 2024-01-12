import React, { useEffect } from 'react';
import GoogleButton from 'react-google-button';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const HomePage = () => {
  const {googleSignIn, user} = UserAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(user != null){
      navigate('/TimerDashboard')
    }
  },[user]);

  return (
    <div className="-mt-12 p-12 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0 mx-auto">
      <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
        <div className="mx-auto max-w-xs px-8">
          <p className="text-base font-semibold text-gray-600">Welcome to App, Login !!</p>
          <p className="mt-6 flex items-baseline justify-center gap-x-2">
          </p>
          <GoogleButton onClick={handleLogin}/>
          <p className="mt-6 text-xs leading-5 text-gray-600">
            Sign In to Continue....
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomePage