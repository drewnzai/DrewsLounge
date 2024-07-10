import ApiInterceptor from "../auth/ApiInterceptor";

export default class ConversationService{

    getAllConversations(){
        return ApiInterceptor.get("conversation/all")
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