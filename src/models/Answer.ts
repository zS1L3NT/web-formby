type iBaseAnswer = {
	id: string
	user_id: string | null
	question_id: string
}

export type iAnswer =
	| iTextAnswer
	| iParagraphAnswer
	| iColorAnswer
	| iChoiceAnswer
	| iSwitchAnswer
	| iSliderAnswer
	| iDateTimeAnswer
	| iTableAnswer

export type iTextAnswer = iBaseAnswer & {
	text: string
}

export type iParagraphAnswer = iBaseAnswer & {
	paragraph: string
}

export type iColorAnswer = iBaseAnswer & {
	color: string
}

export type iChoiceAnswer = iBaseAnswer & {
	choices: string[]
}

export type iSwitchAnswer = iBaseAnswer & {
	switch: boolean
}

export type iSliderAnswer = iBaseAnswer & {
	slider: number
}

export type iDateTimeAnswer = iBaseAnswer & {
	datetime: string
}

export type iTableAnswer = iBaseAnswer & {
	table: [string, string][]
}
