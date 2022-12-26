import {
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { POSITION_TYPE } from "../../Utility/Constants/PositionType";
import { Helpers } from "../../Utility/Helpers";

function AdvertFilter({
  filterCity,
  setFilterCity,
  allCities,
  filterPosition,
  setFilterPosition,
  allPositions,
}) {
    const isMdDown = Helpers.useMediaQuery("down","md");
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
  return (
    <Grid container item direction={"column"} gap={2} md={3}>
      {!isMdDown &&  <Grid item>
        <Chip
          sx={{ fontSize: 25, border: 2, padding: 3 }}
          color="success"
          label={`Filtrele`}
          variant={"outlined"}
        />
      </Grid>}
      <Grid justifyContent={"center"} item container sx={{ maxWidth: "200px" }}>
        <FormControl sx={style.root} fullWidth>
          <InputLabel id="cities">Şehir Seçiniz</InputLabel>
          <Select
            labelId="cities"
            size="small"
            id="citiSelect"
            value={filterCity ?? ""}
            label="Şehir Seçiniz"
            onChange={(e) => setFilterCity(e?.target?.value)}
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
      <Grid justifyContent={"center"} item container sx={{ maxWidth: "200px" }}>
        <FormControl sx={style.root} fullWidth>
          <InputLabel id="positions">Pozisyon Seçiniz</InputLabel>
          <Select
            labelId="positions"
            size="small"
            id="positionSelect"
            value={filterPosition ?? ""}
            label="Şehir Seçiniz"
            onChange={(e) => setFilterPosition(e?.target?.value)}
          >
            {allPositions?.map((e) => {
              return (
                <MenuItem key={e?.id} value={e?.id}>
                  {POSITION_TYPE[e?.positionName]}
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
        direction={"row"}
        sx={{ maxWidth: "200px" }}
      >
        <Button
          size={"small"}
          onClick={() => (setFilterCity(null), setFilterPosition(null))}
          variant={"outlined"}
        >
          Sıfırla
        </Button>
      </Grid>
    </Grid>
  );
}
export default AdvertFilter;
