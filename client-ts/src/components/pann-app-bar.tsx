import { AppBar, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { Menu as MenuIcon, AccountCircle, ChevronLeft, Home, Campaign } from "@mui/icons-material";
import { useState } from "react";
import { useAppCtx } from "../AppProvider";
import { useNavigate } from "react-router-dom";

function PannAppBar() {
  const { userInfo, action } = useAppCtx()
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorNav, setAnchorNav] = useState(false);
  const navigate = useNavigate();

  const handleOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Drawer
        anchor='left'
        open={anchorNav}
        onClose={() => setAnchorNav(false)}
      >
        <IconButton onClick={() => setAnchorNav(false)}>
          <ChevronLeft />
        </IconButton>
        <Divider />
        <List>
          <ListItem>
            <ListItemButton onClick={() => navigate('/home')}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => navigate('/announcement')}>
              <ListItemIcon>
                <Campaign />
              </ListItemIcon>
              <ListItemText primary="Announcement" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => setAnchorNav(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          PSU Announcement
        </Typography>
        <Typography>
          {userInfo.displayName}
        </Typography>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          {userInfo.ready && <MenuItem onClick={() => void action.signOut()}>Log out</MenuItem>}
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default PannAppBar; 