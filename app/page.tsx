'use client'
import FormField from "$/components/atoms/FormField";
import { FormEvent, useCallback, useState } from "react";

interface DosageSettings {
  ratio: {
    breakfast: number
    lunch: number
    dinner: number
  }
  // Insulin sensitivity is a value that represents how much your blood sugar drops per 
  // unit of insulin given to the patient. Usually a ratio of insulin : blood sugar decrease
  // written as 1:x where x is the sensitivity value that is stored here.
  sensitivity: number
}

interface AppState {
  currentBloodSugar: number
  carbohydrates: number
  calculatedBolus: number
  calculatedCorrection: number
  dosage: number
  isCaluclated: boolean
}

const initialAppState: AppState = {
  currentBloodSugar: 0,
  carbohydrates: 0,
  calculatedBolus: 0,
  calculatedCorrection: 0,
  dosage: 0,
  isCaluclated: false,
}


export default function Home() {
  const targetBloodSugar: number = 100
  const dosage: DosageSettings = { ratio: {breakfast: 1.5, lunch: 2, dinner: 2 }, sensitivity: 15 }
  const [appState, setAppState] = useState<AppState>(initialAppState)

  // Bolus dosage is a function of how many carbs you eat and carb ratio of the meal
  function calculatedBolus(carbs:number, ratio: number): number {
    return Math.round(carbs / ratio)
  }

  // Correction dosage is a function of current blood sugar(cbs) and insulin sensitivity
  function calculatedCorrection(cbs:number, sensitivity: number): number {
    let overTargetLevel = (cbs - targetBloodSugar) > 0 ? (cbs - targetBloodSugar) : 0
    return Math.round(overTargetLevel/ sensitivity)
  }

  // Parses a string and grabs the correct meal ratio from the DosageSetting object
  function getRatio(meal: string): number {
    switch (meal) {
      case 'breakfast':
        return dosage.ratio.breakfast;
      case 'lunch':
        return dosage.ratio.lunch;
      case 'dinner':
        return dosage.ratio.dinner;
      default:
        return 0;
    }
  }
  
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    console.log('Sumbitted!')
    event.preventDefault()
    const data = new FormData(event.currentTarget.value)
    let cbs = parseInt(data.get('current-blood-sugar-input-field') as string)
    let carbs = parseInt(data.get('carbohyudrates-input-field') as string)
    let meal = data.get('meal-selector') as string
    let cb = calculatedBolus(carbs, getRatio(meal))
    let cc = calculatedCorrection(cbs, dosage.sensitivity);
    const newAppState: AppState = {
      currentBloodSugar: cbs,
      carbohydrates: carbs,
      calculatedBolus: cb,
      calculatedCorrection: cc,
      dosage: cb + cc,
      isCaluclated: true
    }
    console.log(newAppState)
    setAppState(newAppState)
  }

  function handleReset(event: FormEvent<HTMLFormElement>): void {
    console.log('Reset!')
    event.preventDefault()
    setAppState(initialAppState)
  }

  return (
    <main className="flex flex-col">
      {appState.isCaluclated ? (
        <div>
          <h1>Dosage</h1>
          <div>{appState.dosage}</div>
          <hr />
        </div>
      ): (<></>)}
      <form onSubmit={handleSubmit} onReset={handleReset} className='flex flex-col m-auto'>
        <FormField id={'current-blood-sugar-input-field'} inputLabel={'Current Blood Sugar'} inputType={'number'} />
        <FormField id={'carbohydrates-input-field'} inputLabel={'Carbohydrates'} inputType={'number'} />
        <label>
          <select name='meal-selector' id='meal-selector' defaultValue={'dinner'}>
            <option value='breakfast'>Breakfast</option>
            <option value='lunch'>Lunch</option>
            <option value='dinner'>Dinner</option>
          </select>
        </label>
        <button type='submit'>Calculate Dosage</button>
        <button type='reset'>Reset Form</button>
      </form>
    </main>
  );
}
