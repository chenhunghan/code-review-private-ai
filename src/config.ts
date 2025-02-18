/* Env variables:
In CI:
 * GITHUB_SHA
 * BASE_SHA
 * GITHUB_TOKEN
 */

export const getGitHubEnvVariables = (): Record<string, string> => {
  const missingVars = ["GITHUB_SHA", "BASE_SHA", "GITHUB_TOKEN"].filter(
    (varName) => !process.env[varName]
  );
  if (missingVars.length > 0) {
    console.error(`Missing environment variables: ${missingVars.join(", ")}`);
    throw new Error("One or more GitHub environment variables are not set");
  }
  return {
    githubSha: process.env.GITHUB_SHA as string,
    baseSha: process.env.BASE_SHA as string,
    githubToken: process.env.GITHUB_TOKEN as string,
  };
};
