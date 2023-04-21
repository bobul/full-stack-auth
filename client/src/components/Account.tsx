import React, { FC, useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from '../index';
import { IUser } from "../models/IUser";
import UserService from "../services/UserService";
import { observer } from "mobx-react-lite";
import { Oval } from "react-loader-spinner";

const Account: FC = () => {
    const {store} = useContext(Context);
    const [users, setUsers] = useState<IUser[]>([]);
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

    if (!store.isAuth){
      return <Navigate to={'/registration'} />;
    }

    async function getUsers() {
      try {
        const response = await UserService.fetchUsers();
        setUsers(response.data);
      } catch (e) {
        console.log(e);
      }
    }

    return (
        <div className="h-screen flex items-center justify-center">
          <div className="w-1/2 p-6 bg-slate-100 rounded-md">
            <h1 className="text-center text-lg font-latoBold mb-2">{ store.isAuth ? `User is authorized ${store.user.email}` : 'PLEASE, AUTHORIZE!'}</h1>
            <h1 className="text-center text-lg font-latoRegular text-red-600">{store.user.isActivated ? 'Account is activated. You can start learning 😍' : 'Activate account! 🫤 You cannot start learning now.'}</h1>
            <div className="mt-5 flex justify-around gap-32">
              <button className="bg-slate-300 h-12 w-24 rounded-md hover:text-white font-latoRegular" onClick={async () => {
                await store.logout();
                navigate('/registration');
              }}>Log Out</button>
              <div>
                <button className="bg-slate-300 h-12 w-24 rounded-md hover:text-white font-latoRegular" onClick={getUsers}>Get users</button>
              </div>
            </div>
            {users.map(
              function(user) {
                return <div className="text-center font-latoRegular" key={user.email}>{user.email}</div>
              }
            )}
          </div>
        </div>
      );
}

export default observer(Account);