import { createContext, PropsWithChildren } from "react"
import { Updater, useImmer } from "use-immer"

import { iForm } from "../models/Form"
import { iQuestion } from "../models/Question"

const FormContext = createContext<{
	form: iForm | null | undefined
	setForm: Updater<iForm>
	questions: iQuestion[] | null
	setQuestions: Updater<iQuestion[]>
}>({
	form: null,
	setForm: () => {},
	questions: null,
	setQuestions: () => {}
})

export const FormProvider = (props: PropsWithChildren<{}>) => {
	const [form, setForm] = useImmer<iForm | null | undefined>(undefined)
	const [questions, setQuestions] = useImmer<iQuestion[] | null>(null)

	return (
		<FormContext.Provider
			value={{
				form,
				setForm: setForm as Updater<iForm>,
				questions,
				setQuestions: setQuestions as Updater<iQuestion[]>
			}}>
			{props.children}
		</FormContext.Provider>
	)
}

export default FormContext
