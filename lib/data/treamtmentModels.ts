
export enum Meal {
    Breakfast = 'Breakfast',
    Lunch = 'Lunch',
    Dinner = 'Dinner',
    Snack = 'Snack',
    NoMeal = 'No Meal'
}

export interface Dosage {
    meal: Meal
    ratio: number
}

export interface Treatment {
    id: number // uuid that will be used to link to accounts
    dosage: Dosage[]
    // Insulin sensitivity is a value that represents how much your blood sugar drops per
    // unit of insulin given to the patient. Usually a ratio of insulin : blood sugar decrease
    // written as 1:x where x is the sensitivity value that is stored here.
    sensitivity: number
}