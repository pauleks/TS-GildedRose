import {
  getCommandLineArgument,
  runRequestsUntilZero,
  outputItems,
} from "./utilities";
import { Item, GildedRose } from "./gilded-rose";
import { createWriteStream } from "fs";

// Two command line arguments will be required: --updates and --requests
const CRequests = getCommandLineArgument("requests");
const CShopUpdates = getCommandLineArgument("updates");

// Example shop, taken from test/golden-master-text-test.ts
let items = [
  new Item("+5 Dexterity Vest", 10, 20), //
  new Item("Aged Brie", 2, 0), //
  new Item("Elixir of the Mongoose", 5, 7), //
  new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
  new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
  new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
  new Item("Conjured Mana Cake", 3, 11),
];

const gildedRose = new GildedRose(items);

outputItems(items, 0);

// Main code
let i = 0;
const logWriter = createWriteStream("./log.txt", { flags: "w" });
const recursionLoop = async () => {
  if (i == CShopUpdates)
    return;

  const result = await runRequestsUntilZero(CRequests);

  // Logging
  logWriter.write(`Loop #${i}:\n- Initial run: ${CRequests} times\n`);
  result.forEach((value, i) => {
    if (value == 0) {
      logWriter.write(`- No positive answers received, stopping.\n`);
    } else logWriter.write(`- Run ${i}: ${value} times\n`);
  });
  logWriter.write("\n");

  items = gildedRose.updateQuality();
  outputItems(items, ++i);
};

recursionLoop();
