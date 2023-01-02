import {
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import { COLORS } from "../../Utility/Constants/Colors";
import { POSITION_TYPE } from "../../Utility/Constants/PositionType";
import DoneIcon from "@mui/icons-material/Done";
import { Helpers } from "../../Utility/Helpers";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

export default function AdvertCard({
  title,
  description,
  positions,
  type,
  city,
  dateTime,
  user
}) {
  const isMdDown = Helpers.useMediaQuery("down", "md");
  return (
    <>
      <Card sx={{ background: COLORS.ADVERT_OPACITY02,boxShadow:10,marginBottom:2 }}>
        <CardContent>
          <Chip
            sx={{ fontSize: 35, border: 2, padding: 3,color:"white" }}
            color="success"
            label={`${title}`}
            variant={"filled"}
          />
        </CardContent>
       {type !== "OPPONENT" && <CardContent sx={{ marginY: -2 }}>
          <Grid container item md={12}>
            <Grid
              container
              item
              md={6}
              justifyContent={!isMdDown ? "flex-end" : "center"}
            >
              <Typography
                marginBottom={1}
                marginRight={!isMdDown && 2}
                fontWeight={"bold"}
              >
                Aranan pozisyonlar
              </Typography>
            </Grid>
            <Grid
              justifyContent={!isMdDown ? "flex-start" : "center"}
              item
              container
              direction={"row"}
              gap={1}
              md={6}
            >
              {positions?.map((e) => {
                return (
                  <Chip
                    key={e?.id}
                    color="success"
                    label={`${POSITION_TYPE[e.positionName]}`}
                    icon={positions.includes(e?.id) ? <DoneIcon /> : null}
                    variant={"filled"}
                  />
                );
              })}
            </Grid>
          </Grid>
        </CardContent>}
        <CardContent sx={{ marginY: -2 }}>
          <Grid container item md={12}>
            <Grid
              container
              item
              md={6}
              justifyContent={!isMdDown ? "flex-end" : "center"}
            >
              <Typography
                marginBottom={1}
                marginRight={!isMdDown && 2}
                fontWeight={"bold"}
              >
                İlanın konumu
              </Typography>
            </Grid>
            <Grid
              justifyContent={!isMdDown ? "flex-start" : "center"}
              item
              container
              direction={"row"}
              gap={1}
              md={6}
            >
              <LocationOnOutlinedIcon color="success" fontSize="medium" />
              <Typography>{city.cityName}</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardContent sx={{ marginY: -2 }}>
          <Grid container item md={12}>
            <Grid
              container
              item
              md={6}
              justifyContent={!isMdDown ? "flex-end" : "center"}
            >
              <Typography
                marginBottom={1}
                marginRight={!isMdDown && 2}
                fontWeight={"bold"}
              >
                Maç Tarihi
              </Typography>
            </Grid>
            <Grid
              justifyContent={!isMdDown ? "flex-start" : "center"}
              item
              container
              direction={"row"}
              gap={1}
              md={6}
            >
              <CalendarMonthOutlinedIcon color="success" fontSize="medium" />
              <Typography>
                {Helpers.Date(dateTime, "DD.MM.YYYY HH:00")}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardContent>
          <Typography  >
          {description}
          </Typography>
        </CardContent>
        <Grid sx={{position:"relative", right:"5%",bottom:"20px",marginTop:1}} textAlign={"end"}>
          <Chip  color="success" variant="outlined" label={`${user?.telephoneNumber}`} />
        </Grid>
      </Card>
    </>
  );
}
