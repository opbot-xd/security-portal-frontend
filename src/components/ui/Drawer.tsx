import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleItemClick = (route: string) => {
    navigate(route);
    setOpen(false);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {[
          { text: 'Student', route: '/student' },
          { text: 'Faculty', route: '/faculty' },
          { text: 'Temporary faculty', route: '/temporary-faculty' },
          { text: 'Create Gate Pass', route: '/gate-pass' },
          { text: 'View Gate Pass', route: '/view-gate-pass' },
        ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => handleItemClick(item.route)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div style={{ position: 'fixed', top: 0, left: 0 }}>
      <IconButton
      edge="start"
      color="info"
      aria-label="menu"
      onClick={toggleDrawer(true)}
      sx={{ fontSize: 40, padding: '2rem' }}
      >
  <MenuIcon sx={{ fontSize: 40 }} />
</IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
