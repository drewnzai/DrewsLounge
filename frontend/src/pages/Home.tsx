import { useState } from "react";

export default function Home(){
    const [conversationName, setConversationName] = useState("");

    return(
        <div>
            <input type="text" value={conversationName} onChange={(e) => setConversationName(e.target.value)} placeholder="New Conversation Name" />
        </div>
    );
}