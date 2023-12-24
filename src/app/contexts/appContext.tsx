"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type ContextData = {
  data: string;
  setData: (data: string) => void;
};

const MyContext = createContext<ContextData | undefined>(undefined);

type MyProviderProps = {
  children: ReactNode;
};

export function MyProvider({ children }: MyProviderProps) {
  const [data, setData] = useState("Shared data across Home page components");

  return (
    <MyContext.Provider value={{ data, setData }}>
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
}
