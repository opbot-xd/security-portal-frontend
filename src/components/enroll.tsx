import React, { useState } from 'react';
import { Box, Typography, Button, MenuItem, Select, FormControl, InputLabel, List, ListItem, Avatar, TextField, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Dashboard: React.FC = () => {
  const [requestType, setRequestType] = useState<string>('');
  const [materialNames, setMaterialNames] = useState<string[]>(['']);

  const handleRequestTypeChange = (event: any) => {
    setRequestType(event.target.value);
  };

  // Function to add a new row for Material Name
  const handleAddMaterial = () => {
    setMaterialNames([...materialNames, '']);
  };

  // Function to handle input change for each material name
  const handleMaterialNameChange = (index: number, value: string) => {
    const updatedMaterialNames = materialNames.map((name, i) =>
      i === index ? value : name
    );
    setMaterialNames(updatedMaterialNames);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#f4f4f9' }}>
      {/* Sidebar */}
      <Box sx={{
        width: 250,
        backgroundColor: '#fff',
        padding: '20px',
        borderRight: '1px solid #ccc',
        display: "flex",
        flexDirection: "column",
        height: '100vh'
      }}>
        <Typography variant="h6" sx={{
          marginBottom: '30px',
          color: '#2980B9',
          fontSize: '28px',
          fontFamily: "Roboto",
          fontWeight: "800"
        }}>Security App</Typography>

        <List component="nav" className='mt-40'>
          <ListItem button sx={{ backgroundColor: '#1976d2', color: '#fff', marginBottom: '10px' }}>
            Raise Request
          </ListItem>
          <ListItem button sx={{ fontWeight: "600", marginBottom: '10px' }}>
            Request History
          </ListItem>
          <ListItem button sx={{ fontWeight: "600" }}>
            Settings
          </ListItem>
        </List>

        {/* Logo */}
        <Box className="bg-[url('logo.svg')] bg-left-top bg-cover h-20 w-48 justify-self-end" sx={{ marginTop: 'auto' }}>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, padding: '20px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4">Raise Request</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <div className="flex flex-col justify-center items-end">
              <Typography variant="body1" sx={{ marginRight: '10px', fontFamily: 'Roboto', fontSize: '16px', fontWeight: 700, lineHeight: '25.75px', textAlign: 'right', color: "#8C8C8C" }}>LOGGED IN AS MDGSPACE</Typography>
              <Typography variant="body1" sx={{ marginRight: '10px', fontFamily: 'Roboto', fontSize: '16px', fontWeight: 400, lineHeight: '25.75px', textAlign: 'right', color: "#8C8C8C" }}>mdg@iitr.ac.in</Typography>
            </div>

            <Avatar>M</Avatar>
          </Box>
        </Box>

        {/* Select Request Type */}
        <Box sx={{ marginTop: '20px', marginBottom: '40px' }}>
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
        {/* New Faculty Form */}
        {requestType === 'new_faculty' && (
          <Box sx={{ marginTop: '40px' }}>
            <form>
              <Box sx={{ display: 'flex', justifyContent: 'start',gap:"50px", marginBottom: '40px' }}>
                <Box sx={{ width: '38%' }}>
                  <Typography variant="body1" sx={{ marginBottom: '5px' }}>Issuer Id</Typography>
                  <TextField label="Issuer Id" fullWidth variant="outlined" />
                </Box>
                <Box sx={{ width: '38%' }}>
                  <Typography variant="body1" sx={{ marginBottom: '5px' }}>Issuer Name</Typography>
                  <TextField label="Issuer Name" fullWidth variant="outlined" />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'start',gap:"50px", marginBottom: '40px' }}>
                <Box sx={{ width: '38%' }}>
                  <Typography variant="body1" sx={{ marginBottom: '5px' }}>Faculty Name</Typography>
                  <TextField label="Name" fullWidth variant="outlined" />
                </Box>
                <Box sx={{ width: '38%' }}>
                  <Typography variant="body1" sx={{ marginBottom: '5px' }}>Purpose</Typography>
                  <TextField label="Reason" fullWidth variant="outlined" />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'start',gap:"50px", marginBottom: '40px' }}>
                <Box sx={{ width: '38%' }}>
                  <Typography variant="body1" sx={{ marginBottom: '5px' }}>Arrival Date</Typography>
                  <TextField label="Date" fullWidth variant="outlined" />
                </Box>
                <Box sx={{ width: '38%' }}>
                  <Typography variant="body1" sx={{ marginBottom: '5px' }}>Departure Date</Typography>
                  <TextField label="Date" fullWidth variant="outlined" />
                </Box>
              </Box>

              <div className='flex justify-center items-center w-4/5'>
                <Button variant="contained" color="primary" type="submit" sx={{ justifySelf: "center" }}>
                  Submit
                </Button>
              </div>
            </form>
          </Box>
        )}
        {/* Material Pass Form */}
        {requestType === 'material_pass' && (
          <Box sx={{ marginTop: '20px' }}>
            <form>
              {/* Order Number, Tenure, Verified By */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <Box sx={{ width: '48%' }}>
                  <Typography variant="body1" sx={{ marginBottom: '20px' }}>Tender Number</Typography>
                  <TextField label="Tenure Number" fullWidth variant="outlined" />
                </Box>
                <Box sx={{ width: '48%' }}>
                  <Typography variant="body1" sx={{ marginBottom: '20px' }}>Order number</Typography>
                  <TextField label="Order number" fullWidth variant="outlined" />
                </Box>
              </Box>
              {materialNames.map((material, index) => (
                <Box sx={{ display: 'flex', justifyContent: 'start', gap: "25px", marginBottom: '20px' }} key={index}>
                  <Box sx={{ width: '50%' }}>
                    {/* <Typography variant="body1" sx={{ marginBottom: '5px' }}>Material Name</Typography> */}
                    <TextField
                      fullWidth
                      label="Material Name"
                      value={material}
                      onChange={(e) => handleMaterialNameChange(index, e.target.value)}
                      variant="outlined"
                    />
                  </Box>

                  {/* Button to add a new material name row */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {index === materialNames.length - 1 && (
                      <IconButton color="primary" onClick={handleAddMaterial}>
                        <AddCircleIcon />
                      </IconButton>
                    )}
                  </Box>
                </Box>
              ))}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <Box sx={{ width: '48%' }}>
                  <Typography variant="body1" sx={{ marginBottom: '5px' }}>Tenure of Work</Typography>
                  <TextField fullWidth label="Tenure" variant="outlined" />
                </Box>
                <Box sx={{ width: '48%' }}>

                  <Typography variant="body1" sx={{ marginBottom: '5px' }}>Verified by</Typography>
                  <TextField fullWidth label="Verified by:" variant="outlined" />
                </Box>
              </Box>


              <div className='flex justify-center items-center'>
                <Button variant="contained" color="primary" type="submit" sx={{ justifySelf: "center" }}>
                  Submit
                </Button>
              </div>

            </form>
          </Box>
        )}


        {requestType === 'labour_pass' && (
          <Box sx={{ marginTop: '20px' }}>
            <form>
              {/* Order Number, Tenure, Verified By */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <Box sx={{ width: '48%' }}>
                  <Typography variant="body1" sx={{ marginBottom: '5px' }}>Tender Number</Typography>
                  <TextField label="Tenure Number" fullWidth variant="outlined" />
                </Box>
                <Box sx={{ width: '48%' }}>
                  <Typography variant="body1" sx={{ marginBottom: '5px' }}>Order number</Typography>
                  <TextField label="Order number" fullWidth variant="outlined" />
                </Box>
              </Box>
              {materialNames.map((material, index) => (
                <Box sx={{ display: 'flex', justifyContent: 'start', gap: "25px", marginBottom: '20px' }} key={index}>
                  <Box sx={{ width: '50%' }}>
                    {/* <Typography variant="body1" sx={{ marginBottom: '5px' }}>Material Name</Typography> */}
                    <TextField
                      fullWidth
                      label="Employee Name"
                      value={material}
                      onChange={(e) => handleMaterialNameChange(index, e.target.value)}
                      variant="outlined"
                    />
                  </Box>

                  {/* Button to add a new material name row */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {index === materialNames.length - 1 && (
                      <IconButton color="primary" onClick={handleAddMaterial}>
                        <AddCircleIcon />
                      </IconButton>
                    )}
                  </Box>
                </Box>
              ))}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <Box sx={{ width: '48%' }}>
                  <Typography variant="body1" sx={{ marginBottom: '5px' }}>Tenure of Work</Typography>
                  <TextField fullWidth label="Tenure" variant="outlined" />
                </Box>
                <Box sx={{ width: '48%' }}>

                  <Typography variant="body1" sx={{ marginBottom: '5px' }}>Verified by</Typography>
                  <TextField fullWidth label="Verified by:" variant="outlined" />
                </Box>
              </Box>


              <div className='flex justify-center items-center'>
                <Button variant="outlined" color="primary" type="submit" sx={{ justifySelf: "center" }}>
                  Submit
                </Button>
              </div>

            </form>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
