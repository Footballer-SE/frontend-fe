import { Avatar, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";

const UserProfilePage = () => {
  const { data } = useSelector((state) => state.user);

  return (
    <Grid direction={"column"} container item my={"2%"} >
      <Grid alignSelf={"center"} item>
        <Avatar 
          sx={{ width: 108, height: 108 }}
          alt={data?.data?.name || " "}
          src={data?.data?.imageUrl || " "}
        
        ></Avatar>
      </Grid>

        <Grid  container gap={2} mt={2} direction={"column"} item  alignContent={"center"} >
          <Typography variant="h6" fontWeight={"bold"} >{data?.data?.name}</Typography>
          <Typography variant="h6"  fontWeight={"bold"} >{data?.data?.email}</Typography>
        </Grid>

        
      
      
    </Grid>
  );
};

export default UserProfilePage;
