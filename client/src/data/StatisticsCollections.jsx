import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';

const StatisticsCollections = () => {
  const statistics = {
    _id: 'abcdef1234567890',
    total_issues: 200,
    public_issues: 150,
    resolved_issues: 120,
    issues: [
      {
        title: 'Water Blockage in Street',
        description: 'There has been a severe water blockage in our area due to poor drainage.',
        location: { address: '123 Elm Street, Springfield', coords: { lat: '37.7749', lon: '-122.4194' } },
        date: '16-11-2024',
        type: 'Water Blockage',
        against: { department_name: 'Water Works', officer_name: 'Mr. Smith' },
        resolved: { status: true },
        severity: 4,
        comments: [
          { user_id: '11111', comment: 'This needs urgent attention!', reviewed: true },
          { user_id: '22222', comment: 'I also face this issue.', reviewed: false },
        ],
        tags: ['water blockage', 'drainage'],
      },
      {
        title: 'Corruption in Local Office',
        description: 'Bribery is being demanded to issue basic documents.',
        location: { address: 'Office Lane, Metropolis', coords: { lat: '40.7128', lon: '-74.0060' } },
        date: '15-11-2024',
        type: 'Corruption',
        against: { department_name: 'Public Services', officer_name: 'Mr. Johnson' },
        resolved: { status: false },
        severity: 5,
        comments: [],
        tags: ['corruption', 'bribery'],
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md flex flex-wrap gap-5">
      <Table isStriped aria-label="Statistics Collection Data Structure" css={{ height: 'auto', width: '100%' }}>
        <TableHeader>
          <TableColumn>Field</TableColumn>
          <TableColumn>Type</TableColumn>
          <TableColumn>Description</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell><code>_id</code></TableCell>
            <TableCell>String/UUID</TableCell>
            <TableCell>Unique identifier for the statistics record.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><code>total_issues</code></TableCell>
            <TableCell>Number</TableCell>
            <TableCell>Total number of issues reported.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><code>public_issues</code></TableCell>
            <TableCell>Number</TableCell>
            <TableCell>Total number of issues that are publicly available.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><code>resolved_issues</code></TableCell>
            <TableCell>Number</TableCell>
            <TableCell>Total number of issues that have been resolved.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><code>issues</code></TableCell>
            <TableCell>Array of Objects</TableCell>
            <TableCell>An array of issues that are approved and publicly available, each containing:</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><code>title</code></TableCell>
            <TableCell>String</TableCell>
            <TableCell>The issue title.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><code>description</code></TableCell>
            <TableCell>String</TableCell>
            <TableCell>Detailed description of the issue.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><code>location</code></TableCell>
            <TableCell>Object</TableCell>
            <TableCell>Address and geographical coordinates.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><code>date</code></TableCell>
            <TableCell>DateTime</TableCell>
            <TableCell>The date of the issue in dd-mm-yyyy format.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><code>type</code></TableCell>
            <TableCell>String</TableCell>
            <TableCell>Issue type (e.g., corruption, water blockage).</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><code>against</code></TableCell>
            <TableCell>Object</TableCell>
            <TableCell>Entities involved (political party, department, etc.).</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><code>resolved</code></TableCell>
            <TableCell>Object</TableCell>
            <TableCell>Resolution status and involved entities.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><code>severity</code></TableCell>
            <TableCell>Number</TableCell>
            <TableCell>Issue severity on a scale of 1 to 5.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><code>comments</code></TableCell>
            <TableCell>Array</TableCell>
            <TableCell>List of comments with user ID, content, and admin review status.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><code>tags</code></TableCell>
            <TableCell>Array</TableCell>
            <TableCell>Tags for better categorization.</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    
      <h2 className="text-lg font-bold mt-6 mb-4">Statistics Overview</h2>
      <Table aria-label="Statistics Summary">
        <TableHeader>
          <TableColumn>Field</TableColumn>
          <TableColumn>Value</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Total Issues</TableCell>
            <TableCell>{statistics.total_issues}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Public Issues</TableCell>
            <TableCell>{statistics.public_issues}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Resolved Issues</TableCell>
            <TableCell>{statistics.resolved_issues}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <h2 className="text-lg font-bold mt-6 mb-4">Issues Overview</h2>
      <Table aria-label="Issues Overview">
        <TableHeader>
          <TableColumn>Issue Title</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Location</TableColumn>
          <TableColumn>Severity</TableColumn>
          <TableColumn>Status</TableColumn>
        </TableHeader>
        <TableBody>
          {statistics.issues.map((issue, index) => (
            <TableRow key={index}>
              <TableCell>{issue.title}</TableCell>
              <TableCell>{issue.description}</TableCell>
              <TableCell>
                {issue.location.address} <br />
                {`Lat: ${issue.location.coords.lat}, Lon: ${issue.location.coords.lon}`}
              </TableCell>
              <TableCell>{issue.severity}</TableCell>
              <TableCell>{issue.resolved.status ? 'Resolved' : 'Unresolved'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StatisticsCollections;