import React, { useRef, useEffect } from "react";
import Message from "./discussion";

export default function MessagesBox({ messages }) {
  const endDiv = useRef(null);
  useEffect(() => {
    endDiv.current.scrollIntoView();
  }, [messages]);

  return (
    <div className="chats">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
      <div style={{ float: "right", clear: "both" }} ref={endDiv}></div>
    </div>
  );
}

{
  /* .sort((a, b) => a.date.getTime() - b.date.getTime()) */
}
