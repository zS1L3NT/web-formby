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
			variant?: "description"
		} & TextProps
	>
> = props => {
	const { editable, required, text, setText, placeholder, variant, ...style } = props

	const textRef = useRef<any>()
	const [editing, setEditing] = useBoolean()
	const [newText, setNewText] = useState(text)

	return (
		<Box pos="relative">
			{!editable && text === "" ? null : (
				<Text
					ref={textRef}
					suppressContentEditableWarning={true}
					textAlign="left"
					contentEditable={editable}
					onFocus={setEditing.on}
					color="text"
					// Delay so the collapse buttons still have the click event before unmounting
					rounded="lg"
					outline="none"
					borderWidth="2px"
					borderColor={editing ? "primary" : "transparent"}
					transition="background-color 0.3s, border-color 0.3s"
					_hover={{
						bg: !editing && editable ? "highlight" : "card",
						cursor: "text"
					}}
					onInput={e => setNewText(e.currentTarget.innerText)}
					opacity={!editing && text === "" ? 0.5 : 1}
					{...style}>
					{!editing && text === "" ? placeholder : text}
				</Text>
			)}

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
