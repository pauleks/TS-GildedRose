import { Item, GildedRose } from "@/gilded-rose";
import { runRequestsUntilZero, outputItems } from "@/utilities";

/**
 * This unit test uses [Jest Snapshot](https://goo.gl/fbAQLP).
 *
 * There are two test cases here with different styles:
 * <li>"foo" is more similar to the unit test from the 'Java' version
 * <li>"thirtyDays" is more similar to the TextTest from the 'Java' version
 *
 * I suggest choosing one style to develop and deleting the other.
 */

describe("Gilded Rose Approval", () => {
  let gameConsoleOutput: string;
  let originalConsoleLog: (message: any) => void;
  let originalProcessArgv: string[];

  function gameConsoleLog(msg: string) {
    if (msg) {
      gameConsoleOutput += msg;
    }
    gameConsoleOutput += "\n";
  }

  beforeEach(() => {
    // prepare capturing console.log to our own gameConsoleLog.
    gameConsoleOutput = "";
    originalConsoleLog = console.log;
    console.log = gameConsoleLog;
    originalProcessArgv = process.argv;
  });

  afterEach(() => {
    // reset original console.log
    console.log = originalConsoleLog;
    process.argv = originalProcessArgv;
  });

  it("should foo", () => {
    const gildedRose = new GildedRose([
      new Item("foo", 0, 0),
      new Item("Conjured bar", 1, 2),
    ]);
    const items = gildedRose.updateQuality();

    expect(items).toMatchSnapshot();
  });

  it("should output the current items list", () => {
    const gildedRose = new GildedRose([
      new Item("foo", 0, 0),
      new Item("Conjured bar", 1, 2),
    ]);
    const items = gildedRose.updateQuality();

    outputItems(items, 0);

    expect(gameConsoleOutput).toMatchSnapshot();
  });

  const arrayCheck = (numArray: number[]) => {
    for (let i = 0; i < numArray.length - 1; i++) {
      if (numArray[i] < numArray[i + 1]) return false;
    }
    return true;
  };

  it("runRequestsUntilZero returns an array whose values decrease", () => {
    const numArray = runRequestsUntilZero(15).then((numArray) => {
      expect(arrayCheck(numArray)).toBe(true);
    });
  });

  it("should thirtyDays", () => {
    process.argv = ["<node>", "<script", "30"];
    require("../golden-master-text-test.ts");

    expect(gameConsoleOutput).toMatchSnapshot();
  });
});
