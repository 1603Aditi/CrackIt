import React from 'react'

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] overflow-y-auto bg-black/50'>
      <div className='relative p-4 w-full max-w-2xl max-h-full'>
        <div className='relative bg-white rounded-lg shadow-sm'>
          <div className='flex items-center justify-between p-4 md:p-5 border-b border-gray-200 rounded-t'>
            <h3 className='text-lg font-medium text-gray-900'>{title}</h3>
            <button
              type="button"
              className='text-gray-400 bg-transparent hover:text-white rounded-3xl text-lg w-8 h-8 flex justify-center items-center cursor-pointer hover:bg-red-500 '
              onClick={onClose}
            >
              X
            </button>
          </div>
          <div className='p-4 md:p-5 space-y-4'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
