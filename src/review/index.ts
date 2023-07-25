import { commentOnPR } from "./ci/commentOnPR";
import { askAI } from "./llm/askAI";
import { constructPromptsArray } from "./prompt/constructPrompt";
import { getFileNames } from "./prompt/getFileNames";

interface ReviewArgs {
  [x: string]: unknown;
  ci: boolean;
  _: (string | number)[];
  $0: string;
}

export const review = async (yargs: ReviewArgs) => {
  const isCi = yargs.ci;
  const modelName = yargs.model as string;
  const temperature = parseFloat(yargs.temperature as string);
  const basePath = yargs.basePath as string;

  const maxPromptLength = parseInt(process.env.CONTEXT_LENGTH as string) ?? 4000;

  const fileNames = await getFileNames(isCi);
  if (fileNames.length === 0) {
    console.info(`Not file diff. Exiting...`);
    process.exit(0);
  }
  const prompts = await constructPromptsArray(fileNames, maxPromptLength);

  const response = await askAI(prompts, modelName, temperature, basePath);

  if (isCi) {
    await commentOnPR(response);
  }
};
