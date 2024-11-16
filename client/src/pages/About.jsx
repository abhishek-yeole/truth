import React from 'react'
import TruthIcon from '../assets/truth-dark.svg';
import { motion } from 'framer-motion';
import { TextGenerateEffect } from '../components/TextGenerateEffect';
import GithubButton from '../components/GithubButton';
import GithubIcon from '../assets/GithubIcon';
import { Link } from 'react-router-dom';

const About = () => {
  const words = `The Project Truth focusses on the very first step of problem solving that is, Problem Analysis. The project intends to bring real data available all the people, without any biasness towards a particular culture, religion, political party, officers, government.`;
  return (
    <>
      <div className='flex flex-row justify-center items-center align-middle gap-5 w-full h-auto p-2 '>
        <motion.div
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5, ease: "linear" }}
        >
          <img src={TruthIcon} alt="TruthLogo" className="w-24 h-24 sm:w-40 sm:h-40 hover:drop-shadow-[0_5px_24px_rgba(255,0,0,0.8)] hover:scale-110 transition-all" />
        </motion.div>
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5, ease: "linear" }}
        >
          <p className='font-semibold text-xl'>The Project</p> <p className='font-bold text-5xl'>Truth</p>
        </motion.div>
      </div>

      <TextGenerateEffect words={words} className="text-center p-5 sm:text-2xl" />

      <div className="py-5 px-5 sm:py-20 sm:px-52 w-full h-fit">
        <div className="flex flex-row flex-wrap justify-between rounded-2xl bg-neutral-200 dark:bg-neutral-900">
          <div className='w-full sm:w-[20%] p-2 flex justify-center'><GithubIcon className="w-52 h-52 p-2"/></div>
          <div className='w-full sm:w-[80%] p-5'>
            <p className='flex justify-between sm:text-xl'><span>abhishek-yeole / <span className='font-bold'>truth</span></span><span><GithubButton /></span></p><br />
            <p className='text-sm sm:text-base text-neutral-900 dark:text-neutral-300'>The Project Truth helps in solving socio-economical-environmental issues. {words}</p><br />
            <p className='text-sm sm:text-base'>To contribute on Github, see <Link to="/working#developers" className='text-blue-500'>Developers</Link></p>
          </div>
        </div>
      </div>

      <div className='w-full h-fit flex flex-col gap-5 justify-center align-middle items-center py-5 px-5 sm:pt-20 sm:px-52'>
        <p className='text-2xl font-bold'>Frequently Asked Questions</p>
        <div className='h-[1px] bg-neutral-600 dark:bg-neutral-300 w-full shadow-lg shadow-white rounded-full'/>
        <p className='py-10'>Not yet started.</p>
      </div>
    </>
  )
}

export default About