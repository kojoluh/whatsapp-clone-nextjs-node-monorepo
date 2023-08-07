import React from "react";
import ChatContainer from "./ChatContainer";
import MessageBar from "./MessageBar";
import ChatHeader from "./ChatHeader";

function Chat() {
  return (
    <div className="border-conversation-border border-l w-full bg-conversation-panel-background flex flex-col h-[100vh] z-10">
      <ChatHeader />
      <ChatContainer />
      <MessageBar />
    </div>
  )
}

export default Chat;
