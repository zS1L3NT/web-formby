import { FC, useEffect, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"

import {
    Box, Flex, InputGroup, InputLeftAddon, NumberInput, NumberInputField, Slider, SliderFilledTrack,
    SliderMark, SliderThumb, SliderTrack, Text
} from "@chakra-ui/react"

import { iSliderQuestion } from "../../../../models/Question"
import { QuestionProps } from "../Question"

const SliderQuestion: FC<QuestionProps<iSliderQuestion>> = props => {
	const { editable, question, setQuestion } = props
	const { slider_min: sliderMin, slider_step: sliderStep, slider_max: sliderMax } = question

	const [error, setError] = useState<string | null>(null)

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
							onChange={(_, slider_min) =>
								setQuestion({
									...question,
									slider_min
								})
							}>
							<NumberInputField />
						</NumberInput>
					</InputGroup>
					<InputGroup>
						<InputLeftAddon children="Step" />
						<NumberInput
							flex="1"
							css={css}
							value={isNaN(sliderStep) ? "" : sliderStep}
							onChange={(_, slider_step) =>
								setQuestion({
									...question,
									slider_step
								})
							}
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
							onChange={(_, slider_max) =>
								setQuestion({
									...question,
									slider_max
								})
							}>
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
		</>
	)
}

export default SliderQuestion
