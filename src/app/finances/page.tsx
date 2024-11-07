"use client";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaymentsIcon from "@mui/icons-material/Payments";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function FinancesPage() {
  const router = useRouter();

  const navigationCards = [
    {
      title: "Accounts",
      icon: <AccountBalanceIcon sx={{ fontSize: 40 }} />,
      path: "/finances/accounts",
    },
    {
      title: "Expenses",
      icon: <PaymentsIcon sx={{ fontSize: 40 }} />,
      path: "/finances/expenses",
    },
    {
      title: "Portfolio",
      icon: <ShowChartIcon sx={{ fontSize: 40 }} />,
      path: "/finances/portfolio",
    },
    {
      title: "Dashboard",
      icon: <DashboardIcon sx={{ fontSize: 40 }} />,
      path: "/finances/dashboard",
    },
  ];

  return (
    <>
      <Typography variant="h4" mb={4}>
        My Finances
      </Typography>
      <Grid container spacing={3}>
        {navigationCards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.title}>
            <Card sx={{ height: "100%" }}>
              <CardActionArea
                onClick={() => router.push(card.path)}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Box mb={2}>{card.icon}</Box>
                  <Typography variant="h6">{card.title}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
