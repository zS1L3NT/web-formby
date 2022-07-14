import axios, { Method } from "axios"

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
				user: iUserData
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
				user: iUserData
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
	"/show": {
		GET: {
			authentication: true
			body: null
			response: iUserData
		}
	}
	"/update": {
		PUT: {
			authentication: true
			body: Partial<Omit<iUserData, "created_at" | "updated_at">>
			response: {
				message: string
				user: iUserData
			}
		}
	}
}

export default async <U extends keyof Routes, M extends keyof Routes[U]>(
	data: {
		url: U
		method: M extends Method ? M : never
	} & (Routes[U][M] extends { body: infer B } ? (B extends object ? { body: B } : {}) : never) &
		(Routes[U][M] extends { authentication: infer A }
			? A extends true
				? { token: string }
				: {}
			: never)
) => {
	const res = await axios({
		url: `http://localhost:8000/api${data.url}`,
		method: data.method,
		data: "body" in data ? (data as any).body : undefined,
		headers: "token" in data ? { Authorization: `Bearer ${(data as any).token}` } : undefined
	})

	return res.data as Routes[U][M] extends { response: infer R } ? R : never
}
