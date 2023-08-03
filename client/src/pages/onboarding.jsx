import Image from 'next/image';
import { useStateProvider } from "@/context/StateContext";
import Input from "@/components/common/Input";
import Avatar from '@/components/common/Avatar';
import React, { useState, useEffect } from "react";
import { ONBOARD_USER_ROUTE } from '@/utils/ApiRoutes';
import { useRouter } from 'next/router';
import axios from 'axios';

function onboarding() {
  const router = useRouter();
  const [{ userInfo, isNewUser }, dispatch] = useStateProvider();
  const [name, setName] = useState(userInfo?.name || '');
  const [about, setAbout] = useState('');
  const [image, setImage] = useState('/default_avatar.png');
  useEffect(() => {
    if (!isNewUser && !userInfo?.email) router.push('/login');
    else if (!isNewUser && userInfo?.email) router.push('/');
  }, [isNewUser, userInfo, router]);
  const validateDetails = () => {
    if (name.length < 3)
      return false;
    return true;
  }
  const handlerOnboardUser = async () => {
    console.log('handlerOnboardUser: ', {userInfo, name, about, image})
    if (validateDetails()) {
      const email = userInfo.email;
      try {
        const  { data } = await axios.post(ONBOARD_USER_ROUTE, {
          email,
          name,
          about,
          image
        });
        if (data.status) {
          dispatch({ type: reducerCases.SET_NEW_USER, isNewUser: false});
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id: data.id,
              name,
              email,
              profileImage: image,
              status: about
            }
          })
          router.push('/');
        }
      } catch (err) {
        console.error(err)
      }
    }
  };

  return <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
    <div className="flex items-center justify-center gap-2">
      <Image src="/whatsapp.gif" alt='whatsapp' height={300} width={300} />
    </div>
    <h2 className="text-2xl">Create your profile</h2>
    <div className="flex gap-6 mt-6">
      <div className="flex flex-col items-center justify-center mt-5 gap2">
        <Input name ="Display Name" state={name} setState={setName} label />
        <Input name="About" state={about} setState={setAbout} label />
        <div className="flex flex-col items-center justify-center p-10">
          <button
            className='flex item-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg'
            onClick={handlerOnboardUser}
          >Create Profile</button>
        </div>
      </div>
      <div>
        <Avatar type="xl" image={image} setImage={setImage} />
      </div>
    </div>
  </div>
}

export default onboarding;
