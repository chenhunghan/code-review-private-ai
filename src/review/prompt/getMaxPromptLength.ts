
export const getMaxPromptLength = (modelName: string): number => {
  if (!process.env.CONTEXT_LENGTH) {
    // Default context length for the basic llama-2-7b-chat model
    // See https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGML
    return 4000;
  }
  return parseInt(process.env.CONTEXT_LENGTH);
};
