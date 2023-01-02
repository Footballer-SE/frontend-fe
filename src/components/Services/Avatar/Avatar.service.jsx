import { Endpoints } from "../../Utility/Endpoints";
import { Http } from "../../Utility/Http";

const AvatarService = {
    GetAllAvatar: async function ({headers}) {
    const result = await Http.GET(Endpoints.GetAvatar,undefined,headers);
    return result;
  },
};

export default AvatarService;
