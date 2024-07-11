import { toast } from "react-toastify";
import ApiInterceptor from "../auth/ApiInterceptor";
import { ConversationRequest } from "../models/ConversationRequest";
import { Message } from "../models/Message";

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
                        return false;
                    }else{
                        toast.success("Created private conversation successfully");
                        return true;
                    }

                }
            )
    }

    sendMessage(message: Message){
        return ApiInterceptor.post("conversation/send-message", message)
            .then(
                (response) => {
                    if(response.data.data){
                        toast.error(response.data.data)
                    }else{
                        toast.success("Message sent successfully");
                    }
                }
            )
    }
}