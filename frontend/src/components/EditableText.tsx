import { FC, PropsWithChildren, useRef, useState } from "react"

import { CheckIcon, CloseIcon } from "@chakra-ui/icons"
import {
	Box, ButtonGroup, Collapse, IconButton, Text, TextProps, useBoolean
} from "@chakra-ui/react"

const EditableText: FC<
	PropsWithChildren<
		{
			editable: boolean
			required?: boolean
			text: string
			setText: (text: string) => void
			placeholder?: string
			variant?: "title" | "description"
		} & TextProps
	>
> = props => {
	const { editable, text, setText, variant, ...style } = props

	const titleStyles = {
		fontSize: "2xl",
		placeholder: "Add a title",
		color: "black",
		noOfLines: 2
	} as const

	const descriptionStyles = {
		fontSize: "lg",
		placeholder: "Add a description",
		mt: 2,
		noOfLines: 2
	} as const

	const placeholder =
		variant === "title"
			? titleStyles.placeholder
			: variant === "description"
			? descriptionStyles.placeholder
			: props.placeholder

	const required = variant === "title" ?? props.required

	const textRef = useRef<any>()
	const [editing, setEditing] = useBoolean()
	const [newText, setNewText] = useState(text)

	return (
		<Box pos="relative">
			<Text
				ref={textRef}
				suppressContentEditableWarning={true}
				textAlign="left"
				contentEditable={editable}
				onFocus={setEditing.on}
				// Delay so the collapse buttons still have the click event before unmounting
				rounded="lg"
				outline="none"
				borderWidth="2px"
				borderColor={editing ? "blue.500" : "transparent"}
				transition="background-color 0.3s, border-color 0.3s"
				_hover={{
					bg: editing ? "white" : editable ? "gray.100" : "white",
					cursor: editable ? "text" : "normal"
				}}
				onInput={e => setNewText(e.currentTarget.innerText)}
				opacity={!editing && text === "" ? 0.5 : 1}
				{...(variant === "title" ? titleStyles : {})}
				{...(variant === "description" ? descriptionStyles : {})}
				{...style}>
				{!editing && text === "" ? placeholder : text}
			</Text>
			{editing && newText === "" ? (
				<Text
					{...(variant === "title" ? titleStyles : {})}
					{...(variant === "description" ? descriptionStyles : {})}
					{...style}
					textAlign="left"
					pos="absolute"
					top={0}
					m="2px"
					opacity="0.5">
					{placeholder}
				</Text>
			) : null}

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
						onClick={() => {
							setNewText(text)
							textRef.current!.innerText = text
							setEditing.off()
						}}
					/>
					<IconButton
						aria-label="check"
						icon={<CheckIcon />}
						onClick={() => {
							if (required && newText === "") {
								setNewText(text)
								textRef.current!.innerText = text
							} else {
								setText(newText)
							}
							setEditing.off()
						}}
					/>
				</ButtonGroup>
			</Collapse>
		</Box>
	)
}

export default EditableText
