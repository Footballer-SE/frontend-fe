import { Endpoints } from "../../Utility/Endpoints";
import { Http } from "../../Utility/Http";

const PositionService = {
  GetAllPositions: async function ({ headers }) {
    const result = await Http.GET(Endpoints.GetAllPositions,undefined,headers);
    return result;
  },
};

export default PositionService;
