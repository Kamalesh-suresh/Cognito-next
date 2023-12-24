"use client";

import { Typography } from "@mui/joy";
import Image from "next/image";
import { MyProvider } from "./contexts/appContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Landing from "./home";

export default function Home() {
  const router = useRouter();
  const user = false;

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      {user ? (
        <MyProvider>
          <Typography>Hi Welcome to cognito auth app</Typography>
          <Landing />
        </MyProvider>
      ) : (
        <Typography>Please login to continue</Typography>
      )}
    </>
  );
}
