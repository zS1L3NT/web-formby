import axios, { AxiosError, Method } from "axios"

import { WithTimestamps } from "../models"
import { iAnswerData } from "../models/Answer"
import { iQuestionData } from "../models/Question"
import { iUserData } from "../models/User"

type Routes = {
	"/answers": {
		POST: {
			body: {
				question: iQuestionData<any>[]
				answers: Omit<iAnswerData<any>, "id" | "user_id">[]
			}
		}
	}
	"/forms/{form_id}/answers": {
		GET: {
			parameters: ["form_id"]
			response: iAnswerData<any>[]
		}
	}
	"/register": {
		POST: {
			authentication: false
			body: {
				name: string
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
			body: Partial<iUserData>
			response: {
				message: string
				user: WithTimestamps<iUserData>
			}
		}
	}
}

export type ApiError = {
	type: string
	message: string
	stack?: any[]
	fields?: Record<string, string[]>
}

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
		(Routes[U][M] extends { authentication: infer A }
			? A extends true
				? { token: string }
				: {}
			: { token: string | undefined })
): Promise<[ApiError, null] | [null, R]> => {
	try {
		const url = Object.entries<string>(
			"parameters" in data ? (data as any).parameters : {}
		).reduce(
			(str, entry) => str.replace(`{${entry[0]}}`, entry[1]),
			`http://localhost:8000/api${data.url}`
		)

		return [
			null,
			(
				await axios({
					url,
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
		return [(e as AxiosError).response!.data as ApiError, null]
	}
}
