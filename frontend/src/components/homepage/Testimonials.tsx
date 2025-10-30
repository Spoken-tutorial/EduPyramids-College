import { Box, Divider, Grid, Paper, Typography } from "@mui/material"
import {useTheme} from "@mui/material"


const TestimonialCard = () => {

    return (
        <Paper elevation={4} sx={{ p: 2}}>
            <Typography>
                “The best part was the spoken tutorials helped them 
                get ready with the installation, interface and utilities 
                of Blender before the physical workshop in the
                IGNOU campus.”
            </Typography>
            <Divider sx={{my: 2}}/>
            <Typography variant="body2" fontWeight={600}>Prof. Uma Kanjilal, Director I/c,</Typography>
            <Typography variant="body2">IGNOU's Adv. Centre for Informatics & Innovative Learning</Typography>
        </Paper>
    )
}
export default function Testimonials(){
    const theme = useTheme()

    return (
        <Box sx={{ border: "1px solid green", 
                width: '100vw',
                position: 'relative',
                left: '50%',
                right: '50%',
                marginLeft: '-50vw',
                marginRight: '-50vw',
                px: 6,
                py: 4,
                backgroundColor: theme.palette.primary.main
            }} >
            <Typography variant="body1" mb={2} color="#ffffff" fontWeight={700}>Testimonials</Typography>
            <Grid container spacing={2}>
                <Grid item size={{ xs: 12, sm: 4}}>
                    <TestimonialCard/>
                </Grid>
                <Grid item size={{ xs: 12, sm: 4}}>
                    <TestimonialCard/>
                </Grid>
                <Grid item size={{ xs: 12, sm: 4}}>
                    <TestimonialCard/>
                </Grid>
            </Grid>
        </Box>

        
    )
}