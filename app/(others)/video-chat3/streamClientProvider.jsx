'use client';
import {  setOSInfo, StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';
import { tokenProvider } from '@/actions/stream.actions';
import { useSelector } from 'react-redux';
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider=({children})=> {
  const [videoClient,setVideoClient]=useState()
  // const [chatClient,setChatClient]=useState()
  //! get currently logged in user from clerk
  const user = useSelector((state) => state.user);
  // const userObject=
  // {
  //   id: "hamim",
  //   name:user?.name||"test user", 
  //   image:user?.image
  // }
  useEffect(() => {
    const initializeClient = async () => {
      if (!user?.user_id) return;
      if (!apiKey) throw new Error('Stream API key is missing');
      console.log('hello from provider');
      const userObject={
        id:user.user_id.toString(),
        name:user.name,
        image:user.image
      }
      console.log(userObject);
      const fetchedToken = await tokenProvider(userObject);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const client = new StreamVideoClient({
        apiKey,
        user: userObject,
        token: fetchedToken, // Use fetched token directly
      });
  
      setVideoClient(client);
    };
    initializeClient();
  }, [user]);
  return (
    <StreamVideo client={videoClient}>
      {children}
    </StreamVideo>
  );
}
export default StreamVideoProvider;

