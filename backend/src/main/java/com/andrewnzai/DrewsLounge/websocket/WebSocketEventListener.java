package com.andrewnzai.DrewsLounge.websocket;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class WebSocketEventListener {

    private static Map<String, String> userSessions = new HashMap<>();

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        Map<String, Object> sessionAttributes = headerAccessor.getSessionAttributes();
        if (sessionAttributes != null) {
            String username = (String) sessionAttributes.get("username");
            String sessionId = headerAccessor.getSessionId();
            if (username != null && sessionId != null) {
                userSessions.put(sessionId, username);
                System.out.println("User Connected: " + username);
            }
        }
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = headerAccessor.getSessionId();
        if (userSessions.containsKey(sessionId)) {
            userSessions.remove(sessionId);
        }
    }

    public static boolean isUserOnline(String username) {
        return userSessions.containsValue(username);
    }
}
