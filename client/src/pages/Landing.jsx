import React from 'react';
import Globe from "../components/Globe";
import { Accordion, AccordionItem, Button, Card, CardBody, Divider, Image, Input, Textarea } from '@nextui-org/react';
import Sdg16 from '../assets/unsdg16.svg';
import TruthIcon from '../assets/truth-dark.svg';
import { motion } from 'framer-motion';
import MailIcon from '../assets/MailIcon';

const Landing = () => {
  const advantages = [
    {
      "name": "Increased Truth, Trust, and Transparency",
      "emoji": "🔍",
      "description": "Truth, trust, and transparency increase as people are more aware of the government's workings."
    },
    {
      "name": "Quick Problem Resolution",
      "emoji": "⏱️",
      "description": "The government can act swiftly on areas with major problems by analyzing data effectively."
    },
    {
      "name": "Enhanced Public Involvement",
      "emoji": "🤝",
      "description": "More people get involved in government workings, empowering citizens in real-life problem-solving."
    },
    {
      "name": "Collaborative Issue Resolution",
      "emoji": "💡",
      "description": "Citizens can collectively work towards resolving common issues, leading to better outcomes."
    },
    {
      "name": "Performance Measurement",
      "emoji": "📊",
      "description": "Useful in measuring the performance and feasibility of the government or political parties."
    },
    {
      "name": "Clarity on Progress",
      "emoji": "📈",
      "description": "Provides a clearer and more concise understanding of the country's progress and development."
    },
    {
      "name": "Efficient Solutions",
      "emoji": "🚀",
      "description": "Better and more efficient solutions can arise through suggestions from multiple individuals."
    },
    {
      "name": "Action Monitoring and Improvement",
      "emoji": "📋",
      "description": "Actions taken and their effects can be monitored by both the government and citizens for continuous improvement."
    }
  ];

  const limitations = [
    {
      name: "Verification Dependency",
      emoji: "🔒",
      description: "Verification is dependent on government support. For example, in India, the most used digital user identification is Aadhar UID, which requires permits for user verification."
    },
    {
      name: "Data Security",
      emoji: "🛡️",
      description: "User verification is done via email for prototype purposes, and no user data will be used for any other purpose. Account and data deletion options are always available. For more details, see *Developers - Data Security*."
    },
    {
      name: "Platform Development",
      emoji: "⚙️",
      description: "More tools can be added to enhance user experience and enable advanced data analysis. To contribute, visit *Developers - GitHub*."
    }
  ];

  return (
    <>
      <Globe />
      
      <div className="flex flex-col gap-10 px-5 sm:px-40 py-20">
        <Card
          id='problem'
          className="border-none bg-background/60 dark:bg-default-100/50"
          shadow="lg"
          fullWidth
        >
          <CardBody>
            <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center p-2 sm:p-3s">
              <div className="relative col-span-6 md:col-span-4 flex justify-center items-center align-middle">
                <p className="text-[100px] sm:text-[200px]">⚠️</p>
              </div>

              <div className="flex flex-col col-span-6 md:col-span-8">
                <p className='text-3xl font-bold text-red-600 text-center sm:text-start'>Problem Addressed</p>

                <Divider className='my-5' />

                <p className='text-2xl font-bold text-blue-600'># UN Sustainable Development Goal 16</p><br />
                <div className='flex justify-center items-center gap-5 py-3'>
                  <img src={Sdg16} alt="sdg16_logo" className='w-[100px] sm:w-[150px]'/>
                  <p className='text-justify'><b>Goal 16.</b>&nbsp;&nbsp;&nbsp;&nbsp; Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels.</p>
                </div>
                <p className='text-justify indent-10'>                 
                  <strong className='text-red-600'>Truth</strong> project can make an impact on every SDG's as the goals are majorly influenced by the political governance in a country. And, acting on those issues can make an positive impact to the society and help in achieving the SDG's.
                </p>
                
                <Divider className='my-5' />

                <p className='text-2xl font-bold text-blue-600'># Problem definition </p><br />
                <p className='text-justify'>The socio-economic-environmental challenges that we face today are mostly influenced by the working of the government/ruling party.
                  Issues like drainage blockage, garbage collection, landfills, pollution, no safe water, house/property issues, unemployment, poor education quality or any other surrounding environment issues, etc. comes majorly under their respective departments.
                </p><br />        
                <Accordion variant="bordered">
                  <AccordionItem key="1" aria-label="Social Media Influence"  title="Social Media Influence">
                    <ol type="1" className="list-decimal ml-10 text-justify flex flex-col gap-5">
                      <li>
                        Social media influence plays a major role leading to misunderstandings, false data, and reports.
                      </li>
                      <li>
                        Also, constant display of false fame leads to misconceptions that a particular party is doing very good work even though nothing is achieved.
                      </li>
                      <li>
                        Often such influence does not focus on the major underlying issues or the main issue at all; they tend to differentiate and diverge to entirely different or non-existent issues.
                      </li>
                      <li>
                        Social media bias can be seen very clearly through television, media, entertainment, actors, etc. The youth, when exposed to such false influence, tends to follow such idols.
                      </li>
                    </ol>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card
          id='solution'
          className="border-none bg-background/60 dark:bg-default-100/50"
          shadow="lg"
          fullWidth
        >
          <CardBody>
            <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center p-2 sm:p-3s">
              <div className="relative col-span-6 md:col-span-4 flex justify-center items-center align-middle">
                <p className="text-[100px] sm:text-[200px]">✅</p>
              </div>

              <div className="flex flex-col col-span-6 md:col-span-8">
                <p className='text-3xl font-bold text-red-600 text-center sm:text-start'>Solution</p>

                <Divider className='my-5' />
                <p className='text-justify indent-10'>                 
                  The very first step of problem solving is problem analysis, that most of the political parties and government appears (not sure) to be skipping.
                  The <strong className='text-red-600'>Project Truth</strong> focusses mainly on problem analysis step. The project intends to bring real data without any biasness towards a particular political party / officers / government to all the people.
                </p>
                
                <Divider className='my-5' />

                <p className='text-2xl font-bold text-blue-600'># Action portal </p><br />
                <p className='text-justify'>Consider this as a public action portal where people can:</p><br />
                <ol type='1' className='list-decimal ml-10 flex flex-col gap-3'>
                  <li>Raise an issue against a political leader, department, officer or a concern/appeal via application.</li>
                  <li>The user may also suggest some solutions and importantance and advantages of resolving the issue.</li>
                  <li>The statistics of this issues collected can be displayed over map and thoroughly analysed by everyone.</li>
                  <li>The user can then verify if that particular issue is resolved or not.</li>
                  <li>The entire system works on data privacy policy the users info is not shared nor used for any other things except verification.</li>
                </ol><br />
                <p className='text-justify'>The system then shows the abstracted issues (issues which are refined with no user data involved) to everyone so as to measure the performance of a political party over a region and time.</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card
          id='advantages'
          className="border-none bg-background/60 dark:bg-default-100/50"
          shadow="lg"
          fullWidth
        >
          <CardBody>
            <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center p-2 sm:p-3s">
              <div className="relative col-span-6 md:col-span-4 flex justify-center items-center align-middle">
                <p className="text-[100px] sm:text-[200px]">⏫</p>
              </div>

              <div className="flex flex-col col-span-6 md:col-span-8">
                <p className='text-3xl font-bold text-red-600 text-center sm:text-start'>Advantages</p>

                <Divider className='my-5' />

                <ul className="sm:ml-10 flex flex-col gap-5 text-justify">
                  {advantages.map((advantage, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span>{advantage.emoji}</span>
                      <div>
                        <strong>{advantage.name}</strong>: {advantage.description}
                      </div>
                    </li>
                  ))}
                </ul><br />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card
          id='limitations'
          className="border-none bg-background/60 dark:bg-default-100/50"
          shadow="lg"
          fullWidth
        >
          <CardBody>
            <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center p-2 sm:p-3s">
              <div className="relative col-span-6 md:col-span-4 flex justify-center items-center align-middle">
                <p className="text-[100px] sm:text-[200px]">⏬</p>
              </div>

              <div className="flex flex-col col-span-6 md:col-span-8">
                <p className='text-3xl font-bold text-red-600 text-center sm:text-start'>Current Limitations</p>

                <Divider className='my-5' />

                <ul className="sm:ml-10 flex flex-col gap-5 text-justify">
                  {limitations.map((limitation, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span>{limitation.emoji}</span>
                      <div>
                        <strong>{limitation.name}</strong>: {limitation.description}
                      </div>
                    </li>
                  ))}
                </ul><br />
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className='flex flex-col sm:flex-row gap-5 justify-between align-middle items-center'>
            <div className='flex flex-row justify-center items-center align-middle gap-5 w-full h-auto p-2 '>
              <motion.div
                whileInView="visible"
                viewport={{ once: true }}
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
            <div className='w-full px-5 sm:px-20 py-3'>
              <form className='flex flex-col gap-5 justify-center items-center'>
                <Input type="text" label="Name" isRequired />
                <Input type="email" label="Email" />
                <Textarea label="Feedback" placeholder="Enter your feedback..." isRequired maxRows={4} minRows={4} />
                <Button variant='shadow' color='primary' startContent={<MailIcon />}>Submit</Button>
              </form>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  )
}

export default Landing