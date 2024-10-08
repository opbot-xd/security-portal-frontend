import { useState, ChangeEvent } from 'react';
import { TextField, Button, MenuItem, Typography, Link, Box } from '@mui/material';

  


export function LoginForm() {
  const [loginType, setLoginType] = useState<string>('');

  const handleLoginTypeChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLoginType(event.target.value);
  };
  return (
    <>
    <div className="h-screen w-screen bg-[url('login2.svg')] bg-center bg-cover flex justify-end">
      <div className="h-screen w-1/2 flex justify-center items-center">
      <Box
      sx={{
        width: 400,
        margin: 'auto',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: 3,
        backgroundColor: '#fff',
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Welcome to Security App
      </Typography>
      <TextField
        select
        label="Login Type"
        value={loginType}
        onChange={handleLoginTypeChange}
        fullWidth
        margin="normal"
      >
        <MenuItem value="admin">Admin</MenuItem>
        <MenuItem value="user">User</MenuItem>
        <MenuItem value="guest">Guest</MenuItem>
      </TextField>
      <TextField
        label="Login ID"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        margin="normal"
      />
      <Link href="#" variant="body2" sx={{ display: 'block', margin: '10px 0' }}>
        Forgot Password?
      </Link>
      <Button variant="contained" color="primary" fullWidth>
        Login
      </Button>
      <Link href="#" variant="body2" sx={{ display: 'block', marginTop: '10px' }}>
        Register new user
      </Link>
    </Box>
      </div>
    </div>
    </>
  );
}