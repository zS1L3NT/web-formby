import { ModelWithTimestamps, WithTimestamps } from "./"
import { iQuestionType } from "./Form"

export type iAnswerData<T extends iQuestionType> = {
	id: string
	user_id: string
	question_id: string
} & (T extends "text" ? { text: string } : {}) &
	(T extends "paragraph" ? { paragraph: string } : {}) &
	(T extends "color" ? { color: string } : {}) &
	(T extends "choice" ? { choices: string[] } : {}) &
	(T extends "switch" ? { switch: boolean } : {}) &
	(T extends "slider" ? { slider: number } : {}) &
	(T extends "rating" ? { rating: number } : {}) &
	(T extends "datetime" ? { date: any; time: any } : {}) &
	(T extends "table" ? { table: [string, string][] } : {})

export abstract class Answer extends ModelWithTimestamps {
	constructor(
		id: string,
		public userId: string,
		public questionId: string,
		createdAt: string,
		updatedAt: string
	) {
		super(id, createdAt, updatedAt)
	}

	static fromJson(json: WithTimestamps<iAnswerData<any>>): Answer {
		if ("text" in json) return new TextAnswer(json)
		if ("paragraph" in json) return new ParagraphAnswer(json)
		if ("color" in json) return new ColorAnswer(json)
		if ("choice" in json) return new ChoiceAnswer(json)
		if ("switch" in json) return new SwitchAnswer(json)
		if ("slider" in json) return new SliderAnswer(json)
		if ("rating" in json) return new RatingAnswer(json)
		if ("date" in json && "time" in json) return new DateTimeAnswer(json)
		if ("table" in json) return new TableAnswer(json)

		throw new Error("Unknown answer type")
	}

	abstract toJson(): iAnswerData<iQuestionType>
}

export class TextAnswer extends Answer {
	public text: string

	constructor(json: WithTimestamps<iAnswerData<"text">>) {
		super(json.id, json.user_id, json.question_id, json.created_at, json.updated_at)
		this.text = json.text
	}

	override toJson(): iAnswerData<"text"> {
		return {
			id: this.id,
			user_id: this.userId,
			question_id: this.questionId,
			text: this.text
		}
	}
}

export class ParagraphAnswer extends Answer {
	public paragraph: string

	constructor(json: WithTimestamps<iAnswerData<"paragraph">>) {
		super(json.id, json.user_id, json.question_id, json.created_at, json.updated_at)
		this.paragraph = json.paragraph
	}

	override toJson(): iAnswerData<"paragraph"> {
		return {
			id: this.id,
			user_id: this.userId,
			question_id: this.questionId,
			paragraph: this.paragraph
		}
	}
}

export class ColorAnswer extends Answer {
	public color: string

	constructor(json: WithTimestamps<iAnswerData<"color">>) {
		super(json.id, json.user_id, json.question_id, json.created_at, json.updated_at)
		this.color = json.color
	}

	override toJson(): iAnswerData<"color"> {
		return {
			id: this.id,
			user_id: this.userId,
			question_id: this.questionId,
			color: this.color
		}
	}
}

export class ChoiceAnswer extends Answer {
	public choices: string[]

	constructor(json: WithTimestamps<iAnswerData<"choice">>) {
		super(json.id, json.user_id, json.question_id, json.created_at, json.updated_at)
		this.choices = json.choices
	}

	override toJson(): iAnswerData<"choice"> {
		return {
			id: this.id,
			user_id: this.userId,
			question_id: this.questionId,
			choices: this.choices
		}
	}
}

export class SwitchAnswer extends Answer {
	public switch: boolean

	constructor(json: WithTimestamps<iAnswerData<"switch">>) {
		super(json.id, json.user_id, json.question_id, json.created_at, json.updated_at)
		this.switch = json.switch
	}

	override toJson(): iAnswerData<"switch"> {
		return {
			id: this.id,
			user_id: this.userId,
			question_id: this.questionId,
			switch: this.switch
		}
	}
}

export class SliderAnswer extends Answer {
	public slider: number

	constructor(json: WithTimestamps<iAnswerData<"slider">>) {
		super(json.id, json.user_id, json.question_id, json.created_at, json.updated_at)
		this.slider = json.slider
	}

	override toJson(): iAnswerData<"slider"> {
		return {
			id: this.id,
			user_id: this.userId,
			question_id: this.questionId,
			slider: this.slider
		}
	}
}

export class RatingAnswer extends Answer {
	public rating: number

	constructor(json: WithTimestamps<iAnswerData<"rating">>) {
		super(json.id, json.user_id, json.question_id, json.created_at, json.updated_at)
		this.rating = json.rating
	}

	override toJson(): iAnswerData<"rating"> {
		return {
			id: this.id,
			user_id: this.userId,
			question_id: this.questionId,
			rating: this.rating
		}
	}
}

export class DateTimeAnswer extends Answer {
	public date: any
	public time: any

	constructor(json: WithTimestamps<iAnswerData<"datetime">>) {
		super(json.id, json.user_id, json.question_id, json.created_at, json.updated_at)
		this.date = json.date
		this.time = json.time
	}

	override toJson(): iAnswerData<"datetime"> {
		return {
			id: this.id,
			user_id: this.userId,
			question_id: this.questionId,
			date: this.date,
			time: this.time
		}
	}
}

export class TableAnswer extends Answer {
	public table: [string, string][]

	constructor(json: WithTimestamps<iAnswerData<"table">>) {
		super(json.id, json.user_id, json.question_id, json.created_at, json.updated_at)
		this.table = json.table
	}

	override toJson(): iAnswerData<"table"> {
		return {
			id: this.id,
			user_id: this.userId,
			question_id: this.questionId,
			table: this.table
		}
	}
}
