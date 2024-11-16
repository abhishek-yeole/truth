import React from 'react'
import { Link } from 'react-router-dom';
import { Card, CardBody, Image } from '@nextui-org/react';
import GnecLogo from '../assets/gnec_hack.png';
import GroundNews from '../assets/groundnews.png';
import Unsgds from '../assets/unsdgs.png';

const Inspiration = () => {
  return (
    <div className="flex flex-col justify-center align-middle items-center gap-10 px-10 sm:px-52 py-20">
      <Link to="https://gnec.ngo/hackathon/" target="_blank">
        <Card
        className="group border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
        shadow="lg"
        >
          <CardBody>
            <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center mr-0 sm:mr-4">
              <div className="relative col-span-6 md:col-span-4">
                <Image
                  alt="Album cover"
                  className="object-cover"
                  height={200}
                  shadow="md"
                  src={GnecLogo}
                  width="100%"
                />
              </div>

              <div className="flex flex-col col-span-6 md:col-span-8">
                <div className="flex justify-start items-center gap-5 text-lg sm:text-2xl font-bold transition-colors">
                  <p className="group-hover:text-green-600">GNEC Hackathon 2024</p>
                  <span className="w-6 h-fit hidden group-hover:block group-hover:sm:hidden bg-green-600 text-center rounded-lg">&gt;</span>
                </div><br />
                <p className="text-base">The GNEC Hackathon is your calling to create a real impact. Collaborate, create, and compete in an online competition centered around the United Nations Sustainable Development Goals.</p>
              </div>
            </div>
          </CardBody>
          <div className="absolute right-0 top-0 h-full w-4 bg-green-600 hidden group-hover:sm:block"><p className="h-full flex justify-center items-center font-bold">&gt;</p></div>
        </Card>
      </Link>

      <Link to="https://ground.news/" target="_blank">
        <Card
        className="group border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
        shadow="lg"
        >
          <CardBody>
            <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center mr-0 sm:mr-4">
              <div className="relative col-span-6 md:col-span-4">
                <Image
                  alt="Album cover"
                  className="object-cover"
                  height={200}
                  shadow="md"
                  src={GroundNews}
                  width="100%"
                />
              </div>

              <div className="flex flex-col col-span-6 md:col-span-8">
                <div className="flex justify-start items-center gap-5 text-lg sm:text-2xl font-bold transition-colors">
                  <p className="group-hover:text-green-600">Ground News</p>
                  <span className="w-6 h-fit hidden group-hover:block group-hover:sm:hidden bg-green-600 text-center rounded-lg">&gt;</span>
                </div><br />
                <p className="text-base">Ground News is a platform that makes it easy to compare news sources, read between the lines of media bias and break free from algorithms.</p>
              </div>
            </div>
          </CardBody>
          <div className="absolute right-0 top-0 h-full w-4 bg-green-600 hidden group-hover:sm:block"><p className="h-full flex justify-center items-center font-bold">&gt;</p></div>
        </Card>
      </Link>

      <Link to="https://sdgs.un.org/goals" target="_blank">
        <Card
        className="group border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
        shadow="lg"
        >
          <CardBody>
            <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center mr-0 sm:mr-4">
              <div className="relative col-span-6 md:col-span-4">
                <Image
                  alt="Album cover"
                  className="object-cover"
                  height={200}
                  shadow="md"
                  src={Unsgds}
                  width="100%"
                />
              </div>

              <div className="flex flex-col col-span-6 md:col-span-8">
                <div className="flex justify-start items-center gap-5 text-lg sm:text-2xl font-bold transition-colors">
                  <p className="group-hover:text-green-600">United Nations SDG's</p>
                  <span className="w-6 h-fit hidden group-hover:block group-hover:sm:hidden bg-green-600 text-center rounded-lg">&gt;</span>
                </div><br />
                <p className="text-base">The UN SDGs are 17 global goals aimed at ending poverty, reducing inequality, and protecting the planet by 2030 through collective action and sustainable development.</p>
              </div>
            </div>
          </CardBody>
          <div className="absolute right-0 top-0 h-full w-4 bg-green-600 hidden group-hover:sm:block"><p className="h-full flex justify-center items-center font-bold">&gt;</p></div>
        </Card>
      </Link>
    </div>
  )
}

export default Inspiration