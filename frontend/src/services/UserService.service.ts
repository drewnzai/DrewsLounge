import ApiInterceptor from "../auth/ApiInterceptor";
import {DataHolder} from "../models/DataHolder";


export default class UserService{

    searchUsers(username: string) {
        const dataHolder: DataHolder = {
            data: username
        }
        return ApiInterceptor.post("user/search", dataHolder)
            .then(
                (response) => {
                    if(response.data){
                        return response.data;
                    }

                    return response;
                }
            )
    }
}