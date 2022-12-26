import { Endpoints } from "../../Utility/Endpoints";
import { Http } from "../../Utility/Http";

const TeamService = {
  CreateTeam: async function (data, { headers }) {
    const result = await Http.POST(Endpoints.CreateTeam, data, headers);
    return result;
  },
  UpdateTeam: async function (data, { headers }) {
    const result = await Http.PUT(Endpoints.UpdateTeam, data, headers);
    return result;
  },
};

export default TeamService;
