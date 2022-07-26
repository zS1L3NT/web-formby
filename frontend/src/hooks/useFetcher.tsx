import axios, { AxiosError, Method } from "axios"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { LIST, OBJECT, OR, STRING, UNDEFINED, validate } from "validate-any"
import ObjectValidator from "validate-any/dist/validators/ObjectValidator"

import { useToast } from "@chakra-ui/react"

import AuthContext from "../contexts/AuthContext"
import { WithTimestamps } from "../models"
import { iAnswer } from "../models/Answer"
import { iForm } from "../models/Form"
import { iQuestion } from "../models/Question"
import { iUser } from "../models/User"

type Routes = {
	"/answers": {
		POST: {
			body: Omit<iAnswer, "id" | "user_id">[]
			response: {
				message: string
			}
		}
	}
	"/forms": {
		GET: {
			authentication: true
			query: ["page"]
			response: WithTimestamps<iForm>[]
		}
		POST: {
			authentication: true
			body: Omit<iForm, "id" | "user_id">
			response: {
				message: string
				form: WithTimestamps<iForm>
			}
		}
	}
	"/forms/{form_id}": {
		GET: {
			parameters: ["form_id"]
			response: WithTimestamps<iForm>
		}
		PUT: {
			authentication: true
			parameters: ["form_id"]
			body: Partial<Omit<iForm, "id" | "user_id">>
			response: {
				message: string
				form: WithTimestamps<iForm>
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
			response: WithTimestamps<iAnswer>[]
		}
	}
	"/forms/{form_id}/questions": {
		GET: {
			parameters: ["form_id"]
			response: WithTimestamps<iQuestion>[]
		}
		POST: {
			authentication: true
			parameters: ["form_id"]
			body: Omit<iQuestion, "id" | "form_id">
			response: {
				message: string
				question: WithTimestamps<iQuestion>
			}
		}
	}
	"/forms/{form_id}/questions/{question_id}": {
		GET: {
			parameters: ["form_id", "question_id"]
			response: WithTimestamps<iQuestion>
		}
		PUT: {
			authentication: true
			parameters: ["form_id", "question_id"]
			body: Partial<Omit<iQuestion, "id" | "form_id">>
			response: {
				message: string
				question: WithTimestamps<iQuestion>
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
			body: Partial<Omit<iUser, "id"> & { password: string }>
			response: {
				message: string
				token: string
				user: WithTimestamps<iUser>
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
				user: WithTimestamps<iUser>
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
			response: WithTimestamps<iUser>
		}
		PUT: {
			authentication: true
			body: Partial<Omit<iUser, "id"> & { password: string }>
			response: {
				message: string
				user: WithTimestamps<iUser>
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
	stack: OR(LIST(), UNDEFINED()),
	fields: OR(OBJECT(), UNDEFINED())
})

export default () => {
	const { setToken, setUser } = useContext(AuthContext)
	const navigate = useNavigate()
	const toast = useToast()

	return async <
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
				: { token: string | null }),
		onError?: {
			redirect?: boolean
			toast?: boolean
		}
	): Promise<{ data: R; error: ApiError | null } | { data: R | null; error: ApiError }> => {
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

			return {
				data: (
					await axios({
						url: url.href,
						method: data.method,
						data: "body" in data ? (data as any).body : undefined,
						headers:
							"token" in data
								? { Authorization: `Bearer ${(data as any).token}` }
								: undefined
					})
				).data as R,
				error: null
			}
		} catch (e) {
			const error = e as AxiosError
			console.error(error)

			const result = validate(error.response?.data, API_ERROR)
			const apiError = {
				type: result.data?.type ?? error.name,
				message: result.data?.message ?? error.message,
				stack: result.data?.stack,
				fields: result.data?.fields
			}

			if (onError?.toast === undefined || onError.toast) {
				toast({
					title: apiError.type,
					description: apiError.message,
					status: "error",
					isClosable: true
				})
			}

			if (error.response?.status === 403) {
				setToken(null)
				setUser(null)
				if (onError?.redirect === undefined || onError.toast) {
					navigate("/login")
				}
			}

			return {
				data: null,
				error: apiError
			}
		}
	}
}
