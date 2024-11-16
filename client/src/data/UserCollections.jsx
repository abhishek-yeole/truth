import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

export default function UserCollections() {
  const columns = [
    { key: "field", label: "Field" },
    { key: "type", label: "Type" },
    { key: "description", label: "Description" },
  ];
  
  const rows = [
    { key: 1, field: "_id", type: "String/UUID", description: "Unique identifier for the user." },
    { key: 2, field: "name", type: "String", description: "The full name of the user." },
    { key: 3, field: "email", type: "String", description: "The email address of the user." },
    { key: 4, field: "password", type: "String", description: "The hashed password for authentication." },
    { key: 5, field: "UID", type: "String", description: "A unique ID like Aadhar, PAN, Driving License, etc." },
    {
      key: 6,
      field: "location",
      type: "Object",
      description: "Contains address and geographical coordinates of the user.",
    },
    { key: 7, field: "verified", type: "Boolean", description: "Indicates if the user has been verified (decision made by admin)." },
  ];
  
  const locationRows = [
    { key: 1, field: "address", type: "String", description: "The user's physical address." },
    { key: 2, field: "coords.lat", type: "String", description: "Latitude coordinate." },
    { key: 3, field: "coords.lon", type: "String", description: "Longitude coordinate." },
  ];
  
  
  const user = {
    _id: '1234567890abcdef',
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '********',
    UID: 'Aadhar: 1234-5678-9012',
    location: {
      address: '123 Main Street, Springfield',
      coords: { lat: '37.7749', lon: '-122.4194' },
    },
    verified: true,
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Users Collection</h1>
      <Table isStriped aria-label="Users table">
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.key}>
              {(columnKey) => <TableCell>{getKeyValue(row, columnKey)}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <h2 className="text-xl font-semibold mt-8 mb-4">Location Sub-Object</h2>
      <Table aria-label="Location table">
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {locationRows.map((row) => (
            <TableRow key={row.key}>
              {(columnKey) => <TableCell>{getKeyValue(row, columnKey)}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <h2 className="text-xl font-semibold mt-8 mb-4">Examples</h2>
      <Table aria-label="User details">
        <TableHeader>
          <TableColumn>Field</TableColumn>
          <TableColumn>Value</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>{user._id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>{user.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>{user.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Password</TableCell>
            <TableCell>{user.password}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>UID</TableCell>
            <TableCell>{user.UID}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Location</TableCell>
            <TableCell>
              <div>Address: {user.location.address}</div>
              <div>Coordinates: {`Lat: ${user.location.coords.lat}, Lon: ${user.location.coords.lon}`}</div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Verified</TableCell>
            <TableCell>{user.verified ? 'Yes' : 'No'}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
