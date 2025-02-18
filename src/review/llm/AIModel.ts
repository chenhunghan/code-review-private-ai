import { OpenAIChat } from "langchain/llms/openai";

interface IAIModel {
  modelName: string;
  temperature: number;
  basePath: string;
}

class AIModel {
  private model: OpenAIChat;

  constructor(options: IAIModel) {
    this.model = new OpenAIChat({
      openAIApiKey: "sk-fake-key",
      modelName: options.modelName,
      temperature: options.temperature,
      configuration: {
        basePath: options.basePath,
      }
    });
  }

  public async callModel(prompt: string): Promise<string> {
    return this.model.call(prompt);
  }
}

export default AIModel;
