import React, {useState, FC, useContext, useEffect} from 'react';
import { Context } from '..';
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Oval } from 'react-loader-spinner';

const RegistrationPage :FC = function () {
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

  store.isAuth ? navigate('/account') : <RegistrationPage />
  return ( 
  <main className='h-screen flex items-center justify-center'>
    <form className='bg-white flex rounded-lg w-1/2 font-latoRegular'>
      <div className='flex-1 text-gray-700 p-20'>
        <h1 className='text-3xl pb-2 font-latoBold'>Let's get started 👋</h1>
        <p className='text-lg text-gray-500'>Join our E-learning platform today and unlock over 500+ courses and digital assets ready to download.</p>
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
          <div className='pb-4'>
            <label className='block font-latoBold text-sm pb-2' htmlFor="terms">Terms of Service</label>
            <div className='flex items-center gap-2'>
              <input type="checkbox" name="terms" value="checked" className='h-5 w-5 text-teal-500 border-2 focus:border-teal-500 focus:ring-teal-500'/>
              <p className="text-sm font-latoBold text-gray-500">
                    I agree to the Terms and Service that my data will be taken
                    and sold.
              </p>
            </div>
          </div>
          <button
          className='bg-teal-500 font-latoBold text-sm text-white py-3 mt-6 rounded-lg w-full'
          onClick={async (e) => {
          e.preventDefault();
          await store.registration(email, password);
          store.isAuth ? navigate('/account') : console.log('Error');
          }}>Start learning today!</button>
        </div>
      </div>
    </form>
  </main>
)
};

export default observer(RegistrationPage);