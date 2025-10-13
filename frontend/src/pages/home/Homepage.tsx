import { Box, Typography } from "@mui/material";
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


export default function HomePage(){

  // const { data: homepage, isLoading: homeLoading } = useHomepageQuery();
  // const { data: filters, isLoading: filtersLoading } = useFiltersQuery();
  const homepage = null;
  const filters = null;
  
  // if (homeLoading || filtersLoading || !filters) return <p>Loading..........</p>;

  console.log(homepage)
  console.log("filters")
  console.log(filters)

  return (
    // homepage && 
    (
      <Box>
        <MainCarousel slides={homepage?.carousel} />
        <Box sx={{ px: { xs: 2, md: 6 }, py: 2 }} display="flex" flexDirection="column" gap={10}>
           {/* <CascadingFiltersManyToMany
            data={filters}
            // onSearch={({ domainId, fossId, languageId }) => console.log({ domainId, fossId, languageId })}
            onSearch={() => console.log("Test")}
          /> */}
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Ready To Learn?</Typography>
            <Typography variant="h5">Master open-source software with us.</Typography>
          </Box>
                  <Box sx={{ backgroundColor: pink}}>
                 <Catalog catalogue={homepage?.catalogue} />
               </Box>
               <Box>
                 <Components.FeatureTiles/>
               </Box>
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

             <Components.Forums />

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
