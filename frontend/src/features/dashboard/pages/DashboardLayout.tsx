// src/layouts/ShellLayout.tsx
import * as React from "react";
import {
  AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItemButton,
  ListItemText, ListSubheader, Toolbar, Typography, useMediaQuery
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { MENU } from "../RoleBasedMenu"
const drawerWidth = 280;

export default function DashboardLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = React.useState(!isMobile);
  const location = useLocation();

  // React.useEffect(() => setOpen(!isMobile), [isMobile]);

  const toggle = () => setOpen(v => !v);

  const handleNavigate = () => {
    // On mobile, auto-close when a link is clicked
    if (isMobile) setOpen(false);
  };

  const drawer = (
    <Box role="presentation" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar />
      <Divider />
      <List sx={{ flex: 1, py: 0 }}>
        {MENU.map(section => (
          <Box key={section.title}>
            <ListSubheader disableSticky sx={{ bgcolor: "transparent", fontWeight: 700, pt: 2 }}>
              {section.title}
            </ListSubheader>
            {section.items.map(item => (
              <ListItemButton
                key={item.to}
                component={NavLink}
                to={item.to}
                onClick={handleNavigate}
                selected={location.pathname === item.to}
              >
                <ListItemText primaryTypographyProps={{ fontSize: 14 }} primary={item.label} />
              </ListItemButton>
            ))}
            <Divider />
          </Box>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        color="default"
        elevation={0}
        sx={{
          borderBottom: 1, borderColor: "divider",
          width: { md: open ? `calc(100% - ${drawerWidth}px)` : "100%" },
          ml: { md: open ? `${drawerWidth}px` : 0 },
          transition: theme.transitions.create(["margin", "width"]),
        }}
      >
        <Toolbar>
          <IconButton edge="start" onClick={toggle} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>Dashboard</Typography>
        </Toolbar>
      </AppBar>

      <Box component="nav" aria-label="sidebar">
        <Drawer
          variant={isMobile ? "temporary" : "persistent"}
          open={open}
          onClose={toggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Content panel */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { md: open ? `${drawerWidth}px` : 0 },
          transition: theme.transitions.create("margin"),
        }}
      >
        <Toolbar />
        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
