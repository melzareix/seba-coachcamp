import React from 'react';
import { Tabs, Tab, Box } from 'grommet';
import InstructorWorkshops from './workshops';

export default function InstructorDashboard() {
  return (
    <Box width="full" pad="large" fill>
      <Tabs>
        <Tab title="My Workshops">
          <Box margin="small">
            <InstructorWorkshops />
          </Box>
        </Tab>
        <Tab title="My Details">
          <Box>Two</Box>
        </Tab>
      </Tabs>
    </Box>
  );
}
