import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";

const PropertyComponent = ({ property, ButtonText, handleClick }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box>
      <Grid container spacing={isSmallScreen ? 2 : 4}>
        <Grid item xs={12} md={6}>
          <img
            src={`data:image/png;base64,${property.photos[0]}`}
            alt={property.title}
            style={{
              width: "100%",
              height: isSmallScreen ? "auto" : "50vh",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
          <Grid container spacing={2} mt={2}>
            {property.photos.map((img, idx) => (
              <Grid item xs={6} sm={3} key={idx}>
                <img
                  src={`data:image/png;base64,${img}`}
                  alt=""
                  style={{
                    width: "100%",
                    height: "13vh",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant={isSmallScreen ? "h5" : "h4"} gutterBottom>
            {property.title}
          </Typography>
          <Typography variant="body1">{property.description}</Typography>

          <Box mt={4}>
            <Typography variant="body2">
              <strong>Bedrooms:</strong> {property.bedrooms}
            </Typography>
            <Typography variant="body2">
              <strong>Bathrooms:</strong> {property.bathrooms}
            </Typography>
            <Typography variant="body2">
              <strong>Daily Rent:</strong> ${property.rent}
            </Typography>
            <Typography variant="body2">
              <strong>Address:</strong> {property.adress}
            </Typography>
            {ButtonText && (
              <Button
                sx={{ mt: 2, color: "white" }}
                variant="contained"
                onClick={() => handleClick(property._id)}
                color="primary"
              >
                {ButtonText}
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PropertyComponent;
