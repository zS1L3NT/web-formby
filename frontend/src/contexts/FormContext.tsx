import { createContext, PropsWithChildren, useContext, useEffect } from "react"
import { Updater, useImmer } from "use-immer"

import { iAnswer } from "../models/Answer"
import { iForm } from "../models/Form"
import { iQuestion } from "../models/Question"
import AuthContext from "./AuthContext"

const FormContext = createContext<{
	form: iForm | null | undefined
	setForm: Updater<iForm | null>
	questions: iQuestion[] | null
	setQuestions: Updater<iQuestion[]>
	answers: Omit<iAnswer, "id">[] | null
	setAnswers: Updater<Omit<iAnswer, "id">[]>
}>({
	form: null,
	setForm: () => {},
	questions: null,
	setQuestions: () => {},
	answers: null,
	setAnswers: () => {}
})

export const FormProvider = ({ children }: PropsWithChildren<{}>) => {
	const { user } = useContext(AuthContext)

	const [form, setForm] = useImmer<iForm | null | undefined>(undefined)
	const [questions, setQuestions] = useImmer<iQuestion[] | null>(null)
	const [answers, setAnswers] = useImmer<Omit<iAnswer, "id">[] | null>(null)

	useEffect(() => {
		setAnswers(
			_ =>
				questions?.map<Omit<iAnswer, "id">>(question => {
					const answer = {
						user_id: user?.id ?? null,
						question_id: question.id
					}

					switch (question.type) {
						case "text":
							return { ...answer, text: "" }
						case "paragraph":
							return { ...answer, paragraph: "" }
						case "color":
							return { ...answer, color: "" }
						case "choice":
							return { ...answer, choices: [] }
						case "switch":
							return { ...answer, switch: false }
						case "slider":
							return { ...answer, slider: question.slider_min }
						case "datetime":
							return { ...answer, datetime: "" }
						case "table":
							return { ...answer, table: [] }
						default:
							throw new Error("Unknown question type")
					}
				}) ?? null
		)
	}, [user, questions])

	return (
		<FormContext.Provider
			value={{
				form,
				setForm: setForm as Updater<iForm | null>,
				questions,
				setQuestions: setQuestions as Updater<iQuestion[]>,
				answers,
				setAnswers: setAnswers as Updater<Omit<iAnswer, "id">[]>
			}}>
			{children}
		</FormContext.Provider>
	)
}

export default FormContext
