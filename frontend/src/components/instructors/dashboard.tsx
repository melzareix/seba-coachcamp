import React from 'react';
import {Box, Tab, Tabs} from 'grommet';
import {Add} from 'grommet-icons';
import InstructorWorkshops from './workshops';
import {RouterButton} from '../common/routerLinks';

export default function InstructorDashboard() {
  return (
    <Box width="full" pad="large" fill>
      <Tabs>
        <Tab title="My Workshops">
          <RouterButton primary label="Create Workshop" icon={<Add/>} path="/workshops/create"/>
          <Box margin="small">
            <InstructorWorkshops/>
          </Box>
        </Tab>
      </Tabs>
    </Box>
  );
}
