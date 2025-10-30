import { Box, Container, Grid, Typography, Link, IconButton, SvgIcon } from "@mui/material";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  const footerLinks = {
    column1: [
      { label: "FOSSEE Project", href: "#" },
      { label: "Scilab", href: "#" },
      { label: "eSlim", href: "#" },
      { label: "Python", href: "#" },
      { label: "OpenFoam", href: "#" },
    ],
    column2: [
      { label: "Aakash Labs", href: "#" },
      { label: "Co-learn", href: "#" },
      { label: "Education Mission", href: "#" },
    ],
    column3: [
      { label: "Software Training", href: "#" },
      { label: "Contacts for training", href: "#" },
      { label: "Training Dashboard", href: "#" },
      { label: "Creation Dashboard", href: "#" },
    ],
    column4: [
      { label: "About US", href: "#" },
      { label: "News", href: "#" },
      { label: "Terms & Condition", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  };

  const socialLinks = [
    { label: "YouTube", href: "https://www.youtube.com/user/SpokenTutorialIITB", icon: <YouTubeIcon fontSize="medium" /> },
    { label: "Facebook", href: "https://www.facebook.com/SpokenTutorial.org", icon: <FacebookIcon fontSize="medium" /> },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/spokentutorial/", icon: <LinkedInIcon fontSize="medium" /> },
    { label: "Skype", href: "https://www.skype.com", icon: <SkypeIcon fontSize="medium" /> },
  ];

  function SkypeIcon(props: SvgIconProps) {
    return (
      <SvgIcon viewBox="0 0 24 24" {...props}>
        <path d="M12 2a5.5 5.5 0 0 0-4.9 8.02A6.5 6.5 0 0 0 5 16.5 6.5 6.5 0 0 0 11.5 23a6.5 6.5 0 0 0 6.48-5.46A5.5 5.5 0 0 0 12 2Zm1.07 13.91c-1.55 0-2.8-.56-3.56-1.48-.24-.28-.19-.71.11-.93l.01-.01c.27-.19.64-.14.86.1.53.6 1.45.99 2.56.99 1.16 0 2-.54 2-.95 0-.29-.1-.64-.86-.85l-1.87-.49c-1.5-.39-2.71-1.1-2.71-2.7 0-1.72 1.61-2.86 3.62-2.86 1.32 0 2.41.42 3.07 1.17.23.27.2.68-.05.92l-.01.01c-.27.24-.69.2-.93-.06-.43-.49-1.17-.78-2.05-.78-.98 0-1.9.44-1.9 1.07 0 .27.1.61.88.82l1.78.47c1.74.46 2.78 1.28 2.78 2.73 0 1.68-1.64 2.84-3.92 2.84Z" />
      </SvgIcon>
    );
  }

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: { xs: 3, md: 4 },
        mt: 8,
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 4, md: 6 } }}>
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="flex-start">
          <Grid size={{ xs: 12, md: 8 }}>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {[footerLinks.column1, footerLinks.column2, footerLinks.column3, footerLinks.column4].map((column, index) => (
                <Grid key={index} size={{ xs: 6, sm: 3 }} sx={{ pl: index === 0 ? 0 : undefined }}>
                  {column.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      color="inherit"
                      underline="none"
                      display="block"
                      sx={{ mb: 1, fontSize: "0.875rem" }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Grid>
              ))}
            </Grid>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                mt: { xs: 4, md: 6 },
                flexWrap: "wrap",
              }}
            >
              {socialLinks.map(({ label, href, icon }) => (
                <IconButton
                  key={label}
                  component="a"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  sx={{
                    width: 48,
                    height: 48,
                    border: "2px solid white",
                    borderRadius: "50%",
                    color: "white",
                    p: 0,
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.12)",
                    },
                  }}
                >
                  {icon}
                </IconButton>
              ))}
            </Box>

            {/* Footer Copyright and License Section - below social icons */}
            <Box
              sx={{
                mt: { xs: 4, md: 5 },
                pt: { xs: 3, md: 4 },
                borderTop: "1px solid rgba(255,255,255,0.2)",
                fontSize: "0.75rem",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Box
                  component="img"
                  src="https://licensebuttons.net/l/by-sa/4.0/88x31.png"
                  alt="Creative Commons License"
                  sx={{ height: 24, width: 66 }}
                />
                <Typography variant="caption" sx={{ fontSize: "0.75rem" }}>
                  Spoken Tutorial, created on or before 31 Jan. 2025, by{" "}
                  <Link href="https://www.iitb.ac.in/" target="_blank" rel="noopener noreferrer" sx={{ color: "inherit", textDecoration: "underline" }}>
                    IIT Bombay
                  </Link>
                  {" "}is licensed under a{" "}
                  <Link href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" sx={{ color: "inherit", textDecoration: "underline" }}>
                    Creative Commons Attribution-ShareAlike 4.0 International License
                  </Link>
                  , except where stated otherwise
                </Typography>
              </Box>

              <Typography variant="caption" sx={{ fontSize: "0.75rem", display: "block", mb: 0.5 }}>
                Based on a work at{" "}
                <Link href="https://spoken-tutorial.org" target="_blank" rel="noopener noreferrer" sx={{ color: "inherit", textDecoration: "underline" }}>
                  https://spoken-tutorial.org
                </Link>
                . Permissions beyond the scope of this license may be available at{" "}
                <Link href="https://spoken-tutorial.org" target="_blank" rel="noopener noreferrer" sx={{ color: "inherit", textDecoration: "underline" }}>
                  https://spoken-tutorial.org
                </Link>
              </Typography>

              <Typography variant="caption" sx={{ fontSize: "0.75rem", display: "block" }}>
                <strong>Spoken Tutorial, developed at IIT Bombay</strong>, is brought to you by EduPyramids Educational Services Private Limited (DBA: EduPyramids Educational Services Pvt Ltd.). EduPyramids Educational Services Private Limited is currently incubated at SINE IIT Bombay. All transactions will be processed under the name EduPyramids Educational Services Private Limited.
              </Typography>
            </Box>
          </Grid>

          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{
              borderLeft: { md: "1px solid rgba(255,255,255,0.35)" },
              pl: { md: 5 },
              mt: { xs: 4, md: 0 },
            }}
          >
            <Box
              component="img"
              src="https://spoken-tutorial.org/static/spoken/images/iitb-logo.png"
              alt="IITB Logo"
              sx={{
                width: 140,
                height: 140,
                border: "2px solid white",
                borderRadius: 2,
                objectFit: "contain",
                p: 1,
                display: "block",
                mx: "auto",
                mb: 1,
              }}
            />

            <Typography variant="body2" sx={{ fontSize: "0.875rem", mb: { xs: 3, md: 5 }, textAlign: "center" }}>
              Developed at IIT Bombay
            </Typography>

            <Box sx={{ maxWidth: 260 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Contact US
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.25, fontSize: "0.875rem" }}>
                Spoken Tutorial Project,
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.25, fontSize: "0.875rem" }}>
                TCS Lab, Behind CAD Centre,
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.25, fontSize: "0.875rem" }}>
                IIT Bombay, Powai,
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.25, fontSize: "0.875rem" }}>
                Mumbai - 400076
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.25, fontSize: "0.875rem" }}>
                + 91 22 25764229
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                contact [at] spoken-tutorial [dot] org
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
