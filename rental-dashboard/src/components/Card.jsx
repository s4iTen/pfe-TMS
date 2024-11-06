import React from "react";
import {
  Card as MUICard,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  CardActions,
  useTheme,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BedIcon from "@mui/icons-material/Bed";
import BathroomIcon from "@mui/icons-material/Bathroom";
const CustomCard = ({
  type,
  data,
  onEdit,
  onDelete,
  onContact,
  handleClick,
  ButtonText,
  approveButton,
  declineButton,
  handleApprove,
  handleDecline,
}) => {
  const theme = useTheme();

  switch (type) {
    case "property":
      return (
        <MUICard
          sx={{
            backgroundColor: theme.palette.background.default,
            borderRadius: 2,
            boxShadow: "none",
          }}
        >
          <CardMedia
            component="img"
            height="140"
            src={`data:image/png;base64,${data.photos[0]}`}
            alt={data.title}
          />
          <CardContent sx={{ p: 2 }}>
            <Typography variant="h6" component="div">
              {data.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <BathroomIcon fontSize="small" />
              <Typography variant="body2">
                {data.bathrooms} bathrooms
              </Typography>
              <BedIcon fontSize="small" />
              <Typography variant="body2">{data.bedrooms} bedrooms</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {data.description.length > 100
                ? `${data.description.slice(0, 100)}...`
                : data.description}
            </Typography>
          </CardContent>
          <CardActions
            sx={{ display: "flex", justifyContent: "space-between", p: 2 }}
          >
            <Button
              variant="contained"
              onClick={() => handleClick(data._id)}
              color="primary"
            >
              Show More
            </Button>
            <div>
              {onEdit && (
                <IconButton onClick={() => onEdit(data._id)} color="primary">
                  <EditIcon />
                </IconButton>
              )}
              {onDelete && (
                <IconButton onClick={() => onDelete(data._id)} color="error">
                  <DeleteIcon />
                </IconButton>
              )}
            </div>
          </CardActions>
        </MUICard>
      );

    case "tenant":
      return (
        <MUICard
          sx={{
            backgroundColor: theme.palette.background.default,
            maxWidth: 345,
            p: 2,
            borderRadius: 2,
            boxShadow: 3,
            textAlign: "center",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: 128,
              height: 128,
              objectFit: "cover",
              borderRadius: "50%",
              mx: "auto",
              my: 2,
            }}
            src={`data:image/png;base64,${data.image[0]}`}
            alt={data.fullName}
          />
          <CardContent>
            <Typography variant="h6" component="div">
              {data.fullName}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: 1,
              }}
            >
              {data.job}
            </Typography>
            <Box>
              <Typography variant="body2">
                <strong>Phone:</strong> {data.tel}
              </Typography>
              <Typography variant="body2">
                <strong>Email:</strong> {data.email}
              </Typography>
            </Box>
          </CardContent>
          {ButtonText && (
            <Button
              variant="contained"
              onClick={onContact}
              sx={{
                mt: 2,
                px: 4,
                py: 1,
                borderRadius: 2,
              }}
            >
              {ButtonText}
            </Button>
          )}
        </MUICard>
      );

    case "rent":
      return (
        <MUICard
          sx={{
            backgroundColor: theme.palette.background.default,
            borderRadius: 2,
            boxShadow: "none",
          }}
        >
          <CardMedia
            component="img"
            height="140"
            src={`data:image/png;base64,${data.propertyImage}`}
            alt={data.property}
          />
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography variant="h6" component="div">
                {data.property || "Unknown Property"}
              </Typography>
            </Box>
            <Typography variant="body1">
              Owner: {data.userOwner || "N/A"}
            </Typography>
            <Typography variant="body1">
              Renter: {data.userRent || "N/A"}
            </Typography>
            <Typography sx={{ mt: 0.3 }} variant="body2" color="text.secondary">
              Start Date: {new Date(data.startDate).toLocaleDateString()}
            </Typography>
            <Typography sx={{ mt: 0.3 }} variant="body2" color="text.secondary">
              End Date: {new Date(data.endDate).toLocaleDateString()}
            </Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>
              Total Price: ${data.totalPrice.toFixed(2)}
            </Typography>
            <Button onClick={() => handleClick(data._id)} variant="contained">
              Request Maintenance
            </Button>
          </CardContent>
        </MUICard>
      );

    case "expense":
      return (
        <MUICard
          sx={{
            backgroundColor: theme.palette.background.default,
            p: 2,
            borderRadius: 2,
            boxShadow: "none",
            textAlign: "left",
          }}
        >
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography variant="h6" component="div">
                {data.propertyTitle}
              </Typography>
            </Box>
            <Typography variant="body1">{data.ownerName}</Typography>
            <Typography sx={{ mt: 0.3 }} variant="body2" color="text.secondary">
              {data.message}
            </Typography>
            {data.price && (
              <Typography variant="h6" sx={{ mt: 1 }}>
                ${data.price.toFixed(2)}
              </Typography>
            )}
            <div className="flex items-center justify-start gap-4 mt-2">
              {approveButton && (
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleApprove(data._id)}
                >
                  {approveButton}
                </Button>
              )}
              {declineButton && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDecline(data._id)}
                >
                  {declineButton}
                </Button>
              )}
              {ButtonText && (
                <Button
                  variant="contained"
                  onClick={() => handleClick(data._id)}
                >
                  {ButtonText}
                </Button>
              )}
            </div>
          </CardContent>
        </MUICard>
      );
    default:
      return null;
  }
};

export default CustomCard;
