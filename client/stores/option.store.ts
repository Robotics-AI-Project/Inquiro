import { LLM, SQLGenerator } from "@client/constants/options";
import { OmitCallbacks } from "@client/types/utils";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type OptionStore = {
  llm: LLM;
  setLLM: (llm: LLM) => void;
  sqlGenerator: SQLGenerator;
  setSQLGenerator: (sqlGenerator: SQLGenerator) => void;
};

const initialStore: OmitCallbacks<OptionStore> = {
  llm: "gpt-3.5-turbo",
  sqlGenerator: "c3-sql",
};

export const useOptionStore = create(
  persist<OptionStore>(
    (set) => ({
      ...initialStore,
      setLLM: (llm) => {
        set({ llm });
      },
      setSQLGenerator: (sqlGenerator) => {
        set({ sqlGenerator });
      },
    }),
    {
      name: "inquiro-options",
    },
  ),
);
