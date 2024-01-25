/**
 * Allowed minimum quality
 */
const CMinimumQuality = 0;
/**
 * Allowed maximum quality
 */
const CMaximumQuality = 50;

/**
 * Checks if the current item is Aged Brie
 * @param item Item to check
 * @returns The condition if the result is positive
 */
const isAgedBrie = (item: Item) => item.name == "Aged Brie";
/**
 * Checks if the current item is the backstage pass
 * @param item Item to check
 * @returns The condition if the result is positive
 */
const isBackstagePass = (item: Item) =>
  item.name == "Backstage passes to a TAFKAL80ETC concert";
/**
 * Checks if the current item is Surfuras
 * @param item Item to check
 * @returns The condition if the result is positive
 */
const isSulfuras = (item: Item) => item.name == "Sulfuras, Hand of Ragnaros";
/**
 * Checks if the current item is conjured
 * @param item Item to check
 * @returns The condition if the result is positive
 */
// In this code's logic, special items like Sulfuras won't become "conjured"
const isConjured = (item: Item) => item.name.startsWith("Conjured");

/**
 * Returns the result of the updated item's quality while also following the task's conditions
 * @param currentItem Current item
 * @param amountToAdd The amount of quality to add/subtract
 * @returns The new quality of the item
 */
const addToQuality = (currentItem: Item, amountToAdd: number) => {
  if (currentItem.quality + amountToAdd > CMaximumQuality)
    return CMaximumQuality;
  if (currentItem.quality + amountToAdd < CMinimumQuality)
    return CMinimumQuality;

  return currentItem.quality + amountToAdd;
};

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    // JS/TS passes a reference to the item's object
    for (const item of this.items) {
      // Quality updates
      if (isBackstagePass(item) || isAgedBrie(item)) {
        item.quality = addToQuality(item, 1);

        if (isBackstagePass(item)) {
          if (item.sellIn <= 10) item.quality = addToQuality(item, 1);
          if (item.sellIn <= 5) item.quality = addToQuality(item, 1);
        }
      } else if (!isSulfuras(item)) {
        item.quality = addToQuality(item, -1);

        if (isConjured(item)) item.quality = addToQuality(item, -1);
      }

      // Deadline of sale updates
      if (!isSulfuras(item)) item.sellIn--;

      // Past the deadline
      if (item.sellIn < 0) {
        if (isBackstagePass(item)) item.quality = CMinimumQuality;
        else if (isAgedBrie(item)) {
          // According to the original code, Aged Brie's quality
          // increases twice as fast after the deadline
          item.quality = addToQuality(item, 1);
        } else if (!isSulfuras(item)) {
          item.quality = addToQuality(item, -1);

          if (isConjured(item)) item.quality = addToQuality(item, -1);
        }
      }
    }
    return this.items;
  }
}
