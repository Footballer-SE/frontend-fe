import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { ThemeProvider, createTheme } from "@mui/material";
import { Helpers } from "../Utility/Helpers";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "../Login/LoginModal.component";
import RegisterModal from "../Login/RegisterModal.component";
import { useDispatch, useSelector } from "react-redux";
import AdvertButton from "../Adverts/AdvertButton/AdvertButton.component";
import { logout } from "../Store/UserSlice";
import { useSnackbar } from "notistack";
import { ACCESS_TOKEN } from "../Utility/Constants/EndpointConstants";
import { COLORS } from "../Utility/Constants/Colors";

const TopNavBar = (props) => {
  const [, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openLoginModal, setOpenLoginModal] = React.useState(false);
  const [openRegisterModal, setOpenRegisterModal] = React.useState(false);

  const user = useSelector((state) => state.user);
  let pages = user.isLoggedIn ? ["Home", "Messages"] : ["Home"];
  let settings = user.isLoggedIn ? ["Profile", "Logout"] : ["Login"];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const theme = createTheme({
    palette: {
      primary: { main: `${COLORS.MAIN_GREEN}` },
    },
    typography: {
      fontFamily: "sans-serif",
    },
  });

  const isMdDown = Helpers.useMediaQuery("down", "md");

  function handleClick(event) {
    if (event.target.name.includes("Login")) {
      setOpenLoginModal(true);
    }
    if (event.target.name.includes("Logout")) {
      localStorage.removeItem(ACCESS_TOKEN);
      navigate("/");
      dispatch(logout());
      enqueueSnackbar("Başarıyla Çıkış Yapıldı!", { variant: "info" });
    }
  }
  
  return (
    <>
      <ThemeProvider theme={theme}>
        <LoginModal
          setOpenLoginModal={setOpenLoginModal}
          openLoginModal={openLoginModal}
          setOpenRegisterModal={setOpenRegisterModal}
        />
        <RegisterModal
          setOpenLoginModal={setOpenLoginModal}
          openRegisterModal={openRegisterModal}
          setOpenRegisterModal={setOpenRegisterModal}
        />
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <SportsSoccerIcon
                fontSize="large"
                sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  flexGrow: 1,
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                FOOTBALLER
              </Typography>
              {!isMdDown && <AdvertButton setOpenLoginModal={setOpenLoginModal} />}
              <SportsSoccerIcon
                fontSize="large"
                sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
              />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                FOOTBALLER
              </Typography>
              <Box sx={{ mr: 5, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user?.data?.data?.name || ""} src={user?.data?.data?.imageUrl || " "} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      {!setting.includes("Login") &&
                      !setting.includes("Logout") ? (
                        <Link
                          style={{ textDecoration: "none", color: "black" }}
                          to={`${setting}`}
                        >
                          <Button onClick={handleClick} name={setting}>
                            {setting}
                          </Button>
                        </Link>
                      ) : (
                        <Button name={setting} onClick={handleClick}>
                          {setting}
                        </Button>
                      )}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </>
  );
};

export default TopNavBar;
