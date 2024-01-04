import Meta from "@client/components/logo/meta";
import OpenAI from "@client/components/logo/openai";

export const llmOptionsList = [
  {
    label: "GPT-3.5 Turbo",
    value: "gpt-3.5-turbo",
    icon: <OpenAI className="h-4 w-4 fill-inherit" />,
  },
  {
    label: "GPT-4",
    value: "gpt-4",
    icon: <OpenAI className="h-4 w-4 fill-inherit" />,
  },
  {
    label: "Llama 2 Chat",
    value: "llama-2-chat",
    icon: <Meta className="h-4 w-4 fill-inherit" />,
  },
] as const;

export const sqlGeneratorOptionsList = [
  {
    label: "DIN-SQL",
    value: "din-sql",
  },
  {
    label: "C3-SQL",
    value: "c3-sql",
  },
] as const;

const llms = llmOptionsList.map((option) => option.value);
export type LLM = (typeof llms)[number];

const sqlGenerators = sqlGeneratorOptionsList.map((option) => option.value);
export type SQLGenerator = (typeof sqlGenerators)[number];
