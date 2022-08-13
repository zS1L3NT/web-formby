import { iQuestionType } from "./"

export type iQuestion<T extends iQuestionType> = {
	id: string
	form_id: string
	previous_question_id: string | null
	title: string
	description: string | null
	photo: string | null
	required: boolean
	type: T
} & (T extends "choice"
	? {
			choices: string[]
			choice_type: "radio" | "checkbox" | "dropdown"
	  }
	: {}) &
	(T extends "slider"
		? {
				slider_min: number
				slider_max: number
				slider_step: number
		  }
		: {}) &
	(T extends "table"
		? {
				table_columns: string[]
				table_rows: string[]
				table_type: "radio" | "checkbox"
		  }
		: {})
