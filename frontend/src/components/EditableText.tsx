import { FC, PropsWithChildren, useState } from "react"

import { CheckIcon, CloseIcon } from "@chakra-ui/icons"
import {
	ButtonGroup, ChakraProps, Collapse, ColorProps, IconButton, Text, TypographyProps, useBoolean
} from "@chakra-ui/react"

const EditableText: FC<
	PropsWithChildren<{
		editable: boolean
		text: string
		setText: (text: string) => void
		placeholder?: string
		fontWeight?: TypographyProps["fontWeight"]
		fontSize?: TypographyProps["fontSize"]
		color?: ColorProps["color"]
		noOfLines?: ChakraProps["noOfLines"]
	}>
> = props => {
	const { editable, text, setText, ...style } = props

	const [editing, setEditing] = useBoolean()
	const [newText, setNewText] = useState(text)

	return (
		<>
			<Text
				textAlign="left"
				contentEditable={editable}
				onFocus={setEditing.on}
				// Delay so the collapse buttons still have the click event before unmounting
				onBlur={() => setTimeout(setEditing.off, 100)}
				rounded="lg"
				outline="none"
				borderWidth="2px"
				borderColor={editing ? "blue.500" : "transparent"}
				transition="background-color 0.3s, border-color 0.3s"
				_hover={{
					bg: editing ? "white" : editable ? "gray.100" : "white"
				}}
				onInput={e => setNewText(e.currentTarget.innerText)}
				{...style}>
				{text}
			</Text>

			<Collapse
				in={editing}
				animate>
				<ButtonGroup
					justifyContent="end"
					size="sm"
					w="full"
					spacing={2}
					mt={2}>
					<IconButton
						aria-label="close"
						icon={<CloseIcon boxSize={3} />}
						onClick={() => setNewText(text)}
					/>
					<IconButton
						aria-label="check"
						icon={<CheckIcon />}
						onClick={() => setText(newText)}
					/>
				</ButtonGroup>
			</Collapse>
		</>
	)
}

export default EditableText
