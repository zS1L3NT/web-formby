import axios, { AxiosError, Method } from "axios"
import { LIST, OBJECT, STRING, validate } from "validate-any"
import ObjectValidator from "validate-any/dist/validators/ObjectValidator"

import { WithTimestamps } from "../models"
import { iAnswerData } from "../models/Answer"
import { iFormData } from "../models/Form"
import { iQuestionData } from "../models/Question"
import { iUserData } from "../models/User"

type Routes = {
	"/answers": {
		POST: {
			body: Omit<iAnswerData<any>, "id" | "user_id">[]
			response: {
				message: string
			}
		}
	}
	"/forms": {
		GET: {
			authentication: true
			query: ["page"]
			response: WithTimestamps<iFormData>[]
		}
		POST: {
			authentication: true
			body: Omit<iFormData, "id" | "user_id">
			response: {
				message: string
			}
		}
	}
	"/forms/{form_id}": {
		GET: {
			parameters: ["form_id"]
			response: WithTimestamps<iFormData>
		}
		PUT: {
			authentication: true
			parameters: ["form_id"]
			body: Partial<Omit<iFormData, "id" | "user_id">>
			response: {
				message: string
			}
		}
		DELETE: {
			authentication: true
			parameters: ["form_id"]
			response: {
				message: string
			}
		}
	}
	"/forms/{form_id}/answers": {
		GET: {
			authentication: true
			parameters: ["form_id"]
			response: WithTimestamps<iAnswerData<any>>[]
		}
	}
	"/forms/{form_id}/questions": {
		GET: {
			parameters: ["form_id"]
			response: WithTimestamps<iQuestionData<any>>[]
		}
		POST: {
			authentication: true
			parameters: ["form_id"]
			body: Omit<iQuestionData<any>, "id" | "form_id">
			response: {
				message: string
			}
		}
	}
	"/forms/{form_id}/questions/{question_id}": {
		GET: {
			parameters: ["form_id", "question_id"]
			response: WithTimestamps<iQuestionData<any>>
		}
		PUT: {
			authentication: true
			parameters: ["form_id", "question_id"]
			body: Partial<Omit<iQuestionData<any>, "id" | "form_id" | "previous_question_id">>
			response: {
				message: string
			}
		}
		DELETE: {
			authentication: true
			parameters: ["form_id", "question_id"]
			response: {
				message: string
			}
		}
	}
	"/register": {
		POST: {
			authentication: false
			body: Partial<Omit<iUserData, "id"> & { password: string }>
			response: {
				message: string
				token: string
				user: WithTimestamps<iUserData>
			}
		}
	}
	"/login": {
		POST: {
			authentication: false
			body: {
				email: string
				password: string
			}
			response: {
				message: string
				token: string
				user: WithTimestamps<iUserData>
			}
		}
	}
	"/logout": {
		POST: {
			authentication: true
			response: {
				message: string
			}
		}
	}
	"/user": {
		GET: {
			authentication: true
			response: WithTimestamps<iUserData>
		}
		PUT: {
			authentication: true
			body: Partial<Omit<iUserData, "id"> & { password: string }>
			response: {
				message: string
				user: WithTimestamps<iUserData>
			}
		}
	}
}

type ApiError = {
	type: string
	message: string
	stack?: any[]
	fields?: Record<string, string[]>
}

const API_ERROR: ObjectValidator<ApiError> = OBJECT({
	type: STRING(),
	message: STRING(),
	stack: LIST(),
	fields: OBJECT()
})

export default async <
	U extends keyof Routes,
	M extends keyof Routes[U],
	R extends Routes[U][M] extends { response: infer R } ? R : never
>(
	data: {
		url: U
		method: M extends Method ? M : never
	} & (Routes[U][M] extends { body: infer B } ? { body: B } : {}) &
		(Routes[U][M] extends { parameters: infer P }
			? P extends string[]
				? { parameters: { [K in P[number]]: string } }
				: never
			: {}) &
		(Routes[U][M] extends { query: infer Q }
			? Q extends string[]
				? { query: { [K in Q[number]]: string } }
				: never
			: {}) &
		(Routes[U][M] extends { authentication: infer A }
			? A extends true
				? { token: string }
				: {}
			: { token: string | null })
): Promise<[ApiError, null] | [null, R]> => {
	try {
		const url = new URL(
			Object.entries<string>("parameters" in data ? (data as any).parameters : {}).reduce(
				(str, entry) => str.replace(`{${entry[0]}}`, entry[1]),
				`http://localhost:8000/api${data.url}`
			)
		)

		if ("query" in data) {
			for (const [key, value] of Object.entries<string>((data as any).query)) {
				url.searchParams.append(key, value)
			}
		}

		return [
			null,
			(
				await axios({
					url: url.href,
					method: data.method,
					data: "body" in data ? (data as any).body : undefined,
					headers:
						"token" in data
							? { Authorization: `Bearer ${(data as any).token}` }
							: undefined
				})
			).data as R
		]
	} catch (e) {
		const error = e as AxiosError

		const result = validate(error.response?.data, API_ERROR)
		if (result.success) {
			return [result.data, null]
		} else {
			return [
				{
					type: error.name,
					message: error.message
				},
				null
			]
		}
	}
}
