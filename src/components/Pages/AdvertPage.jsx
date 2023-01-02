import { useLocation, useNavigate } from "react-router-dom";
import CityService from "../Services/City/City.service";
import {
  Button,
  Card,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Helpers } from "../Utility/Helpers";
import { useContext, useEffect, useState } from "react";
import PositionService from "../Services/Position/Position.service";
import DoneIcon from "@mui/icons-material/Done";
import { POSITION_TYPE } from "../Utility/Constants/PositionType";
import DialogContext from "../Store/Dialog.context";
import { DialogIcon } from "../Utility/Constants/Dialog";
import AdvertService from "../Services/Advert/Advert.service";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { ADVERT_TRANSLATE } from "../Utility/Constants/AdvertType";

const AdvertPage = () => {
  const isMdDown = Helpers.useMediaQuery("down", "md");
  const style = {
    root: {
      width: "250px",
      "label:not(.MuiFormLabel-filled)": {
        top: "-7px",
        "&.Mui-focused": {
          top: "0px",
        },
      },
    },
  };
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const advertType = params.get("type").toUpperCase();
  const headers = Helpers.useHeader();
  const navigater = useNavigate();
  const dialogContext = useContext(DialogContext);
  const [allCities, setAllCities] = useState();
  const [positions, setPositions] = useState([]);
  const [description, setDescription] = useState("");
  const [city, setCity] = useState();
  const [time, setTime] = useState("");
  const [allPositions, setAllPositions] = useState();
  const [createData, setCreateData] = useState();
  const { enqueueSnackbar } = useSnackbar();

  async function initialSomeData() {
    try {
      const cityResult = await CityService.GetAllCity();
      setAllCities(cityResult.data);
      const positionResult = await PositionService.GetAllPositions();
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

  const { data } = useSelector((state) => state.user);
  function handleTime(e) {
    let date = new Date(new Date(e.target.value).toISOString()).getTime();
    setTime(date);
  }
  useEffect(() => {
    const oneMonthFromNow = Date.now() + 30 * 24 * 60 * 60 * 1000;
    if ((time < Date.now() || time > oneMonthFromNow) && time) {
      dialogContext.setDialog({
        modalOpen: true,
        callback: () => {
          setTime(Date.now() + 30);
        },
        icon: DialogIcon.info,
        title: "Yanlış Tarih Seçimi",
        description: `Sadece şu an ile bir ay sonrası arasında seçim yapabilirsiniz.`,
        primaryButtonText: "Tamam",
      });
    }
  }, [time]);

  useEffect(() => {
    initialSomeData();
  }, []);

  function renderAdvert(type) {
    return (
      <>
        <Grid item container justifyContent={"center"}>
          <Typography
            fontWeight={"bold"}
            mb={1}
            variant="h4"
          >{`${ADVERT_TRANSLATE[advertType]} arama ilanı`}</Typography>
        </Grid>

        <Grid
          container
          item
          justifyContent={"space-evenly"}
          gap={3}
          direction={isMdDown ? "column" : "row"}
        >
          <Grid
            justifyContent={"center"}
            item
            container
            sx={{ maxWidth: "200px" }}
          >
            <FormControl sx={style.root} fullWidth>
              <InputLabel id="cities">Şehir Seçiniz</InputLabel>
              <Select
                labelId="cities"
                size="small"
                id="citiSelect"
                value={city ?? ""}
                label="Şehir Seçiniz"
                onChange={(e) => setCity(e?.target?.value)}
              >
                {allCities?.map((e) => {
                  return (
                    <MenuItem key={e?.cityId} value={e?.cityId}>
                      {e?.cityName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            justifyContent={"center"}
            item
            container
            sx={{ maxWidth: "200px" }}
          >
            <TextField
              id="datetime-local"
              label="Maç Saatini Seçiniz"
              type="datetime-local"
              onChange={handleTime}
              value={Helpers.Date(time, "YYYY-MM-DDTHH:mm") || ""}
              size="small"
              sx={{ width: 250 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
        {type !== "OPPONENT" && (
          <Grid container item direction={"column"} gap={2}>
            <Typography variant="h5">Pozisyon seçiniz</Typography>
            <Grid
              justifyContent={"center"}
              item
              container
              direction={"row"}
              gap={1}
            >
              {allPositions?.map((e) => {
                return (
                  <Chip
                    key={e?.id}
                    color="success"
                    onClick={(event) => handleChipClick(e?.id, event)}
                    label={`${POSITION_TYPE[e.positionName]}`}
                    icon={positions.includes(e?.id) ? <DoneIcon /> : null}
                    variant={positions.includes(e?.id) ? "filled" : "outlined"}
                  />
                );
              })}
            </Grid>
          </Grid>
        )}
        <Grid container item direction={"column"} gap={2}>
          <Typography variant="h5">Açıklama yazınız.</Typography>
          <Grid
            justifyContent={"center"}
            item
            container
            direction={"row"}
            gap={1}
          >
            <TextField
              sx={{ marginX: "10%" }}
              size={"small"}
              fullWidth
              multiline
              maxRows={2}
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></TextField>
          </Grid>
        </Grid>
      </>
    );
  }

  function handleChipClick(id, event) {
    if (positions.includes(id)) {
      setPositions(positions.filter((position) => position !== id));
      return;
    }
    setPositions([...positions, id]);
  }

  function handleCreateAdvert() {
    setCreateData({
      data: {
        dateTime: Helpers.Date(time),
        description: description,
        cityId: city,
        id: data.data.id,
        isActive: true,
        advertType: advertType,
        positionIds: positions,
      },
      sendData: true,
    });
  }
  function registerValidater() {
    let isValid = false;
    if (createData.data.cityId === undefined) {
      enqueueSnackbar("Şehir seçimi zorunludur!", { variant: "error" });
      return false;
    }
    if (createData.data.dateTime === undefined) {
      enqueueSnackbar("Tarih seçimi zorunludur!", { variant: "error" });
      return false;
    }
    if (
      advertType !== "OPPONENT" &&
      Array.isArray(createData.data.positionIds) &&
      !createData.data.positionIds.length > 0
    ) {
      enqueueSnackbar("Pozisyon seçimi zorunludur!", { variant: "error" });
      return false;
    }
    if (description && description.length > 100) {
      enqueueSnackbar("Açıklama 100 karakterden uzun olamaz", {
        variant: "error",
      });
      return false;
    }

    return (isValid = true);
  }
  async function CreateAdvert() {
    try {
      if (registerValidater()) {
        await AdvertService.CreateAdvert(createData.data, headers);
        dialogContext.setDialog({
          modalOpen: true,
          callback: () => {
            navigater("/", { replace: true });
          },
          icon: DialogIcon.success,
          title: "Başarılı",
          description: `İlanınız Başarıyla Oluşturuldu`,
          primaryButtonText: "Tamam",
        });
      }
    } catch (error) {
      setCreateData((prev) => ({
        ...prev,
        sendData: false,
      }));
      enqueueSnackbar(
        error?.response?.data ||
          "Bir sorun oluştu. Lütfen daha sorna tekrar deneyiniz.",
        { variant: "error" }
      );
      console.log("Err:", error);
    }
  }

  useEffect(() => {
    if (createData?.sendData) {
      CreateAdvert();
    }
  }, [createData]);

  return (
    <Grid container md={12}>
      <Grid item md={3}></Grid>
      <Grid item md={6}>
        <Card sx={{ marginY: 5, paddingY: 5, borderRadius: "20px" }}>
          <Grid container item gap={2}>
            {renderAdvert(advertType)}
          </Grid>
          <Button
            sx={{ marginTop: 3 }}
            onClick={handleCreateAdvert}
            variant={"contained"}
          >
            {" "}
            Oluştur{" "}
          </Button>
        </Card>
      </Grid>
      <Grid item md={3}></Grid>
    </Grid>
  );
};
export default AdvertPage;
