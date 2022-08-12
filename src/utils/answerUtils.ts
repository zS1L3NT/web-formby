import {
	iAnswer, iChoiceAnswer, iColorAnswer, iDateTimeAnswer, iParagraphAnswer, iSliderAnswer,
	iSwitchAnswer, iTableAnswer, iTextAnswer
} from "../models/Answer"
import { iQuestion } from "../models/Question"

/**
 * Gets an error message of whether an answer is valid
 *
 * @param question The question the {answer} is answering
 * @param answer The answer to get the errors of
 * @returns Either an error or null
 */
export const getAnswerError = (question: iQuestion, answer: Omit<iAnswer, "id" | "response_id">) => {
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
}

export const getEmptyAnswer = (question: iQuestion): Omit<iAnswer, "id" | "response_id"> => {
	switch (question.type) {
		case "text":
			return <Omit<iTextAnswer, "id" | "response_id">>{
				question_id: question.id,
				text: ""
			}
		case "paragraph":
			return <Omit<iParagraphAnswer, "id" | "response_id">>{
				question_id: question.id,
				paragraph: ""
			}
		case "color":
			return <Omit<iColorAnswer, "id" | "response_id">>{
				question_id: question.id,
				color: ""
			}
		case "choice":
			return <Omit<iChoiceAnswer, "id" | "response_id">>{
				question_id: question.id,
				choices: <string[]>[]
			}
		case "switch":
			return <Omit<iSwitchAnswer, "id" | "response_id">>{
				question_id: question.id,
				switch: false
			}
		case "slider":
			return <Omit<iSliderAnswer, "id" | "response_id">>{
				question_id: question.id,
				slider: question.slider_min
			}
		case "datetime":
			return <Omit<iDateTimeAnswer, "id" | "response_id">>{
				question_id: question.id,
				datetime: ""
			}
		case "table":
			return <Omit<iTableAnswer, "id" | "response_id">>{
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
export const isAnswerEmpty = (question: iQuestion, answer: Omit<iAnswer, "id" | "response_id">) => {
	switch (question.type) {
		case "text":
			return (<iTextAnswer>answer).text === ""
		case "paragraph":
			return (<iParagraphAnswer>answer).paragraph === ""
		case "color":
			return (<iColorAnswer>answer).color === ""
		case "choice":
			return (<iChoiceAnswer>answer).choices.length === 0
		case "switch":
		case "slider":
			return false
		case "datetime":
			return (<iDateTimeAnswer>answer).datetime === ""
		case "table":
			return question.table_rows
				.map<boolean>(
					tableRow => !!(<iTableAnswer>answer).table.find(item => item[0] === tableRow)
				)
				.some(item => item === false)
	}
}
