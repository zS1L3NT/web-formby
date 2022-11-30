export type iQuestionType =
	| "text"
	| "paragraph"
	| "color"
	| "choice"
	| "switch"
	| "slider"
	| "datetime"
	| "table"

export type WithTimestamps<T> = T & {
	created_at: string
	updated_at: string
}
