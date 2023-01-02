import { Endpoints } from "../../Utility/Endpoints";
import { Http } from "../../Utility/Http";

const CityService = {
    GetAllCity: async function () {
    const result = await Http.GET(Endpoints.GetAllCity);
    return result;
  },
};

export default CityService;
