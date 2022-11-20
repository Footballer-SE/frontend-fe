import { Endpoints } from "../../Utility/Endpoints";
import { Http } from "../../Utility/Http";

const FootballerService = {
  GetAllFootballers: async function () {
    const result = await Http.GET(Endpoints.GetAllFootballers);
    return result;
  },
};

export default FootballerService;
