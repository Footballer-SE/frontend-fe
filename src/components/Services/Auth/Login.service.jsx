import { Endpoints } from "../../Utility/Endpoints";
import { Http } from "../../Utility/Http";

const LoginService = {
    PostLogIn:async function ({loginRequest}) {
        const result = await Http.POST(Endpoints.LOG_IN,loginRequest);
        return result;
      },
    GoogleLogin: async function(){
      const result = await Http.POST(Endpoints.GOOGLE_AUTH_URL)
      return result;
    },
    GetCurrentUser: async function({headers}){
      const result = await Http.GET(Endpoints.CURRENT_USER, undefined,headers)
      return result;
    },
    UpdateUser: async function (data,{headers}){
      const result = await Http.PUT(Endpoints.UpdateUser,data,headers);
      return result;
    },
    GetUser: async function(data,{headers}){
      const result = await Http.GET(Endpoints.GetUser.concat(data),undefined,headers);
      return result;
    }
};

export default LoginService;

