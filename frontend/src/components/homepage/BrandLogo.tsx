import { Box, Typography } from "@mui/material";
import {useTheme} from "@mui/material";

export default function BrandLogo({
  src,
  alt,
  label,
  onClick,
  href,
  height = 40,                 // image height (auto width)
  showLabel = false,
}: {
  src: string;
  alt: string;
  label?: string;
  onClick?: () => void;
  href?: string;
  height?: number;
  showLabel?: boolean;
}) {
  const theme = useTheme();
  const content = (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        // px: 1.25,
        // py: 0.75,
         px: 1.25,
        py: 0.75,
        borderRadius: 999,                                // pill
        bgcolor: "common.white",
        boxShadow: 1,
        border: `1px solid ${theme.palette.secondary.main}33`, // subtle brand tint
        transition: "box-shadow .2s, transform .2s",
        "&:hover": { boxShadow: 3, transform: "translateY(-1px)" },
      }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          height,               // only set height; width auto
          width: "auto",
          objectFit: "contain",
          display: "block",
        }}
      />
      {showLabel && label && (
        <Typography
          variant="subtitle2"
          sx={{ color: "text.primary", fontWeight: 700, lineHeight: 1 }}
        >
          {label}
        </Typography>
      )}
    </Box>
  );

  if (href) {
    return (
      <Box component="a" href={href} onClick={onClick} sx={{ textDecoration: "none" }}>
        {content}
      </Box>
    );
  }
  return <Box onClick={onClick}>{content}</Box>;
}
