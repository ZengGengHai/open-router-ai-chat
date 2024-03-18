import React, { useCallback, useRef, useState } from "react";
import { ChatContent, ChatInput } from "../../components";
import { postAi } from "../../api/ai/ai";
import { Role } from "../../api/ai/types";
import { ContentStatus } from "./type";

interface ChatContentProps {
  id: string;
  role: Role;
  content: string;
  status: ContentStatus;
}

export const ChatPage = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [chatContents, setChatContents] = useState<ChatContentProps[]>([]);

  const chatContensRef = useRef<HTMLDivElement>(null);

  const handleInputClick = useCallback(async () => {
    setInputValue("");
    const userId = `${Date.now()}-user`;
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

    const scrollHeight = chatContensRef.current?.scrollHeight ?? 0;
    const clientHeight = chatContensRef.current?.clientHeight ?? 0;
    if (scrollHeight > clientHeight) {
      chatContensRef.current?.scrollTo({ top: scrollHeight + 500 });
    }
    await postAi({
      content: inputValue,
      ai_key:
        "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",
      ai_name: "zgh",
    }).then((data) => {
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

  return (
    <div className="p-4 pt-0 h-full flex flex-col gap-4">
      <div
        id="chat-contents"
        className="flex-1 overflow-y-scroll overflow-hidden scrollable-element"
        ref={chatContensRef}
      >
        {chatContents.map((i, index) => {
          return (
            <ChatContent
              role={i.role}
              content={i.content}
              key={index}
              id={i.id}
              status={i.status}
            />
          );
        })}
        <div className="h-[40%] opacity-0" />
      </div>
      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleInputClick={handleInputClick}
      />
    </div>
  );
};
