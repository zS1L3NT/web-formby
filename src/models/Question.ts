type iBaseQuestion = {
	id: string
	form_id: string
	previous_question_id: string | null
	title: string
	description: string | null
	photo: string | null
	required: boolean
}

export type iQuestion =
	| iTextQuestion
	| iParagraphQuestion
	| iColorQuestion
	| iChoiceQuestion
	| iSwitchQuestion
	| iSliderQuestion
	| iDateTimeQuestion
	| iTableQuestion

export type iTextQuestion = iBaseQuestion & {
	type: "text"
}

export type iParagraphQuestion = iBaseQuestion & {
	type: "paragraph"
}

export type iColorQuestion = iBaseQuestion & {
	type: "color"
}

export type iChoiceQuestion = iBaseQuestion & {
	type: "choice"
	choices: string[]
	choice_type: "radio" | "checkbox" | "dropdown"
}

export type iSwitchQuestion = iBaseQuestion & {
	type: "switch"
}

export type iSliderQuestion = iBaseQuestion & {
	type: "slider"
	slider_min: number
	slider_max: number
	slider_step: number
}

export type iDateTimeQuestion = iBaseQuestion & {
	type: "datetime"
}

export type iTableQuestion = iBaseQuestion & {
	type: "table"
	table_columns: string[]
	table_rows: string[]
	table_type: "radio" | "checkbox"
}
