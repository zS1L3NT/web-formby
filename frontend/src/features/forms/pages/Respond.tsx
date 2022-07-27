import { PropsWithChildren, useContext } from "react"

import { Box, Button, Center, Spinner } from "@chakra-ui/react"

import FormContext from "../../../contexts/FormContext"
import FormHeader from "../components/FormHeader"
import Question from "../components/Question"

const Respond = (props: PropsWithChildren<{}>) => {
	const { questions, answers } = useContext(FormContext)

	return questions && answers ? (
		<>
			<FormHeader editable={false} />
			{questions.map((question, i) => (
				<Question
					key={question.id}
					index={i}
					editable={false}
					parentQuestion={question}
				/>
			))}
			<Button variant="primary">Submit</Button>
			<Box h={16} />
		</>
	) : (
		<Center>
			<Spinner mt={4} />
		</Center>
	)
}

export default Respond
