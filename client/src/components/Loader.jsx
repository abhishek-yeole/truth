import React from 'react'
import ReactDOM from 'react-dom';
import LoaderIcon from '../assets/LoaderIcon';

const Loader = () => {
  return ReactDOM.createPortal(
    <div className='inset-0 fixed z-20 w-[100vw] h-[100vh] bg-black bg-opacity-40 backdrop-blur-[1px] flex justify-center items-center'>
      <LoaderIcon className="w-20 h-20 text-cyan-600" />
    </div>,
    document.getElementById('loader')
  )
}

export default Loader