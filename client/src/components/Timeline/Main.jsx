import React from 'react'

const Main = () => {
  const calculateDaysFrom2014 = (dateString) => {
    const givenDate = new Date(dateString);
    const startDate = new Date("2014-01-01");
    if (isNaN(givenDate)) throw new Error("Invalid date. Please provide a valid date in the format YYYY-MM-DD.");
    const timeDifference = givenDate - startDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1;
    return daysDifference;
  };
  /*
    Calculate percentage of days from 1st Jan 2014 to today as 100%.
    Calculate % of days from 1st jan 2014 to date of issue started.
    Calculate % of days from 1st jan 2014 to date of issue reported.
    Calculate % of days from 1st jan 2014 to date of issue resolved. 
  */
  /*
    Display percentage wise colored divs with relative z-index according to the percentages calculated.
    Display nodes as year with 2014, 2019, 2024 as large nodes and other years small nodes.
    Display today's pointer node.
    Display calender to choose a particular date. 
  */
  return (
    <div>
      Main
    </div>
  )
}

export default Main