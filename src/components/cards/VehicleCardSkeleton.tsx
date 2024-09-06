"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";

export default function VehicleCardSkeleton() {
  const theme = useTheme();
  return (
    <Card>
      <CardHeader
        title={
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Skeleton variant="text" width="50%" />
            <Skeleton variant="circular" width={20} height={20} />
          </Box>
        }
        subheader={<Skeleton variant="text" width="50%" />}
      />
      <CardContent>
        <Grid container gap={2}>
          <Grid item sm={12}>
            <Box
              display="flex"
              flexDirection="row"
              gap={1}
              justifyContent="space-between"
            >
              <Box display="flex" flexDirection="column">
                <Typography variant="body2" color={theme.palette.grey[600]}>
                  License Plate
                </Typography>
                <Skeleton variant="text" width="100%" />
              </Box>
              <Box display="flex" flexDirection="column">
                <Typography variant="body2" color={theme.palette.grey[600]}>
                  Color
                </Typography>
                <Skeleton variant="rounded" width={50} height={20} />
              </Box>
            </Box>
          </Grid>
          <Grid item sm={12} md={6}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body2" color={theme.palette.grey[600]}>
                Odometer Stand
              </Typography>
              <Skeleton variant="text" width="100%" />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Box width="100%" display="flex" flexDirection="row">
          <Box flexGrow={1}>
            <Button size="small" color="primary">
              View
            </Button>
          </Box>
          <IconButton color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
}
