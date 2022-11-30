import { iAnswer } from "../models/Answer"
import { iQuestion } from "../models/Question"

/**
 * Gets an error message of whether an answer is valid
 *
 * @param question The question the {answer} is answering
 * @param answer The answer to get the errors of
 * @returns Either an error or null
 */
export const getAnswerError = (
	question: iQuestion<any>,
	answer: Omit<iAnswer<any>, "id" | "response_id">
) => {
	switch (question.type) {
		case "text":
			if (question.required && isAnswerEmpty(question, answer)) {
				return "Text cannot be empty"
			}
			return null
		case "paragraph":
			if (question.required && isAnswerEmpty(question, answer)) {
				return "Paragraph cannot be empty"
			}
			return null
		case "color":
			if (question.required && isAnswerEmpty(question, answer)) {
				return "Color cannot be empty"
			}
			return null
		case "choice":
			if (question.required && isAnswerEmpty(question, answer)) {
				return "You must select at least 1 choice"
			}
			return null
		case "switch":
		case "slider":
			return null
		case "datetime":
			if (question.required && isAnswerEmpty(question, answer)) {
				return "DateTime cannot be empty"
			}
			return null
		case "table":
			if (question.required && isAnswerEmpty(question, answer)) {
				return "You have to select at least 1 choice per row"
			}
			return null
	}

	throw new Error("Unknown question type")
}

export const getEmptyAnswer = (
	question: iQuestion<any>
): Omit<iAnswer<any>, "id" | "response_id"> => {
	switch (question.type) {
		case "text":
			return <Omit<iAnswer<"text">, "id" | "response_id">>{
				question_id: question.id,
				text: ""
			}
		case "paragraph":
			return <Omit<iAnswer<"paragraph">, "id" | "response_id">>{
				question_id: question.id,
				paragraph: ""
			}
		case "color":
			return <Omit<iAnswer<"color">, "id" | "response_id">>{
				question_id: question.id,
				color: ""
			}
		case "choice":
			return <Omit<iAnswer<"choice">, "id" | "response_id">>{
				question_id: question.id,
				choices: <string[]>[]
			}
		case "switch":
			return <Omit<iAnswer<"switch">, "id" | "response_id">>{
				question_id: question.id,
				switch: false
			}
		case "slider":
			return <Omit<iAnswer<"slider">, "id" | "response_id">>{
				question_id: question.id,
				slider: (<iQuestion<"slider">>question).slider_min
			}
		case "datetime":
			return <Omit<iAnswer<"datetime">, "id" | "response_id">>{
				question_id: question.id,
				datetime: ""
			}
		case "table":
			return <Omit<iAnswer<"table">, "id" | "response_id">>{
				question_id: question.id,
				table: []
			}
		default:
			throw new Error("Unknown question type")
	}
}

/**
 * Checks if the answer is considered empty
 * This is to filter questions that are empty before sending to the server
 *
 * @param question Question the {answer} is answering
 * @param answer The answer to check if it is empty
 * @returns A boolean of whether the answer is empty
 */
export const isAnswerEmpty = (
	question: iQuestion<any>,
	answer: Omit<iAnswer<any>, "id" | "response_id">
) => {
	switch (question.type) {
		case "text":
			return (<iAnswer<"text">>answer).text === ""
		case "paragraph":
			return (<iAnswer<"paragraph">>answer).paragraph === ""
		case "color":
			return (<iAnswer<"color">>answer).color === ""
		case "choice":
			return (<iAnswer<"choice">>answer).choices.length === 0
		case "switch":
		case "slider":
			return false
		case "datetime":
			return (<iAnswer<"datetime">>answer).datetime === ""
		case "table":
			return (<iQuestion<"table">>question).table_rows
				.map<boolean>(
					tableRow =>
						!!(<iAnswer<"table">>answer).table.find(item => item[0] === tableRow)
				)
				.some(item => item === false)
	}

	throw new Error("Unknown question type")
}
