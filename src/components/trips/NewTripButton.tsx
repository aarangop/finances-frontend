"use client";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewTripButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonIcon, setButtonIcon] = useState<React.ReactNode>(<ExpandMore />);
  const router = useRouter();

  // Update the button icon based on the menu state.
  useEffect(() => {
    setButtonIcon(!isOpen ? <ExpandMore /> : <ExpandLess />);
  }, [isOpen]);

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    setIsOpen(false);
    const button = event.currentTarget as HTMLElement;
    const tripType = button.textContent?.toLowerCase();
    switch (tripType) {
      case "car":
        router.push("/trips/car/new");
        break;
      default:
        return;
    }
    console.log(tripType);
  };

  return (
    <Box>
      <Menu open={isOpen}>
        <MenuItem onClick={handleClose}>Car</MenuItem>
        <MenuItem onClick={handleClose} disabled>
          Plane
        </MenuItem>
      </Menu>
      <Button
        endIcon={buttonIcon}
        onClick={() => setIsOpen(!isOpen)}
        variant="contained"
      >
        New Trip
      </Button>
    </Box>
  );
}
