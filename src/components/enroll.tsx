import React, { useState } from 'react';
import { Box, Typography, Button, MenuItem, Select, FormControl, InputLabel, List, ListItem, Avatar, TextField } from '@mui/material';

const Dashboard: React.FC = () => {
  const [requestType, setRequestType] = useState<string>('');

  const handleRequestTypeChange = (event: any) => {
    setRequestType(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#f4f4f9' }}>
      {/* Sidebar */}
      <Box sx={{ width: 250, backgroundColor: '#fff', padding: '20px', borderRight: '1px solid #ccc', display: "flex", flexDirection: "column"}}>
        <Typography variant="h6" sx={{ marginBottom: '30px', color: '#2980B9', fontSize: '28px', fontFamily:"Roboto", fontWeight: "800"   }}>Security App</Typography>
        <List component="nav" className='mt-40'>
          <ListItem button sx={{ backgroundColor: '#1976d2', color: '#fff', marginBottom: '10px' }}>
            Raise Request
          </ListItem>
          <ListItem button sx={{fontWeight: "600", marginBottom: '10px'}}>Request History</ListItem>
          <ListItem button sx={{fontWeight: "600"}}>Settings</ListItem>
        </List>
        <Box className="bg-[url('logo.svg')] bg-left-top bg-cover h-20 w-48 justify-self-end">
          
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, padding: '20px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4">Raise Request</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ marginRight: '10px' }}>LOGGED IN AS MDGSPACE</Typography>
            <Avatar>M</Avatar>
          </Box>
        </Box>

        <Box sx={{ marginTop: '20px' }}>
          <FormControl fullWidth>
            <InputLabel>Select Request Type</InputLabel>
            <Select
              value={requestType}
              onChange={handleRequestTypeChange}
              label="Select Request Type"
            >
              <MenuItem value="gate_pass">Gate Pass</MenuItem>
              <MenuItem value="material_pass">Material Pass</MenuItem>
              <MenuItem value="labour_pass">Labour Pass</MenuItem>
              <MenuItem value="new_faculty">New Faculty</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {requestType === 'gate_pass' && (
          <Box sx={{ marginTop: '20px'}}>
            <form>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <Box sx={{ width: '48%' }}>
                  <Typography variant="body1" sx={{ marginBottom: '5px' }}>Issuer Id</Typography>
                  <TextField label="Issuer Id" fullWidth variant="outlined" />
                </Box>
                <Box sx={{ width: '48%' }}>
                  <Typography variant="body1" sx={{ marginBottom: '5px' }}>Issuer Name</Typography>
                  <TextField label="Issuer Name" fullWidth variant="outlined" />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'start',gap:"55px", marginBottom: '20px' }}>
                <Box sx={{ width: '25%' }}>
                  <Typography variant="body1" sx={{ marginBottom: '5px' }}>Accomplice</Typography>
                  <TextField fullWidth label="Accomplice" variant="outlined" />
                </Box>
                <Box sx={{ width: '25%' }}>
                  <Typography variant="body1" sx={{ marginBottom: '5px' }}>Relation</Typography>
                  <TextField fullWidth label="Relation" variant="outlined" />
                </Box>
                <Box sx={{ width: '25%' }}>
                  <Typography variant="body1" sx={{ marginBottom: '5px' }}>Purpose</Typography>
                  <TextField fullWidth label="Purpose" variant="outlined" />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <Box sx={{ width: '48%' }}>
                  <Typography variant="body1" sx={{ marginBottom: '5px' }}>Arrival Date</Typography>
                  <TextField fullWidth variant="outlined" />
                </Box>
                <Box sx={{ width: '48%' }}>
                  <Typography variant="body1" sx={{ marginBottom: '5px' }}>Departure Date</Typography>
                  <TextField fullWidth variant="outlined" />
                </Box>
              </Box>
              <div className='flex justify-center items-center'><Button variant="contained" color="primary" type="submit" sx={{justifySelf:"center"}}>
                Submit
              </Button></div>
              
            </form>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
