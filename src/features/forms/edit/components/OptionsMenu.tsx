import { RefObject } from "react"
import { Updater } from "use-immer"

import { CopyIcon, DeleteIcon } from "@chakra-ui/icons"
import {
	IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuItemOption, MenuList, MenuOptionGroup,
	Spinner
} from "@chakra-ui/react"

import { useCreateFormQuestionMutation } from "../../../../api"
import useOnlyAuthenticated from "../../../../hooks/useOnlyAuthenticated"
import useToastError from "../../../../hooks/useToastError"
import { iQuestion } from "../../../../models/Question"
import { createDuplicate } from "../../../../utils/questionUtils"

const OptionsMenu = ({
	menuRef,
	onDelete,
	question,
	setQuestion
}: {
	menuRef: RefObject<HTMLButtonElement>
	onDelete: () => void
	question: iQuestion
	setQuestion: Updater<iQuestion>
}) => {
	const { token } = useOnlyAuthenticated()

	const [createFormQuestion, { isLoading, error }] = useCreateFormQuestionMutation()

	useToastError(error)

	const handleDuplicateQuestion = async () => {
		await createFormQuestion({ token, ...createDuplicate(question) })
	}

	return (
		<Menu isLazy>
			<MenuButton
				ref={menuRef}
				as={IconButton}
				aria-label="Options"
				pos="absolute"
				right={4}
				zIndex={-1}
				minW={6}
			/>
			<MenuList
				bg="hsl(220, 26%, 18%)"
				zIndex={10}>
				<MenuOptionGroup
					defaultValue={question.type}
					onChange={type =>
						setQuestion({
							...question,
							// @ts-ignore
							type
						})
					}
					title="Question Type"
					type="radio"
					textAlign="start">
					<MenuItemOption value="text">Text</MenuItemOption>
					<MenuItemOption value="paragraph">Paragraph</MenuItemOption>
					<MenuItemOption value="color">Color</MenuItemOption>
					<MenuItemOption value="choice">Choice</MenuItemOption>
					<MenuItemOption value="switch">Switch</MenuItemOption>
					<MenuItemOption value="slider">Slider</MenuItemOption>
					<MenuItemOption value="datetime">DateTime</MenuItemOption>
					<MenuItemOption value="table">Table</MenuItemOption>
				</MenuOptionGroup>
				<MenuDivider />
				<MenuOptionGroup
					defaultValue={question.required ? ["required"] : []}
					onChange={value =>
						setQuestion(question => {
							question.required = value.includes("required")
						})
					}
					type="checkbox">
					<MenuItemOption value="required">Required</MenuItemOption>
				</MenuOptionGroup>
				<MenuItem
					isDisabled={isLoading}
					icon={
						isLoading ? (
							<Spinner
								w={3}
								h={3}
							/>
						) : (
							<CopyIcon />
						)
					}
					onClick={handleDuplicateQuestion}>
					Duplicate
				</MenuItem>
				<MenuItem
					icon={<DeleteIcon />}
					onClick={onDelete}>
					Delete
				</MenuItem>
			</MenuList>
		</Menu>
	)
}

export default OptionsMenu
