import { commentOnPR } from "./ci/commentOnPR";
import { askAI } from "./llm/askAI";
import { getDiffFilenames, getDiffFileContent } from "./prompt/getDiffFiles";

interface ReviewArgs {
  [x: string]: unknown;
  _: (string | number)[];
  $0: string;
}

export const review = async (yargs: ReviewArgs) => {
  const modelName = yargs.model as string;
  const temperature = parseFloat(yargs.temperature as string);
  const basePath = yargs.basePath as string;

  const maxPromptLength = parseInt(process.env.MAX_PROMPT_LENGTH as string) || 4095;

  const diffFilenames = await getDiffFilenames();
  if (diffFilenames.length === 0) {
    console.info(`Not file diff(s) or files not supported. Exiting...`);
    process.exit(0);
  }

  let gitDiffs: Array<{ filename: string, gitDiff: string }> = []
  for (const filename of diffFilenames) {
    const gitDiff = await getDiffFileContent(filename);
    if (gitDiff.length === 0 || gitDiff.length >= maxPromptLength) {
      console.info(`No diff content found or exceeding MAX_PROMPT_LENGTH. Skip ${filename}...`);
    } else {
      gitDiffs.push({
        filename,
        gitDiff,
      });
    }  
  }
  const comment = await askAI(gitDiffs, modelName, temperature, basePath);

  await commentOnPR(comment)
};
