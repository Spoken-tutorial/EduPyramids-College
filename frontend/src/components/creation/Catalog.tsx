import { Box, Button, Card, CardContent, CardMedia, Chip, colors, IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useTheme} from "@mui/material";

// ------------ Props (matches your API) ------------
type ApiCourse = { foss: string; tag?: string; icon: string };
type ApiDomain = { name: string; icon: string; courses: ApiCourse[] };

type CatalogProps = {
  catalogue: ApiDomain[];
};

// ------------ Styles ------------
const chipsContainer = {
  display: "flex",
  gap: 1.5,
  overflowX: "auto",
  scrollSnapType: "x proximity" as const,
  pb: 1,
  "&::-webkit-scrollbar": { display: "none" },
};
const cardsContainer = {
  display: "flex",
  gap: 2,
  overflowX: "auto",
  scrollSnapType: "x mandatory" as const,
  pb: 1,
  "&::-webkit-scrollbar": { display: "none" },
};
const cardStyle = {
  minWidth: 320,
  maxWidth: 360,
  scrollSnapAlign: "start" as const,
  borderRadius: 2,
};

// ------------ Component ------------
export default function Catalog({ catalogue }: CatalogProps) {

  const theme = useTheme()
  const navigate = useNavigate();
  // transform API -> internal shape with numeric ids
  const DOMAINS = useMemo(
    () =>
      (catalogue || []).map((d, i) => ({
        id: i + 1,
        name: d.name,
        icon: d.icon,
        learners: d.courses?.length ?? 0, // optional badge
        courses: (d.courses || []).map((c, j) => ({
          id: j + 1,
          name: c.foss,
          tag: c.tag,
          image: c.icon,
        })),
      })),
    [catalogue]
  );

  // active domain id
  const [active, setActive] = useState<number>(DOMAINS[0]?.id ?? -1);

  // active domain courses
  const courses = useMemo(() => {
    const found = DOMAINS.find((d) => d.id === active);
    return found ? found.courses : [];
  }, [active, DOMAINS]);

  // refs for scrolling
  const chipsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // scroll helper
  const scroll = (ref: React.RefObject<HTMLDivElement>, dir: "left" | "right") => {
    if (ref.current) {
      const amount = 200;
      ref.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
    }
  };

  const activeDomainName = useMemo(
    () => DOMAINS.find((c) => c.id === active)?.name ?? "",
    [DOMAINS, active]
  );

  return (
    <Box sx={{ backgroundColor: "#e3f2fd", borderRadius: 2, p: 3 }}>
      <Stack>
        {/* SCROLLABLE DOMAIN CHIPS WITH ARROWS */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton onClick={() => scroll(chipsRef, "left")} size="small">
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>

          <Box ref={chipsRef} sx={{ ...chipsContainer, flex: 1 }}>
            {DOMAINS.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No categories available.
              </Typography>
            ) : (
              <>
                {DOMAINS.map((cat) => {
                  const selected = cat.id === active;
                  return (
                    <Chip
                      key={cat.id}
                      label={
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="body1" fontWeight={600}>
                            {cat.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {cat.learners}
                          </Typography>
                        </Stack>
                      }
                      onClick={() => setActive(cat.id)}
                      clickable
                      variant={selected ? "filled" : "outlined"}
                      color={selected ? "primary" : "default"}
                      sx={{
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        scrollSnapAlign: "start",
                      }}
                    />
                  );
                })}

                <Chip
                  key="view-all"
                  label={
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="body1" fontWeight={600}>
                        View All Domains
                      </Typography>
                    </Stack>
                  }
                  onClick={() => navigate("/domains")}
                  clickable
                  sx={{ px: 2, py: 1, borderRadius: 2, scrollSnapAlign: "start" }}
                />
              </>
            )}
          </Box>

          <IconButton onClick={() => scroll(chipsRef, "right")} size="small">
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Stack>

        {/* HEADER */}
        <Stack direction="row" alignItems="baseline" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="subtitle2" fontWeight={400} sx={{ ml: 5 }}>
            {active !== -1 ? `${activeDomainName} courses` : "No courses"}
          </Typography>
          <Button size="small" variant="outlined" disabled={courses.length === 0} sx={{ mr: 5 }} color="primary">
            {active !== -1 ? `View all ${activeDomainName} courses` : "View all"}
          </Button>
        </Stack>

        {/* SCROLLABLE COURSE CARDS WITH ARROWS */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton onClick={() => scroll(cardsRef, "left")} size="small">
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>

          <Box ref={cardsRef} sx={{ ...cardsContainer, flex: 1 }}>
            {courses.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No courses available.
              </Typography>
            ) : (
              courses.map((course) => (
                <Card key={course.id} sx={cardStyle}>
                  <CardMedia component="img" height="180" image={course.image} alt={course.name} />
                  <CardContent>
                    <Typography variant="body1" fontWeight={700} gutterBottom noWrap>
                      {course.name}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                      {/* <Typography variant="body2" fontWeight={700}>
                        2hrs
                      </Typography> */}
                      {course.tag && (
                        <Chip size="small" label={course.tag} color="success" variant="outlined" sx={{ borderRadius: 1 }} />
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              ))
            )}
          </Box>

          <IconButton onClick={() => scroll(cardsRef, "right")} size="small">
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
}
