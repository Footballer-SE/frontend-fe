import { Endpoints } from "../../Utility/Endpoints";
import { Http } from "../../Utility/Http";

const CityService = {
    GetAllCity: async function ({headers}) {
    const result = await Http.GET(Endpoints.GetAllCity,undefined,headers);
    return result;
  },
};

export default CityService;
