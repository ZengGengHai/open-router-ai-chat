import { AxiosResponse } from "axios";
import { instance } from "../instance";
import { type IOpenRouerAi } from "./types";

export async function postAi(): Promise<AxiosResponse<IOpenRouerAi>> {
  return instance.post(
    "/v1/chat/completions",
    {
      model: "mistralai/mistral-7b-instruct:free",
      messages: [
        {
          role: "user",
          content: "how to use react, for example, give me code example",
        },
      ],
    },
    {
      headers: {
        Authorization:
          "Bearer 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",
      },
    },
  );
}
