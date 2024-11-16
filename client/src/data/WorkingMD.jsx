import React from 'react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionItem, Button, Card, CardBody, CardHeader, Divider } from '@nextui-org/react';

const WorkingMD = ({ className }) => {
  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <p>Welcome to our project!</p>
        </CardHeader>
        <CardBody>
          <p>
            This document outlines the general rules, guidelines, and practices for contributing to this repository. Please follow these to ensure a smooth collaboration.
          </p>
        </CardBody>
      </Card>
      
      <Divider className="my-4" />
      
      <h2 id="table-of-contents">Table of Contents</h2>
      <Accordion>
        <AccordionItem title="Getting Started">
          <ol>
            <li>
              <p>
                <strong>Clone the Repository</strong>:{' '}
                <code>git clone <Link to="https://github.com/abhishek-yeole/truth" target="_blank">https://github.com/abhishek-yeole/truth</Link> && cd your-repo</code>
              </p>
            </li>
            <li>
              <p><strong>Set Up the Environment</strong>: Follow the steps in the README.md or the setup guide.</p>
            </li>
            <li>
              <p><strong>Install Dependencies</strong>: <code>npm install</code></p>
            </li>
            <li>
              <p><strong>Understand the Project</strong>: Review the architecture, main features, and roadmap.</p>
            </li>
          </ol>
        </AccordionItem>

        <AccordionItem title="Code of Conduct">
          <p>
            We are committed to fostering a welcoming, inclusive, and professional community.
          </p>
          <ul>
            <li>
              <p><strong>Respectful Communication</strong>: No harassment, personal attacks, or inappropriate behavior.</p>
            </li>
            <li>
              <p><strong>Be Helpful</strong>: Provide constructive feedback and support others.</p>
            </li>
            <li>
              <p><strong>Zero Tolerance for Discrimination</strong>: Any discriminatory remarks or actions are strictly prohibited.</p>
            </li>
          </ul>
          <p>
            Read the full <Link href="CODE_OF_CONDUCT.md">Code of Conduct</Link> for details.
          </p>
        </AccordionItem>
      </Accordion>

      <Divider className="my-4" />

      <Link to="https://github.com/abhishek-yeole/truth" target='_blank'>
        <Button variant="shadow" color="primary" >
          Start Contributing
        </Button>
      </Link>
    </div>
  );
}

export default WorkingMD;
