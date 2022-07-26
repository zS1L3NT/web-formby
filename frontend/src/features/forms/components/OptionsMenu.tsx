import { PropsWithChildren, RefObject, useContext } from "react"
import { Updater } from "use-immer"

import { CopyIcon, DeleteIcon } from "@chakra-ui/icons"
import {
	IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuItemOption, MenuList, MenuOptionGroup,
	Spinner, useBoolean
} from "@chakra-ui/react"

import AuthContext from "../../../contexts/AuthContext"
import FormContext from "../../../contexts/FormContext"
import useFetcher from "../../../hooks/useFetcher"
import {
	iChoiceQuestion, iQuestion, iSliderQuestion, iTableQuestion
} from "../../../models/Question"

const OptionsMenu = (
	props: PropsWithChildren<{
		editable: boolean
		index: number
		menuRef: RefObject<HTMLButtonElement>
		onDelete: () => void
		question: iQuestion
		setQuestion: Updater<iQuestion>
	}>
) => {
	const { editable, index, menuRef, onDelete, question, setQuestion } = props

	const { token } = useContext(AuthContext)
	const { setQuestions } = useContext(FormContext)
	const fetcher = useFetcher()

	const [isDuplicating, setIsDuplicating] = useBoolean()

	const handleDuplicateQuestion = async () => {
		if (!token) return

		setIsDuplicating.on()

		const duplicateQuestion: Omit<iQuestion, "id" | "form_id"> = {
			previous_question_id: question.id,
			title: question.title,
			description: question.description,
			photo: question.photo,
			required: question.required,
			type: question.type
		}

		if (question.type === "choice") {
			const duplicateChoiceQuestion = duplicateQuestion as Omit<
				iChoiceQuestion,
				"id" | "form_id"
			>
			duplicateChoiceQuestion.choices = question.choices
			duplicateChoiceQuestion.choice_type = question.choice_type
		}

		if (question.type === "slider") {
			const duplicateSliderQuestion = duplicateQuestion as Omit<
				iSliderQuestion,
				"id" | "form_id"
			>
			duplicateSliderQuestion.slider_min = question.slider_min
			duplicateSliderQuestion.slider_step = question.slider_step
			duplicateSliderQuestion.slider_max = question.slider_max
		}

		if (question.type === "table") {
			const duplicateTableQuestion = duplicateQuestion as Omit<
				iTableQuestion,
				"id" | "form_id"
			>
			duplicateTableQuestion.table_columns = question.table_columns
			duplicateTableQuestion.table_rows = question.table_rows
			duplicateTableQuestion.table_type = question.table_type
		}

		const { data } = await fetcher({
			url: "/forms/{form_id}/questions",
			method: "POST",
			body: duplicateQuestion,
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
