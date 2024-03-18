export type Role = "assistant" | "user";

interface IChoice {
  message: {
    role: Role;
    content: string;
  };
}

export interface IOpenRouerAi {
  choices: IChoice[];
  crated: number;
  id: string;
  model: string;
}
