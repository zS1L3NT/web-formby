import { useEffect, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"

import {
	Box, Flex, InputGroup, InputLeftAddon, NumberInput, NumberInputField, Slider, SliderFilledTrack,
	SliderMark, SliderThumb, SliderTrack, Text
} from "@chakra-ui/react"

import { EditorProps } from "../QuestionEditor"

const SliderEditor = ({ question, setQuestion }: EditorProps<"slider">) => {
	const [sliderMin, setSliderMin] = useState(question.slider_min)
	const [sliderStep, setSliderStep] = useState(question.slider_step)
	const [sliderMax, setSliderMax] = useState(question.slider_max)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		setSliderMin(question.slider_min)
		setSliderStep(question.slider_step)
		setSliderMax(question.slider_max)
	}, [question.slider_min, question.slider_step, question.slider_max])

	useEffect(() => {
		if (isNaN(sliderMin) || isNaN(sliderStep) || isNaN(sliderMax)) {
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
			borderTopLeftRadius: 0,
			borderBottomLeftRadius: 0
		}
	}

	return (
		<>
			<Flex
				w="full"
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
						onChange={(_, newSliderMin) => {
							if (newSliderMin !== sliderMin) {
								setSliderMin(newSliderMin)
							}
						}}
						onBlur={e => {
							if (error !== null) {
								setSliderMin(question.slider_min)
							} else {
								setQuestion({ ...question, slider_min: +e.target.value })
							}
						}}>
						<NumberInputField />
					</NumberInput>
				</InputGroup>
				<InputGroup>
					<InputLeftAddon children="Step" />
					<NumberInput
						flex="1"
						css={css}
						value={isNaN(sliderStep) ? "" : sliderStep}
						onChange={(_, newSliderStep) => {
							if (newSliderStep !== sliderStep) {
								setSliderStep(newSliderStep)
							}
						}}
						onBlur={e => {
							if (error !== null) {
								setSliderStep(question.slider_step)
							} else {
								setQuestion({ ...question, slider_step: +e.target.value })
							}
						}}>
						<NumberInputField />
					</NumberInput>
				</InputGroup>
				<InputGroup>
					<InputLeftAddon children="Max" />
					<NumberInput
						flex="1"
						css={css}
						value={isNaN(sliderMax) ? "" : sliderMax}
						onChange={(_, newSliderMax) => {
							if (newSliderMax !== sliderMax) {
								setSliderMax(newSliderMax)
							}
						}}
						onBlur={e => {
							if (error !== null) {
								setSliderMax(question.slider_max)
							} else {
								setQuestion({ ...question, slider_max: +e.target.value })
							}
						}}>
						<NumberInputField />
					</NumberInput>
				</InputGroup>
			</Flex>

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
						isDisabled={true}
						defaultValue={sliderMin}
						min={sliderMin}
						max={sliderMax}
						step={sliderStep}
						value={sliderMin}>
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
		</>
	)
}

export default SliderEditor
