
// src/pages/TutorialSearchPage.tsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useFiltersStore } from "../../features/filters/store/filters";
import api from "../../api/axios";
import CascadingFiltersManyToMany from "../../components/homepage/CascadingFilters";
import { useFiltersQuery } from "../../features/filters/queries/useFilters";
import { Box, Card, CardContent, CardMedia, Container, Stack, Typography } from "@mui/material";
import LevelChip from "../../components/creation/LevelChip";
import { BRAND } from "../../theme";
import CustomPagination from "../../components/common/CustomPagination";



export default function TutorialSearch() {
  const [params, setParams] = useSearchParams();
  
  // zustand store
  const fromSearchParams = useFiltersStore((s) => s.fromSearchParams);
  const filters = useFiltersStore((s) => s.filters);
  
  // state
  const [loading, setLoading] = useState(false);
  const [tutorials, setTutorials] = useState([]);
  // const [res, setRes] = useState({foss: "", description: ""});
  const [meta, setMeta] = useState({
    foss: "",
    description: null,
    count: 0,
    page_size: 2 // IMPORTANT: must match DRF page_size
  });

  // read starting page from URL (?page=)
  const initialPage = Number(params.get("page") || 1);
  const [page, setPage] = useState<number>(isNaN(initialPage) ? 1 : initialPage);

  // load filter options Get the cached query value
  const { data, isLoading: filtersLoading } = useFiltersQuery();
 
  // When URL changes, sync it into the store
  useEffect(() => {
    fromSearchParams(params);

  }, [params, fromSearchParams]);

  // whenever filters change, reset to page 1 and push to URL
  useEffect(() => {
    setPage(1);
    const next = new URLSearchParams(params);
    next.set("page", "1");
    setParams(next, { replace: true });
  },[filters.foss, filters.language, filters.domain]); // eslint-disable-line react-hooks/exhaustive-deps

  // fetch results whenever filters or page change
  useEffect(() => {
    const qs = new URLSearchParams();
    if (filters.foss) qs.set("search_foss", filters.foss!);
    if (filters.language) qs.set("search_language", filters.language!);
    if (filters.domain) qs.set("search_domain", filters.domain!);
    qs.set("page", String(page));
    setLoading(true);
    api.get(`/api/tutorials?${qs.toString()}`)
    .then(
        (res) => {
          
          console.log(res.data);
          const d = res.data;
          setTutorials(res.data.tutorials);
          // setRes(res.data);
          setMeta({ foss: d.foss, description: d.description, count: d.count, page_size: d.page_size });
          // keep ?page in URL synced
          const nextParams = new URLSearchParams(params);
          nextParams.set("page", String(page));
          setParams(nextParams, { replace: true });
        }
    )
    .catch((err) => {
      console.log("err");
      console.log(err);
      // setTutorials([]);
      setMeta((m) => ({ ...m, count: 0 }));
    })
    .finally(() => setLoading(false));
    ;
  }, [filters, page]);

  if ( filtersLoading || !filters) return <p>Loading..........</p>;
  if ( tutorials.length == 0 ) return <p>Loading Tutorials..........</p>;
  return (
    <Box mb={2}>
       <CascadingFiltersManyToMany
                  data={data}/>
      
      {/* render results here */}
      {
        loading ? (
          <p>Loading Tutorials...</p>
        ) : tutorials.length === 0 ? (
          <p>No tutorials found.</p>
        ) : (
          <Stack spacing={2}>
          {/* Section header */}
          <Box 
            sx={{
              p: { xs: 2, md: 4},
              bgcolor: BRAND.lightBgHighlight
              }}>
                <Typography variant="subtitle1">{filters.domain}</Typography>
                <Typography variant="subtitle2" fontWeight={700}>
                  {meta.foss}
                </Typography>
                <Typography variant="body1" >
                  {meta.description}
                </Typography>
          </Box>

          {/* Tutorial cards */}
          <Stack spacing={4} sx={{ p: 2}}>
          

        {tutorials.map((t, idx) => (
          <Card 
            key={t.id}
            sx={{
              display: "flex",
              alignItems: "stretch",
              p: 2,
              borderRadius: 2,
              boxShadow: "none",
              border: `1px solid ${BRAND.borderColor}`,
            }}>
            {/* Left: Thumbnail */}
            <Stack gap={1}>
            <CardMedia
              component="img"
              sx={{
                width: 160,
                borderRadius: 2,
                bgcolor: "grey.100" // placeholder background
              }}
              image={t.thumb}
              alt="Tutorial Thumbnail"
              >
              
            </CardMedia>
            <Typography variant="body2" fontWeight="bold" mb={1}>{filters.foss}</Typography>
            </Stack>
            
            {/* Right: Content */}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column"}}>
              <CardContent sx={{ flex: "1 0 auto", border: `1px solid ${BRAND.borderColor}`, borderRadius: 2, ml: 4}}>
                <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                  >
                    <Typography variant="body1" fontWeight="bold" mb={1}> {(page - 1) * meta.page_size + idx + 1}. {t.tutorial_name} </Typography>

                    
                    {t.level && <LevelChip level={t.level} />}
                </Box>
                
                <Typography>
                  <Typography fontWeight={"bold"}>Outline: </Typography>{t.outline}
                </Typography>
              </CardContent>
            </Box>
          </Card>
        ))}
      </Stack>
      <Box p={2}>
        {tutorials && (
        <CustomPagination 
          page={page}
          count={meta.count}
          pageSize={meta.page_size}
          onPageChange={(newPage) => setPage(newPage)}
          />
      )}
      </Box>
      </Stack>
        )
      }
      
    </Box>
  );
}
