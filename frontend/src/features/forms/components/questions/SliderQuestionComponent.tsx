import { FC, PropsWithChildren, useEffect, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"

import {
	Box, InputGroup, NumberInput, NumberInputField, Slider, SliderFilledTrack, SliderMark,
	SliderThumb, SliderTrack, Text
} from "@chakra-ui/react"

import { SliderQuestion } from "../../../../models/Question"
import QuestionComponent from "../QuestionComponent"

const SliderQuestionComponent: FC<
	PropsWithChildren<{
		question: SliderQuestion
		editable: boolean
	}>
> = props => {
	const { question, editable } = props

	const [sliderMin, setSliderMin] = useState(question.sliderMin)
	const [sliderStep, setSliderStep] = useState(question.sliderStep)
	const [sliderMax, setSliderMax] = useState(question.sliderMax)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		setError("")

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

		if ((sliderMax / sliderStep) % 1 !== 0) {
			return setError("Max must be a multiple of Step")
		}

		setError(null)
	}, [sliderMin, sliderMax, sliderStep])

	return (
		<QuestionComponent
			editable={editable}
			question={question}>
			<InputGroup
				w="max"
				justifyContent="space-evenly">
				<NumberInput
					value={isNaN(sliderMin) ? "" : sliderMin}
					onChange={min => setSliderMin(parseInt(min))}>
					<NumberInputField />
				</NumberInput>
				<NumberInput
					value={isNaN(sliderStep) ? "" : sliderStep}
					onChange={step => setSliderStep(parseInt(step))}
					min={1}>
					<NumberInputField />
				</NumberInput>
				<NumberInput
					value={isNaN(sliderMax) ? "" : sliderMax}
					onChange={max => setSliderMax(parseInt(max))}>
					<NumberInputField />
				</NumberInput>
			</InputGroup>
			<Text
				mt={2}
				variant="inputError">
				{error}
			</Text>
			<Box
				mt={2}
				px={8}>
				{!error ? (
					<ErrorBoundary fallbackRender={_ => <></>}>
						<Slider
							isDisabled={editable}
							defaultValue={sliderMin}
							min={sliderMin}
							max={sliderMax}
							step={sliderStep}>
							{Array.from(Array((sliderMax - sliderMin) / sliderStep + 1)).map(
								(_, i) => (
									<SliderMark
										key={i}
										value={sliderMin + sliderStep * i}>
										{sliderMin + sliderStep * i}
									</SliderMark>
								)
							)}
							<SliderTrack>
								<SliderFilledTrack />
							</SliderTrack>
							<SliderThumb />
						</Slider>
					</ErrorBoundary>
				) : null}
			</Box>
		</QuestionComponent>
	)
}

export default SliderQuestionComponent
