import React, { useCallback, useState } from "react";
import { ChatContent, ChatInput } from "../components";
import { postAi } from "../api/ai/ai";
import { Role } from "../api/ai/types";

type ContentStatus = "success" | "loading";

interface ChatContentProps {
  id: string | number;
  role: Role;
  content: string;
  status: ContentStatus;
}

export const ChatPage = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const [chatContents, setChatContents] = useState<ChatContentProps[]>([]);

  const handleInputClick = useCallback(async () => {
    setInputValue("");
    const userId = Date.now();
    const assistantId = `${Date.now()}-assistant`;
    setChatContents((prev) => [
      ...prev,
      {
        id: userId,
        role: "user" as Role,
        content: inputValue,
        status: "success" as ContentStatus,
      },
      {
        id: assistantId,
        role: "assistant" as Role,
        content: "...",
        status: "loading" as ContentStatus,
      },
    ]);
    const now = Date.now();
    console.log(now, "ddj");
    await postAi().then((data) => {
      setChatContents((prev) => {
        return prev.map((i) => {
          if (i.id === assistantId) {
            return {
              ...i,
              content: data?.data?.choices?.[0]?.message?.content ?? "",
              status: "success" as ContentStatus,
            };
          }
          return i;
        });
      });
    });
  }, [inputValue]);

  console.log(chatContents);

  return (
    <div className="p-4 h-full  flex flex-col gap-4">
      <div
        id="chat-contents"
        className="flex-1 overflow-y-scroll overflow-hidden scrollable-element"
      >
        {chatContents.map((i, index) => {
          return <ChatContent role={i.role} content={i.content} key={i.id} />;
        })}
      </div>
      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleInputClick={handleInputClick}
      />
    </div>
  );
};
