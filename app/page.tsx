'use client'
import FormButton from '$/components/atoms/FormButton'
import FormField from '$/components/atoms/FormInputField'
import FormSelectField from '$/components/atoms/FormSelectField'
import { zeroForNaN } from '$/utils/zeroForNaN'
import { ChangeEvent, FormEvent, useCallback, useState } from 'react'

interface Ratio {
  label: string
  value: number
}

// App types
interface DosageSettings {
  ratios: Ratio[]
  // Insulin sensitivity is a value that represents how much your blood sugar drops per
  // unit of insulin given to the patient. Usually a ratio of insulin : blood sugar decrease
  // written as 1:x where x is the sensitivity value that is stored here.
  sensitivity: number
}

interface AppState {
  currentBloodSugar: number
  carbohydrates: number
  mealRatio: Ratio
  isCaluclated: boolean
}

// App Constants
const dosage: DosageSettings = {
  ratios: [
    {
      label: 'No Meal',
      value: 0,
    },
    {
      label: 'Breakfast',
      value: 3,
    },
    {
      label: 'Lunch',
      value: 3,
    },
    {
      label: 'Dinner',
      value: 1.5,
    },
  ],
  sensitivity: 8,
}

const targetBloodSugar: number = 100

const initialAppState: AppState = {
  currentBloodSugar: 0,
  carbohydrates: 0,
  mealRatio: dosage.ratios[0],
  isCaluclated: false,
}

export default function Home() {
  const [appState, setAppState] = useState<AppState>(initialAppState)

  // Bolus dosage is a function of how many carbs you eat and carb ratio of the meal
  function calculatedBolus(carbs: number, ratio: number): number {
    return Math.round(carbs / ratio)
  }

  function findRatio(meal: string): Ratio {
    let retrieved = dosage.ratios.find((ratio) => {
      if (ratio.label === meal) return ratio
    })

    return retrieved ? retrieved : dosage.ratios[0]
  }

  // Correction dosage is a function of current blood sugar(cbs) and insulin sensitivity
  function calculatedCorrection(cbs: number): number {
    let overTargetLevel = cbs - targetBloodSugar > 0 ? cbs - targetBloodSugar : 0
    return Math.round(overTargetLevel / dosage.sensitivity)
  }

  // Callback to manage the calculated Dosage of the application
  const calculatedDosage = useCallback(() => {
    return (
      zeroForNaN(calculatedBolus(appState.carbohydrates, appState.mealRatio.value)) +
      zeroForNaN(calculatedCorrection(appState.currentBloodSugar))
    )
  }, [appState.carbohydrates, appState.currentBloodSugar, appState.mealRatio])

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    console.log('Sumbitted!')
    event.preventDefault()
    setAppState((prevState) => ({ ...prevState, isCaluclated: true }))
  }

  function handleReset(event: FormEvent<HTMLFormElement>): void {
    console.log('Reset!')
    event.preventDefault()
    setAppState(initialAppState)
  }

  return (
    <main>
      {/* Dev and Debug Render Block */}
      {process.env.NODE_ENV === 'development' && (
        <div className="flex flex-col gap-2 text-white">
          <div className="flex flex-col mx-auto w-fit">
            <div>CBS: {appState.currentBloodSugar}</div>
            <div>Carbs: {appState.carbohydrates}</div>
            <div>Meal Ratio: {appState.mealRatio.value}</div>
            <div>isCaluclated: {appState.isCaluclated ? 'true' : 'false'}</div>
          </div>
          <hr />
        </div>
      )}
      {/* Form Render Block */}
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className={
          'flex flex-col gap-2 shadow-md bg-slate-500 rounded-md min-h-40 justify-center p-4 mx-auto my-4 max-w-sm'
        }
      >
        <h1 className={'text-2xl text-center text-amber-100'}>Dosage Calculator</h1>
        {!appState.isCaluclated ? (
          <>
            <FormField
              id={'current-blood-sugar-input-field'}
              label={'Current Blood Sugar'}
              inputType={'number'}
              handleChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.target.id
                setAppState((prevState) => ({
                  ...prevState,
                  currentBloodSugar: zeroForNaN(e.target.value),
                }))
              }}
              value={appState.currentBloodSugar.toString()}
            />
            <FormSelectField
              name={'meal-selector'}
              label={'Meal'}
              options={dosage.ratios.map((ratio) => {
                return { value: ratio.label, label: ratio.label }
              })}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setAppState((prevState) => ({
                  ...prevState,
                  mealRatio: findRatio(e.target.value),
                }))
              }}
              value={appState.mealRatio.label}
            />
            {appState.mealRatio.value != 0 && (
              <FormField
                id={'carbohydrates-input-field'}
                label={'Carbohydrates'}
                inputType={'number'}
                handleChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setAppState((prevState) => ({
                    ...prevState,
                    carbohydrates: zeroForNaN(e.target.value),
                  }))
                }}
                value={appState.carbohydrates.toString()}
              />
            )}
            <FormButton type="submit">Calculate Dosage</FormButton>
          </>
        ) : (
          <>
            <span className={'text-center text-lime-200 text-3xl'}>{calculatedDosage()} units</span>
            <FormButton type="reset">Reset Form</FormButton>
          </>
        )}
      </form>
    </main>
  )
}
