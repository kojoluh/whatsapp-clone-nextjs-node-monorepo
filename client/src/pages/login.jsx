import React, {useEffect} from 'react';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseAuth } from '@/utils/FirebaseConfig';
import { CHECK_USER_ROUTE } from '@/utils/ApiRoutes';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useStateProvider } from '@/context/StateContext';
import { reducerCases } from '@/context/constants';

function login() {
  const router = useRouter();

  const [{userInfo, isNewUser}, dispatch] = useStateProvider();

  useEffect(() => {
    console.log({userInfo, isNewUser})
    if (userInfo?.id && !isNewUser) router.push('/');
  }, [userInfo, isNewUser]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const { user: {displayName: name, email, photoUrl: profileImage} } = await signInWithPopup(firebaseAuth, provider);
    try {
      if (email) {
        const { data } = await axios.post(CHECK_USER_ROUTE, {email});
        if (!data.status) {
          dispatch({ type: reducerCases.SET_NEW_USER, isNewUser: true });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              name,
              email,
              profileImage,
              status: ''
            }
          })
          router.push('/onboarding');
        }
        else {
          const { id, email, name, profileImage, about: status } = data;
          dispatch({ type: reducerCases.SET_NEW_USER, isNewUser: false });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id,
              email,
              name,
              profileImage,
              status
            }
          })
          router.push('/');
        }
      }
    } catch(err) {
      console.error(err)
    }
  };

  return <div className="flex justify-center items-center bg-panel-header-background h-screen w-screen flex-col gap-6">
    <div className="flex items-center justify-center gap-2 text-white">
      <Image src='/whatsapp.gif'  alt='whats app' height={300} width={300} />
      <span className='text-7xl'>Whatsapp</span>
    </div>
    <button
      className='flex item-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg'
      onClick={handleLogin}
    >
      <FcGoogle className='text-4xl' />
      <span className='text-white text-2xl'>Login with Google</span>
    </button>
  </div>;
}

export default login;
