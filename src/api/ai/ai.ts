import { AxiosResponse } from "axios";
import { instance } from "../instance";
import { type IOpenRouerAi } from "./types";

export async function postAi({
  content,
}: {
  content: string;
}): Promise<AxiosResponse<IOpenRouerAi>> {
  return instance.post(
    "/v1/chat/completions",
    {
      model: "mistralai/mistral-7b-instruct:free",
      messages: [
        {
          role: "user",
          content: content,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AI_KEY}`,
        "X-Title": "chatbot-key",
      },
    },
  );
}
