import { Box, Button, Divider, Grid, Paper, TextField, Typography } from "@mui/material"
import {useTheme} from "@mui/material"
import { useForm, SubmitHandler } from "react-hook-form"
import EmailIcon from '@mui/icons-material/Email';

type Inputs = {
    name: string
    email: string
    message: string
}


export default function ContactUsForm(){
    const theme = useTheme()
    const { register, handleSubmit, formState: { errors }, } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    return (
        // <Paper
        //     elevation={4}
        //     component="form"
        //     onSubmit={handleSubmit(onSubmit)}
        //     sx={{ p: 4}}
        //     >
        <Paper elevation={4} sx={{ p: 3, borderRadius: 3, height: 1 }}>
            <EmailIcon/> <Typography variant="subtitle2" sx={{ mb:1}}>Contact Us</Typography>
            <Grid container spacing={2} width="100%">
                <Grid  size={{ xs: 12}} >
                    <TextField size="small" fullWidth
                        label="Name" 
                        {...register("name", { required: "Name is required"})}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        />
                </Grid>
                <Grid  size={{ xs: 12}}>
                    <TextField size="small" fullWidth
                        label="Email" 
                        {...register("email", { 
                            required: "Email is required",
                            pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Enter a valid email",
                        },})}
                        error={!!errors.email}
                        helperText={errors.email?.message}/>
                </Grid>
                <Grid  size={{ xs: 12}}>
                    <TextField size="small" fullWidth multiline rows={4}
                        label="Message"
                        {...register("message", { required: "Message is required" })} 
                        error={!!errors.message}
                        helperText={errors.message?.message}/>
                </Grid>
                <Grid size={{ xs: 12}}>
                    <Button
                        type="submit"
                        variant="contained"
                        // color="primary"
                        fullWidth
                        sx={{ mt: 1 }}
                    >Submit</Button>
                </Grid>
            </Grid>
        </Paper>
    )
}