"use client";

import * as React from "react";
import { Amplify, Auth } from "aws-amplify";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import Divider from "@mui/joy/Divider";
import FormHelperText from "@mui/joy/FormHelperText";
import FormControl from "@mui/joy/FormControl";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import IconButton, { IconButtonProps } from "@mui/joy/IconButton";
import Link from "next/link";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import awsconfig from "../../aws-exports";

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function ColorSchemeToggle({ onClick, ...props }: IconButtonProps) {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="neutral" disabled />;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="outlined"
      color="neutral"
      aria-label="toggle light/dark mode"
      {...props}
      onClick={(event) => {
        if (mode === "light") {
          setMode("dark");
        } else {
          setMode("light");
        }
        onClick?.(event);
      }}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

export default function ForgotPasswordTemplate() {
  // const email = "kamalesh@gmail.com";
  // const password = "Kamal@20";

  const [emailValue, setEmailValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [confirmCode, setConfirmCode] = React.useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = React.useState("");
  const [mode, setMode] = React.useState("verify");
  const isPasswordMatch = passwordValue === confirmPasswordValue;

  console.log(emailValue);

  const forgotPassword = () => {
    Auth.forgotPassword(emailValue)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => {});
  };

  async function changePassword() {
    try {
      const user = await Auth.forgotPasswordSubmit(
        emailValue,
        confirmCode,
        confirmPasswordValue
      );
      console.log("user:", user);
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  }

  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Collapsed-breakpoint": "769px", // form will stretch when viewport is below `769px`
            "--Cover-width": "50vw", // must be `vw` only
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s", // set to `none` to disable transition
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width:
            "clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)",
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255 255 255 / 0.2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width:
              "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
            maxWidth: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              alignItems: "left",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                gap: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton variant="soft" color="primary" size="sm">
                <BadgeRoundedIcon />
              </IconButton>
              <Typography level="title-lg">Company logo</Typography>
            </Box>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .${formLabelClasses.asterisk}`]: {
                visibility: "hidden",
              },
            }}
          >
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography level="h3">Forgot password</Typography>
                <Typography level="body-sm">
                  New to company?{" "}
                  <Link href={{ pathname: "/signup" }}>Sign up!</Link>
                </Typography>
                {/* <Typography level="body-sm">
                  Are you a verified user?{" "}
                  <Link href={{ pathname: "/verify" }}>Verify here!</Link>
                </Typography> */}
              </Stack>

              {/* <Button
                variant="soft"
                color="neutral"
                fullWidth
                startDecorator={<GoogleIcon />}
              >
                Continue with Google
              </Button> */}
            </Stack>
            {/* <Divider
              sx={(theme) => ({
                [theme.getColorSchemeSelector("light")]: {
                  color: { xs: "#FFF", md: "text.tertiary" },
                  "--Divider-lineColor": {
                    xs: "#FFF",
                    md: "var(--joy-palette-divider)",
                  },
                },
              })}
            >
              or
            </Divider> */}
            <Stack gap={4} sx={{ mt: 2 }}>
              <Typography>
                {mode === "verify"
                  ? "An confirmation code will be sent to you via email !"
                  : "Please enter the confirmation code below to reset your password."}
              </Typography>
              <form
                onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                  event.preventDefault();
                  mode === "verify" && forgotPassword();
                  mode === "changePassword" && changePassword();
                  mode === "verify" ? setMode("changePassword") : null;
                  //   login();
                  // const formElements = event.currentTarget.elements;
                  // const data = {
                  //   email: formElements.email.value,
                  //   password: formElements.password.value,
                  //   persistent: formElements.persistent.checked,
                  // };
                  // alert(JSON.stringify(data, null, 2));
                }}
              >
                {mode === "verify" && (
                  <FormControl required>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      value={emailValue}
                      onChange={(e) => setEmailValue(e.target.value)}
                    />
                  </FormControl>
                )}
                {mode === "changePassword" && (
                  <>
                    <FormHelperText sx={{ color: "red" }}>
                      {errorMessage}
                    </FormHelperText>
                    <FormControl required>
                      <FormLabel>Confirmation code</FormLabel>
                      <Input
                        type="default"
                        name="confirmation code"
                        value={confirmCode}
                        onChange={(event) => setConfirmCode(event.target.value)}
                      />
                    </FormControl>

                    <FormControl required>
                      <FormLabel>Enter password</FormLabel>
                      <Input
                        type="password"
                        name="password"
                        value={passwordValue}
                        onChange={(e) => setPasswordValue(e.target.value)}
                      />
                    </FormControl>
                    <FormControl required>
                      <FormLabel>Re-Enter password</FormLabel>
                      <Input
                        type="password"
                        name="password"
                        value={confirmPasswordValue}
                        onChange={(e) =>
                          setConfirmPasswordValue(e.target.value)
                        }
                      />
                    </FormControl>
                  </>
                )}
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {/* <Checkbox size="sm" label="Remember me" name="persistent" /> */}
                    {/* <Link href={{ pathname: "/signup" }}>
                      Forgot your password?
                    </Link> */}
                  </Box>
                  {mode === "verify" && (
                    <Button type="submit" fullWidth>
                      Send Verifiction Code
                    </Button>
                  )}
                  {mode === "changePassword" && (
                    <Button
                      type="submit"
                      fullWidth
                      disabled={
                        !isPasswordMatch ||
                        passwordValue === "" ||
                        confirmPasswordValue === ""
                      }
                    >
                      Change Password
                    </Button>
                  )}
                </Stack>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © Your company {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: "clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))",
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage:
              "url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)",
          },
        })}
      />
    </CssVarsProvider>
  );
}
