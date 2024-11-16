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

export default function IssuesCollections() {  
  const columns = [
    { key: "field", label: "Field" },
    { key: "type", label: "Type" },
    { key: "description", label: "Description" },
  ];

  const rows = [
    {
      key: 1,
      field: "_id",
      type: "String/UUID",
      description: "Unique identifier for the issue.",
    },
    {
      key: 2,
      field: "user_id",
      type: "String/UUID",
      description: "Reference to the user who created the issue.",
    },
    {
      key: 3,
      field: "title",
      type: "String",
      description: "A brief title describing the issue.",
    },
    {
      key: 4,
      field: "description",
      type: "String",
      description: "A detailed description of the issue.",
    },
    {
      key: 5,
      field: "location",
      type: "Object",
      description:
        "Includes the address and geographical coordinates of the issue.",
    },
    {
      key: 6,
      field: "date",
      type: "DateTime",
      description: "The date the issue was created in dd-mm-yyyy format.",
    },
    {
      key: 7,
      field: "approved",
      type: "Boolean",
      description: "Indicates if the issue has been approved (admin decision).",
    },
    {
      key: 8,
      field: "display",
      type: "String",
      description: "Visibility of the issue (public or private).",
    },
    {
      key: 9,
      field: "type",
      type: "Object/String",
      description:
        "Pre-defined issue type (e.g., corruption, water blockage) or custom type.",
    },
    {
      key: 10,
      field: "against",
      type: "Object",
      description: "Details of entities against whom the issue is raised.",
    },
    {
      key: 11,
      field: "resolved",
      type: "Object",
      description: "Details of the resolution status and entities involved.",
    },
    {
      key: 12,
      field: "severity",
      type: "Number",
      description: "Severity level of the issue on a scale of 1 to 5.",
    },
    {
      key: 13,
      field: "comments",
      type: "Array",
      description:
        "List of comments with user ID, content, and admin review status.",
    },
    {
      key: 14,
      field: "upvotes",
      type: "Array",
      description: "List of user IDs who upvoted the issue.",
    },
    {
      key: 15,
      field: "tags",
      type: "Array",
      description: "Tags for better issue categorization and analysis.",
    },
  ];

  const examples = [
    {
      _id: '12345',
      user_id: '67890',
      title: 'Water Blockage in Street',
      description: 'There has been a severe water blockage in our area due to poor drainage.',
      location: { address: '123 Elm Street, Springfield', coords: { lat: '37.7749', lon: '-122.4194' } },
      date: '16-11-2024',
      approved: true,
      display: 'public',
      type: { predefined: 'Water Blockage', other: '' },
      against: {
        political_party: '',
        leader_name: 'John Mayor',
        department_name: 'Water Works',
        officer_name: 'Mr. Smith',
        other: '',
      },
      resolved: {
        status: false,
        political_party: '',
        leader_name: '',
        department_name: '',
        officer_name: '',
        other: '',
      },
      type: 'major',
      severity: 4,
      comments: [
        { user_id: '11111', comment: 'This needs urgent attention!', reviewed: true },
        { user_id: '22222', comment: 'I also face this issue.', reviewed: false },
      ],
      upvotes: ['33333', '44444'],
      tags: ['water blockage', 'drainage', 'public issue'],
    },
    {
      _id: '54321',
      user_id: '98765',
      title: 'Corruption in Local Office',
      description: 'Bribery is being demanded to issue basic documents.',
      location: { address: 'Office Lane, Metropolis', coords: { lat: '40.7128', lon: '-74.0060' } },
      date: '15-11-2024',
      approved: true,
      display: 'private',
      type: { predefined: 'Corruption', other: '' },
      against: {
        political_party: 'Justice Party',
        leader_name: 'Jane Doe',
        department_name: 'Public Services',
        officer_name: 'Mr. Johnson',
        other: '',
      },
      resolved: {
        status: false,
        political_party: '',
        leader_name: '',
        department_name: '',
        officer_name: '',
        other: '',
      },
      type: 'major',
      severity: 5,
      comments: [],
      upvotes: ['55555', '66666'],
      tags: ['corruption', 'bribery', 'local office'],
    },
  ];

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Issues Collection</h1>
        <Table isStriped aria-label="Issues table">
          <TableHeader>
            {columns.map((column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.key}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(row, columnKey)}</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex flex-wrap justify-center align-middle items-center gap-10">
        {examples.map((issue) => (
          <div
            key={issue._id}
            className="p-6 bg-neutral-100 dark:bg-neutral-700 hover:dark:bg-blue-600 hover:bg-blue-500 shadow-lg hover:shadow-blue-500 rounded-lg transition-all"
          >
            <h2 className="text-lg font-bold mb-2">
              {issue.title}
            </h2>
            <p className="text-sm mb-4">{issue.description}</p>

            <Table aria-label="Issue details">
              <TableHeader>
                <TableColumn>Field</TableColumn>
                <TableColumn>Value</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>{issue.date}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Location</TableCell>
                  <TableCell>
                    <div>Address: {issue.location.address}</div>
                    <div>
                      Coordinates:{" "}
                      {`Lat: ${issue.location.coords.lat}, Lon: ${issue.location.coords.lon}`}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Approved</TableCell>
                  <TableCell>{issue.approved ? "Yes" : "No"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Display</TableCell>
                  <TableCell>{issue.display}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Severity</TableCell>
                  <TableCell>{issue.severity}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tags</TableCell>
                  <TableCell>{issue.tags.join(", ")}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        ))}
      </div>
    </>
  );
}
