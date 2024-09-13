import {toast} from "react-toastify";
import ApiInterceptor from "../auth/ApiInterceptor";
import {ConversationRequest} from "../models/ConversationRequest";
import {Message} from "../models/Message";
import {Conversation} from "../models/Conversation";
import { DataHolder } from "../models/DataHolder";

export default class ConversationService{
    joinGroupConversation(groupName: string) {
        throw new Error("Method not implemented.");
    }
    
    createGroupConversation(conversationRequest: ConversationRequest) {
        return ApiInterceptor.post("conversation/create-group", conversationRequest)
            .then(
                (response) => {
                    if(response.data.data){
                        toast.error(response.data.data);
                    }else{
                        return response.data;
                    }
                }
            )
    }

    searchUsers(username: string) {
        const dataHolder: DataHolder = {
            data: username
        }
        return ApiInterceptor.post("conversation/users", dataHolder)
            .then(
                (response) => {
                    if(response.data){
                        return response.data;
                    }

                    return response;
                }
            )
    }

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

    getMessages(conversation: Conversation){
        return ApiInterceptor.post("conversation/messages", conversation)
            .then(
                (response) => {
                    if(response.data.data){
                        toast.error(response.data.data);
                        return;
                    }else{
                        return response.data;
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

    markMessageAsSeen(message: Message){
        return ApiInterceptor.post("conversation/mark-seen", message)
            .then(
                (response) => {
                    if(response.data.data){
                        toast.error(response.data.data)
                }
            }
            )
    }
}