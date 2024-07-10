import { toast } from "react-toastify";
import ApiInterceptor from "../auth/ApiInterceptor";
import { ConversationRequest } from "../models/ConversationRequest";

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

    createPrivateConversation(conversationRequest: ConversationRequest){
        return ApiInterceptor.post("conversation/create-private", conversationRequest)
            .then(
                (response) => {
                    if(response.data.data){
                        toast.error(response.data.data);
                    }else{

                        toast.success("Created private conversation successfully");
                    }

                }
            )
    }
}