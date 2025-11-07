import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginRequestSchema, type LoginRequestType, type LoginResponseType } from "../schema";
import { useState } from "react";
import { useApiMutation } from "../../../api/rq-helpers";
import { getErrorMessage, type ApiError } from "../../../api/api-error";
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";



export default function LoginPage() {

    const navigate = useNavigate();
    const { setAccessToken, setUser, login } = useAuthStore();

    const { 
        register, 
        handleSubmit, 
        setError, 
        formState: { errors, isValid },
        } = useForm<LoginRequestType>({
        resolver: zodResolver(LoginRequestSchema),
        mode: "onSubmit",
    });
    
    const [globalErr, setGlobalErr] = useState<string | null>(null);

    const m = useApiMutation<LoginResponseType, LoginRequestType>(
        "post",
        "/auth/login/",
        undefined,
        {
            onSuccess: (data) => {
                console.log("success");
                console.log(typeof data);
                login({ access: data.access, user: data.user});
                navigate("/dashboard");
            },
            onError: (err: ApiError) => {
                console.log("There si an error");
                console.log(err)
                console.log(err.config)
                console.log(err.request)
                const fieldErrors = err.response?.data?.errors;
                let assigned = false;
                if (fieldErrors) {
                    Object.entries(fieldErrors).forEach(([field, msgs]) => {
                        const msg = Array.isArray(msgs) ? msgs[0] : String(msgs);
                        if (fields === "email" || field === "password") {
                            setError(field as keyof LoginRequestType, { type: "server", message: msg});
                            assigned = true;
                        }
                    });
                }
                if (!assigned) setGlobalErr(getErrorMessage(err, "Login failed"));
            },
        },


    )
    return (
        <Stack alignItems="center" justifyContent="center" sx={{minHeight: "60vh", p:2, border: "1px solid green;"}}>
            <Paper sx={{ p: 3, width: "100%", maxWidth: 420}}>
                <Stack spacing={2}>
                    <Typography variant="h6" fontWeight={700}>Login</Typography>
                    { globalErr && <Alert severity="error" onClose={() => setGlobalErr(null)}>{globalErr}</Alert>}

                    <Box component="form" noValidate onSubmit={handleSubmit((v) => m.mutate(v))}>
                        <Stack spacing={2}>
                            <TextField 
                                label="Username or Email" 
                                type="text"
                                size="small"
                                error={!!errors.username}
                                helperText={errors.username?.message}
                                {...register("username")}
                                />
                            <TextField 
                                label="Password"
                                type="password"
                                size="small"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                {...register("password")}
                            />
                            <Button
                                type="submit"
                                disabled={m.isPending || !isValid}
                                fullWidth>
                                {m.isPending ? "Signing in..." : "Sign In"}
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Paper>
        </Stack>
    )
}
