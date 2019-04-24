export interface FoodEntry {
  name: string;
  details: string;
}

export interface Menu {
  id: string;
  name: string;
  foodEntries: [FoodEntry];
  url: string;
}