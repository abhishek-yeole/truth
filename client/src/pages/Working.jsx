import React from 'react';
import WorkingMD from '../data/workingMD';
import AuthWorkflow from "../assets/auth_workflow.svg";
import UserCollections from '../data/UserCollections';
import IssuesCollections from '../data/IssuesCollections';
import StatisticsCollections from '../data/StatisticsCollections';

const Working = () => {
  const tech = [
    {
      name: 'React JS',
      icon: '⚛️',
      description: 'A JavaScript library for building user interfaces.',
    },
    {
      name: 'Vite CLI',
      icon: '⚡',
      description: 'A fast and modern development build tool.',
    },
    {
      name: 'Framer Motion',
      icon: '🎥',
      description: 'A production-ready motion library for React.',
    },
    {
      name: 'Next UI',
      icon: '🪄',
      description: 'A customizable UI library with magical effects.',
    },
    {
      name: 'Python Flask',
      icon: '🐍',
      description: 'A lightweight WSGI web application framework.',
    },
    {
      name: 'MongoDB',
      icon: '🍃',
      description: 'A NoSQL database for modern applications.',
    },
  ];

  return (
    <>
      <div className="w-full flex flex-col justify-center align-middle items-center gap-5 pt-10 px-10 sm:px-52 pb-10">
        <p className="text-2xl font-bold">⚡ Tech Stack</p>
        <div className="h-[1px] bg-neutral-600 dark:bg-neutral-300 w-full shadow-lg shadow-white rounded-full" />
        <div className="flex flex-wrap gap-5 justify-center">
          {tech.map((item, index) => (
            <div
              key={index}
              className="w-64 p-5 bg-neutral-100 dark:bg-neutral-800 shadow-lg rounded-lg flex flex-col items-center gap-3 text-center"
            >
              <div className="text-4xl">{item.icon}</div>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col justify-center align-middle items-center gap-5 pt-10 sm:pt-20 px-5 sm:px-52 pb-10">
        <p id="developer-documentation-for-github-contributions" className="text-2xl font-bold">
          📊 Data Structures
        </p>
        <UserCollections />
        <IssuesCollections />
        <StatisticsCollections />
      </div>

      <div className="w-full flex flex-col justify-center align-middle items-center gap-5 pt-10 sm:pt-20 px-5 sm:px-52 pb-10">
        <p id="developer-documentation-for-github-contributions" className="text-2xl font-bold">
          ✅ Authentication Workflow
        </p>
        <img src={AuthWorkflow} alt="Auth_Workflow" className='dark:bg-neutral-700 rounded-lg sm:rounded-2xl' />
      </div>

      <div className="w-full flex flex-col justify-center align-middle items-center gap-5 pt-10 sm:pt-20 px-10 sm:px-52 pb-10">
        <p id="developer-documentation-for-github-contributions" className="text-2xl font-bold">
          📃 Developer Documentation for GitHub Contributions
        </p>
        <WorkingMD />
      </div>
    </>  
  );
};

export default Working;