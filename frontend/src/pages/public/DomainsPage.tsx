
import {
  Box,
  Container,
  Grid,
} from "@mui/material";
import type { PopperPlacementType } from "@mui/material/Popper";
import api from "../../api/axios";

import { styled } from "@mui/material/styles";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import { useMemo, useState, useRef, useEffect } from "react";
import { Typography, Stack } from "@mui/material";
import CascadingFiltersManyToMany from "../../components/homepage/CascadingFilters";
import { useFiltersQuery } from "../../features/filters/queries/useFilters";

/* ---------- Styled Popper with arrow ---------- */
const StyledPopper = styled(Popper)(({ theme }) => ({
  zIndex: theme.zIndex.modal, // above cards
  '& .arrow': {
    position: 'absolute',
    width: '1rem',
    height: '1rem',
    pointerEvents: 'none',
    '&::before': {
      content: '""',
      display: 'block',
      width: '100%',
      height: '100%',
      background: theme.palette.background.paper,
      boxShadow: theme.shadows[3],
      transform: 'rotate(45deg)',
      borderRadius: 1,
    },
  },

  /* position arrow for left/right placements */
  '&[data-popper-placement^="right"] .arrow': {
    left: -8, // half of arrow size minus a bit
  },
  '&[data-popper-placement^="left"] .arrow': {
    right: -8,
  },
  '&[data-popper-placement^="right"] .arrow, &[data-popper-placement^="left"] .arrow': {
    top: '16px',
  },

  /* if you ever use top/bottom later */
  '&[data-popper-placement^="top"] .arrow': {
    bottom: -8,
    left: '16px',
  },
  '&[data-popper-placement^="bottom"] .arrow': {
    top: -8,
    left: '16px',
  },
}));

type Domain = {
  id: number;
  name: string;
  icon: string;
  description: string;
};

const tileSx = {
  position: "relative" as const,
  borderRadius: 1,
  overflow: "hidden",
  cursor: "default",
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
};

const imgSx = {
  display: "block",
  width: "100%",
  height: 200,
  objectFit: "cover" as const,
};

const bottomOverlaySx = {
  position: "absolute" as const,
  left: 0,
  right: 0,
  bottom: 0,
  px: 2,
  py: 1.25,
  background:
    "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.35) 28%, rgba(0,0,0,.7) 100%)",
  color: "#fff",
};

export default function DomainsPage() {
  const { data: filters, isLoading: filtersLoading } = useFiltersQuery();

  const [domains, setDomains] = useState<Domain[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [active, setActive] = useState<Domain | null>(null);
  const [placement, setPlacement] = useState<PopperPlacementType>("right-start");
  const [arrowEl, setArrowEl] = useState<HTMLSpanElement | null>(null);

  // hover coordination
  const overAnchorRef = useRef(false);
  const overPopperRef = useRef(false);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    api
      .get("api/domains/")
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : res.data.domains;
        setDomains(list ?? []);
      })
      .catch((err) => {
        console.error("Failed to fetch domains", err);
      });
  }, []);

  const open = Boolean(anchorEl);

  const handleEnter = (e: React.MouseEvent<HTMLElement>, d: Domain) => {
    const target = e.currentTarget;
    overAnchorRef.current = true;
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }

    const rect = target.getBoundingClientRect();
    const vwMid = window.innerWidth / 2;
    setPlacement(rect.left < vwMid ? "right-start" : "left-start");

    setAnchorEl(target);
    setActive(d);
  };

  const handleLeaveAnchor = () => {
    overAnchorRef.current = false;
    scheduleClose();
  };

  const handleEnterPopper = () => {
    overPopperRef.current = true;
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const handleLeavePopper = () => {
    overPopperRef.current = false;
    scheduleClose();
  };

  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      if (!overAnchorRef.current && !overPopperRef.current) {
        setAnchorEl(null);
        setActive(null);
      }
      closeTimer.current = null;
    }, 120);
  };

  const popperModifiers = useMemo(
  () => [
    { name: 'offset', options: { offset: [8, 12] } },
    { name: 'arrow', options: { element: arrowEl, padding: 6 } },
  ],
  [arrowEl]
);

  if (filtersLoading) return <p>Loading..........</p>
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Explore Domains
      </Typography>
      <CascadingFiltersManyToMany
                  data={filters}
                  // onSearch={({ domainId, fossId, languageId }) => console.log({ domainId, fossId, languageId })}
                  onSearch={() => console.log("Test")}
                />

      <Grid container spacing={3}>
        {domains.map((d) => (
          <Grid item key={d.id} xs={12} sm={6} md={4}>
            <Paper
              elevation={0}
              sx={tileSx}
              onMouseEnter={(e) => handleEnter(e, d)}
              onMouseLeave={handleLeaveAnchor}
              aria-label={`Show details for ${d.name}`}
            >
              <Box component="img" src={d.icon} alt={d.name} sx={imgSx} loading="lazy" />
              <Box sx={bottomOverlaySx}>
                <Typography variant="subtitle1" fontWeight={700} noWrap>
                  {d.name}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

     <StyledPopper
  open={Boolean(anchorEl)}
  anchorEl={anchorEl}
  placement={placement}
  modifiers={popperModifiers}
  onMouseEnter={handleEnterPopper}
  onMouseLeave={handleLeavePopper}
>
  {/* the arrow node (PopperJS positions it) */}
  <span className="arrow" ref={setArrowEl} />

  <Paper
    elevation={3}
    sx={{
      width: { xs: 280, sm: 340 },
      maxWidth: 'calc(100vw - 40px)',
      borderRadius: 1,
      p: 2,
    }}
  >
    <Stack spacing={1}>
      <Typography variant="h6" fontWeight={800}>
        {active?.name}
      </Typography>
      {active?.description ? (
        <Typography variant="body2" color="text.secondary" sx={{ maxHeight: 220, overflow: 'auto' }}>
          {active.description}
        </Typography>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No description available.
        </Typography>
      )}
    </Stack>
  </Paper>
</StyledPopper>    </Container>
  );
}
