
import { useSnackbar } from "notistack";
import { memo,  useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { login } from "../Store/UserSlice";
import { ACCESS_TOKEN } from "../Utility/Endpoints";

const OAuthHandler = () => {
  const [searchParam] = useSearchParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();


  const token = searchParam.get("token");
  const error = searchParam.get("error");
  useEffect(() => {
    if (token) {
    localStorage.setItem(ACCESS_TOKEN, token);
      dispatch(
        login({
          token: token,
          isLoggedIn: true,
        })
      );
      enqueueSnackbar("Başarıyla Giriş Yapıldı!", { variant: "success" });
      navigate("/");
    }
    else if(error){
        enqueueSnackbar(error, { variant: "error" });
        navigate("/");
    }

  }, []);

 
};

export default memo(OAuthHandler);
