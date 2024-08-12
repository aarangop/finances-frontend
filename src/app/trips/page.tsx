import Main from "@/components/Main";
import { Box, Button, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import AddIcon from "@mui/icons-material/Add";

export default function RoadtripsPage() {
  return (
    <Main>
      <Container>
        <Typography variant="h5">Trips</Typography>
        <Box>Table</Box>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          LinkComponent={NextLink}
          href="/trips/new"
          sx={{ bottom: "1rem", position: "absolute" }}
        >
          New Trip
        </Button>
      </Container>
    </Main>
  );
}
