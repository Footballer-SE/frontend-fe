import { Endpoints } from "../../Utility/Endpoints";
import { Http } from "../../Utility/Http";

const SignupService = {
  PostSignUp: async function ({signupRequest}) {
    const result = await Http.POST(Endpoints.SIGN_UP,signupRequest);
    return result;
  },
};

export default SignupService;
