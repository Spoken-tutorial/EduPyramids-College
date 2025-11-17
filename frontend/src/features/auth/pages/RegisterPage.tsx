import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  RegisterRequestSchema,
  type RegisterRequestType,
  type RegisterResponseType,
} from "../schema";

import { useApiMutation } from "../../../api/rq-helpers";
import { getErrorMessage, type ApiError } from "../../../api/api-error";

import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";

import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [globalErr, setGlobalErr] = useState<string | null>(null);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<RegisterRequestType>({
    resolver: zodResolver(RegisterRequestSchema),
    mode: "onChange",
  });

  const m = useApiMutation<RegisterResponseType, RegisterRequestType>(
    "post",
    "/auth/register/",
    undefined,
    {
      onSuccess: () => navigate("/login"),

      onError: (err: ApiError) => {
        const fieldErrors = err.response?.data?.errors;
        let handled = false;

        if (fieldErrors) {
          Object.entries(fieldErrors).forEach(([field, msgs]) => {
            const msg = Array.isArray(msgs) ? msgs[0] : String(msgs);

            setError(field as keyof RegisterRequestType, {
              type: "server",
              message: msg,
            });

            handled = true;
          });
        }

        if (!handled) setGlobalErr(getErrorMessage(err, "Registration failed"));
      },
    }
  );

  const onSubmit = (data: RegisterRequestType) => {
    if (!captchaValue) {
      setGlobalErr("Please complete the CAPTCHA!");
      return;
    }

    m.mutate({
      ...data,
      captcha: captchaValue, // send token to backend (recommended)
    });
  };

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "60vh", p: 2 }}
    >
      <Paper sx={{ p: 3, width: "100%", maxWidth: 420 }}>
        <Stack spacing={2}>
          
          {/* Title */}
          <Typography variant="h6" fontWeight={700} textAlign="center">
            Register
          </Typography>

          <Typography variant="body2" textAlign="center" color="text.secondary">
            (as General User)
          </Typography>

          {/* Global Error */}
          {globalErr && (
            <Alert severity="error" onClose={() => setGlobalErr(null)}>
              {globalErr}
            </Alert>
          )}

          {/* FORM */}
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>

              <TextField
                label="Desired Username"
                size="small"
                error={!!errors.username}
                helperText={errors.username?.message}
                {...register("username")}
              />

              <TextField
                label="First Name"
                size="small"
                error={!!errors.first_name}
                helperText={errors.first_name?.message}
                {...register("first_name")}
              />

              <TextField
                label="Last Name"
                size="small"
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
                {...register("last_name")}
              />

              <TextField
                label="Email ID"
                size="small"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register("email")}
              />

              <TextField
                label="Phone Number"
                size="small"
                error={!!errors.phone}
                helperText={errors.phone?.message}
                {...register("phone")}
              />

              <TextField
                label="Password"
                type="password"
                size="small"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register("password")}
              />

              <TextField
                label="Retype Password"
                type="password"
                size="small"
                error={!!errors.confirm_password}
                helperText={errors.confirm_password?.message}
                {...register("confirm_password")}
              />

              {/* CAPTCHA */}
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={(value) => {
                  setCaptchaValue(value);
                  setGlobalErr(null); // clear error if user completes captcha
                }}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                disabled={m.isPending}   // only disable while submitting
              >
                {m.isPending ? "Registering..." : "Register"}
              </Button>

              {/* Link to Login */}
              <Typography textAlign="center" variant="body2">
                Already Registered?{" "}
                <Link
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate("/login")}
                >
                  Login here
                </Link>
              </Typography>

            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Stack>
  );
}
