// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './App.css'
import LeftTranslatorCmp from './components/LeftTranslatorCmp';
import RightTranslatorCmp from './components/RightTranslatorCmp';

function App() {


  return (
    <div className="relative w-screen h-screen">
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: "url('/assets/hero_img.jpg')" }}
      ></div>
      <div className="relative z-10 flex flex-col items-center h-full">
        <img src="/assets/logo.svg" alt="" className='m-3 md:m-6 lg:m-20' />
        <div className="flex flex-col gap-4 lg:flex-row">
          <LeftTranslatorCmp />
          <RightTranslatorCmp />
        </div>
      </div>
    </div>
  )
}

export default App
