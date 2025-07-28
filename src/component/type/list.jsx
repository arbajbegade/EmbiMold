import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import MoldList from '../mold/list';

const TabPanel = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && (
        <Box mt={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const TypeList = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div className="my-2 pt-4 w-full h-full p-4 bg-white rounded-md shadow-lg">
      <h2 className="text-lg font-semibold mb-1">Type Details</h2>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label="Part List" />
          <Tab label="Process Parameters" />
          <Tab label="Mold" />
          <Tab label="Row Material" />
          <Tab label="Recepy" />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      <TabPanel value={tabIndex} index={0}>
        {/* Shift content */}
        <p>Shift type form or data here</p>
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        {/* Target content */}
        <p>Target type form or data here</p>
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        {/* Mold content */}
        <MoldList/>
      </TabPanel>
    </div>
  );
};

export default TypeList;
