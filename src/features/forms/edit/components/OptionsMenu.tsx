import { RefObject, useContext } from "react"
import { Updater } from "use-immer"

import { CopyIcon, DeleteIcon } from "@chakra-ui/icons"
import {
	IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuItemOption, MenuList, MenuOptionGroup,
	Spinner, useBoolean
} from "@chakra-ui/react"

import AuthContext from "../../../../contexts/AuthContext"
import FormContext from "../../../../contexts/FormContext"
import useFetcher from "../../../../hooks/useFetcher"
import { iQuestion } from "../../../../models/Question"
import { createDuplicate } from "../../../../utils/questionUtils"

const OptionsMenu = ({
	editable,
	index,
	menuRef,
	onDelete,
	question,
	setQuestion
}: {
	editable: boolean
	index: number
	menuRef: RefObject<HTMLButtonElement>
	onDelete: () => void
	question: iQuestion
	setQuestion: Updater<iQuestion>
}) => {
	const { token } = useContext(AuthContext)
	const { setQuestions } = useContext(FormContext)
	const fetcher = useFetcher()

	const [isDuplicating, setIsDuplicating] = useBoolean()

	const handleDuplicateQuestion = async () => {
		if (!token) return

		setIsDuplicating.on()
		const { data } = await fetcher({
			url: "/forms/{form_id}/questions",
			method: "POST",
			body: createDuplicate(question),
			parameters: {
				form_id: question.form_id
			},
			token
		})

		if (data) {
			setQuestions(questions => {
				questions.splice(index + 1, 0, data.question)

				if (questions.at(index + 2)) {
					questions.at(index + 2)!.previous_question_id = data.question.id
				}
			})
		}

		setIsDuplicating.off()
	}

	return (
		<Menu isLazy>
			<MenuButton
				ref={menuRef}
				as={IconButton}
				hidden={!editable}
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
					isDisabled={isDuplicating}
					icon={
						isDuplicating ? (
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
