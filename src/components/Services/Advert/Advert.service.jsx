import { Endpoints } from "../../Utility/Endpoints";
import { Http } from "../../Utility/Http";

const AdvertService = {
    CreateAdvert: async function (data,{headers}) {
    const result = await Http.POST(Endpoints.CreateAdvert,data,headers);
    return result;
  },
  GetAllAdverts: async function(){
    const result = await Http.GET(Endpoints.GetAllAdverts)
    return result;
  }
};

export default AdvertService;
