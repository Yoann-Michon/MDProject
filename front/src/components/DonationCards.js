import React from "react";
import { Box, Typography, Container, Card, CardContent, Grid } from "@mui/material";
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Diversity3Icon from '@mui/icons-material/Diversity3';

const donationData = [
  {
    title: "Lever de Fonds",
    description: "Contribuez à nos campagnes de lever de fonds pour soutenir divers projets humanitaires.",
    icon: <VolunteerActivismIcon sx={{ fontSize: 80 ,color: 'success.main'}} />,
  },
  {
    title: "Colis de Nourriture",
    description: "Aidez-nous à distribuer des colis de nourriture aux familles dans le besoin.",
    icon: <RestaurantIcon sx={{ fontSize: 80 ,color: 'success.main'}} />,
  },
  {
    title: "Volontaire",
    description: "Rejoignez-nous en tant que volontaire et participez activement à nos actions humanitaires.",
    icon: <Diversity3Icon sx={{ fontSize: 80 ,color: 'success.main'}} />,
  },
];

const DonationCards = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "400px" }}>
        <div style={{ height: "250px", backgroundColor: "#4CAF50" , width:"100%"}}>
          <Container>
            <Typography variant="h4" align="center" gutterBottom sx={{ mt: 2, mb: 2, color: "#FFFFFF" ,pt: 3}}>
              Nous sommes une ONG caritative à but non lucratif.
            </Typography>
          </Container>
        </div>
        <Container>
          <Grid container spacing={4} justifyContent="center" style={{ marginTop: "-150px" }}>
            {donationData.map((donation, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", borderRadius: "12px" }}>
                  <Box sx={{ my: 2 }}>
                    {donation.icon}
                  </Box>
                  <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                    <Typography variant="h5" component="div">
                      {donation.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {donation.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
  );
};

export default DonationCards;
