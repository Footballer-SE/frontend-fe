import React, { Suspense, useEffect, useState } from "react";
import AdvertService from "../../Services/Advert/Advert.service";
import { ADVERT_TRANSLATE } from "../../Utility/Constants/AdvertType";
import { Chip, Grid, Paper } from "@mui/material";
import CityService from "../../Services/City/City.service";
import PositionService from "../../Services/Position/Position.service";
import { Helpers } from "../../Utility/Helpers";
import { useSnackbar } from "notistack";
import AdvertFilter from "./AdvertFilter.component";
import { styled } from "@mui/system";
import { COLORS } from "../../Utility/Constants/Colors";

const LazyCard = React.lazy(() => import("./AdvertCard.component"));

export default function Advert() {
  const [page, setPage] = useState(1);
  const [adverts, setAdverts] = useState([]);
  const [filterCity, setFilterCity] = useState();
  const [filterPosition, setFilterPosition] = useState();
  const [allPositions, setAllPositions] = useState();
  const [chipPosition, setChipPosition] = useState({});
  const [clicked, setClicked] = useState(false);
  const [allCities, setAllCities] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const isMdDown = Helpers.useMediaQuery("down", "md");
  const headers = Helpers.useHeader();

  async function initialSomeData() {
    try {
      const cityResult = await CityService.GetAllCity(headers);
      setAllCities(cityResult.data);
      const positionResult = await PositionService.GetAllPositions(headers);
      setAllPositions(positionResult.data);
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data ||
          "Bir sorunla karşılaştık. Daha sonra tekrar deneyiniz.",
        { variant: "error" }
      );
      console.log("Err:", error);
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
  // TODO BETTER FILTER
  async function loadData() {
    try {
      const response = await AdvertService.GetAllAdverts();

      if (filterCity) {
        setAdverts(
          [...response.data].filter((e) => e.city.cityId === filterCity)
        );
        return
      }

      if (filterPosition) {
        setAdverts(
          [...response.data].filter((item) => {
            return item.positions.some(
              (position) => position.id === filterPosition
            );
          })
        );
        return
      }

        setAdverts([...response.data]);
      
    } catch (error) {
      console.log("Err:", error);
    }
  }

  const StyledPaper = styled(Paper)({
    position: "absolute",
    zIndex: 1,
    border: `1px solid ${COLORS.MAIN_GREEN}`,
    borderRadius: "20px",
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
        />
      </StyledPaper>
    );
  }

  useEffect(() => {
    loadData();
  }, [filterCity, filterPosition]);

  useEffect(() => {
    initialSomeData();
  }, []);

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
        />
      ) : (
        <Grid
          item
          xs={12}
          sx={{
            marginY: -1,
            paddingBottom: 1,
            borderBottom: "1px solid black",
          }}
        >
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
      <Grid item xs={12} md={6}>
        {adverts
          .sort((a, b) => b.advertId - a.advertId)
          .slice(0, page * 10)
          .map((advert) => (
            <Suspense key={advert.id} fallback={<div>Loading...</div>}>
              {advert.isActive && (
                <LazyCard
                  key={advert.id}
                  dateTime={advert.dateTime}
                  title={`${ADVERT_TRANSLATE[advert.advertType]} ilanı`}
                  city={advert.city}
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
      <Grid item md={3}></Grid>
    </Grid>
  );
}
