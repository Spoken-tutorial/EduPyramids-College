import * as React from "react";
import { Autocomplete, TextField, Box, Button, Grid, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFiltersStore } from "../../features/filters/store/filters";


/** ---- Types that match your JSON exactly ---- */
type Domain = { id: number; name: string; slug: string };
type Foss = { id: number; name: string; slug: string; languageIds: number[] };
type Language = { id: number; name: string };
type DomainFoss = { domainId: number; fossId: number; primary?: boolean | 0 | 1 };

type Catalog = {
  domains: Domain[];
  foss: Foss[];
  languages: Language[];
  domainFoss: DomainFoss[];
};

type Props = {
  data: Catalog;
};

export default function CascadingFiltersManyToMany({ data }: Props) {
// export default function CascadingFiltersManyToMany() {
  const theme = useTheme();
  const navigate = useNavigate();

  /** ---- Data from React Query ---- */
  

  /** ---- Global filters from Zustand ---- */
  const filters = useFiltersStore((s) => s.filters);
  const setPartial = useFiltersStore((s) => s.setPartial);
  const resetStore = useFiltersStore((s) => s.reset);
  const toSearchParams = useFiltersStore((s) => s.toSearchParams);

  const onSearch = () => {
    console.log('on serach clicked');
    const qs = toSearchParams();
    navigate(`/tutorial-search?${qs.toString()}`);
  };

  /** ---- Fast lookup maps ---- */
  const domainByName = React.useMemo(
    () => new Map<string, Domain>(data.domains.map((d) => [d.name, d])),
    [data.domains]
  );
  const fossByName = React.useMemo(
    () => new Map<string, Foss>(data.foss.map((f) => [f.name, f])),
    [data.foss]
  );
  const langByName = React.useMemo(
    () => new Map<string, Language>(data.languages.map((l) => [l.name, l])),
    [data.languages]
  );

  /** ---- Adjacency maps ---- */
  const domainToFossIds = React.useMemo(() => {
    const m = new Map<number, Set<number>>();
    data.domainFoss.forEach(({ domainId, fossId }) => {
      if (!m.has(domainId)) m.set(domainId, new Set<number>());
      m.get(domainId)!.add(fossId);
    });
    return m;
  }, [data.domainFoss]);

  /** ---- Derived options ---- */
  const fossOptions = React.useMemo(() => {
    if (!filters.domain) return data.foss;
    const domain = domainByName.get(filters.domain);
    if (!domain) return [];
    const ids = domainToFossIds.get(domain.id);
    if (!ids) return [];
    return data.foss.filter((f) => ids.has(f.id));
  }, [filters.domain, data.foss, domainByName, domainToFossIds]);

  const languageOptions = React.useMemo(() => {
    if (!filters.foss) return [];
    const foss = fossByName.get(filters.foss);
    if (!foss) return [];
    return foss.languageIds.map((id) => data.languages.find((l) => l.id === id)!).filter(Boolean);
  }, [filters.foss, fossByName, data.languages]);

  /** ---- Styling ---- */
  const pillInputSx = (disabled = false) => ({
    "& .MuiOutlinedInput-root": {
      bgcolor: disabled ? theme.palette.action.disabledBackground : theme.palette.primary.main,
      color: theme.palette.getContrastText(theme.palette.primary.main),
      borderRadius: 0.5,
      "& fieldset": { border: "none" },
      "& .MuiSvgIcon-root": { color: theme.palette.getContrastText(theme.palette.primary.main) },
      "& input": { cursor: "pointer" },
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.getContrastText(theme.palette.primary.main),
      "&.Mui-focused": { color: theme.palette.getContrastText(theme.palette.primary.main) },
    },
  });

  const handleReset = () => {
    resetStore();
  };

  // if (filtersLoading || !data) return <p>Loading..........</p>;

  return (
    <Box>
      <Grid container spacing={4} alignItems="center" wrap="nowrap" sx={{ overflowX: "auto" , margin: "auto"}}>
        {/* Domain */}
        <Grid item xs={12} sm="auto" minWidth={320}>
          <Autocomplete
            value={filters.domain ? domainByName.get(filters.domain) ?? null : null}
            onChange={(_, v) => setPartial({ domain: v ? v.name : null, foss: null, language: null })}
            options={data.domains}
            getOptionLabel={(o) => o.name}
            isOptionEqualToValue={(o, v) => o.id === v.id}
            renderInput={(params) => <TextField {...params} label="Domain" size="small" sx={pillInputSx()} />}
            clearOnEscape
          />
        </Grid>

        {/* FOSS */}
        <Grid item xs={12} sm="auto" minWidth={360}>
          <Autocomplete
            value={filters.foss ? fossByName.get(filters.foss) ?? null : null}
            onChange={(_, v) => setPartial({ foss: v ? v.name : null, language: null })}
            options={fossOptions}
            getOptionLabel={(o) => o.name}
            isOptionEqualToValue={(o, v) => o.id === v.id}
            renderInput={(params) => <TextField {...params} label="FOSS" size="small" sx={pillInputSx()} />}
            clearOnEscape
          />
        </Grid>

        {/* Language */}
        <Grid item xs={12} sm="auto" minWidth={280}>
          <Autocomplete
            value={filters.language ? langByName.get(filters.language) ?? null : null}
            onChange={(_, v) => setPartial({ language: v ? v.name : null })}
            options={languageOptions}
            getOptionLabel={(o) => o.name}
            isOptionEqualToValue={(o, v) => o.id === v.id}
            renderInput={(params) => (
              <TextField {...params} label="Language" size="small" disabled={!filters.foss} sx={pillInputSx(!filters.foss)} />
            )}
            clearOnEscape
          />
        </Grid>
      </Grid>

      <Grid container sx={{ mt: 1 }} gap={2}>
        <Grid item xs={6} sm="auto">
          {/* <Button variant="contained" color="secondary" onClick={onSearch} sx={{ fontWeight: 800 }}> */}
          <Button onClick={onSearch}>
            Search
          </Button>
        </Grid>
        <Grid item xs={6} sm="auto">
          {/* <Button variant="outlined" color="secondary" onClick={handleReset} sx={{ fontWeight: 800 }}> */}
          <Button variant="outlined"  onClick={handleReset} color="black">
            Reset
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
