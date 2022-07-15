import axios, { AxiosError, Method } from "axios"

import { WithTimestamps } from "../models"
import { iUserData } from "../models/User"

type Routes = {
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
			body: null
			response: {
				message: string
			}
		}
	}
	"/user": {
		GET: {
			authentication: true
			body: null
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
	} & (Routes[U][M] extends { body: infer B } ? (B extends object ? { body: B } : {}) : never) &
		(Routes[U][M] extends { authentication: infer A }
			? A extends true
				? { token: string }
				: {}
			: never)
): Promise<[ApiError, null] | [null, R]> => {
	try {
		return [
			null,
			(
				await axios({
					url: `http://localhost:8000/api${data.url}`,
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
