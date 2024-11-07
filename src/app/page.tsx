"use client";

import Main from "@/components/layout/Main";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import FlightIcon from "@mui/icons-material/Flight";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

const sections = [
  {
    title: "Finances",
    description: "Manage your finances",
    link: "/finances",
    icon: <AttachMoneyIcon />,
  },
  {
    title: "Trips",
    description: "Plan your trips",
    link: "/trips",
    icon: <FlightIcon />,
  },
  {
    title: "Vehicles",
    description: "Manage your vehicles",
    link: "/vehicles",
    icon: <DirectionsCarIcon />,
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <Main>
      <Grid
        container
        spacing={3}
        sx={{
          p: { sm: 1, md: 4 },
        }}
      >
        {sections.map((section, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card>
              <CardActionArea onClick={() => router.push(section.link)}>
                <CardContent>
                  {section.icon}
                  <Typography variant="h5" component="div">
                    {section.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {section.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Main>
  );
}
