import { promptTemplate } from "../prompt/templates";
import AIModel from "./AIModel";

export const askAI = async (
  diffs: Array<{ filename: string, gitDiff: string}>,
  modelName: string,
  temperature: number,
  basePath: string
): Promise<string> => {
  console.info("Asking the experts...");

  const model = new AIModel({
    modelName: modelName,
    temperature,
    basePath: basePath,
  });

  const feedbacks: Array<{ filename: string, feedback: string }> = [];
  for (const diff of diffs) {
    feedbacks.push({
      filename: diff.filename,
      feedback: await model.callModel(promptTemplate(diff.filename, diff.gitDiff))
    });
  }

  return feedbacks.map(({ filename, feedback }) => 
    `
    ${filename}:
    ---
    ${feedback}
    `
  ).join("\n");
};
