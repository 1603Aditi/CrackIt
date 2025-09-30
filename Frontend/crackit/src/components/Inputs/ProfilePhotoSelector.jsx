import React, { useState, useRef } from 'react';
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className='flex items-center gap-4 mb-6'>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className='hidden'
      />

      <div className='w-24 h-24 flex items-center justify-center bg-gray-200 rounded-full text-gray-400 text-4xl overflow-hidden'>
        {image ? (
          <img
            src={previewUrl}
            alt="profile"
            className='w-full h-full object-cover'
          />
        ) : (
          <LuUser />
        )}
      </div>

      <div className='flex flex-col gap-2'>
        {!image ? (
          <button
            type="button"
            onClick={onChooseFile}
            className='flex items-center gap-1 px-3 py-1 bg-violet-600 text-white text-sm rounded-lg hover:bg-violet-700 transition hover:cursor-pointer'
          >
            <LuUpload size={16} /> Upload
          </button>
        ) : (
          <button
            type='button'
            onClick={handleRemoveImage}
            className='flex items-center gap-1 px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition hover:cursor-pointe'
          >
            <LuTrash size={16} /> Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePhotoSelector;
