import { iQuestionType } from "./"

export type iAnswer<T extends iQuestionType> = {
	id: string
	response_id: string | null
	question_id: string
} & (T extends "text" ? { text: string } : {}) &
	(T extends "paragraph" ? { paragraph: string } : {}) &
	(T extends "color" ? { color: string } : {}) &
	(T extends "choice" ? { choices: string[] } : {}) &
	(T extends "switch" ? { switch: boolean } : {}) &
	(T extends "slider" ? { slider: number } : {}) &
	(T extends "datetime" ? { datetime: string } : {}) &
	(T extends "table" ? { table: [string, string][] } : {})
