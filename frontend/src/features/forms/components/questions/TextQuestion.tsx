import { FC, useState } from "react"

import { Input } from "@chakra-ui/react"

import { iTextQuestion } from "../../../../models/Question"
import { QuestionProps } from "../Question"

const TextQuestion: FC<QuestionProps<iTextQuestion>> = props => {
	const { editable } = props

	const [text, setText] = useState("")

	return (
		<Input
			value={text}
			onChange={e => setText(e.target.value)}
			placeholder="Text answer"
			disabled={editable}
		/>
	)
}

export default TextQuestion
