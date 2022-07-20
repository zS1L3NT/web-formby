import { FC, PropsWithChildren, useEffect, useState } from "react"
import { DraggableProvided } from "react-beautiful-dnd"
import { ErrorBoundary } from "react-error-boundary"

import {
	Box, Flex, InputGroup, InputLeftAddon, NumberInput, NumberInputField, Slider, SliderFilledTrack,
	SliderMark, SliderThumb, SliderTrack, Text
} from "@chakra-ui/react"

import { SliderQuestion } from "../../../../models/Question"
import QuestionComponent from "../QuestionComponent"

const SliderQuestionComponent: FC<
	PropsWithChildren<{
		provided: DraggableProvided
		question: SliderQuestion
		editable: boolean
	}>
> = props => {
	const { provided, question, editable } = props

	const [sliderMin, setSliderMin] = useState(question.sliderMin)
	const [sliderStep, setSliderStep] = useState(question.sliderStep)
	const [sliderMax, setSliderMax] = useState(question.sliderMax)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (isNaN(sliderMin) || isNaN(sliderMax) || isNaN(sliderStep)) {
			return setError("Please enter valid numbers")
		}

		if (sliderMin >= sliderMax) {
			return setError("Max must be more than Min")
		}

		if (sliderMin !== 0 && (sliderMax / sliderMin) % 1 !== 0) {
			return setError("Max must be a multiple of Min")
		}

		if (sliderStep <= 0) {
			return setError("Step must be more than 0")
		}

		const intervals = (sliderMax - sliderMin) / sliderStep
		if (intervals % 1 !== 0) {
			return setError("Max must be a multiple of Step")
		}

		if (intervals > 10) {
			return setError("There must be less than 10 intervals between the min and max")
		}

		setError(null)
	}, [sliderMin, sliderMax, sliderStep])

	const css = {
		"& > input": {
			"borderTopLeftRadius": 0,
			"borderBottomLeftRadius": 0
		}
	}

	return (
		<QuestionComponent
			provided={provided}
			editable={editable}
			question={question}>
			{editable ? (
				<Flex
					w="max"
					direction={{ base: "column", md: "row" }}
					justifyContent="space-evenly"
					gap={4}
					px={{ base: 0, md: 2 }}
					mb={4}>
					<InputGroup>
						<InputLeftAddon children="Min" />
						<NumberInput
							flex="1"
							css={css}
							value={isNaN(sliderMin) ? "" : sliderMin}
							onChange={min => setSliderMin(parseInt(min))}>
							<NumberInputField />
						</NumberInput>
					</InputGroup>
					<InputGroup>
						<InputLeftAddon children="Step" />
						<NumberInput
							flex="1"
							css={css}
							value={isNaN(sliderStep) ? "" : sliderStep}
							onChange={step => setSliderStep(parseInt(step))}
							min={1}>
							<NumberInputField />
						</NumberInput>
					</InputGroup>
					<InputGroup>
						<InputLeftAddon children="Max" />
						<NumberInput
							flex="1"
							css={css}
							value={isNaN(sliderMax) ? "" : sliderMax}
							onChange={max => setSliderMax(parseInt(max))}>
							<NumberInputField />
						</NumberInput>
					</InputGroup>
				</Flex>
			) : null}

			<Text
				mt={2}
				variant="inputError">
				{error}
			</Text>
			<Box
				mt={2}
				pl={{ base: 0, md: 2 }}
				pr={{ base: 2, md: 4 }}>
				<ErrorBoundary FallbackComponent={_ => <></>}>
					<Slider
						isDisabled={editable}
						defaultValue={sliderMin}
						min={sliderMin}
						max={sliderMax}
						step={sliderStep}>
						{((sliderMax - sliderMin) / sliderStep + 1) % 1 === 0
							? Array.from(Array((sliderMax - sliderMin) / sliderStep + 1)).map(
									(_, i) => (
										<SliderMark
											key={i}
											value={sliderMin + sliderStep * i}>
											{sliderMin + sliderStep * i}
										</SliderMark>
									)
							  )
							: null}
						<SliderTrack>
							<SliderFilledTrack />
						</SliderTrack>
						<SliderThumb />
					</Slider>
				</ErrorBoundary>
			</Box>
		</QuestionComponent>
	)
}

export default SliderQuestionComponent
