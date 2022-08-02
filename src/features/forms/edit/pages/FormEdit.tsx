import { useEffect } from "react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { useParams } from "react-router-dom"

import { Box, Center, Spinner } from "@chakra-ui/react"

import {
	useGetFormQuery, useGetFormQuestionsQuery, useUpdateFormQuestionMutation
} from "../../../../api"
import useOnlyAuthenticated from "../../../../hooks/useOnlyAuthenticated"
import { WithTimestamps } from "../../../../models/index"
import { iQuestion } from "../../../../models/Question"
import { assertLinkedQuestions } from "../../../../utils/questionUtils"
import FormHeader from "../../answer/components/FormHeader"
import AddQuestion from "../components/AddQuestion"
import QuestionEditor from "../components/QuestionEditor"

const FormEdit = () => {
	const { token } = useOnlyAuthenticated()
	const form_id = useParams().form_id as string

	const { data: form } = useGetFormQuery({ form_id, token })
	const { data: questions } = useGetFormQuestionsQuery({ form_id, token })
	const [updateFormQuestionMutation] = useUpdateFormQuestionMutation()

	useEffect(() => {
		if (!questions) return

		assertLinkedQuestions(questions)
	}, [questions])

	const handleReorder = (oldIndex: number, newIndex?: number) => {
		if (
			questions === undefined ||
			oldIndex === newIndex ||
			newIndex === undefined ||
			token === null
		) {
			return
		}

		const _questions = JSON.parse(JSON.stringify(questions)) as WithTimestamps<iQuestion>[]
		const __questions = JSON.parse(JSON.stringify(questions)) as WithTimestamps<iQuestion>[]

		_questions.splice(newIndex, 0, _questions.splice(oldIndex, 1)[0]!)

		_questions.at(oldIndex)!.previous_question_id = _questions[oldIndex - 1]?.id ?? null
		if (_questions.at(oldIndex + 1)) {
			_questions.at(oldIndex + 1)!.previous_question_id = _questions.at(oldIndex)!.id
		}

		_questions.at(newIndex)!.previous_question_id = _questions[newIndex - 1]?.id ?? null
		if (_questions.at(newIndex + 1)) {
			_questions.at(newIndex + 1)!.previous_question_id = _questions.at(newIndex)!.id
		}

		for (const __question of __questions) {
			const _question = _questions.find(question => question.id === __question.id)!

			if (__question.previous_question_id !== _question.previous_question_id) {
				updateFormQuestionMutation({
					form_id: form!.id,
					question_id: _question.id,
					token,
					previous_question_id: _question.previous_question_id
				})
			}
		}
	}

	return form && questions ? (
		<Box
			pos="relative"
			mt={form.state === "draft" ? 0 : 4}
			py={form.state === "draft" ? 0 : 1}
			px={form.state === "draft" ? 0 : 4}>
			<FormHeader form={form} />
			<DragDropContext
				onDragEnd={result => handleReorder(result.source.index, result.destination?.index)}>
				<Droppable droppableId="questions">
					{provided => (
						<Box
							ref={provided.innerRef}
							className="questions"
							{...provided.droppableProps}>
							<AddQuestion
								formId={form.id}
								previousQuestion={null}
							/>

							{questions ? (
								questions.map((question, i) => (
									<Draggable
										key={question.id}
										index={i}
										draggableId={question.id}>
										{provided => (
											<QuestionEditor
												provided={provided}
												parentQuestion={question}
												error={null}
											/>
										)}
									</Draggable>
								))
							) : (
								<Center>
									<Spinner mt={4} />
								</Center>
							)}
							{provided.placeholder}
							<Box h={16} />
						</Box>
					)}
				</Droppable>
			</DragDropContext>
			<Box
				w="max"
				h="calc(var(--chakra-sizes-max) - var(--chakra-sizes-16))"
				pos="absolute"
				top={0}
				left={0}
				opacity={0.4}
				bg="black"
				borderRadius="lg"
				zIndex={form.state === "draft" ? -1 : 1}
				cursor="not-allowed"
			/>
		</Box>
	) : (
		<Center>
			<Spinner mt={4} />
		</Center>
	)
}

export default FormEdit
