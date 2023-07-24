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
    .option("ci", {
      description: "Indicate that the script is running on a CI environment",
      type: "boolean",
      default: false,
    })
    .option("model", {
      description: "The model to use for generating the review",
      type: "string",
      // https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGML/tree/main
      default: "llama-2-7b-chat.ggmlv3.q4_0.bin",
    })
    .command("review", "Review the pull request")
    .parseSync();

  if (argv.ci) {
    argv._[0] = "review";
    console.info("Running in CI mode, defaulting to review.");
    return argv;
  }

  if (!argv._[0]) {
    argv._[0] = await handleNoCommand();
  }

  return argv;
};
