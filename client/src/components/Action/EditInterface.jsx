import React, { useEffect, useMemo, useState } from 'react'
import { Button, Card, CardBody, CardFooter, Checkbox, Chip, DateRangePicker, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow, Select, SelectItem, Slider, Switch, Textarea, Tooltip, useDisclosure } from '@nextui-org/react'
import {parseZonedDateTime, getLocalTimeZone, today, parseAbsoluteToLocal, now} from "@internationalized/date";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from '../../axios';
import Map from '../ui/Map';
import { FileUpload } from '../ui/FileUpload';
import ReloadIcon from '../../assets/ReloadIcon';
import { PreviewIcon } from '../../assets/PreviewIcon';
import { SubmitIcon } from '../../assets/SubmitIcon';
import { EyeFilledIcon } from '../../assets/EyeFilledIcon';
import { EyeSlashFilledIcon } from '../../assets/EyeSlashFilledIcon';
import LoaderIcon from '../../assets/LoaderIcon';
import { SuccessIcon } from '../../assets/SuccessIcon';
import { ExpandIcon2 } from '../../assets/ExpandIcon2';

const EditInterface = ({ id, issueP }) => {
  const navigateTo = useNavigate();
  const [issue, setIssue] = useState(issueP);
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const getIssue = async() => {
    const result = await axios.get("/issue/" + id);
    if (result.status === 200) {
      setIssue(result.data.issue);
      issueSetter(result.data.issue);
    } else toast.error(result.status + ": " + result.data.error);
  }

  const issueSetter = (issue) => {
    setFiles([]);
    setTitle(issue.title);
    setDescription(issue.description);
    setDisplay(issue.display);
    setSeverity(issue.severity);
    setProgress(issue.progress);
    setAddress(issue.location.address);
    setIssueDate({
      start: parseZonedDateTime(issue.issueDuration.start),
      end:  issue.issueDuration.onGoing ? now(getLocalTimeZone()) : parseZonedDateTime(issue.issueDuration.end),
    });
    setSelectedTypes(issue.type);
    setTags(issue.tags.join(", "));
    setIssueAgainst(issue.against);
    setIssueResolution(issue.resolved);
    setUploadedFiles(issue.issueFiles);
  };

  useEffect(() => {
    if (issueP === undefined) getIssue();
    else issueSetter(issueP);
  }, [issueP])

  const [title, setTitle] = useState(null);
  const validateTitle = (title) => title.trim().length <= 10 || title.trim().length >= 70;
  const isInvalidTitle = useMemo(() => {
    if (title === null) return false;
    return validateTitle(title) ? true : false;
  }, [title]);

  const [description, setDescription] = useState(null);
  const validateDescription = (description) => description.trim().length <= 50 || description.trim().length >= 1000;
  const isInvalidDescription = useMemo(() => {
    if (description === null) return false;
    return validateDescription(description) ? true : false;
  }, [description]);

  const [display, setDisplay] = useState(false);
  const [severity, setSeverity] = useState(1);
  const [progress, setProgress] = useState(0);
  const [issueDate, setIssueDate] = useState({
    start: parseAbsoluteToLocal(today(getLocalTimeZone()).subtract({days: 1}).toString() + "T00:00:22Z"),
    end: now(getLocalTimeZone())
  });
  const [onGoing, setOnGoing] = useState(true);

  const [address, setAddress] = useState(null);
  const validateAddress = (address) => address.trim().length <= 20 || address.trim().length >= 100;
  const isInvalidAddress = useMemo(() => {
    if (address === null) return false;
    return validateAddress(address) ? true : false;
  }, [address]);

  const [coordinates, setCoordinates] = useState({ lat: 21.15, lng: 79.10 });

  const [selectedTypes, setSelectedTypes] = useState(new Set([]));
  const [typeChange, setTypeChange] = useState(false);
  const isInvalidTypes = useMemo(() => {
    if (typeChange && selectedTypes.size === 0) return true;
    return false;
  }, [selectedTypes, typeChange]);
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

  const [tags, setTags] = useState(null);
  const validateTags = (tags) => { return tags.split(",").some((tag) => { const trimmedTag = tag.trim(); return trimmedTag.length > 5 && trimmedTag.length < 15; });};
  const isInvalidTags = useMemo(() => {
    if (tags === null) return false;
    if (tags.trim() === "") return true;
    return validateTags(tags) ? false : true;
  }, [tags]);

  const [issueAgainst, setIssueAgainst] = useState({organization:"", position:"", name: "", description:""});
  const handleIssueAgainstChange = (e) => setIssueAgainst((prev) => ({ ...prev, [e.name]: e.value }));

  const [issueResolution, setIssueResolution] = useState({organization:"", position:"", name: "", description:""});
  const handleIssueResolutionChange = (e) => setIssueResolution((prev) => ({ ...prev, [e.name]: e.value }));  

  const validator = () => {
    if (files.length === 0 && uploadedFiles.length === 0)  {toast.error("Upload atleast one file related to the issue."); return false;}
    if (title === null || isInvalidTitle) {toast.error("Please check issue title."); if(title === null) setTitle(""); return false;}
    if (description === null || isInvalidDescription) {toast.error("Please check issue description."); if(description === null) setDescription(""); return false;}
    if (address === null || isInvalidAddress) {toast.error("Please check issue address."); if(address === null) setAddress(""); return false;}
    if (selectedTypes.size === 0) {toast.error("Please check issue types."); if(!typeChange) setTypeChange(true); return false;}
    if (tags === null || isInvalidTags) {toast.error("Please check issue tags."); if(tags === null) setTags(""); return false;}
    return true;
  }

  const submitModal = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(null);

  const handleSubmit = async() => {
    setLoading(true);
    if (!validator()) {submitModal.onClose(); setLoading(false); return;}
    const jsonData = { 
      title: title.trim(),
      description: description.trim(),
      display: display,
      severity: severity,
      progress: progress,
      location: {address: address, coordinates: coordinates},
      issueDate: { start: issueDate.start.toString(), end: issueDate.end.toString(), onGoing: onGoing },
      type: [...selectedTypes],
      tags: tags.split(",").map(tag => tag.trim()),
      against: issueAgainst,
      resolved: issueResolution,
    };
    const formData = new FormData();
    formData.append('json', JSON.stringify(jsonData));
    files.forEach((file) => {
      formData.append(file.name, file);
    });

    try {
      const result = await axios.post("/issues/edit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(result.data.message, result.data.issue_id);
      setAdded(result.data.issue_id);
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
    setLoading(false);
  };

  const handleReset = () => {
    setFiles([]);
    setTitle(null);
    setDescription(null);
    setDisplay(false);
    setSeverity(1);
    setProgress(0);
    setAddress(null);
    setCoordinates({ lat: 21.15, lng: 79.10 });
    setIssueDate({
      start: parseAbsoluteToLocal(today(getLocalTimeZone()).subtract({days: 1}).toString() + "T00:00:22Z"),
      end: now(getLocalTimeZone())
    });
    setSelectedTypes(new Set([]));
    setTypeChange(false);
    setTags(null);
    setIssueAgainst({organization:"", position:"", name: "", description:""});
    setIssueResolution({organization:"", position:"", name: "", description:""});
    setLoading(false);
    setAdded(null);
  };
  const resetModal = useDisclosure();

  const handlePrint = () => {
    toast("Coming Soon");
  };
  const previewModal = useDisclosure();

  const [pdf, setPdf] = useState({});
  const [image, setImage] = useState({});
  const fileModal = useDisclosure();

  return (
    <Card isBlurred className="p-0 sm:p-2 mb-20 sm:mb-0 sm:h-full">
      <CardBody className='mb-5 sm:pb-0'>
        <div className="flex flex-wrap sm:flex-nowrap gap-5 relative h-full">
          <div className="w-full sm:w-[30%] flex flex-col gap-5">
            <div className="w-full max-w-2xl mx-auto min-h-52 border border-dashed bg-gray-100 dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
              <FileUpload files={files} setFiles={setFiles}/>
            </div>
            <ScrollShadow orientation="horizontal" hideScrollBar className="w-full max-w-full overflow-auto scroll-smooth">
              <div className="flex gap-4 h-[160px] items-center">
                {uploadedFiles.length > 0 && uploadedFiles.map((upload, index) => (
                  upload.contentType !== "application/pdf" ? (
                    <div
                      key={index}
                      className="flex-shrink-0 outline-none focus:ring-2 focus:ring-blue-600 rounded-lg relative"
                      tabIndex={0}
                    >
                      <img
                        src={upload.url}
                        alt={upload.pathname}
                        className="h-40 object-contain rounded-lg shadow"
                      />
                      <Button variant="shadow" isIconOnly color="primary" onPress={() => {setImage(upload); fileModal.onOpen();}} className="absolute top-1 left-1 w-10 h-10 rounded-xl z-[60]"><ExpandIcon2 /></Button>
                    </div>
                  ) : (
                    <div key={index} className="flex-shrink-0 relative">
                      <object data={upload.url} type="application/pdf" width="100%" height="100%" className="hidden sm:block outline-none focus:ring-2 focus:ring-blue-600 rounded-lg" tabIndex={0}>
                        <p>{upload.pathname} <a href={upload.url} /></p>
                      </object>
                      <span className="block sm:hidden absolute top-1 left-1/2 -translate-x-1/2 text-center">{upload.pathname.substring(0,15) + "..."}</span>
                      <iframe
                        src={upload.url}
                        width="100%"
                        height="100%"
                        className="block sm:hidden outline-none focus:ring-2 focus:ring-blue-600 rounded-lg"
                        tabIndex={0}
                        title={upload.pathname}
                      />
                      <Button variant="shadow" isIconOnly color="primary" onPress={() => {setImage(upload); fileModal.onOpen();}} className="absolute top-1 left-1 w-10 h-10 rounded-xl z-[60]"><ExpandIcon2 /></Button>
                    </div>
                  )
                ))}
                {files.length > 0 && files.map((file, index) => 
                  file.type !== "application/pdf" ? (
                    <div
                      key={index}
                      className="flex-shrink-0 outline-none focus:ring-2 focus:ring-blue-600 rounded-lg relative"
                      tabIndex={0}
                    >
                      <img
                        src={file.preview}
                        alt={file.name}
                        className="h-40 object-contain rounded-lg shadow"
                      />
                      <Button variant="shadow" isIconOnly color="primary" onPress={() => {setPdf(file); fileModal.onOpen();}} className="absolute top-1 left-1 w-10 h-10 rounded-xl z-[60]"><ExpandIcon2 /></Button>
                    </div>
                  ) : (
                    <div key={index} className="flex-shrink-0 relative">
                      <object data={file.preview} type="application/pdf" width="100%" height="100%" className="hidden sm:block outline-none focus:ring-2 focus:ring-blue-600 rounded-lg" tabIndex={0}>
                        <p>{file.name} <a href={file.preview} /></p>
                      </object>
                      <span className="block sm:hidden absolute top-1 left-1/2 -translate-x-1/2 text-center">{file.name.substring(0,15) + "..."}</span>
                      <iframe
                        src={file.preview}
                        width="100%"
                        height="100%"
                        className="block sm:hidden outline-none focus:ring-2 focus:ring-blue-600 rounded-lg"
                        tabIndex={0}
                        title={file.name}
                      />
                      <Button variant="shadow" isIconOnly color="primary" onPress={() => {setPdf(file); fileModal.onOpen();}} className="absolute top-1 left-1 w-10 h-10 rounded-xl z-[60]"><ExpandIcon2 /></Button>
                    </div>
                  )
                )}
                <Modal size="5xl" isOpen={fileModal.isOpen} onOpenChange={fileModal.onOpenChange} onClose={() => {setImage({}); setPdf({});}}>
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader>{pdf.pathname || pdf.name || image.name || image.pathname}</ModalHeader>
                        <ModalBody>
                          <object data={pdf.url || pdf.preview || image.url || image.preview} type="application/pdf" width="100%" height="500px" className="hidden sm:block outline-none focus:ring-2 focus:ring-blue-600 rounded-lg" tabIndex={0}>
                            <p>{pdf.pathname || pdf.name || image.name || image.pathname} <a href={pdf.url || pdf.preview || image.url || image.preview} /></p>
                          </object>
                          {pdf.url || pdf.preview ? (
                            <iframe
                              src={pdf.url || pdf.preview}
                              width="100%"
                              height="100%"
                              className="block sm:hidden outline-none focus:ring-2 focus:ring-blue-600 rounded-lg"
                              tabIndex={0}
                              title={pdf.pathname || pdf.name}
                            />
                          ) : (
                            <img
                              src={image.preview || image.url}
                              alt={image.name || image.pathname}
                              className="object-contain rounded-lg shadow block sm:hidden"
                            />
                          )}
                        </ModalBody>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </div>
            </ScrollShadow>
          </div>
          <ScrollShadow className="flex-1 bg-white dark:bg-inherit rounded-lg h-auto overflow-auto p-5">
            <form id="issueForm" className="flex flex-col gap-3 font-medium">
              <div className="flex flex-col-reverse sm:flex-row gap-5 mb-10 justify-center items-center">
                <div className="w-full sm:w-[60%] p-2 flex flex-col gap-5">
                  <Input
                    type="text"
                    name="title"
                    label="Title"
                    value={title || ""}
                    onValueChange={setTitle}
                    labelPlacement="outside"
                    placeholder="Enter title"
                    isRequired
                    isClearable
                    isInvalid={isInvalidTitle}
                    errorMessage="Title must be atleast 10 and atmost 70 characters long."
                  />

                  <Textarea
                    name="description"
                    label="Description"
                    labelPlacement="outside"
                    placeholder="Enter description"
                    description="Enter a concise description of your issue."
                    value={description || ""}
                    onValueChange={setDescription}
                    minRows={3}
                    maxRows={4}
                    isRequired
                    isClearable
                    isInvalid={isInvalidDescription}
                    errorMessage="Description must be atleast 50 and atmost 1000 characters long."
                  />
                </div>
                <div className="flex-1 p-5 w-full flex flex-col md:flex-row justify-center align-middle items-center gap-5">
                  <div className="w-[80%] md:w-[50%] flex flex-col justify-center items-center align-middle gap-2 py-10 sm:py-auto bg-red-600 h-full rounded-xl hover:shadow-xl hover:shadow-red-600/60 transition-shadow">
                    <div className="bg-white w-20 h-20 rounded-xl"></div>
                    <p className="text-center text-sm font-medium">Meow</p>
                  </div>
                  <div className="flex-1 w-full flex flex-col gap-5">
                    <div className="flex justify-between items-center">
                      <p className="text-sm">{display ? "Public" : "Private"}</p>
                      <Tooltip content={<p className="w-40 text-[12px] text-center font-medium ">📢 Private issues won't be displayed but will be verified and included into overall statistics once approved.</p>} offset={30} color="warning">
                        <Switch defaultSelected aria-label="Visibility" size="lg"
                          thumbIcon={({ isSelected, className }) =>
                            isSelected ? (
                              <EyeFilledIcon className={className} />
                            ) : (
                              <EyeSlashFilledIcon className={className} />
                            )
                          }
                          isSelected={display}
                          onValueChange={setDisplay}
                        />
                      </Tooltip>
                    </div>
                    <Slider   
                      size="md"
                      step={1}
                      color="primary"
                      label="Severity"
                      name="severity"
                      showSteps={true} 
                      maxValue={5} 
                      minValue={1} 
                      defaultValue={1}
                      value={severity}
                      onChange={setSeverity}
                      classNames={{
                        base: "w-full gap-3",
                        track: "border-s-danger-100",
                        filler: "bg-gradient-to-r from-danger-100 to-danger-500"
                      }}
                      renderThumb={(props) => (
                        <div
                          {...props}
                          className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                        >
                          <span className="transition-transform bg-gradient-to-br shadow-small from-danger-100 to-danger-500 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80" />
                        </div>
                      )}
                    />
                    <Slider   
                      size="md"
                      step={1}
                      color="primary"
                      label="Progress"
                      name="progress"
                      showSteps={false} 
                      maxValue={100} 
                      minValue={0} 
                      defaultValue={0}
                      value={progress}
                      onChange={setProgress}
                      classNames={{
                        base: "w-full gap-3",
                        track: "border-s-success-100",
                        filler: "bg-gradient-to-r from-success-100 to-success-500"
                      }}
                      renderThumb={(props) => (
                        <div
                          {...props}
                          className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                        >
                          <span className="transition-transform bg-gradient-to-br shadow-small from-success-100 to-success-500 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80" />
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 mb-10 justify-center items-center">
                <div className="w-full sm:w-[60%] p-1 flex flex-col gap-1">
                  <Map setAddress={setAddress} setLocation={setCoordinates} />
                </div>
                <div className="flex-1 flex flex-col gap-5 w-full">
                  <Textarea
                    type="text"
                    name="address"
                    label="Issue address📍🗺️"
                    labelPlacement="outside"
                    placeholder="Enter issue address"
                    description="Enter the address where the issue is identified."
                    minRows={3}
                    maxRows={4}
                    value={address || ""}
                    onValueChange={setAddress}
                    isRequired
                    isClearable
                    isInvalid={isInvalidAddress}
                    errorMessage="Address must be atleast 20 and atmost 100 characters long."
                  />
                  <div className="flex justify-around">
                    <div className="flex flex-col gap-2 justify-center"><Chip size="lg" color="primary" variant="shadow">{coordinates.lat}</Chip><p>Latitude</p></div>
                    <div className="flex flex-col gap-2 justify-center"><Chip size="lg" color="primary" variant="shadow">{coordinates.lng}</Chip><p>Longitude</p></div>
                  </div>
                </div>
              </div>

              <DateRangePicker label={<p className="flex w-full justify-between items-center">Issue Duration 🗓️ <Checkbox defaultSelected isSelected={onGoing} onChange={() => setOnGoing(!onGoing)} >On-going</Checkbox></p>}
                labelPlacement="outside"
                hideTimeZone
                visibleMonths={1}
                size="lg"
                maxValue={parseZonedDateTime(today(getLocalTimeZone()).toString() + "T23:59[Asia/Calcutta]")}
                defaultValue={issueDate}
                granularity="minute"
                value={issueDate}
                onChange={setIssueDate}
                className="overflow-auto sm:overflow-hidden mb-10"
              />

              <Select
                items={issueTypes}
                defaultSelectedKeys={selectedTypes}
                label="Issue Types"
                labelPlacement="inside"
                description="Select type of issue appropriately."
                variant="flat"
                selectionMode="multiple"
                className="mb-10"
                classNames={{
                  label: "h-auto text-auto",
                  trigger: "min-h-14 h-fit",
                  listboxWrapper: "max-h-[200px]",
                }}
                isRequired
                onChange={() => setTypeChange(true)}
                isInvalid={isInvalidTypes}
                errorMessage="Select atleast 1 issue type."
                listboxProps={{
                  itemClasses: {
                    base: [
                      "rounded-md",
                      "text-default-500",
                      "transition-opacity",
                      "data-[hover=true]:text-foreground",
                      "data-[hover=true]:bg-default-100",
                      "dark:data-[hover=true]:bg-default-50",
                      "data-[selectable=true]:focus:bg-default-50",
                      "data-[pressed=true]:opacity-70",
                      "data-[focus-visible=true]:ring-default-500",
                    ],
                  },
                }}
                popoverProps={{
                  classNames: {
                    base: "before:bg-default-200",
                    content: "p-0 border-small border-divider bg-background",
                  },
                }}
                renderValue={(items) => {
                  return (
                    <div className="flex flex-wrap gap-3 ml-24">
                      {items.map((item) => (
                        <Chip key={item.key} variant="shadow" color="primary" startContent={<p>{item.data.icon}</p>}>{item.data.name}</Chip>
                      ))}
                    </div>
                  )}
                }
                selectedKeys={selectedTypes}
                onSelectionChange={setSelectedTypes}
              >
                {(user) => (
                  <SelectItem key={user.value} textValue={user.name}>
                    <div className="flex gap-2 items-center">
                      {user.icon}
                      <p className="text-small">{user.name}</p>
                    </div>
                  </SelectItem>
                )}
              </Select>

              <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
                <Input
                  label="Tags 🏷️"
                  labelPlacement="outside"
                  placeholder="Enter tags related to issue"
                  description="Type in comma seperated tags."
                  type="text"
                  name="tags"
                  value={tags || ""}
                  onValueChange={setTags}
                  className="w-full md:w-[40%]"
                  isClearable
                  isRequired
                  isInvalid={isInvalidTags}
                  errorMessage={<p>Alteast 1 tag is required. <br />Tab must be atleast 5 to atmost 15 characters is required.</p>}
                />
                <div className="flex-1 w-full flex flex-wrap gap-3 p-5 bg-neutral-100 dark:bg-black rounded-xl">
                  {tags?.trim() !== "" && tags?.split(",").map((tag, index) =>
                    tag.trim() !== "" && <Chip key={index} variant="shadow" color="secondary">{tag.trim()}</Chip>
                  )}
                </div>
              </div>
              
              <Divider className="my-2" />
              <div className="text-xl font-medium flex items-center">🆚 Issue Against &nbsp;&nbsp;<Chip size="sm" variant="shadow" color="secondary">Optional</Chip></div>
              <div className="flex flex-col gap-5 mb-10">
                <div className="flex flex-col sm:flex-row gap-5">  
                  <Input 
                    label="Organization"
                    labelPlacement="inside"
                    placeholder="Enter organization complete name"
                    description="Organization related to the cause of the issue."
                    type="text"
                    variant="underlined"
                    isClearable
                    value={issueAgainst.organization}
                    onValueChange={(value) => handleIssueAgainstChange({name: "organization", value: value})}
                  />
                  <Input 
                    label="Position"
                    labelPlacement="inside"
                    placeholder="Enter position details"
                    description="Position within the organization related to the cause of the issue."
                    type="text"
                    variant="underlined"
                    isClearable
                    value={issueAgainst.position}
                    onValueChange={(value) => handleIssueAgainstChange({name: "position", value: value})}
                  />
                  <Input 
                    label="Name"
                    labelPlacement="inside"
                    placeholder="Enter individual's complete name"
                    description="Individual's name related to the cause of the issue."
                    type="text"
                    variant="underlined"
                    isClearable
                    value={issueAgainst.name}
                    onValueChange={(value) => handleIssueAgainstChange({name: "name", value: value})}
                  />
                </div>
                <Textarea
                  label="Description"
                  labelPlacement="inside"
                  placeholder="Enter description"
                  description="Describe what and how the responsibility falls under the name specified."
                  maxRows={3}
                  type="text"
                  variant="faded"
                  value={issueAgainst.description}
                  onValueChange={(value) => handleIssueAgainstChange({name: "description", value: value})}
                />
              </div>

              <Divider className="my-2" />
              <div className="text-xl font-medium flex items-center">✅ Issue Resolution &nbsp;&nbsp;<Chip size="sm" variant="shadow" color="secondary">Optional</Chip></div>
              <div className="flex flex-col gap-5 mb-10">
                <div className="flex flex-col sm:flex-row gap-5">  
                  <Input 
                    label="Organization"
                    labelPlacement="inside"
                    placeholder="Enter organization complete name"
                    description="Organization working or related to the resolution of the issue."
                    type="text"
                    variant="underlined"
                    isClearable
                    value={issueResolution.organization}
                    onValueChange={(value) => handleIssueResolutionChange({name: "organization", value: value})}
                  />
                  <Input 
                    label="Position"
                    labelPlacement="inside"
                    placeholder="Enter position details"
                    description="Position within the organization working or related to the resolution of the issue."
                    type="text"
                    variant="underlined"
                    isClearable
                    value={issueResolution.position}
                    onValueChange={(value) => handleIssueResolutionChange({name: "position", value: value})}
                  />
                  <Input 
                    label="Name"
                    labelPlacement="inside"
                    placeholder="Enter individual's complete name"
                    description="Individual's name working or related to the resolution of the issue."
                    type="text"
                    variant="underlined"
                    isClearable
                    value={issueResolution.name}
                    onValueChange={(value) => handleIssueResolutionChange({name: "name", value: value})}
                  />
                </div>
                <Textarea
                  label="Description"
                  labelPlacement="inside"
                  placeholder="Enter description"
                  description="Describe what and how the described name working on the issue."
                  maxRows={3}
                  type="text"
                  variant="faded"
                  value={issueResolution.description}
                  onValueChange={(value) => handleIssueResolutionChange({name: "description", value: value})}
                />
              </div>
            </form>
          </ScrollShadow>
        </div>
      </CardBody>
      <CardFooter className="flex justify-center sm:justify-end gap-5 py-6">
        <Button variant='light' color='danger' onPress={resetModal.onOpen} endContent={<ReloadIcon />}>Reset</Button>
        <Modal isOpen={resetModal.isOpen} onOpenChange={resetModal.onOpenChange} >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex justify-start align-middle items-center w-full gap-1 text-2xl"><ReloadIcon /> Reset form ?</ModalHeader>
                <ModalBody> <p> Are you sure you want to reset the entire form? </p> </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={resetModal.onClose}> No </Button>
                  <Button color="primary" onPress={() => {issueSetter(issue); onClose();}}> Yes </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <Button variant='light' color='secondary' onPress={previewModal.onOpen} endContent={<PreviewIcon />}>Preview</Button>
        <Modal isOpen={previewModal.isOpen} onOpenChange={previewModal.onOpenChange} size="5xl" >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex justify-start align-middle items-center w-full gap-1 text-2xl"><PreviewIcon /> Preview form ?</ModalHeader>
                <ModalBody> <p> Load form preview here... </p> </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={previewModal.onClose}> Make changes? </Button>
                  <Button color="primary" onPress={() => {handlePrint(); onClose();}}> Print </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <Button variant='shadow' color='primary' onPress={() => validator() && submitModal.onOpen()} form="issueForm" endContent={<SubmitIcon />}>Submit</Button>
        <Modal isOpen={submitModal.isOpen} onOpenChange={submitModal.onOpenChange} hideCloseButton={added || loading} isDismissable={!loading && added === null} isKeyboardDismissDisabled={true}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex justify-start align-middle items-center w-full gap-1 text-2xl">
                  <SubmitIcon /> &nbsp;&nbsp; <p>{added ? "Issue submitted successfully." : loading ? "Submitting issue..." : "Submit issue ?"}</p>
                </ModalHeader>
                <ModalBody className="p-5"> {added ? <SuccessIcon className="text-green-600 text-center text-[56px] w-full" /> : loading ? <LoaderIcon className="text-blue-600 text-center text-[56px] w-full" /> : <p>Are you sure you want to save these changes in the issue? </p>}</ModalBody>
                <ModalFooter>
                  {added ? (
                    <>
                      <Button color="primary" variant="light" onPress={() => {handleReset(); onClose();}}> Add new issue </Button>
                      <Button color="success"onPress={() => {navigateTo("/user/action/myissues/" + added); handleReset(); onClose();}}> View  </Button>
                    </>
                  ) : (
                    <>
                      <Button color="danger" variant="light" onPress={submitModal.onClose} isDisabled={loading} > No </Button>
                      <Button color="primary" isLoading={loading} onPress={handleSubmit}> Yes </Button>
                    </>
                  )}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </CardFooter>
    </Card>
  )
}

export default EditInterface