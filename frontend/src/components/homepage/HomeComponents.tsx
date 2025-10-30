import * as React from "react";
import { Box, Button, Card, CardContent, CardMedia, Grid, Link, Typography, Paper } from "@mui/material";
import ComputerIcon from "@mui/icons-material/Computer";
import ForumIcon from "@mui/icons-material/Forum";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import WorkIcon from "@mui/icons-material/Work";
import Testimonials from "./Testimonials";


type Feature = {
    title: string;
    src: string;
    href?: string;
}

const mediaUrl = import.meta.env.VITE_API_MEDIA_URL
const FEATURES: Feature[] = [
    { title: "Training", src:`${mediaUrl}/homepage/Training.png`, href: "#"},
    { title: "Forum", src:`${mediaUrl}/homepage/Forums.png`, href: "https://forums.spoken-tutorial.org/" },
    { title: "Online Test Certificate", src:`${mediaUrl}/homepage/Jobs.png`, href: "" },
    { title: "Jobs", src:`${mediaUrl}/homepage/OnlineTest.png`, href: "https://jrs.spoken-tutorial.org/" },
];

const FeatureCard: React.FC<Feature> = ({ title, src, href }) => {
    const content = (
        <a href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
            >
          <Box
            sx={{
              display: "grid",
              direction: "column",
              placeItems: "center",
              width: 136,
              height: 136,
              bgcolor: (t) => t.palette.secondary.main,   // yellow tile
              color: (t) => t.palette.common.black,    // black icon
              borderRadius: 3,                          // ~24px if default spacing
              boxShadow: 1,
              transition: "transform 120ms ease, box-shadow 120ms ease",
              fontSize: 56,     // icon size via fontSize=inherit
              fontWeight: 700,                        
              "&:hover": { transform: "translateY(-2px)", boxShadow: 3 },
              "&:focus-visible": { outline: "3px solid rgba(0,0,0,0.3)" },
              opacity: 0.8,
              
            }}
            tabIndex={0}
            role="link"
          >

            <Box component="img" src={src} alt="icon" 
              sx={{
                maxWidth: "60%",
              }}>
            </Box>
          </Box>
        </a>
    )

    return (
    <Box sx={{ textAlign: "center" }}>
      {href ? (
        <Box component="a" href={href} sx={{ textDecoration: "none" }}>
          {content}
        </Box>
      ) : (
        content
      )}
      <Typography
        variant="body1"
        fontWeight={700}
        sx={{ mt: 1.5, whiteSpace: "pre-line", color: "text.primary" }}
      >
        {title}
      </Typography>
    </Box>
  );

};

const FeatureTiles = () => {
  return (
    <Box sx={{ py: { xs: 2, sm: 2 } }}>
      <Grid
        container
        spacing={{ xs: 4, sm: 8 }}
        justifyContent="space-around"
        wrap="wrap"
      >
        {FEATURES.map((f) => (
          <Grid key={f.title} item xs={6} sm={3} display="flex" justifyContent="center">
            <FeatureCard {...f} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

const Header = () => (
     <Typography variant="h4">Header Component</Typography>
)

const Card1 = () => {
    <Typography variant="h4">Header Component</Typography>
}

const Forums = () => {
  // const mediaUrl = "https://your-media-url.com"; // replace with your actual URL

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Grid container spacing={2} alignItems="center" width={"100%"} wrap="nowrap">
        {/* Left Side — Text (60%) */}
        <Grid item 
          size={{ xs: 12, sm: 7}}>
          <Typography variant="h6" mb={2}>
            Forums
          </Typography>

          <Typography variant="body1" paragraph>
            Spoken Tutorial Forums is a friendly online discussion forum. You can join existing
            discussions or start new topics, and get lots of replies from the Spoken Tutorial
            community. Registration to Forums is completely free and takes only one minute.
          </Typography>

          <Typography variant="body1" paragraph>
            Forums is very easy to use, even for computer newbies. It's very easy to format forum
            posts with fonts, colors, and many other options. You can attach files to your posts
            directly from your computer. You can give links to webpages or videos from other video
            websites.
          </Typography>

          <Typography variant="body1">
            Be assured of an answer within 3 working days of posting your question.{" "}
            <Link
              href="https://forums.spoken-tutorial.org/"
              underline="hover"
              color="primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              continue...
            </Link>
          </Typography>
        </Grid>

        {/* Right Side — Image (40%) */}
        <Grid
          item
          size={{ xs: 12, sm: 5}}
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "center" },
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={`${mediaUrl}/homepage/forums.jpg`}
            alt="Forums illustration"
            sx={{
              width: "100%",
              maxWidth: 360,
              borderRadius: 2,
              objectFit: "cover",
              boxShadow: 2,
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};


export const Components = {
    Header,
    Card,
    FeatureTiles,
    Forums
}