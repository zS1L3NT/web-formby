import {
	iAnswer, iChoiceAnswer, iColorAnswer, iDateTimeAnswer, iParagraphAnswer, iTableAnswer,
	iTextAnswer
} from "../models/Answer"
import { iQuestion } from "../models/Question"

/**
 * Gets an error message of whether an answer is valid
 *
 * @param question The question the {answer} is answering
 * @param answer The answer to get the errors of
 * @returns Either an error or null
 */
export const getAnswerError = (question: iQuestion, answer: Omit<iAnswer, "id">) => {
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

/**
 * Checks if the answer is considered empty
 * This is to filter questions that are empty before sending to the server
 *
 * @param question Question the {answer} is answering
 * @param answer The answer to check if it is empty
 * @returns A boolean of whether the answer is empty
 */
export const isAnswerEmpty = (question: iQuestion, answer: Omit<iAnswer, "id">) => {
	switch (question.type) {
		case "text":
			return (answer as iTextAnswer).text === ""
		case "paragraph":
			return (answer as iParagraphAnswer).paragraph === ""
		case "color":
			return (answer as iColorAnswer).color === ""
		case "choice":
			return (answer as iChoiceAnswer).choices.length === 0
		case "switch":
		case "slider":
			return false
		case "datetime":
			return (answer as iDateTimeAnswer).datetime === ""
		case "table":
			return question.table_rows
				.map<boolean>(
					tableRow => !!(answer as iTableAnswer).table.find(item => item[0] === tableRow)
				)
				.some(item => item === false)
	}
}
