import * as React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  TextField,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { MENU } from "../RoleBasedMenu"; // adjust the import path

const DRAWER_WIDTH = 280;

export default function DashboardLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isDrawerOpen, setDrawerOpen] = React.useState(!isMobile);
  const location = useLocation();

  const toggleDrawer = () => setDrawerOpen((v) => !v);
  const handleNavigation = () => { if (isMobile) setDrawerOpen(false); };

 const renderDrawerContent = () => (
  <Box
    role="presentation"
    sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      bgcolor: theme.palette.background.default,
      p: 1.5,
    }}
  >
    <Toolbar />
    <Divider sx={{ mb: 1 }} />

    <List sx={{ flex: 1, py: 0, overflowY: "auto" }}>
      {MENU.map((section) => (
        <Box
          key={section.title}
          sx={{
            mb: 2,
            borderRadius: 1,
            overflow: "hidden",
            boxShadow: "0 0 2px rgba(0,0,0,0.1)",
            border: `1px solid ${theme.palette.divider}`,
            bgcolor: theme.palette.background.paper,
          }}
        >
          {/* 🔵 Section title */}
          <Box
            sx={{
              bgcolor: theme.palette.primary.main,
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.9rem",
              py: 1,
              px: 2,
              borderRadius: "4px 4px 0 0",
            }}
          >
            {section.title}
          </Box>

          {/* 🧩 Sub-sections */}
          <Box sx={{ pl: 2, pr: 1.5, py: 1 }}>
            {section.subSections?.map((sub) => (
              <Box key={sub.subtitle} sx={{ mb: 1.5 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.82rem",
                    mb: 0.5,
                    color: theme.palette.text.primary,
                  }}
                >
                  {sub.subtitle}
                </Typography>

                {/* 🔹 Subpoints (links) */}
                {sub.items.map((item) => (
                  <ListItemButton
                    key={item.to}
                    component={NavLink}
                    to={item.to}
                    onClick={handleNavigation}
                    selected={location.pathname === item.to}
                    sx={{
                      py: 0.3,
                      pl: 3,
                      alignItems: "flex-start",
                      "&.Mui-selected": {
                        bgcolor: theme.palette.action.selected,
                        borderLeft: `3px solid ${theme.palette.primary.main}`,
                        "& .MuiListItemText-primary": {
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                        },
                      },
                      "&:hover": {
                        bgcolor: theme.palette.action.hover,
                      },
                    }}
                  >
                    {/* Bullet symbol before text */}
                    <Box
                      component="span"
                      sx={{
                        color: theme.palette.primary.main,
                        fontSize: "1rem",
                        mr: 1,
                        mt: 0.2,
                        lineHeight: 1,
                      }}
                    >
                      •
                    </Box>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: "0.8rem",
                        color:
                          location.pathname === item.to
                            ? theme.palette.primary.main
                            : theme.palette.primary.main,
                        fontWeight:
                          location.pathname === item.to ? 600 : 400,
                      }}
                    />
                  </ListItemButton>
                ))}
              </Box>
            ))}

            {/* If section has only flat items */}
            {section.items?.map((item) => (
              <ListItemButton
                key={item.to}
                component={NavLink}
                to={item.to}
                onClick={handleNavigation}
                selected={location.pathname === item.to}
                sx={{
                  py: 0.3,
                  pl: 3,
                  alignItems: "flex-start",
                  "&.Mui-selected": {
                    bgcolor: theme.palette.action.selected,
                    borderLeft: `3px solid ${theme.palette.primary.main}`,
                    "& .MuiListItemText-primary": {
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                    },
                  },
                  "&:hover": { bgcolor: theme.palette.action.hover },
                }}
              >
                {/* Bullet */}
                <Box
                  component="span"
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: "1rem",
                    mr: 1,
                    mt: 0.2,
                    lineHeight: 1,
                  }}
                >
                  •
                </Box>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: "0.8rem",
                    color: theme.palette.primary.main,
                  }}
                />
              </ListItemButton>
            ))}
          </Box>
        </Box>
      ))}
    </List>
  </Box>
);


  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <CssBaseline />

      {/* 🟦 AppBar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderBottom: `1px solid ${theme.palette.divider}`,
          width: { md: isDrawerOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : "100%" },
          ml: { md: isDrawerOpen ? `${DRAWER_WIDTH}px` : 0 },
          transition: theme.transitions.create(["margin", "width"]),
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            flexWrap: { xs: "wrap", md: "nowrap" },
            gap: 2,
            py: 1,
            minHeight: "80px !important",
          }}
        >
          {/* Left side */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton edge="start" onClick={toggleDrawer} sx={{ color: "text.primary" }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ color: "primary.main", fontWeight: 700 }}>
              Software Training Dashboard
            </Typography>
          </Box>

        </Toolbar>
      </AppBar>

      {/* 🟦 Sidebar Drawer */}
      <Box component="nav">
        <Drawer
          variant={isMobile ? "temporary" : "persistent"}
          open={isDrawerOpen}
          onClose={toggleDrawer}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
              border: "none",
              backgroundColor: theme.palette.background.default,
            },
          }}
        >
          {renderDrawerContent()}
        </Drawer>
      </Box>

      {/* 🟨 Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: isDrawerOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : "100%" },
          ml: { md: isDrawerOpen ? `${DRAWER_WIDTH}px` : 0 },
          transition: theme.transitions.create(["margin", "width"]),
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
