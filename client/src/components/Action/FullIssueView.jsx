import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Chip, CardFooter } from '@nextui-org/react';
import { PersonalIssueIcon } from '../../assets/PersonalIssueIcon';

const FullIssueView = ({ id, issue }) => {
  const navigateTo = useNavigate();
  
  return (
    <Card isBlurred className="w-full h-full mb-10 p-2">
      <CardHeader className="flex justify-between items-center flex-wrap gap-3 px-2 md:px-10">
        <div className="flex justify-center items-center gap-3 w-full md:w-auto text-lg font-medium font-sans"><PersonalIssueIcon /> My Issues</div>
        <Chip variant="dot" color="primary">{id}</Chip>
      </CardHeader>
      
      <CardBody className="p-0 rounded-lg">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
          risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
          quam.
        </p>
      </CardBody>
      <CardFooter>
        <Button color="primary" variant="light" onPress={()=> navigateTo("/user/action/myissues/")}>
          Go Back
        </Button>
        <Button color="secondary" variant="light" onPress={()=> navigateTo("/user/action/myissues/")}>
          Edit
        </Button>
        <Button color="danger" variant="shadow" onPress={()=> navigateTo("/user/action/myissues/")}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}

export default FullIssueView