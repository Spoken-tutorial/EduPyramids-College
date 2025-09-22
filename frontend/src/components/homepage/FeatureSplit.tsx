// FeatureSplit.tsx
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

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
  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 3, md: 6 } }}>
      <Grid container spacing={4} alignItems="center">
        {/* Left: text */}
        <Grid item xs={12} md={7}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            {title}
          </Typography>

          <Typography component="div" sx={{ fontWeight: 700, mb: 1.5 }}>
            By subscribing to Spoken Tutorial, your institution can provide students and faculty with:
          </Typography>

          {/* Bullets */}
          <Typography component="ul" sx={{ pl: 3, m: 0, lineHeight: 1.9 }}>
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </Typography>
        </Grid>

        {/* Right: image card */}
        <Grid item xs={12} md={5}>
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
            <CardContent sx={{ p: 0, display: "flex", justifyContent: "center" }}>
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
        </Grid>
      </Grid>
    </Box>
  );
}
