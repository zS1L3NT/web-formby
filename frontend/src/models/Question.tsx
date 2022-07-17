import { ModelWithTimestamps, WithTimestamps } from "./"
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
		? { table_columns: string[]; table_rows: string[]; table_type: "radio" | "checkbox" }
		: {})

export abstract class Question extends ModelWithTimestamps {
	constructor(
		id: string,
		public formId: string,
		public previousQuestionId: string | null,
		public title: string,
		public description: string | null,
		public photo: string | null,
		public required: boolean,
		public type: iQuestionType,
		createdAt: string,
		updatedAt: string
	) {
		super(id, createdAt, updatedAt)
	}

	static fromJson(json: WithTimestamps<iQuestionData<any>>): Question {
		if (json.type === "text") return new TextQuestion(json)
		if (json.type === "paragraph") return new ParagraphQuestion(json)
		if (json.type === "color") return new ColorQuestion(json)
		if (json.type === "choice") return new ChoiceQuestion(json as any)
		if (json.type === "switch") return new SwitchQuestion(json)
		if (json.type === "slider") return new SliderQuestion(json as any)
		if (json.type === "rating") return new RatingQuestion(json as any)
		if (json.type === "datetime") return new DateTimeQuestion(json)
		if (json.type === "table") return new TableQuestion(json as any)

		throw new Error("Unknown question type")
	}

	abstract toJson(): iQuestionData<iQuestionType>
}

export class TextQuestion extends Question {
	constructor(json: WithTimestamps<iQuestionData<"text">>) {
		super(
			json.id,
			json.form_id,
			json.previous_question_id,
			json.title,
			json.description,
			json.photo,
			json.required,
			"text",
			json.created_at,
			json.updated_at
		)
	}

	override toJson(): iQuestionData<"text"> {
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

export class ParagraphQuestion extends Question {
	constructor(json: WithTimestamps<iQuestionData<"paragraph">>) {
		super(
			json.id,
			json.form_id,
			json.previous_question_id,
			json.title,
			json.description,
			json.photo,
			json.required,
			"paragraph",
			json.created_at,
			json.updated_at
		)
	}

	override toJson(): iQuestionData<"paragraph"> {
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

export class ColorQuestion extends Question {
	constructor(json: WithTimestamps<iQuestionData<"color">>) {
		super(
			json.id,
			json.form_id,
			json.previous_question_id,
			json.title,
			json.description,
			json.photo,
			json.required,
			"color",
			json.created_at,
			json.updated_at
		)
	}

	override toJson(): iQuestionData<"color"> {
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

export class ChoiceQuestion extends Question {
	public choices: string[]
	public choiceType: "radio" | "checkbox" | "dropdown"

	constructor(json: WithTimestamps<iQuestionData<"choice">>) {
		super(
			json.id,
			json.form_id,
			json.previous_question_id,
			json.title,
			json.description,
			json.photo,
			json.required,
			"choice",
			json.created_at,
			json.updated_at
		)
		this.choices = json.choices
		this.choiceType = json.choice_type
	}

	override toJson(): iQuestionData<"choice"> {
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

export class SwitchQuestion extends Question {
	constructor(json: WithTimestamps<iQuestionData<"switch">>) {
		super(
			json.id,
			json.form_id,
			json.previous_question_id,
			json.title,
			json.description,
			json.photo,
			json.required,
			"switch",
			json.created_at,
			json.updated_at
		)
	}

	override toJson(): iQuestionData<"switch"> {
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

export class SliderQuestion extends Question {
	public sliderMin: number
	public sliderMax: number
	public sliderStep: number

	constructor(json: WithTimestamps<iQuestionData<"slider">>) {
		super(
			json.id,
			json.form_id,
			json.previous_question_id,
			json.title,
			json.description,
			json.photo,
			json.required,
			"slider",
			json.created_at,
			json.updated_at
		)
		this.sliderMin = json.slider_min
		this.sliderMax = json.slider_max
		this.sliderStep = json.slider_step
	}

	override toJson(): iQuestionData<"slider"> {
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

export class RatingQuestion extends Question {
	public ratingMax: number

	constructor(json: WithTimestamps<iQuestionData<"rating">>) {
		super(
			json.id,
			json.form_id,
			json.previous_question_id,
			json.title,
			json.description,
			json.photo,
			json.required,
			"rating",
			json.created_at,
			json.updated_at
		)
		this.ratingMax = json.rating_max
	}

	override toJson(): iQuestionData<"rating"> {
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

export class DateTimeQuestion extends Question {
	constructor(json: WithTimestamps<iQuestionData<"datetime">>) {
		super(
			json.id,
			json.form_id,
			json.previous_question_id,
			json.title,
			json.description,
			json.photo,
			json.required,
			"datetime",
			json.created_at,
			json.updated_at
		)
	}

	override toJson(): iQuestionData<"datetime"> {
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

export class TableQuestion extends Question {
	public tableColumns: string[]
	public tableRows: string[]
	public tableType: "radio" | "checkbox"

	constructor(json: WithTimestamps<iQuestionData<"table">>) {
		super(
			json.id,
			json.form_id,
			json.previous_question_id,
			json.title,
			json.description,
			json.photo,
			json.required,
			"table",
			json.created_at,
			json.updated_at
		)
		this.tableColumns = json.table_columns
		this.tableRows = json.table_rows
		this.tableType = json.table_type
	}

	override toJson(): iQuestionData<"table"> {
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
