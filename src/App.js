import "./App.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

// TODO componentlara ayır app.js boşalt
function App() {
  const [value, setValue] = React.useState("1");
  const [footballers, setFootballers] = React.useState([]);
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  async function getFootballers() {
    let url;
    if (value === "1") {
      url = "https:/footballerapi.herokuapp.com/allFootballers";
    } else if (value === "2") {
      url = "https:/footballerapi.herokuapp.com/allTeams";
    }

    const result = await fetch(url);
    if (result.ok) {
      const data = await result.json();
      setFootballers(data);
      console.log("Xd", data);
    }
  }
  React.useEffect(() => {
    setFootballers([]);

    getFootballers();
  }, [value]);

  const handleChange = async (event, newValue) => {
    setValue(newValue);
  };
  const renderCard = (footballer) => {
    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography>
            {bull} ID {footballer.id}
          </Typography>
          <Typography>
            {bull} Name {footballer.name}
          </Typography>
          <Typography>
            {bull} Surname {footballer.surname}
          </Typography>
          <Typography>
            {bull} E-mail: {footballer.email}
          </Typography>
        </CardContent>
      </Card>
    );
  };
  const renderCard2 = (footballer) => {
    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography>
            {bull} ID: {footballer.id}
          </Typography>
          <Typography>
            {bull} TeamName: {footballer.name}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            centered
            textColor="secondary"
            indicatorColor="secondary"
            onChange={handleChange}
          >
            <Tab label="Footballers" value="1" />
            <Tab label="Teams" value="2" />
          </TabList>
        </Box>
        <TabPanel value={value === "1" ? "1" : "2"}>
          <Grid container spacing={2}>
            {footballers.map((footballer) => {
              return (
                <Grid item xs={12} sm={6} md={4}>
                  {value === "1"
                    ? renderCard(footballer)
                    : renderCard2(footballer)}
                </Grid>
              );
            })}
          </Grid>
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default App;
