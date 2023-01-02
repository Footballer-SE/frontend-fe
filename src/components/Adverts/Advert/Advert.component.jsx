import React, { Suspense, useEffect, useState } from "react";
import AdvertService from "../../Services/Advert/Advert.service";
import { ADVERT_TRANSLATE } from "../../Utility/Constants/AdvertType";
import { Avatar, Box, Chip, Grid, Paper, Stack, Typography } from "@mui/material";
import CityService from "../../Services/City/City.service";
import PositionService from "../../Services/Position/Position.service";
import { Helpers } from "../../Utility/Helpers";
import { useSnackbar } from "notistack";
import AdvertFilter from "./AdvertFilter.component";
import { styled } from "@mui/system";
import { COLORS } from "../../Utility/Constants/Colors";
import TeamService from "../../Services/Team/Team.service";
import SwipeableViews from "react-swipeable-views";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DialogContext from "../../Store/Dialog.context";
import { DialogIcon } from "../../Utility/Constants/Dialog";

const LazyCard = React.lazy(() => import("./AdvertCard.component"));

export default function Advert() {
  const [page, setPage] = useState(1);
  const [allAdverts, setAllAdverts] = useState([]);
  const [adverts, setAdverts] = useState([]);
  const [filterCity, setFilterCity] = useState();
  const dialogContext = React.useContext(DialogContext);

  const [filterPosition, setFilterPosition] = useState();
  const [typeFilter, setTypeFilter] = useState();
  const [allTeam, setAllTeam] = useState([])
  const [allPositions, setAllPositions] = useState();
  const [chipPosition, setChipPosition] = useState({});
  const [clicked, setClicked] = useState(false);
  const [allCities, setAllCities] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const isMdDown = Helpers.useMediaQuery("down", "md");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AdvertService.GetAllAdverts();
        setAllAdverts(response.data);
        setAdverts(response.data);
      } catch (error) {
        console.log("Error fetching adverts:", error);
      }
    };
    fetchData();
  }, []);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const cityResponse = await CityService.GetAllCity();
        setAllCities(cityResponse.data);
        const positionResponse = await PositionService.GetAllPositions();
        setAllPositions(positionResponse.data);
        const teamResponse = await TeamService.GetAllTeam();
        setAllTeam(teamResponse.data);
      } catch (error) {
        enqueueSnackbar(
          error?.response?.data ||
            "Bir sorunla karşılaştık. Daha sonra tekrar deneyiniz.",
          { variant: "error" }
        );
        console.log("Error fetching cities and positions:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filteredAdverts = allAdverts;

    if (filterCity) {
      filteredAdverts = filteredAdverts.filter(
        (advert) => advert.city.cityId === filterCity
      );
    }
    if (typeFilter) {
      filteredAdverts = filteredAdverts.filter(
        (advert) => advert.advertType === typeFilter
      );
    }
    if (filterPosition) {
      filteredAdverts = filteredAdverts.filter((advert) => {
        return advert.positions.some(
          (position) => position.id === filterPosition
        );
      });
    }

    setAdverts(filteredAdverts);
  }, [filterCity, filterPosition, allAdverts, typeFilter]);

  function handleAvatarClick(team) {
    if (!user.isLoggedIn) {
      dialogContext.setDialog({
        modalOpen: true,
       
        icon: DialogIcon.info,
        title: "Uyarı",
        description:
          `Önce giriş yapmalısınız`,
        primaryButtonText: "Tamam",
      });
    } else {
      navigate(`/user?id=${team.user.id}`)  
      }
  }
  useEffect(() => {
    const chip = document.querySelector(".chip-class");
    if (chip) {
      setChipPosition({
        top: chip.offsetTop + chip.offsetHeight,
        left: chip.offsetLeft + chip.offsetWidth / 2,
      });
    }
  }, []);

  const StyledPaper = styled(Paper)({
    position: "absolute",
    zIndex: 1,
    border: `1px solid ${COLORS.MAIN_GREEN}`,
    borderRadius: "15px",
    padding: "10px",
    top: chipPosition.top,
    left: chipPosition.left,
    transform: "translateX(-50%)",
  });


  function showPaper() {
    return (
      <StyledPaper>
        <AdvertFilter
          filterCity={filterCity}
          setFilterCity={setFilterCity}
          allCities={allCities}
          filterPosition={filterPosition}
          setFilterPosition={setFilterPosition}
          allPositions={allPositions}
          setTypeFilter={setTypeFilter}
          typeFilter={typeFilter}
        />
      </StyledPaper>
    );
  }
  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    const scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Grid container item md={12}>
      {/** filter */}
      {!isMdDown ? (
        <AdvertFilter
          filterCity={filterCity}
          setFilterCity={setFilterCity}
          allCities={allCities}
          filterPosition={filterPosition}
          setFilterPosition={setFilterPosition}
          allPositions={allPositions}
          setTypeFilter={setTypeFilter}
          typeFilter={typeFilter}
        />
      ) : (
        <Grid
          item
          xs={12}
          sx={{
            marginY: -1,
            paddingBottom: 1,
          }}
        >
  <Stack mt={2} sx={{ overflowX: "scroll", padding: "5px" }} direction={"row"}>
  {Array.isArray(allTeam) &&
    allTeam.length > 0 &&
    allTeam.map((team) => {
      return (
        <Box
          key={team.id}
          maxWidth={"77px"}
          flexWrap={"wrap"}
          mr={1}
        >
          <Avatar
            onClick={()=>handleAvatarClick(team)}
            sx={{ width: "64px", height: "64px",boxShadow:10}}
            src={team?.avatarImageResponse?.url}
          ></Avatar>
          <Typography
            variant="body2"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {team.footballTeamName}
          </Typography>
        </Box>
      );
    })}
</Stack>
          <Chip
            className="chip-class"
            sx={{ fontSize: 20, border: 2, boxShadow: 10 }}
            color="success"
            onClick={() => setClicked(!clicked)}
            label={`Filtrele`}
            variant={"outlined"}
          />
        </Grid>
      )}
      {clicked && showPaper()}
      {/** filter */}
      <Grid item xs={12} sx={{ marginTop: 2 }} md={6}>
        {adverts
          .sort((a, b) => b.advertId - a.advertId)
          .slice(0, page * 10)
          .map((advert, index) => (
            <Suspense key={index} fallback={<div>Loading...</div>}>
              {advert.isActive && (
                <LazyCard
                  key={advert.id}
                  dateTime={advert.dateTime}
                  type={advert?.advertType}
                  title={`${ADVERT_TRANSLATE[advert.advertType]} ilanı`}
                  city={advert.city}
                  user={advert?.user}
                  positions={advert.positions}
                  description={
                    advert.description
                      ? advert.description
                      : "Açıklama girilmemiş..."
                  }
                />
              )}
            </Suspense>
          ))}
      </Grid>
      <Grid item md={0.2}></Grid>
      {!isMdDown && (
        <Grid item md={2.6}>
          <Chip
            sx={{ fontSize: 25, border: 2, padding: 3 }}
            color="success"
            label={`Takımlar`}
            variant={"outlined"}
          />
          <Stack
            mt={2}
            sx={{ overflowY: "scroll", padding: "5px" }}
            borderRadius={"5px"}
            border={`1px solid ${COLORS.MAIN_GREEN}`}
            maxHeight={"calc(70px * 3)"}
            flexWrap={"wrap"}
            direction={"row"}
          >
            {Array.isArray(allTeam) &&
              allTeam.length > 0 &&
              allTeam.map((team) => {
                return (
                  <Box
                    key={team.id}
                    maxWidth={"77px"}
                    overflow="hidden"
                    flexWrap={"wrap"}
                  >
                    <Avatar
                                onClick={()=>handleAvatarClick(team)}

                      sx={{ width: "64px", height: "64px",
                    cursor:"pointer" }}
                      src={team?.avatarImageResponse?.url}
                    ></Avatar>
                    <Typography
                      variant="body2"
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {team.footballTeamName}
                    </Typography>
                  </Box>
                );
              })}
          </Stack>
        </Grid>
      )}
    </Grid>
  );
}
