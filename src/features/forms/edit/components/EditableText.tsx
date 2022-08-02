import { createRef, useEffect, useState } from "react"

import { Box, Text, TextProps, useBoolean } from "@chakra-ui/react"

const EditableText = ({
	required,
	text,
	setText,
	placeholder,
	variant,
	...style
}: {
	required?: boolean
	text: string
	setText: (text: string) => void
	placeholder?: string
	variant?: "description"
} & TextProps) => {
	const textRef = createRef<HTMLParagraphElement>()

	const [editing, setEditing] = useBoolean()
	const [newText, setNewText] = useState(text)

	useEffect(() => {
		if (textRef.current && !editing && text !== newText) {
			if (newText === "") {
				setNewText(text)
				textRef.current!.innerText = text
			} else {
				setText(newText)
			}
		}
	}, [textRef, text, setText, editing, newText])

	return (
		<Box pos="relative">
			<Text
				ref={textRef}
				suppressContentEditableWarning={true}
				textAlign="left"
				contentEditable={true}
				onFocus={setEditing.on}
				onBlur={setEditing.off}
				color="text"
				// Delay so the collapse buttons still have the click event before unmounting
				rounded="lg"
				outline="none"
				borderWidth="2px"
				borderColor={editing ? "primary" : "transparent"}
				transition="background-color 0.3s, border-color 0.3s"
				_hover={{
					bg: !editing ? "highlight" : "card",
					cursor: "text"
				}}
				onInput={e => setNewText(e.currentTarget.innerText)}
				opacity={!editing && text === "" ? 0.5 : 1}
				{...style}>
				{!editing && text === "" ? placeholder : text}
			</Text>

			{editing && newText === "" ? (
				<Text
					{...style}
					color="text"
					textAlign="left"
					pos="absolute"
					top={0}
					m="2px"
					opacity="0.5">
					{placeholder}
				</Text>
			) : null}
		</Box>
	)
}

export default EditableText
