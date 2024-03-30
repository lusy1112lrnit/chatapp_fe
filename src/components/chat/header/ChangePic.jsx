import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AuthInput from '../../auth/AuthInput';
import { useForm } from 'react-hook-form';
import { updateConversation } from '../../../features/chatSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Picture from '../../auth/Picture';
import { PulseLoader } from 'react-spinners';

export default function ChangePic({setShowChangePic}) {
    const cloud_name = process.env.REACT_APP_CLOUD_NAME;
    const cloud_secret = process.env.REACT_APP_CLOUD_SECRET;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {status, error, activeConversation, conversations} = useSelector((state) => state.chat)
    const {user} = useSelector((state) => state.user)
    const [picture, setPicture] = useState();
    const [readablePicture, setReadablePicture] = useState("");
    const {
      register,
      handleSubmit,
      formState: {errors},
    } = useForm({
    });
    const onSubmit = async (data) => {
      if (picture) {
        await uploadImage().then(async (response) => {
          let res = await dispatch(
            updateConversation({ ...data, picture: response.secure_url, convoId: activeConversation._id, token: user.token })
          );
          
        });
      } else {
        let res = await dispatch(updateConversation({ ...data, picture: "", convoId: activeConversation._id, token: user.token }));
        window.location.reload();
      
      }
    };
    const uploadImage = async () => {
      let formData = new FormData();
      formData.append("upload_preset", cloud_secret);
      formData.append("file", picture);
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      );
      return data;
    };
    return (
      <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Container */}
        <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
          {/*Heading*/}
          <div className="text-center dark:text-dark_text_1">
            <h2 className="mt-6 text-3xl font-bold">Update Group Chat</h2>
          </div>
          {/*Form*/}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
            <AuthInput
              name="name"
              type="text"
              placeholder="Group Name"
              register={register}
              error={errors?.name?.message}
            />         
            {/* Picture */}
            <Picture
              readablePicture={readablePicture}
              setReadablePicture={setReadablePicture}
              setPicture={setPicture}
            />
            {/*Submit button*/}
            <button
              className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide
font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300
            "
              type="submit"
            >
              {status === "loading" ? (
                <PulseLoader color="#fff" size={16} />
              ) : (
                "Submit"
              )}
            </button>
            {/* Sign in link */}
            <button className="w-full">
            <p
                className="mt-10 text-center text-md dark:text-dark_text_1"
                style={{ placeItems: 'center' }}
                onClick={() => {
                    setShowChangePic(false);
                }}
                >
                Back.
            </p>
            </button>
          </form>
        </div>
      </div>
    );
}