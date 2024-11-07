import type { Metadata } from "next";
import { Inter } from "next/font/google";

import NavBar from "@/components/navbar/NavBar";
import Providers from "@/components/providers/Providers";
import { Box, CssBaseline } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Personal Finances",
  description: "By andresap.me",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body className={inter.className}>
        <Providers>
          <CssBaseline>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <NavBar />
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  mt: 8, // Space for NavBar
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {children}
              </Box>
            </Box>
          </CssBaseline>
        </Providers>
      </body>
    </html>
  );
}
