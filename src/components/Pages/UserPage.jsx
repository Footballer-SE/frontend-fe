import { Avatar, Grid, Typography } from "@mui/material";

import { Helpers } from "../Utility/Helpers";
import { useLocation } from "react-router-dom";
import LoginService from "../Services/Auth/Login.service";
import { useEffect, useState } from "react";

const UserPage = () => {

  const isMdDown = Helpers.useMediaQuery("down", "md");

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userId = params.get("id");
    const headers = Helpers.useHeader();
    const [data, setData] = useState("")

    useEffect(() => {
      async function getUser(){
       try {
        const result = await LoginService.GetUser(userId,headers)
        setData(result.data)
       } catch (error) {
        console.log("Err:",error);
       }
      }
      getUser();
    }, [userId])
    
  
  return (
    <Grid
      container
      item
      direction={isMdDown ? "column" : "row"}
      justifyContent={"space-evenly"}
      marginBottom={10}
    >
        <Grid direction={"column"} container item my={"2%"}>
          <Grid alignSelf={"center"} item>
            <Avatar
              sx={{ width: 108, height: 108 }}
              alt={data?.name || " "}
              src={data?.imageUrl || " "}
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
              {data?.name}
            </Typography>
            <Typography variant="h6" fontWeight={"bold"}>
              {data?.email}
            </Typography>
            <Typography variant="h6" fontWeight={"bold"}> {data?.data?.telephoneNumber ? "Tel:"+data?.data?.telephoneNumber : "-"}</Typography>
          </Grid>
        </Grid>
     
    </Grid>
  );
};

export default UserPage