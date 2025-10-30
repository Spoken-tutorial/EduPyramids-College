import { Box, Button, Divider, Grid, Paper, TextField, Typography } from "@mui/material"
import {useTheme} from "@mui/material"
import { useForm, SubmitHandler } from "react-hook-form"
import Diversity3Icon from '@mui/icons-material/Diversity3';



export default function CollaborateSection(){
    const theme = useTheme()
    

    return (
        // <Paper
        //     elevation={4}
        //     sx={{ p: 4}}
        //     >
        <Paper elevation={4} sx={{ p: 3, borderRadius: 3, height: 1 , maxWidth: 360}}>
            <Diversity3Icon/> <Typography variant="subtitle2">Collaborate with us</Typography>
            <Typography mt={2}>
                We invite you to become a part of this amazing journey of making India IT-literate. 
                Join our growing network of Resources Centres, Organisers, Content creators, 
                Domain Experts, Translators, Dubbers, Reviewers and help us to reach every nook and
                corner of India.
                <br/>
                <Typography mt={2}>
                    First step to do so - fill the form given <a href="https://spoken-tutorial.org/creation/collaborate/">here</a>.
                </Typography>
                <Typography variant="body2" fontWeight={700} mt={2}>
                    Partnered with Wheels global
                </Typography>
            </Typography>
        </Paper>
    )
}