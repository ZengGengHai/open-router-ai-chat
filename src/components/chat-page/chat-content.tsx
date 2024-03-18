import React, { useMemo } from "react";
import { RenderMarkdown } from "../render-markdown";
import { SupportAgent, Person } from "@mui/icons-material";
import cx from "classnames";
import { type Role } from "../../api/ai/types";

interface ChatContentProps {
  role: Role;
  content: string;
}

export const ChatContent = (props: ChatContentProps) => {
  const { role, content } = props;

  const isOwner = useMemo(() => {
    return role === "user";
  }, [role]);

  return (
    <div className="flex flex-row w-full gap-4 py-2">
      <div id="role-icon">
        <div
          className={cx(
            "w-10 h-10 rounded-full flex justify-center items-center",
            isOwner ? "bg-yellow-400" : "bg-green-600",
          )}
        >
          {isOwner ? <Person /> : <SupportAgent />}
        </div>
      </div>
      <div id="role-content">
        <div id="role-name" className="font-extrabold text-lg">
          {isOwner ? "You" : "Assistant"}
        </div>
        <div id="content" className="text-ellipsis">
          <RenderMarkdown markdown={content} />
        </div>
      </div>
    </div>
  );
};
