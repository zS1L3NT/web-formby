import { iQuestionType } from "./Form"

export type iQuestionData<T extends iQuestionType> = {
	id: string
	form_id: string
	previous_question_id: string | null
	title: string
	description: string | null
	photo: string | null
	required: boolean
	type: T
} & (T extends "choice"
	? { choices: string[]; choice_type: "radio" | "checkbox" | "dropdown" }
	: {}) &
	(T extends "slider" ? { slider_min: number; slider_max: number; slider_step: number } : {}) &
	(T extends "rating" ? { rating_max: number } : {}) &
	(T extends "table"
		? { table_columns: string[]; table_rows: string[]; table_type: "radio" | "checkbox" | null }
		: {})

abstract class Question<T extends iQuestionType> {
	constructor(
		public id: string,
		public formId: string,
		public previousQuestionId: string | null,
		public title: string,
		public description: string | null,
		public photo: string | null,
		public required: boolean,
		public type: T
	) {}

	static fromJson<T extends iQuestionType>(): Question<T> {
		throw new Error()
	}

	abstract toJson(): iQuestionData<T>
}

export class TextQuestion extends Question<"text"> {
	toJson(): iQuestionData<"text"> {
		return {
			id: this.id,
			form_id: this.formId,
			previous_question_id: this.previousQuestionId,
			title: this.title,
			description: this.description,
			photo: this.photo,
			required: this.required,
			type: "text"
		}
	}
}

export class ParagraphQuestion extends Question<"paragraph"> {
	toJson(): iQuestionData<"paragraph"> {
		return {
			id: this.id,
			form_id: this.formId,
			previous_question_id: this.previousQuestionId,
			title: this.title,
			description: this.description,
			photo: this.photo,
			required: this.required,
			type: "paragraph"
		}
	}
}

export class ColorQuestion extends Question<"color"> {
	toJson(): iQuestionData<"color"> {
		return {
			id: this.id,
			form_id: this.formId,
			previous_question_id: this.previousQuestionId,
			title: this.title,
			description: this.description,
			photo: this.photo,
			required: this.required,
			type: "color"
		}
	}
}

export class ChoiceQuestion extends Question<"choice"> {
	constructor(
		id: string,
		formId: string,
		previousQuestionId: string | null,
		title: string,
		description: string | null,
		photo: string | null,
		required: boolean,
		type: "choice",
		public choices: string[],
		public choiceType: "radio" | "checkbox" | "dropdown"
	) {
		super(id, formId, previousQuestionId, title, description, photo, required, type)
	}

	toJson(): iQuestionData<"choice"> {
		return {
			id: this.id,
			form_id: this.formId,
			previous_question_id: this.previousQuestionId,
			title: this.title,
			description: this.description,
			photo: this.photo,
			required: this.required,
			type: "choice",
			choices: this.choices,
			choice_type: this.choiceType
		}
	}
}

export class SwitchQuestion extends Question<"switch"> {
	toJson(): iQuestionData<"switch"> {
		return {
			id: this.id,
			form_id: this.formId,
			previous_question_id: this.previousQuestionId,
			title: this.title,
			description: this.description,
			photo: this.photo,
			required: this.required,
			type: "switch"
		}
	}
}

export class SliderQuestion extends Question<"slider"> {
	constructor(
		id: string,
		formId: string,
		previousQuestionId: string | null,
		title: string,
		description: string | null,
		photo: string | null,
		required: boolean,
		type: "slider",
		public sliderMin: number,
		public sliderMax: number,
		public sliderStep: number
	) {
		super(id, formId, previousQuestionId, title, description, photo, required, type)
	}

	toJson(): iQuestionData<"slider"> {
		return {
			id: this.id,
			form_id: this.formId,
			previous_question_id: this.previousQuestionId,
			title: this.title,
			description: this.description,
			photo: this.photo,
			required: this.required,
			type: "slider",
			slider_min: this.sliderMin,
			slider_max: this.sliderMax,
			slider_step: this.sliderStep
		}
	}
}

export class RatingQuestion extends Question<"rating"> {
	constructor(
		id: string,
		formId: string,
		previousQuestionId: string | null,
		title: string,
		description: string | null,
		photo: string | null,
		required: boolean,
		type: "rating",
		public ratingMax: number
	) {
		super(id, formId, previousQuestionId, title, description, photo, required, type)
	}

	toJson(): iQuestionData<"rating"> {
		return {
			id: this.id,
			form_id: this.formId,
			previous_question_id: this.previousQuestionId,
			title: this.title,
			description: this.description,
			photo: this.photo,
			required: this.required,
			type: "rating",
			rating_max: this.ratingMax
		}
	}
}

export class DateTimeQuestion extends Question<"datetime"> {
	toJson(): iQuestionData<"datetime"> {
		return {
			id: this.id,
			form_id: this.formId,
			previous_question_id: this.previousQuestionId,
			title: this.title,
			description: this.description,
			photo: this.photo,
			required: this.required,
			type: "datetime"
		}
	}
}

export class TableQuestion extends Question<"table"> {
	constructor(
		id: string,
		formId: string,
		previousQuestionId: string | null,
		title: string,
		description: string | null,
		photo: string | null,
		required: boolean,
		type: "table",
		public tableColumns: string[],
		public tableRows: string[],
		public tableType: "radio" | "checkbox"
	) {
		super(id, formId, previousQuestionId, title, description, photo, required, type)
	}

	toJson(): iQuestionData<"table"> {
		return {
			id: this.id,
			form_id: this.formId,
			previous_question_id: this.previousQuestionId,
			title: this.title,
			description: this.description,
			photo: this.photo,
			required: this.required,
			type: "table",
			table_columns: this.tableColumns,
			table_rows: this.tableRows,
			table_type: this.tableType
		}
	}
}
