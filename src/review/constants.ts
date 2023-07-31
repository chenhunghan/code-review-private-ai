export const summaryPrompt = `
You are a senior developer and have just reviewed a pull request. These was your feedback:
{feedback}
Please summarise the review using 1 sentense.
`;

export const signOff =
  "#### Powered by [Code Review Private AI](https://github.com/chenhunghan/code-review-private-ai)";

export const supportedFiles = new Set([
  ".js",
  ".ts",
  ".py",
  ".sh",
  ".go",
  ".rs",
  ".tsx",
  ".jsx",
  ".dart",
]);
