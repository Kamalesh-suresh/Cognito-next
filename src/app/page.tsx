/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Avatar, Button, Stack, Typography } from "@mui/joy";
import Image from "next/image";
import { MyProvider } from "./contexts/appContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Amplify, Auth } from "aws-amplify";
import Box from "@mui/joy/Box";
import Landing from "./home";
import awsconfig from "../aws-exports";

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

export default function Home() {
  const router = useRouter();
  const user = false;
  const [userDetails, setUserDetails] = useState<UserDetails>({});

  interface UserDetails {
    email?: string;
  }

  function redirectToLogin() {
    router.push("/login");
  }

  function handleSignout() {
    Auth.signOut()
      .then(() => {
        // localStorage.setItem("AUTH_ACCESS_TOKEN", null);
        // localStorage.setItem("AUTH_ID_TOKEN", null);
        // window.localStorage.setItem("path", null);
        router.push("/login");
      })
      .catch(() => {
        console.log("Error signing out");
      });
  }

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) => {
      console.log("user:", user?.attributes);
      setUserDetails(user?.attributes);
      if (!user?.attributes?.email) {
        console.log("Redirecting to login...");
        router.push("/login");
      }
      // const res =
      //   user?.attributes?.given_name ||
      //   user?.attributes?.family_name ||
      //   user?.attributes?.email;
      // setAvatarNameTooltip(res?.charAt(0)?.toUpperCase() + res?.slice(1));
      // const initial = res?.charAt(0)?.toUpperCase();
      // setAvatar(initial);
      // const pictureAttribute = user?.attributes?.picture;
      // setPicture(pictureAttribute);
    });
  }, []);

  return (
    <>
      <MyProvider>
        <Box
          sx={{
            background: "rgb(11, 107, 203)",
            height: "10vh",
            width: "100vw",
            padding: 0,
            margin: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Stack
            mr={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Typography sx={{ color: "white" }}>
              Welcome 🎉 , {userDetails?.email ? userDetails?.email : "Guest"}{" "}
            </Typography>
            <Avatar>{userDetails?.email?.slice(0, 1).toUpperCase()}</Avatar>
            <Button
              sx={{ zIndex: 15 }}
              color="neutral"
              onClick={() =>
                userDetails?.email ? handleSignout() : redirectToLogin()
              }
            >
              {userDetails?.email ? "Logout" : "Login"}
            </Button>
          </Stack>
        </Box>
        <Typography mt={4} ml={4} sx={{ fontSize: "22px" }}>
          Hi Welcome to cognito auth app
        </Typography>
        <Landing />
      </MyProvider>
    </>
  );
}
