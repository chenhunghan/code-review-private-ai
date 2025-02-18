import yargs from "yargs";

const handleNoCommand = async () => {
  const inquirer = await import("inquirer");
  const questions = [
    {
      type: "list",
      name: "command",
      message: "What do you want to do?",
      choices: [
        { name: "Review the staged files", value: "review" },
        {
          name: "Configure the script (Recommended for first time use)",
          value: "configure",
        },
      ],
    },
  ];

  const answers = await inquirer.default.prompt(questions);
  return answers.command;
};

export const getYargs = async () => {
  const argv = yargs
    .option("model", {
      description: "The model to use for generating the review",
      type: "string",
      // https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGML/tree/main
      default: "llama-2-7b-chat.ggmlv3.q4_0.bin",
    })
    .option("temperature", {
      description: "The temperature to use for generating the review",
      type: "string",
      default: "0.0",
    })
    .option("basePath", {
      description: "The basePath to pass to OpenAI client library, should be the http endpoint of your OpenAI API-compatible server",
      type: "string",
      default: "http://localhost:8000/v1",
    })
    .command("review", "Review the pull request")
    .parseSync();

  if (!argv._[0]) {
    argv._[0] = await handleNoCommand();
  }

  return argv;
};
