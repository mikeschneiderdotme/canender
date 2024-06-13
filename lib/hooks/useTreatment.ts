import { Treatment, Dosage, Meal } from "$/data"


interface Props {
    treatment: Treatment
}

interface TreatmentProps {
    getDose: (meal: Meal, currentBloodSugar: number, carbs?: number) => number,
}

function useTreatment({ treatment }: Props): TreatmentProps {
    const targetBloodSugar = 100
    const dosages: Dosage[] = treatment.dosage

    const getBolus = (ratio: number, carbs: number) => {
        return Math.round(carbs / ratio)
    }

    const getCorrection = (sensitivity: number, currentBloodSugar: number) => {
        let overTargetLevel = currentBloodSugar - targetBloodSugar > 0 ? currentBloodSugar - targetBloodSugar : 0
        return Math.round(overTargetLevel / sensitivity)
    }

    const getDose = (meal: Meal, currentBloodSugar: number, carbs?: number): number => {
        const { ratio } = dosages.find((dosage) => dosage.meal === meal ) as Dosage
        const correction = getCorrection(treatment.sensitivity, currentBloodSugar)
        const bolus = getBolus(ratio, carbs ? carbs : 0)

        if (meal === Meal.NoMeal) {
            return correction
        } else {
            return correction + bolus
        }
    }

    return { getDose }
}
export default useTreatment