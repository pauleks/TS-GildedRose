import { Item } from "./gilded-rose";

/**
 * API endpoint to use for the Node.js task
 */
const CMockAPIEndpoint = "https://yesno.wtf/api";

/**
 * Gets the number value of the specified command line argument
 * @param commandLineArgument Command line argument to get the value of
 * @example
 * // If the command line argument is '--input 10' and the function is called with 'input',
 * // the function will return the number value of 10.
 * const inputValue = getCommandLineArgumentValue("input"); // returns 10
 * @returns Number value of the command line argument
 */
const getCommandLineArgument = (commandLineArgument: string) => {
  let argumentIndex = process.argv.indexOf(`--${commandLineArgument}`);

  if (argumentIndex == -1)
    throw new Error(`Missing argument --${commandLineArgument}`);

  // Unary plus operation
  // Chose this over parseInt() because it parses the input even if it had letters
  // For example "10test" would still be parsed into number 10
  // I want to accept only full numbers as inputs
  let argumentValue = +process.argv[argumentIndex + 1];

  if (Number.isNaN(argumentValue))
    throw new Error(`Invalid value for argument --${commandLineArgument}`);

  if (argumentValue < 0)
    throw new Error(
      `Value for argument --${commandLineArgument} must be equal to or more than zero.`
    );

  return argumentValue;
};

/**
 * Runs the specified amount of parallel requests to the specified API endpoint
 * @param requestCount Amount of requests
 * @returns Amount of "yes" answers from the API
 */
const runParallelRequests = async (requestCount: number) => {
  try {
    const allRequests = Array.from({ length: requestCount }, () =>
      fetch(CMockAPIEndpoint).then((res) => res.json())
    );

    const responses = await Promise.all(allRequests);

    const countOfPositiveAnswers = responses.filter(
      (res) => res.answer == "yes"
    ).length;

    return countOfPositiveAnswers;
  } catch (error) {
    throw error;
  }
};

/**
 * Runs parallel requests in loop until there are no positive answers left.
 * This implements the task requirement
 * @param requestCount Amount of parallel requests to make
 * @returns An array of numbers of positive answers each run
 */
const runRequestsUntilZero = async (requestCount: number) => {
  const timesRanRequests: number[] = [];

  while (requestCount > 0) {
    const result = await runParallelRequests(requestCount);
    timesRanRequests.push(result);
    requestCount = result;
  }

  return timesRanRequests;
};

/**
 * "Formats" and outputs the current shop items' list into the console
 * @param items Array of items
 * @param day Day to display
 */
const outputItems = (items: Item[], day: number) => {
  // Taken from test/golden-master-text-test.ts
  console.log("-------- day " + day + " --------");
  console.log("name, sellIn, quality");
  items.forEach((element) => {
    console.log(element.name + ", " + element.sellIn + ", " + element.quality);
  });
  console.log();
};

export { getCommandLineArgument, runRequestsUntilZero, outputItems };
