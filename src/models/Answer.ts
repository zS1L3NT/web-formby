import { iQuestionType } from "./"

export type iAnswer<T extends iQuestionType> = {
	id: string
	response_id: string | null
	question_id: string
	text: T extends "text" ? string : null
	paragraph: T extends "paragraph" ? string : null
	color: T extends "color" ? string : null
	choices: T extends "choice" ? string[] : null
	switch: T extends "switch" ? boolean : null
	slider: T extends "slider" ? number : null
	datetime: T extends "datetime" ? string : null
	table: T extends "table" ? [string, string][] : null
}
