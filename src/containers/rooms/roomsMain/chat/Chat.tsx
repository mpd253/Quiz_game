"use client";

import { useEffect, useRef, useState } from "react";
import {
  unsubscribeFromTopic,
  subscribeToTopic,
  sendMessage,
} from "../../../../service/api/socketConnection";

export default function Chat() {
  const inputRef = useRef<HTMLInputElement>(null);
  const lastMessageRef = useRef<HTMLInputElement>(null);

  const [chatList, setChatList] = useState<
    { message: string; sender: string }[]
  >([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputRef.current) {
        console.log("전송");
        sendMessage("/topic/room/2", inputRef.current.value);
        inputRef.current.value = "";
      }
    }
  };

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatList.length]);

  /*
   * 해당 방 구독 - 채팅 보내기 (/topic/room/${roomId})
   * 채팅 받기 (/topic/room/${roomId})
   */
  useEffect(() => {
    unsubscribeFromTopic("/topic/room/lobby");
    const handleNewMessage = (msg: any) => {
      if (
        typeof msg === "object" &&
        msg !== null &&
        "message" in msg &&
        "sender" in msg
      ) {
        console.log(msg);
        setChatList((prevMessages) => [...prevMessages, msg]);
      } else {
        console.warn("Unexpected message format:", msg);
      }
    };
    subscribeToTopic("/topic/room/2", handleNewMessage);
  }, []);

  return (
    <div
      className="
        
        flex flex-col bg-[var(--color-point)] 
        xl:h-full md:h-full h-[180px]
        xl:rounded-[32px] rounded-[20px] 
        xl:p-5 p-3 md:px-2 xl:pb-4 md:pb-4 "
    >
      <div className="w-full h-[700px] overflow-auto">
        {chatList.map((item, index) => (
          <p
            key={index}
            ref={index === chatList.length - 1 ? lastMessageRef : null}
          >
            <span className="font-bold">{item.sender}: </span>
            {item.message}
          </p>
        ))}
      </div>
      <input
        ref={inputRef}
        className="
          w-full text-black bg-[#d9d9d9]  
          xl:rounded-[20px] rounded-[16px]  
          xl:pl-6 pl-3 xl:pb-0 md:pb-2 xl:h-14 h-11  
          xl:placeholder:text-[20px] placeholder:text-[14px] placeholder:text-gray-500  
          "
        placeholder="메시지를 입력하세요..."
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
