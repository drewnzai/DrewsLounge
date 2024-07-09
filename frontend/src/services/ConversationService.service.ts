import ApiInterceptor from "../auth/ApiInterceptor";

export default class ConversationService{

    getAllConversations(){
        return ApiInterceptor.post("conversation/all")
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