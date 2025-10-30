// ResponsiveAppBar.tsx
import * as React from "react";
import {
  AppBar, Toolbar, IconButton, Box, Button, Typography, Drawer,
  List, ListItemButton, ListItemText, Collapse, Divider, Popover,
  Link as MLink, Chip
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import { useTheme } from "@mui/material/styles";
import BrandLogo from "./BrandLogo";

/* ---------- Types ---------- */
type ChildLink = { section: string; label: string; href?: string; badge?: "new" | "beta" };
type NavItem  = { label: string; children?: ChildLink[] };

/* ---------- Dummy data for mega-menu ---------- */
const NAV_ITEMS: NavItem[] = [
  {
    label: "Software Training",
    children: [
      { section: "Software Training", label: "About the Training" },
      { section: "Software Training", label: "Progress to Date" },
      { section: "Software Training", label: "Software Offered" },
      { section: "Software Training", label: "Contacts for Training" },
      { section: "Software Training", label: "Change in Training Policy" },

      { section: "Procedures", label: "Organising Training" },
      { section: "Procedures", label: "Instruction for Downloading Tutorials" },
      { section: "Procedures", label: "Create Your Own Disc Image" },
      { section: "Procedures", label: "Resource Centers" },

      { section: "Training", label: "Training & Payment Dashboard" },
      { section: "Training", label: "STPS (Semester Planner) Summary" },
      { section: "Training", label: "Student Dashboard" },
      { section: "Training", label: "Individual Learning", badge: "new" },
      { section: "Training", label: "Verify ILW Test Certificate" },

      { section: "Online Test", label: "Instruction for Invigilator" },
      { section: "Online Test", label: "Instruction for Participants" },
      { section: "Online Test", label: "Certificate Verification Link" },
      { section: "Online Test", label: "Job Recommendation", badge: "new" },
    ],
  },
  {
    label: "Creation",
    children: [
      { section: "Media", label: "Videos" },
      { section: "Media", label: "Graphics" },
      { section: "Media", label: "Docs" },
      { section: "Tools", label: "Script Templates" },
      { section: "Tools", label: "Brand Assets", badge: "beta" },
    ],
  },
  { label: "News" },
  {
    label: "Academics",
    children: [
      { section: "Programs", label: "Courses" },
      { section: "Programs", label: "Workshops" },
      { section: "Resources", label: "Syllabi" },
      { section: "Resources", label: "Reading List" },
    ],
  },
  { label: "About Us" },
  { label: "Statistics" },
];

export default function ResponsiveAppBar() {
  const theme = useTheme();
  const contrast = theme.palette.getContrastText(theme.palette.primary.main);

  /* ---------- Mobile drawer ---------- */
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const toggleDrawer = (val: boolean) => () => setDrawerOpen(val);

  /* ---------- Mobile submenu expand ---------- */
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});
  const toggleExpand = (key: string) => setExpanded((s) => ({ ...s, [key]: !s[key] }));

  /* ---------- Desktop popover (click-to-open) ---------- */
  const [desktopMenu, setDesktopMenu] = React.useState<{ key: string | null; anchor: HTMLElement | null; }>(
    { key: null, anchor: null }
  );
  const openDesktopMenu = (key: string) => (e: React.MouseEvent<HTMLElement>) =>
    setDesktopMenu({ key, anchor: e.currentTarget });
  const closeDesktopMenu = () => setDesktopMenu({ key: null, anchor: null });

  /* ---------- Navigate (stub) ---------- */
  const go = (label: string) => {
    console.log("navigate to:", label);
    closeDesktopMenu();
    setDrawerOpen(false);
  };

  /* ---------- Helpers ---------- */
  const groupBySection = (children: ChildLink[] = []) => {
    const map = new Map<string, ChildLink[]>();
    children.forEach((c) => {
      if (!map.has(c.section)) map.set(c.section, []);
      map.get(c.section)!.push(c);
    });
    return Array.from(map.entries()); // [ [section, links[]], ... ]
  };

  const mediaUrl = import.meta.env.VITE_API_MEDIA_URL
  console.log(`mediaURL ********** ${mediaUrl}`)

  return (
    <>
      <AppBar position="sticky" 
        color="primary" 
        elevation={0}>
        <Toolbar sx={{ minHeight: 74, px: { xs: 2, sm: 3 } }}>
          {/* Left logo */}
          {/* <Box
            component="img"
            // src="https://via.placeholder.com/56x56.png?text=S"
            src={`${mediaUrl}/logos/spoken_tutorial.png`}
            alt="Spoken Tutorial"
            sx={{ width: 56, height: 56, borderRadius: "50%", bgcolor: "common.white", p: 0.5, mr: { xs: 1, md: 2 } }}
          /> */}
           {/* LEFT logo (keep label hidden on xs; show from md if you want) */}
        <BrandLogo
        src={`${mediaUrl}/logos/spoken_tutorial.png`}
        alt="Spoken Tutorial"
        label="Spoken Tutorial"
        showLabel={false}                 // set true if you want the name next to logo
        height={80}
        />


          {/* Desktop nav (centered) */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 3,
              color: contrast,
              mx: "auto"
            }}
          >
            {NAV_ITEMS.map((item) => {
              const key = item.label.replace(/\s+/g, "_");
              const hasChildren = !!item.children?.length;
              const isActive = desktopMenu.key === key;

              const groups = isActive ? groupBySection(item.children) : [];
              const colCount = Math.min(groups.length || 1, 4); // up to 4 columns
              const COL_W = 240;     // target width per column
              const P_X = 24;        // horizontal padding (pop paper p:2.5)
              const paperWidth = Math.min(colCount * COL_W + 2 * P_X, 1000);

              return (
                <Box key={item.label} sx={{ position: "relative" }}>
                  {/* Top-level text link */}
                  <Box
                    role="button"
                    tabIndex={0}
                    aria-haspopup={hasChildren ? "true" : undefined}
                    aria-expanded={hasChildren && isActive ? "true" : undefined}
                    onClick={hasChildren ? openDesktopMenu(key) : () => go(item.label)}
                    sx={{
                      display: "flex", alignItems: "center", gap: 0.5,
                      px: 1, py: 0.75, borderRadius: 1, cursor: "pointer",
                      fontSize: 14, fontWeight: 500, color: contrast,
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.12)" }
                    }}
                  >
                    {item.label} 
                    {hasChildren && <ExpandMore sx={{ fontSize: 18, opacity: 0.9 }} />}
                  </Box>

                  {/* Auto-sizing Mega-menu Popover */}
                  {hasChildren && isActive && (
                    <Popover
                      open={isActive}
                      anchorEl={desktopMenu.anchor}
                      onClose={closeDesktopMenu}
                      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                      transformOrigin={{ vertical: "top", horizontal: "left" }}
                      slotProps={{
                        paper: {
                          sx: {
                            mt: 1,
                            p: 2.5,
                            borderRadius: 2,
                            width: paperWidth,                           // <= dynamic width
                            maxWidth: "min(96vw, 1000px)",
                            boxShadow: 8,
                          }
                        }
                      }}
                    >
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: `repeat(${colCount}, minmax(200px, 1fr))`,
                          columnGap: 4,
                          rowGap: 1.5,
                          "& > .col": { minWidth: 200 },
                        }}
                      >
                        {groups.map(([section, links]) => (
                          <Box key={section} className="col">
                            <Typography variant="body1" sx={{ fontWeight: 700, mb: 1 }}>
                              {section}
                            </Typography>
                            <Divider sx={{ mb: 1, opacity: 1 }} />
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
                              {links.map((l) => (
                                <MLink
                                  key={l.label}
                                  underline="none"
                                  href={l.href ?? "#"}
                                  onClick={() => go(`${item.label} / ${l.label}`)}
                                  sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 0.75,
                                    py: 0.75,
                                    px: 1,
                                    borderRadius: 1,
                                    color: "text.primary",
                                    fontSize: 12.5,
                                    "&:hover": { bgcolor: "action.hover", color: "primary.main" },
                                  }}
                                >
                                  {l.label}
                                  {l.badge && (
                                    <Chip
                                      label={l.badge}
                                      size="small"
                                      color={l.badge === "new" ? "secondary" : "default"}
                                      sx={{ height: 18, fontSize: 10, textTransform: "uppercase" }}
                                    />
                                  )}
                                </MLink>
                              ))}
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Popover>
                  )}
                </Box>
              );
            })}
          </Box>

          {/* Spacer for center alignment */}
          <Box sx={{ flex: { xs: 1, md: 0 } }} />

          {/* Right actions (desktop) */}
          {/* <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1.5}}>
            <Button variant="text" color="inherit" onClick={() => go("Login")} sx={{ color: contrast, fontWeight: 500 }}>
              Login
            </Button>
            <Button variant="contained" color="secondary" onClick={() => go("Register")} sx={{ fontWeight: 800 }}>
              Register
            </Button>
            <Box
                
              component="img"
              src={`${mediaUrl}/logos/edupyramids.png`}
              alt="EduPyramids"
              sx={{ width: 80, height: 56, borderRadius: "50%", bgcolor: "common.white", p: 0.5, ml: 1 }}
            />
            </Box> */}
             {/* RIGHT logo (slightly larger, label optional) */}
<Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1.5 }}>
  <Button variant="text" color="inherit" onClick={() => go("Login")} sx={{ color: contrast, fontWeight: 500 }}>
    Login
  </Button>
  <Button variant="contained" color="secondary" onClick={() => go("Register")} sx={{ fontWeight: 800 }}>
    Register
  </Button>

  <BrandLogo
    src={`${mediaUrl}/logos/edupyramids.png`}
    alt="EduPyramids"
    label="EduPyramids"
    showLabel={false}               // flip to true if you like the label chip
    height={60}
  />
</Box>

          

          {/* Hamburger (mobile) */}
          <Box sx={{ display: { xs: "flex", md: "none" }, ml: "auto" }}>
            <IconButton aria-label="open navigation" onClick={toggleDrawer(true)} sx={{ color: contrast }}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{ sx: { width: 320 } }}
      >
        <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <Box component="img" src="https://via.placeholder.com/40x40.png?text=S" alt="Logo" sx={{ width: 40, height: 40, borderRadius: "50%" }} />
          <Typography fontWeight={700}>Spoken Tutorial</Typography>
        </Box>
        <Divider />

        <List>
          {NAV_ITEMS.map((item) => {
            const key = item.label.replace(/\s+/g, "_");
            const hasChildren = !!item.children?.length;
            const groups = hasChildren ? groupBySection(item.children) : [];

            return (
              <React.Fragment key={item.label}>
                <ListItemButton onClick={hasChildren ? () => toggleExpand(key) : () => go(item.label)}>
                  <ListItemText primary={item.label} />
                  {hasChildren ? (expanded[key] ? <ExpandLess /> : <ExpandMore />) : null}
                </ListItemButton>

                {hasChildren && (
                  <Collapse in={!!expanded[key]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {groups.map(([section, links]) => (
                        <React.Fragment key={section}>
                          <Typography variant="subtitle2" sx={{ px: 2, pt: 1, pb: 0.5, fontWeight: 700, color: "text.secondary" }}>
                            {section}
                          </Typography>
                          {links.map((l) => (
                            <ListItemButton key={l.label} sx={{ pl: 4 }} onClick={() => go(`${item.label} / ${l.label}`)}>
                              <ListItemText primary={l.label} />
                              {l.badge && <Chip label={l.badge} size="small" color={l.badge === "new" ? "secondary" : "default"} />}
                            </ListItemButton>
                          ))}
                        </React.Fragment>
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
          <Button fullWidth variant="outlined" color="primary" onClick={() => go("Login")}>
            Login
          </Button>
          <Button fullWidth variant="contained" color="secondary" onClick={() => go("Register")}>
            Register
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
