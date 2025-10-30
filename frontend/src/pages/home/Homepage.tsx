import { Box, Button, Typography, Grid , Paper} from "@mui/material";
import Catalog from "../../components/creation/Catalog";
import FeatureSplit from "../../components/homepage/FeatureSplit";
import CascadingFiltersManyToMany from "../../components/homepage/CascadingFilters";
import MainCarousel from "../../components/homepage/MainCarousel";
import { pink } from "@mui/material/colors";
import { Components } from "../../components/homepage/HomeComponents"
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useHomepageQuery } from "../../features/homepage/queries/useHomepage";
import { useFiltersQuery } from "../../features/filters/queries/useFilters";
import Testimonials from "../../components/homepage/Testimonials";
import ContactUsForm from "../../components/homepage/ContactUs";
import CollaborateSection from "../../components/homepage/Collaborate";


export default function HomePage(){

  const { data: homepage, isLoading: homeLoading } = useHomepageQuery();
  const { data: filters, isLoading: filtersLoading } = useFiltersQuery();
  
  
  if (homeLoading || filtersLoading || !filters) return <p>Loading..........</p>;

  console.log(homepage)
  console.log("filters")
  console.log(filters)

  return (
    homepage && (
      <Box>
        {/* Carousal */}
        <MainCarousel slides={homepage.carousel} />

        
        <Box sx={{ px: { xs: 2, md: 6 }, py: 2 }} display="flex" flexDirection="column" gap={10} >

          {/* Course Search Filter */}
          <Box sx={{ px: { xs: 2, md: 6 }, py: 2, display: 'flex', justifyContent: 'center' }}>
            <CascadingFiltersManyToMany data={filters} />
          </Box>

          {/* Section : Ready to Learn*/}
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Ready To Learn?</Typography>
            <Typography variant="h5">Master open-source software with us.</Typography>
          </Box>

          {/* Catalog */}
          <Box sx={{ backgroundColor: pink}}>
            <Catalog catalogue={homepage.catalogue} />
          </Box>

          {/* FeatureTiles */}
          <Box>
            <Components.FeatureTiles/>
          </Box>

          {/* Section: Feature */}
          <Grid container gap={2} alignItems="stretch">
            
            <Grid item >
               <Paper sx={{ height: "100%", p: 2 }}>
                <FeatureSplit
            title="Why Should Colleges/Universities Join?"
            bullets={[
              "Curriculum-aligned e-resources to improve exam performance.",
              "Industry-relevant skill development courses.",
              "Job-oriented skills to enhance employability.",
              "Unlimited access to all available courses for both teachers and students.",
              "Affordable learning at scale – one annual subscription covers your entire institution.",
            ]}
            imageSrc="https://picsum.photos/seed/notify/700/500" // replace with your asset
            imageTitle="Notification"
          />
               </Paper>
            </Grid>
            <Grid item>
              <Paper
                sx={{
                  height: "100%",
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center", // centers content vertically
                }}
              >
                <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Ready To Learn?</Typography>
                <Typography variant="h5">Master open-source software with us.</Typography>
                <Button sx={{ mt: 8}}>Contact Support Team</Button>
              </Box>
              </Paper>
            </Grid>
          </Grid>
         

             <Components.Forums />
             <Testimonials/>
             {/* <Grid container width={"100%"} spacing={2} alignItems="stretch">
                <Grid size={{ xs: 12, sm: 6}} sx={{ display: "flex" }}>
                    <ContactUsForm/>
                </Grid>
                <Grid size={{ xs: 12, sm: 6}} height={"100%"} sx={{ display: "flex" }}>
                    <CollaborateSection/>
                </Grid>
             </Grid> */}

             <Box display={"flex"} gap={2} justifyContent={"space-evenly"}>
              <Box>
                <ContactUsForm/>
              </Box>
              <Box>
                <CollaborateSection/>
              </Box>

             </Box>

        </Box>
      </Box>
    )
  )
  // const [homepageData, setHomepageData] = useState<unknown>(null);

  // useEffect(() => {
  //   // alert('use effect');
  //   console.log("use effect");
  //   api.get("api/homepage/")
  //   .then((res) => {
  //     console.log("resdata");
  //     console.log(res.data);
  //     setHomepageData(res.data);


  //   })
  //   .catch((err) => {
  //     console.log("It is an error");
  //     console.log(err);
  //   })
  // }, []);

  // return (
    // <>
    //     {/* <ResponsiveAppBar/> */}
    //     {homepageData ? (
    //       <Box >
    //     <MainCarousel slides={homepageData?.carousel}/>
    //     <Box sx={{ px: { xs: 2, md: 6 }, py: 2 }} display="flex" flexDirection="column" gap={10}>
    //         <CascadingFiltersManyToMany
    //         data={homepageData?.filters}
    //         onSearch={({ domainId, fossId, languageId }) => {
    //               console.log({ domainId, fossId, languageId });
    //             }}
    //           />
    //           <Box>
    //             <Typography variant="h4" sx={{ fontWeight: 700, mb: 2}}>Ready To Learn?</Typography>
    //             <Typography variant="h5">Master open-source software with us. </Typography>
    //           </Box>
    //           <Box sx={{ backgroundColor: pink}}>
    //             <Catalog catalogue={homepageData?.catalogue} />
    //           </Box>
    //           <Box>
    //             <Components.FeatureTiles/>
    //           </Box>
    //         <FeatureSplit
    //           title="Why Should Colleges/Universities Join?"
    //           bullets={[
    //             "Curriculum-aligned e-resources to improve exam performance.",
    //             "Industry-relevant skill development courses.",
    //             "Job-oriented skills to enhance employability.",
    //             "Unlimited access to all available courses for both teachers and students.",
    //             "Affordable learning at scale – one annual subscription covers your entire institution.",
    //           ]}
    //           imageSrc="https://picsum.photos/seed/notify/700/500" // replace with your asset
    //           imageTitle="Notification"
    //         />

    //         <Components.Forums />
    //     </Box>
    //   </Box>
    //     ) : ( <p>Loading ......</p> )
    //     }
    // </>
  // )
}
