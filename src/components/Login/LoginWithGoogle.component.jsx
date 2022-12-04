import { Avatar, Button } from "@mui/material";
import { Box } from "@mui/system";
import { Endpoints } from "../Utility/Endpoints";
import googleLogo from "../../img/google-logo.png"

export default function LoginWithGoogle() {
    
  return (
    <>
      <Box textAlign={"center"}>
        <Box
          component={"a"}
          sx={{ textDecoration: "none" }}
          href={Endpoints.GOOGLE_AUTH_URL}
        >
          <Button
            startIcon={
              <Avatar
                src={googleLogo}
                alt={"G"}
                sx={{ width: 40, height: 40 }}
              />
            }
            sx={{
              border: "1px solid #148c32",
              color: "black",
              background: "#fff",
              borderRadius: 20,
              width: "300px",
            }}
            size={"large"}
            variant="outlined"

          >
            Google ile giriş yap
          </Button>
        </Box>
      </Box>
    </>
  );
}
