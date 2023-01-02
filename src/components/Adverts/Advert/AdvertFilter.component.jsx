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
import {
  ADVERT_TYPE,
  ADVERT_TRANSLATE,
} from "../../Utility/Constants/AdvertType";
function AdvertFilter({
  filterCity,
  setFilterCity,
  allCities,
  filterPosition,
  setFilterPosition,
  allPositions,
  setTypeFilter,
  typeFilter,
}) {
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

  return (
    <Grid container item direction={"column"} gap={3} md={3}>
      {!isMdDown && (
        <Grid item>
          <Chip
            sx={{ fontSize: 25, border: 2, padding: 3 }}
            color="success"
            label={`Filtrele`}
            variant={"outlined"}
          />
        </Grid>
      )}
      <Grid justifyContent={"center"} item container sx={{ maxWidth: "200px" }}>
        <FormControl sx={style.root} fullWidth>
          <InputLabel color="success"  sx={{fontWeight:"bold"}} id="types">Ne İlanı Arıyorsun?</InputLabel>
          <Select
            labelId="types"
            size="small"
            id="typeSelect"
            color="success"
            value={typeFilter ?? ""}
            label="Ne İlanı Arıyorsun?"
            onChange={(e) => setTypeFilter(e?.target?.value)}
          >
            {Object.keys(ADVERT_TYPE)?.map((e, index) => {
              return (
                <MenuItem key={index} value={e}>
                  {ADVERT_TRANSLATE[e]}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid justifyContent={"center"} item container sx={{ maxWidth: "200px" }}>
        <FormControl sx={style.root} fullWidth>
          <InputLabel color="success" sx={{fontWeight:"bold"}} id="cities">Hangi şehirde?</InputLabel>
          <Select
            labelId="cities"
            size="small"
            id="citiSelect"
            color="success"
            value={filterCity ?? ""}
            label="Hangi şehirde?"
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
          <InputLabel color="success"  sx={{fontWeight:"bold"}} id="positions">Hangi Pozisyon?</InputLabel>
          <Select
            labelId="positions"
            size="small"
            id="positionSelect"
            color="success"
            
            value={filterPosition ?? ""}
            label="Hangi Pozisyon?"
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
          color="success"
          onClick={() => (setFilterCity(null), setFilterPosition(null),setTypeFilter(null))}
          variant={"outlined"}
        >
          Sıfırla
        </Button>
      </Grid>
    </Grid>
  );
}
export default AdvertFilter;
