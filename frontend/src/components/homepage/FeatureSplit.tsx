// FeatureSplit.tsx
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";              // For curriculum & learning
import BuildCircleIcon from "@mui/icons-material/BuildCircle";    // For skill development
import WorkIcon from "@mui/icons-material/Work";                  // For employability
import PeopleIcon from "@mui/icons-material/People";              // For teachers & students
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";    // For affordability

type FeatureSplitProps = {
  title: string;
  bullets: string[];
  imageSrc: string;
  imageTitle?: string;
};

export default function FeatureSplit({
  title,
  bullets,
  imageSrc,
  imageTitle = "Notification",
}: FeatureSplitProps) {
  // Map each bullet to a relevant icon
  const icons = [
    <SchoolIcon color="primary" />,
    <BuildCircleIcon color="primary" />,
    <WorkIcon color="primary" />,
    <PeopleIcon color="primary" />,
    <AttachMoneyIcon color="primary" />,
  ];

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 3, md: 3 } }}>
      <Grid container spacing={4} alignItems="center">
        {/* Left: text */}
        <Grid item xs={12} md={7}>
          <Typography variant="subtitle1" fontWeight={700} gutterBottom>
            {title}
          </Typography>

          <Typography component="div" sx={{ fontWeight: 700, mb: 1.5 }}>
            By subscribing to Spoken Tutorial, your institution can provide students and faculty with:
          </Typography>

          <List sx={{ pl: 1 }}>
            {bullets.map((text, i) => (
              <ListItem key={i} sx={{ alignItems: "flex-start", py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>{icons[i]}</ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ fontSize: 15, lineHeight: 1.6 }}
                  primary={text}
                />
              </ListItem>
            ))}
          </List>
        </Grid>

        {/* Right: image card */}
        {/* <Grid item xs={12} md={5}>
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
              {imageTitle}
            </Typography>
            <CardContent
              sx={{ p: 0, display: "flex", justifyContent: "center" }}
            >
              <Box
                component="img"
                src={imageSrc}
                alt={imageTitle}
                sx={{
                  width: { xs: "85%", md: "80%" },
                  maxWidth: 420,
                  borderRadius: 2,
                }}
              />
            </CardContent>
          </Card>
        </Grid> */}
      </Grid>
    </Box>
  );
}
