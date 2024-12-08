import React, { useState } from 'react';
import { Autocomplete, AutocompleteItem, Button, Card, CardBody, CardHeader, Chip, Popover, PopoverTrigger, PopoverContent, Tabs, Tab, Checkbox, DateRangePicker, DatePicker } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { CalendarDateTime, parseDate, parseZonedDateTime } from '@internationalized/date';
import SearchIcon from '../../assets/SearchIcon';
import { FilterIcon } from '../../assets/FilterIcon';
import { SuccessIcon } from '../../assets/SuccessIcon';
import { AllIssueIcon } from '../../assets/AllIssueIcon';
import { PendingIcon } from '../../assets/PendingIcon';
import { RejectIcon } from '../../assets/RejectIcon';

const ListIssues = ({ link, icon, title, issuesP }) => {
  const navigateTo = useNavigate();
  const [issues, setIssues] = useState(issuesP);
  const [displayIssues, setDisplayIssues] = useState(issuesP);

  // Apply filters on issues and change the state of displayIssues.
  // Apply search on entire issues and integrate it with searchbox.

  const animals = [
    {label: "Cat", value: "cat", description: "The second most popular pet in the world"},
    {label: "Dog", value: "dog", description: "The most popular pet in the world"},
    {label: "Elephant", value: "elephant", description: "The largest land animal"},
    {label: "Lion", value: "lion", description: "The king of the jungle"},
    {label: "Tiger", value: "tiger", description: "The largest cat species"},
    {label: "Giraffe", value: "giraffe", description: "The tallest land animal"},
    {
      label: "Dolphin",
      value: "dolphin",
      description: "A widely distributed and diverse group of aquatic mammals",
    },
    {label: "Penguin", value: "penguin", description: "A group of aquatic flightless birds"},
    {label: "Zebra", value: "zebra", description: "A several species of African equids"},
    {
      label: "Shark",
      value: "shark",
      description: "A group of elasmobranch fish characterized by a cartilaginous skeleton",
    },
    {
      label: "Whale",
      value: "whale",
      description: "Diverse group of fully aquatic placental marine mammals",
    },
    {label: "Otter", value: "otter", description: "A carnivorous mammal in the subfamily Lutrinae"},
    {label: "Crocodile", value: "crocodile", description: "A large semiaquatic reptile"},
  ];

  const [selected, setSelected] = useState("approved");
  const tabs = [
    {
      id: "all",
      label: "All",
      count: 0,
      icon: <AllIssueIcon width={20} height={20} />,
    },
    {
      id: "approved",
      label: "Approved",
      count: 0,
      icon: <SuccessIcon width={20} height={20} />,
    },
    {
      id: "pending",
      label: "Pending",
      count: 0,
      icon: <PendingIcon width={20} height={20} />,
    },
    {
      id: "danger",
      label: "Rejected",
      count: 0,
      icon: <RejectIcon width={20} height={20} />,
    }
  ];

  const issueTypes = [
    { name: "Water Blockage", value: "water_blockage", icon: "🚰" },
    { name: "Corruption", value: "corruption", icon: "💸" },
    { name: "Health Risk", value: "health_risk", icon: "⚕️" },
    { name: "Poor Road Quality", value: "poor_road_quality", icon: "🛣️" },
    { name: "Air Pollution", value: "air_pollution", icon: "🌫️" },
    { name: "Water Pollution", value: "water_pollution", icon: "🌊" },
    { name: "Lack of Education", value: "lack_of_education", icon: "📚" },
    { name: "Unemployment", value: "unemployment", icon: "📉" },
    { name: "Waste Management Issues", value: "waste_management", icon: "🗑️" },
    { name: "Deforestation", value: "deforestation", icon: "🌲" },
    { name: "Traffic Congestion", value: "traffic_congestion", icon: "🚦" },
    { name: "Noise Pollution", value: "noise_pollution", icon: "🔊" },
    { name: "Energy Crisis", value: "energy_crisis", icon: "💡" },
    { name: "Flooding", value: "flooding", icon: "🌧️" },
    { name: "Homelessness", value: "homelessness", icon: "🏠" },
    { name: "Drug Abuse", value: "drug_abuse", icon: "💊" },
    { name: "Child Labor", value: "child_labor", icon: "👶" },
    { name: "Cybersecurity Threats", value: "cybersecurity_threats", icon: "💻" },
    { name: "Climate Change", value: "climate_change", icon: "🌍" },
    { name: "Food Insecurity", value: "food_insecurity", icon: "🍲" },
    { name: "Gender Inequality", value: "gender_inequality", icon: "♀️♂️" },
    { name: "Racial Discrimination", value: "racial_discrimination", icon: "✊" },
    { name: "Urban Sprawl", value: "urban_sprawl", icon: "🏙️" },
    { name: "Mental Health Issues", value: "mental_health", icon: "🧠" },
    { name: "Wildlife Extinction", value: "wildlife_extinction", icon: "🐾" },
    { name: "Illegal Mining", value: "illegal_mining", icon: "⛏️" },
    { name: "Other", value: "other", icon: "⚠️" },
  ];

  const parseModifiedDate = (modified) => {
    const [datePart, timePart] = modified.split(' ');
    const [day, month, year] = datePart.split('-').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);
    return new CalendarDateTime(year, month, day, hours, minutes, seconds);
  };

  return (
    <Card isBlurred className="w-full h-full mb-10 p-2">
      <CardHeader className="flex justify-between items-center flex-wrap gap-3 px-2 md:px-10">
          <div className="flex justify-center items-center gap-3 w-full md:w-auto text-lg font-medium font-sans">{icon} {title}</div>

          <div className="flex justify-center items-center gap-3 w-full sm:w-auto">
          <Chip variant="dot" color="success">{0} Approved</Chip>
          <Chip variant="dot" color="warning">{0} Pending</Chip>
          <Chip variant="dot" color="danger">{0} Rejected</Chip>
          </div>

          <div className="flex justify-center items-center gap-3 w-full md:w-auto">
          <Autocomplete 
              label="Search an issue" 
              className="w-full"
              startContent={<SearchIcon />} 
              size="sm"
          >
              {animals.map((animal) => (
              <AutocompleteItem key={animal.value} value={animal.value}>
                  {animal.label}
              </AutocompleteItem>
              ))}
          </Autocomplete>
          <Popover placement="bottom-end" backdrop="opaque" size="lg">
              <PopoverTrigger>
              <Button variant="ghost" startContent={<FilterIcon />}>Filters</Button>
              </PopoverTrigger>
              <PopoverContent>
              <div className="px-1 py-2">
                  <div className="text-small font-bold">Popover Content</div>
                  <div className="text-tiny">This is the popover content</div>
              </div>
              </PopoverContent>
          </Popover>
          </div>
      </CardHeader>
      
      <CardBody className="p-0 rounded-lg overflow-auto">
          <Tabs aria-label="Issue tabs" 
          className="sticky top-0 z-10 pt-0 backdrop-blur-3xl bg-white/50 dark:bg-black/50 rounded-lg mb-5"
          items={tabs} 
          selectedKey={selected} 
          onSelectionChange={setSelected}
          color={selected === "all" ? "primary" : selected === "approved" ? "success" : selected === "pending" ? "warning" : "danger"}
          variant="underlined"
          >
          {(item) => (
              <Tab key={item.id} star title={<div className="flex items-center gap-2 font-semibold">{item.icon}<p>{item.label}</p>{item.id === "all" && <Chip size="sm" color={selected === "all" ? "primary" : "default"} variant={selected === "all" ? "shadow" : "faded"}>{displayIssues?.length || 0}</Chip>}</div>} />
          )}
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {displayIssues?.map(issue => (
              <Card key={issue._id} className="w-full">
              <CardBody className="flex flex-col md:flex-row justify-center p-0 bg-slate-100 dark:bg-slate-900">
                  <div onClick={() => navigateTo(link + issue._id)} className="flex flex-row md:flex-col justify-center items-center gap-3 w-full h-48 md:w-56 md:h-full bg-red-600 rounded-b-xl md:rounded-bl-none md:rounded-r-xl cursor-pointer">
                  <div className="w-24 h-24 bg-white rounded-xl"></div>
                  <div className="flex flex-col gap-2">
                      <p>Severity: {issue.severity}</p>
                      <p>Progress: {issue.progress}</p>
                  </div>
                  </div>
                  <div className="flex-1 w-full flex flex-col p-5 gap-2">
                  <div className="flex justify-between items-center"><p className="text-lg font-semibold">{issue.title}</p><Chip color="primary" size="sm" variant="dot">{issue._id}</Chip></div>
                  <p className="text-sm">{issue.description.substring(0, 50) + "..."}</p>
                  <DateRangePicker label={<p className="flex w-full justify-between items-center">Issue Duration 🗓️ <Checkbox size="sm" defaultSelected isSelected={issue.issueDuration.onGoing} isReadOnly >On-going</Checkbox></p>}
                      labelPlacement="outside"
                      hideTimeZone
                      isReadOnly
                      size="sm"
                      defaultValue={{
                      start: parseZonedDateTime(issue.issueDuration.start),
                      end: parseZonedDateTime(issue.issueDuration.end),
                      }}
                      className="overflow-auto sm:overflow-hidden"
                  />
                  <DatePicker label="Issue reported on:"
                      labelPlacement="outside-left"
                      size="sm"
                      isReadOnly
                      hideTimeZone
                      showMonthAndYearPickers={false}
                      defaultValue={parseDate(issue.date.split('-').reverse().join('-'))}
                  />
                  <DatePicker label="Issue modified on:"
                      labelPlacement="outside-left"
                      size="sm"
                      isReadOnly
                      hideTimeZone
                      showMonthAndYearPickers={false}
                      defaultValue={parseModifiedDate(issue.modified)}
                  />
                  <div className="flex gap-2">{issue.tags.map((tag, index) => (<Chip key={index} size="sm" variant="shadow" color="secondary">{tag}</Chip>))}</div>
                  </div>
              </CardBody>
              </Card>
          ))}
          </div>
      </CardBody>
    </Card>
  )
}

export default ListIssues;