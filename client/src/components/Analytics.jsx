import React from 'react'
import Map from '../assets/analytics_map.png';
import Chart1 from './Charts/Chart1';
import Chart2 from './Charts/Chart2';
import { Autocomplete, AutocompleteItem, Card, CardBody, Select, SelectItem } from '@nextui-org/react';

const Analytics = () => {
  const statesOfIndia = [
    { label: "Andhra Pradesh", value: "andhra-pradesh" },
    { label: "Arunachal Pradesh", value: "arunachal-pradesh" },
    { label: "Assam", value: "assam" },
    { label: "Bihar", value: "bihar" },
    { label: "Chhattisgarh", value: "chhattisgarh" },
    { label: "Goa", value: "goa" },
    { label: "Gujarat", value: "gujarat" },
    { label: "Haryana", value: "haryana" },
    { label: "Himachal Pradesh", value: "himachal-pradesh" },
    { label: "Jharkhand", value: "jharkhand" },
    { label: "Karnataka", value: "karnataka" },
    { label: "Kerala", value: "kerala" },
    { label: "Madhya Pradesh", value: "madhya-pradesh" },
    { label: "Maharashtra", value: "maharashtra" },
    { label: "Manipur", value: "manipur" },
    { label: "Meghalaya", value: "meghalaya" },
    { label: "Mizoram", value: "mizoram" },
    { label: "Nagaland", value: "nagaland" },
    { label: "Odisha", value: "odisha" },
    { label: "Punjab", value: "punjab" },
    { label: "Rajasthan", value: "rajasthan" },
    { label: "Sikkim", value: "sikkim" },
    { label: "Tamil Nadu", value: "tamil-nadu" },
    { label: "Telangana", value: "telangana" },
    { label: "Tripura", value: "tripura" },
    { label: "Uttar Pradesh", value: "uttar-pradesh" },
    { label: "Uttarakhand", value: "uttarakhand" },
    { label: "West Bengal", value: "west-bengal" },
  ];  

  const searchFilters = [
    { label: "Water Blockage", value: "water-blockage" },
    { label: "Drainage Issues", value: "drainage-issues" },
    { label: "Air Pollution", value: "air-pollution" },
    { label: "Water Pollution", value: "water-pollution" },
    { label: "Soil Pollution", value: "soil-pollution" },
    { label: "Noise Pollution", value: "noise-pollution" },
    { label: "Waste Mismanagement", value: "waste-mismanagement" },
    { label: "Deforestation", value: "deforestation" },
    { label: "Urban Encroachment", value: "urban-encroachment" },
    { label: "Overpopulation", value: "overpopulation" },
    { label: "Resource Depletion", value: "resource-depletion" },
    { label: "Flooding", value: "flooding" },
    { label: "Drought", value: "drought" },
    { label: "Climate Change", value: "climate-change" },
    { label: "Biodiversity Loss", value: "biodiversity-loss" },
    { label: "Overfishing", value: "overfishing" },
    { label: "Erosion", value: "erosion" },
    { label: "Landfills Overflow", value: "landfills-overflow" },
    { label: "Pesticide Usage", value: "pesticide-usage" },
    { label: "Industrial Emissions", value: "industrial-emissions" },
    { label: "Plastic Pollution", value: "plastic-pollution" },
    { label: "Heat Islands", value: "heat-islands" },
    { label: "Water Scarcity", value: "water-scarcity" },
    { label: "Energy Overuse", value: "energy-overuse" },
    { label: "Carbon Emissions", value: "carbon-emissions" },
  ];  

  return (
    <div className='flex flex-col sm:flex-row p-5'>
      <div className='flex flex-col'>
        <div className='flex gap-2'>
          <Select 
            label="Select an search filter" 
            className="max-w-xs" 
          >
            {searchFilters.map((filter) => (
              <SelectItem key={filter.key}>
                {filter.label}
              </SelectItem>
            ))}
          </Select>
          <Autocomplete
            label="Select an state" 
            className="max-w-full" 
          >
            {statesOfIndia.map((state) => (
              <AutocompleteItem key={state.value} value={state.value}>
                {state.label}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </div>
        <img src={Map} alt="Analytics Map India" className='w-auto h-auto' />
      </div>
      <Card fullWidth>
        <CardBody className='flex justify-center items-center'>
          <Chart1 />
          <Chart2 />
        </CardBody>
      </Card> 
    </div>
  )
}

export default Analytics