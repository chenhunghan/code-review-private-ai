import AIModel from "./AIModel";
import { createSummary, processFeedbacks } from "./feedbackProcessor";
import { generateMarkdownReport } from "./generateMarkdownReport";

export const askAI = async (
  prompts: string[],
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

  const feedbacks = await processFeedbacks(model, prompts);

  const summary = await createSummary(model, feedbacks);

  return generateMarkdownReport(feedbacks, summary);
};
