import { AxiosResponse } from "axios";
import { instance } from "../instance";
import { type IOpenRouerAi } from "./types";

export async function postAi({
  content,
  ai_key,
  ai_name,
}: {
  content: string;
  ai_key: string;
  ai_name: string;
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
        Authorization: `Bearer ${ai_key}`,
        "X-Title": ai_name,
      },
    },
  );
}
