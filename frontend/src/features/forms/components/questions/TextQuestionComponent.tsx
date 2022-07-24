import { FC, useState } from "react"

import { Input } from "@chakra-ui/react"

import { TextQuestion } from "../../../../models/Question"
import { QuestionComponentProps } from "../QuestionComponent"

const TextQuestionComponent: FC<QuestionComponentProps<TextQuestion>> = props => {
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

export default TextQuestionComponent
