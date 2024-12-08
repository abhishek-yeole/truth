import React, { useEffect, useState } from 'react';
import { Autocomplete, AutocompleteItem, Button, Card, CardBody, CardHeader, Chip, Popover, PopoverTrigger, PopoverContent, Tabs, Tab, Checkbox, DateRangePicker, DatePicker, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, CardFooter } from '@nextui-org/react';
import axios from '../../axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { CalendarDateTime, parseDate, parseZonedDateTime } from '@internationalized/date';
import { AnimatePresence, motion } from 'framer-motion';
import { EditIcon } from '../../assets/EditIcon';
import SearchIcon from '../../assets/SearchIcon';
import { FilterIcon } from '../../assets/FilterIcon';
import { SuccessIcon } from '../../assets/SuccessIcon';
import { AllIssueIcon } from '../../assets/AllIssueIcon';
import { PendingIcon } from '../../assets/PendingIcon';
import { RejectIcon } from '../../assets/RejectIcon';
import EditInterface from './EditInterface';
import { ReportIcon } from '../../assets/ReportIcon';
import ListIssues from './ListIssues';

const ReportIssues = () => {
  const { id } = useParams();
  const navigateTo = useNavigate();
  const [issues, setIssues] = useState(null);
  const [issue, setIssue] = useState({});

  // Get issue data from server and store it in issues and displayIssues.
  // Check for id is present or not
  // Apply filters on issues and change the state of displayIssues.

  const getIssues = async() => {
    const result = await axios.get("/issues/all");
    if (result.status === 200) {
      setIssues(result.data.issues);
    } else toast.error(result.status + ": " + result.data.error);
  }

  useEffect(() => {
    if (id !== undefined) {
      reportModal.onOpen();
    } else {
      setIssue(issues?.find((issue) => issue._id === id));
    }
    if (issues === null) getIssues();
  }, [id])

  const reportModal = useDisclosure();

  return (
    <>
      {issues && <ListIssues link={"/user/action/report/"} icon={<ReportIcon />} title="Report Issues" issuesP={issues} /> }
      <Modal isOpen={reportModal.isOpen} onOpenChange={reportModal.onOpenChange} onClose={() => navigateTo("/user/action/report")} size="5xl" >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-between align-middle items-center w-full gap-1 px-10 text-2xl">
                <p className="flex items-center"><ReportIcon /> &nbsp;&nbsp; Report issue ? </p><Chip variant="dot" color="primary">{id}</Chip>
              </ModalHeader>
              <ModalBody> 

              </ModalBody>
              <ModalFooter>

              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default ReportIssues;