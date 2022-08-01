

import {
	Box, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack
} from "@chakra-ui/react"

import { iSliderAnswer } from "../../../../../models/Answer"
import { iSliderQuestion } from "../../../../../models/Question"
import { QuestionProps } from "../Question"

const SliderQuestion = ({
	question,
	answer,
	setAnswer
}: QuestionProps<iSliderQuestion, iSliderAnswer>) => {
	const { slider_min: sliderMin, slider_step: sliderStep, slider_max: sliderMax } = question

	return (
		<Box mt={2} pl={{ base: 0, md: 2 }} pr={{ base: 2, md: 4 }}>
			<Slider
				defaultValue={sliderMin}
				min={sliderMin}
				max={sliderMax}
				step={sliderStep}
				value={answer.slider}
				onChange={e => setAnswer({ ...answer, slider: e })}>
				{((sliderMax - sliderMin) / sliderStep + 1) % 1 === 0
					? Array.from(Array((sliderMax - sliderMin) / sliderStep + 1)).map((_, i) => (
							<SliderMark key={i} value={sliderMin + sliderStep * i}>
								{sliderMin + sliderStep * i}
							</SliderMark>
					  ))
					: null}
				<SliderTrack>
					<SliderFilledTrack />
				</SliderTrack>
				<SliderThumb />
			</Slider>
		</Box>
	)
}

export default SliderQuestion
