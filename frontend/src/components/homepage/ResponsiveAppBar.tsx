// ResponsiveAppBar.tsx
import * as React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Divider,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/material/styles";

interface NavItem {
  label: string;
  children?: { label: string; href?: string }[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "Software Training", children: [{ label: "Linux" }, { label: "Python" }, { label: "Git" }] },
  { label: "Creation", children: [{ label: "Videos" }, { label: "Graphics" }, { label: "Docs" }] },
  { label: "News" },
  { label: "Academics", children: [{ label: "Courses" }, { label: "Workshops" }] },
  { label: "About Us" },
  { label: "Statistics" },
];

export default function ResponsiveAppBar() {
  const theme = useTheme();

  // Mobile drawer state
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const toggleDrawer =
    (val: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (event.type === "keydown") {
        const k = (event as React.KeyboardEvent).key;
        if (k === "Tab" || k === "Shift") return;
      }
      setDrawerOpen(val);
    };

  // Mobile submenu expand states
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});
  const toggleExpand = (key: string) =>
    setExpanded((s) => ({ ...s, [key]: !s[key] }));

  // Desktop dropdown state
  const [desktopMenu, setDesktopMenu] = React.useState<{
    key: string | null;
    anchor: HTMLElement | null;
  }>({ key: null, anchor: null });

  const openDesktopMenu =
    (key: string) => (e: React.MouseEvent<HTMLElement>) =>
      setDesktopMenu({ key, anchor: e.currentTarget });

  const closeDesktopMenu = () => setDesktopMenu({ key: null, anchor: null });

  // Simulated navigation
  const go = (label: string) => {
    console.log("navigate to:", label);
    closeDesktopMenu();
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor:
            theme.palette.mode === "light"
              ? theme.palette.primary.main
              : theme.palette.background.paper,
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ gap: 2, minHeight: 64 }}>
          {/* Brand */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              component="img"
              src="https://via.placeholder.com/40"
              alt="Logo"
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor: theme.palette.background.paper,
              }}
            />
            <Typography
              sx={{ display: { xs: "none", sm: "block" }, fontWeight: 700 }}
            >
              Spoken Tutorial
            </Typography>
          </Box>

          {/* Desktop menu */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              ml: 2,
              flex: 1,
              gap: 0.5,
            }}
            // helps close any open menu when mouse leaves whole bar area
            onMouseLeave={closeDesktopMenu}
          >
            {NAV_ITEMS.map((item) => {
              const key = item.label.replace(/\s+/g, "_");
              const hasChildren = !!item.children?.length;
              const open = desktopMenu.key === key;

              return (
                <Box key={item.label}>
                  <Button
                    aria-haspopup={hasChildren ? "true" : undefined}
                    aria-controls={hasChildren && open ? `${key}-menu` : undefined}
                    aria-expanded={hasChildren && open ? "true" : undefined}
                    endIcon={hasChildren ? (open ? <ExpandLess /> : <ExpandMore />) : undefined}
                    onMouseEnter={hasChildren ? openDesktopMenu(key) : undefined}
                    onClick={hasChildren ? openDesktopMenu(key) : () => go(item.label)}
                    sx={{
                      color: theme.palette.getContrastText(theme.palette.primary.main),
                      "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
                      fontWeight: 600,
                    }}
                  >
                    {item.label}
                  </Button>

                  {hasChildren && (
                    <Menu
                      id={`${key}-menu`}
                      anchorEl={desktopMenu.anchor}
                      open={open}
                      onClose={closeDesktopMenu}
                      // keep open when moving from button to menu
                      MenuListProps={{ onMouseLeave: closeDesktopMenu, dense: true }}
                      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                      transformOrigin={{ vertical: "top", horizontal: "left" }}
                    >
                      {item.children!.map((child) => (
                        <MenuItem key={child.label} onClick={() => go(`${item.label} / ${child.label}`)}>
                          {child.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  )}
                </Box>
              );
            })}

            <Box sx={{ flex: 1 }} />

            <Button color="inherit" sx={{ fontWeight: 600 }} onClick={() => go("Login")}>
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => go("Register")}
              sx={{ fontWeight: 800 }}
            >
              Register
            </Button>

            <Box
              component="img"
              src="https://via.placeholder.com/40"
              alt="Right Logo"
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor: theme.palette.background.paper,
                ml: 1,
              }}
            />
          </Box>

          {/* Mobile hamburger */}
          <Box sx={{ ml: "auto", display: { xs: "block", md: "none" } }}>
            <IconButton
              edge="end"
              onClick={toggleDrawer(true)}
              aria-label="open navigation"
              sx={{ color: theme.palette.getContrastText(theme.palette.primary.main) }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer (mobile) */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{ sx: { width: 320 } }}
      >
        <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            component="img"
            src="https://via.placeholder.com/36"
            alt="Logo"
            sx={{ width: 36, height: 36, borderRadius: "50%" }}
          />
          <Typography fontWeight={700}>Spoken Tutorial</Typography>
        </Box>
        <Divider />

        <List>
          {NAV_ITEMS.map((item) => {
            const hasChildren = !!item.children?.length;
            const key = item.label.replace(/\s+/g, "_");
            return (
              <React.Fragment key={item.label}>
                <ListItemButton
                  onClick={hasChildren ? () => toggleExpand(key) : () => go(item.label)}
                >
                  <ListItemText primary={item.label} />
                  {hasChildren ? (expanded[key] ? <ExpandLess /> : <ExpandMore />) : null}
                </ListItemButton>
                {hasChildren && (
                  <Collapse in={!!expanded[key]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.children!.map((child) => (
                        <ListItemButton key={child.label} sx={{ pl: 4 }} onClick={() => go(`${item.label} / ${child.label}`)}>
                          <ListItemText primary={child.label} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            );
          })}
        </List>
        <Divider />
        <Box sx={{ p: 2, display: "flex", gap: 1 }}>
          <Button fullWidth variant="outlined" onClick={() => go("Login")}>
            Login
          </Button>
          <Button fullWidth variant="contained" color="success" onClick={() => go("Register")}>
            Register
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
