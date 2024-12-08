import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import axios from '../../axios';
import toast from 'react-hot-toast';
import ListIssues from './ListIssues';
import FullIssueView from './FullIssueView';
import { PersonalIssueIcon } from '../../assets/PersonalIssueIcon';

const MyIssues = () => {
  const { id } = useParams();
  const [displayList, setDisplayList] = useState(id === undefined);
  const [issues, setIssues] = useState(null);

  // Get issue data from server and store it in issues and displayIssues.
  // Apply filters on issues and change the state of displayIssues.

  const getIssues = async() => {
    const result = await axios.get("/issues/all");
    if (result.status === 200) {
      setIssues(result.data.issues);
    } else toast.error(result.status + ": " + result.data.error);
  }

  useEffect(() => {
    if (id === undefined) {
      if (issues === null) getIssues();
      setDisplayList(true);
    } else {
      setDisplayList(false);
    }
  }, [id])

  return (
    <AnimatePresence mode="wait">
      {displayList ? (
        <motion.div
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: "0%" }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{type: "keyframes"}}
          key="IssueList"
          className="w-full h-full"
        >
          {issues && <ListIssues link={"/user/action/myissues/"} icon={<PersonalIssueIcon />} title="My Issues" issuesP={issues} /> }
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: "0%" }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{type: "keyframes"}}
          key="SingleIssue"
        >
          <FullIssueView id={id} issue={issues?.find((issue) => issue._id === id)} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MyIssues;