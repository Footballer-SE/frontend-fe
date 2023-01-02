import { Endpoints } from "../../Utility/Endpoints";
import { Http } from "../../Utility/Http";

const PositionService = {
  GetAllPositions: async function (  ) {
    const result = await Http.GET(Endpoints.GetAllPositions);
    return result;
  },
};

export default PositionService;
