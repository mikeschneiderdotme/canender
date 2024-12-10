import { Meal, Treatment } from "./treamtmentModels";

export const treatment: Treatment = {
    id: 1,
    dosage: [
      {
        meal: Meal.NoMeal,
        ratio: 0,
      },
      {
        meal: Meal.Breakfast,
        ratio: 2,
      },
      {
        meal: Meal.Lunch,
        ratio: 2,
      },
      {
        meal: Meal.Dinner,
        ratio: 0.5,
      },
    ],
    sensitivity: 4,
  }