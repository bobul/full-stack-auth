import React, {useState, FC, useContext, useEffect} from 'react';
import { Context } from '..';
import { useNavigate } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import { Oval } from 'react-loader-spinner';

const LoginPage :FC = function () {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {store} = useContext(Context);
  const navigate = useNavigate();
  useEffect(() =>{
    if(localStorage.getItem('token')){
      store.checkAuth();
    }
  }, [])

  if(store.isLoading){
    return <div className='h-screen flex items-center justify-center'>
    <Oval
      ariaLabel="loading-indicator"
      height={100}
      width={100}
      strokeWidth={5}
      strokeWidthSecondary={1}
      color="#009688"
      secondaryColor="white"
      />
    </div>
  }

  store.isAuth ? navigate('/account') : <LoginPage />
  return ( 
  <main className='h-screen flex items-center justify-center'>
    <form className='bg-white flex rounded-lg w-1/2 font-latoRegular'>
      <div className='flex-1 text-gray-700 p-20'>
        <h1 className='text-3xl pb-2 font-latoBold'>Welcome back! 🐬</h1>
        <p className='text-lg text-gray-500'>Continue learning with our platform and awesome tutors all over the world!</p>
        <div className='mt-6'>
          <div className='pb-4'>
            <label className='block font-latoBold text-sm pb-2' htmlFor="name">Email</label>
            <input className='border-2 border-gray-500 p-2 rounded-md w-1/2 focus:border-teal-500 focus:ring-teal-500'
             type="email" 
             name='email'
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             placeholder='Enter your email' />
          </div>
          <div className='pb-4'>
            <label className='block font-latoBold text-sm pb-2' htmlFor="email">Password</label>
            <input className='border-2 border-gray-500 p-2 rounded-md w-1/2 focus:border-teal-500 focus:ring-teal-500'
             type="password" 
             name='password'
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             placeholder='Enter your password' />
          </div>
          <button
          className='bg-teal-500 font-latoBold text-sm text-white py-3 mt-6 rounded-lg w-full'
          onClick={async (e) => {
          e.preventDefault();
          await store.login(email, password);
          }}>Log In</button>
        </div>
      </div>
    </form>
  </main>
)
};

export default observer(LoginPage);