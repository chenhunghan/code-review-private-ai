import { exec } from "child_process";
import { extname, join } from "path";
import { supportedFiles } from "../constants";
import { getGitHubEnvVariables } from "../../config";

const gitDiffFilenameCommand = (): string => {
  const { githubSha, baseSha } = getGitHubEnvVariables();
    const cmd = `git diff --name-only --diff-filter=AMT ${baseSha} ${githubSha}`;
    console.info('CMD: ', cmd)
    return cmd;
};

const gitDiffFileContentCommand = (filename: string): string => {
  const { githubSha, baseSha } = getGitHubEnvVariables();
    const cmd = `git diff --name-only --diff-filter=AMT ${baseSha} ${githubSha} -- ${filename}}`
    console.info('CMD: ', cmd)
    return cmd;
};

export const getDiffFileContent = (filename: string): Promise<string> => {
  const commandString = gitDiffFileContentCommand(filename);

  return new Promise((resolve, reject) => {
    exec(commandString, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(error.message));
      } else if (stderr) {
        reject(new Error(stderr));
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

const getAllDiffFilenames = (): Promise<string[]> => {
  const commandString = gitDiffFilenameCommand();

  return new Promise((resolve, reject) => {
    exec(commandString, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(error.message));
      } else if (stderr) {
        reject(new Error(stderr));
      } else {
        const files = stdout
          .split("\n")
          .filter((fileName) => fileName.trim() !== "")
          .map((fileName) => join(process.cwd(), fileName.trim()));
        resolve(files);
      }
    });
  });
};

/**
 * Get the file names (with supported file extensions filtered) from the `git diff --name-only` command
 */
export const getDiffFilenames = async (): Promise<string[]> => {
  console.info("Getting diff files...");
  try {
    const allDiffFilenames = await getAllDiffFilenames();
    const filteredFileNames = allDiffFilenames.filter((fileName) => supportedFiles.has(extname(fileName)));

    if (filteredFileNames.length === 0) {
      console.info(`No supported files found. Exiting...`);
      console.info(`Supported files: ${Array.from(supportedFiles).join(", ")}`);
      process.exit(0);
    }

    return filteredFileNames;
  } catch (error) {
    console.error(error);
    return [];
  }
};
