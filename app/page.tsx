'use client'
import FormButton from '$/components/atoms/FormButton'
import FormField from '$/components/atoms/FormInputField'
import FormSelectField from '$/components/atoms/FormSelectField'
import { Treatment, Dosage, Meal } from '$/data'
import useTreatment from '$/hooks/useTreatment'
import { zeroForNaN } from '$/utils/zeroForNaN'
import { ChangeEvent, FormEvent, useCallback, useState } from 'react'

interface AppState {
  currentBloodSugar: number
  carbohydrates: number
  meal: Meal
  isCaluclated: boolean
}

// App Constants
const treatment: Treatment = {
  id: 1,
  dosage: [
    {
      meal: Meal.NoMeal,
      ratio: 0,
    },
    {
      meal: Meal.Breakfast,
      ratio: 3,
    },
    {
      meal: Meal.Lunch,
      ratio: 3,
    },
    {
      meal: Meal.Dinner,
      ratio: 1.5,
    },
  ],
  sensitivity: 5,
}

const initialAppState: AppState = {
  currentBloodSugar: 0,
  carbohydrates: 0,
  meal: Meal.NoMeal,
  isCaluclated: false,
}

export default function Home() {
  const [appState, setAppState] = useState<AppState>(initialAppState)
  const { getDose } = useTreatment({ treatment })

  const dose = useCallback((): string => {
    let result = getDose(appState.meal, appState.currentBloodSugar, appState.carbohydrates)
    return result.toString()
  }, [getDose, appState.meal, appState.currentBloodSugar, appState.carbohydrates])

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
            <div>Current Bloodsugar: {appState.currentBloodSugar}</div>
            <div>Carbs: {appState.carbohydrates}</div>
            <div>Meal: {appState.meal}</div>
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
              options={treatment.dosage.map((dosage) => {
                return { value: dosage.meal, label: dosage.meal }
              })}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setAppState((prevState) => ({
                  ...prevState,
                  meal: e.target.value as Meal,
                }))
              }}
              value={appState.meal}
            />
            {appState.meal != Meal.NoMeal && (
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
            <span className={'text-center text-lime-200 text-3xl'}>{dose()} units</span>
            <FormButton type="reset">Reset Form</FormButton>
          </>
        )}
      </form>
    </main>
  )
}
