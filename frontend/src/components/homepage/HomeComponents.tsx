import * as React from "react";
import { Box, Button, Card, CardContent, CardMedia, Grid, Link, Typography } from "@mui/material";
import ComputerIcon from "@mui/icons-material/Computer";
import ForumIcon from "@mui/icons-material/Forum";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import WorkIcon from "@mui/icons-material/Work";


type Feature = {
    title: string;
    icon: React.ReactNode;
    href?: string;
}

const FEATURES: Feature[] = [
    { title: "Training", icon: <ComputerIcon fontSize="inherit" /> },
    { title: "Forum", icon: <ForumIcon fontSize="inherit" /> },
    { title: "Online Test Certificate", icon: <AssignmentTurnedInIcon fontSize="inherit" /> },
    { title: "Jobs", icon: <WorkIcon fontSize="inherit" /> },
];

const FeatureCard: React.FC<Feature> = ({ title, icon, href }) => {
    const content = (
        <Box
      sx={{
        display: "grid",
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
        opacity: 0.8
      }}
      tabIndex={0}
      role="link"
    >
      {icon}
    </Box>
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
        variant="subtitle1"
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
    <Box sx={{ py: { xs: 2, sm: 4 } }}>
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

    return (
        <Grid container spacing={2} wrap="nowrap" alignItems="center">
            
            <Grid item xs={12} sm={6} >
                <Typography variant="h6">Forums</Typography>
                <Typography variant="subtitle1">Spoken Tutorial Forums is a friendly online discussion forum. You can join existing discussions or start new topics, and get lots of replies from the Spoken Tutorial community. 
                    Registration to Forums is completely free and takes only one minute. <br/>
                Forums is very easy to use, even for computer newbies. It's very easy to format forum posts with fonts, colors, and many other options. You can attach files to your posts directly from your computer. 
                You can give links to webpages or videos from other video websites.   <br/>
                Be assured of an answer within 3 working days of posting your question. <Link href="https://mui.com" underline="hover" color="primary" target="_blank">
            continue...
            </Link>    
                </Typography>
                
                
            </Grid>
             <Grid item xs={12} sm={6}>
          <Card
            sx={{
              bgcolor: "action.hover",
              borderRadius: 3,
              p: 2,
              textAlign: "center",
              boxShadow: 0,
            }}
          >
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
              Image
            </Typography>
            <CardContent sx={{ p: 0, display: "flex", justifyContent: "center" }}>
              <Box
                component="img"
                src="https://picsum.photos/seed/notify/700/500"
                alt="Forums"
                sx={{
                  width: { xs: "95%", md: "90%" },
                //   maxWidth: 420,
                  borderRadius: 1,
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        </Grid>
    )
}

export const Components = {
    Header,
    Card,
    FeatureTiles,
    Forums
}