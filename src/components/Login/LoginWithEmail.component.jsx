import { Button, DialogContent, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { memo } from "react";

function LoginWithEmail({ handleLogin, handleInputChange }) {
  return (
    <>
      <DialogContent>
        <TextField
          variant="standard"
          color="primary"
          name="email"
          type={"email"}
          required
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          fullWidth
          label={"E-posta Adresi"}
        />
        <TextField
          variant="standard"
          color="primary"
          type={"password"}
          name={"password"}
          required
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          fullWidth
          label={"Parola"}
        />
      </DialogContent>
      <DialogContent>
        <Box textAlign={"center"}>
          <Button
            sx={{ borderRadius: 20, width: "200px" }}
            size={"large"}
            variant="contained"
            onClick={handleLogin}
          >
            Giriş Yap
          </Button>
        </Box>
      </DialogContent>
    </>
  );
}

export default memo(LoginWithEmail);
