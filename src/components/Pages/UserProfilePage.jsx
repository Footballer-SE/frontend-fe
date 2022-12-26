import { Avatar, Button, Grid, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import TeamService from "../Services/Team/Team.service";
import { Helpers } from "../Utility/Helpers";
import { useContext, useEffect, useState } from "react";
import DialogContext from "../Store/Dialog.context";
import { DialogIcon } from "../Utility/Constants/Dialog";
import { useSnackbar } from "notistack";

const UserProfilePage = () => {
  const { data } = useSelector((state) => state.user);
  const [openTeamForm, setOpenTeamForm] = useState(false)
  const [openTeamFormUpdate, setOpenTeamFormUpdate] = useState(false)
  const [team,setTeam] = useState({
    footballTeamName: data?.data?.footballTeam?.footballTeamName || "",
    footballTeamCapacity: data?.data?.footballTeam?.footballTeamCapacity || 1,
    footballTeamCurrentCount: data?.data?.footballTeam?.footballTeamCurrentCount || 1,
    id: data?.data?.footballTeam?.footballTeamId || data?.data?.id  
  });
  const dialogContext = useContext(DialogContext);
  
  const headers = Helpers.useHeader();
  const { enqueueSnackbar } = useSnackbar();
  
  async function handleCreateOrUpdateTeam(type) {
    try {
      if (type==="CREATE") {
        await TeamService.CreateTeam(team,headers)
        
      }else  {
        await TeamService.UpdateTeam(team,headers)
      }

      dialogContext.setDialog({
        modalOpen: true,
        callback: () => ( setOpenTeamForm(false), setOpenTeamFormUpdate(false)),
        icon: DialogIcon.success,
        title: "Başarılı",
        description:
          `Takım Başarıyla ${type==="CREATE" ? "Oluşturuldu": " Güncellendi"}`,
        primaryButtonText: "Tamam",
      });
      
    } catch (error) {
      enqueueSnackbar(error?.data?.message || "Bir sorunla karşılaştık. Daha sonra tekrar deneyiniz.",{variant:"error"} )
      console.log("Err:",error);
    }
  }

  function handleChange(e) {
    setTeam(prev=>({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }

  useEffect(() => {
    console.log(team);
  
    
  }, [team])
  

  return (
    <Grid direction={"column"} container item my={"2%"}>
      <Grid alignSelf={"center"} item>
        <Avatar
          sx={{ width: 108, height: 108 }}
          alt={data?.data?.name || " "}
          src={data?.data?.imageUrl || " "}
        ></Avatar>
      </Grid>

      <Grid
        container
        gap={2}
        mt={2}
        direction={"column"}
        item
        alignContent={"center"}
      >
        <Typography variant="h6" fontWeight={"bold"}>
          {data?.data?.name}
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          {data?.data?.email}
        </Typography>
      </Grid>

      <Grid container item mt={2} direction={"column"} alignContent={"center"}>
        {(!data?.data?.footballTeam && !openTeamForm ) ? (
          <Button color="success" onClick={() => setOpenTeamForm(true)} variant="contained">
            Kendi Takımını Oluştur
          </Button>
        ) : !openTeamFormUpdate ? (
          <Button
            onClick={() => setOpenTeamFormUpdate(true)}
            color="success"
            variant="contained"
          >
            Takımını Güncelle
          </Button>
        ) : null}
      </Grid>
      <Grid
        container
        gap={2}
        mt={2}
        direction={"column"}
        item
        alignContent={"center"}
      >
        <TextField
          size="small"
          label={"Takım Adı:"}
          name={"footballTeamName"}
          disabled={!(openTeamForm || openTeamFormUpdate)}
          value={team?.footballTeamName || ""}
          onChange={handleChange}
        />
        <TextField
          size="small"
          label={"Takımındaki kişi sayısı:"}
          name={"footballTeamCurrentCount"}
          type={"number"}
          disabled={!(openTeamForm || openTeamFormUpdate)}
          value={team?.footballTeamCurrentCount || ""}
          onChange={handleChange}
        />
        <TextField
          size="small"
          label={"Takımın kaç kişilik olacak?"}
          name={"footballTeamCapacity"}
          type={"number"}
          disabled={!(openTeamForm || openTeamFormUpdate)}
          value={team?.footballTeamCapacity || ""}
          onChange={handleChange}
        />
      </Grid>
      {(openTeamForm || openTeamFormUpdate) && <Grid container item direction={"row"} mt={2} gap={2} justifyContent={"center"}>
        <Button variant="outlined"  onClick={()=>(setOpenTeamForm(false),setOpenTeamFormUpdate(false))} color="error">İptal</Button>
        <Button variant="contained" onClick={()=>handleCreateOrUpdateTeam(!data?.data?.footballTeam ? "CREATE" : "UPDATE")} color="success">{!data?.data?.footballTeam ? "Oluştur" : "Güncelle" }</Button>
      </Grid>}
    </Grid>
  );
};

export default UserProfilePage;
