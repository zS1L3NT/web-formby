import { Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack } from "@chakra-ui/react"

import { iSliderAnswer } from "../../../../../models/Answer"
import { iSliderQuestion } from "../../../../../models/Question"
import { AnswerProps } from "../QuestionAnswer"

const SliderAnswer = ({ question, answer }: AnswerProps<iSliderQuestion, iSliderAnswer>) => {
	const { slider_min: sliderMin, slider_step: sliderStep, slider_max: sliderMax } = question

	return (
		<Slider
			min={sliderMin}
			max={sliderMax}
			step={sliderStep}
			value={answer?.slider}
			mt={2}
			pl={{ base: 0, md: 2 }}
			pr={{ base: 2, md: 4 }}>
			{((sliderMax - sliderMin) / sliderStep + 1) % 1 === 0
				? Array.from(Array((sliderMax - sliderMin) / sliderStep + 1)).map((_, i) => (
						<SliderMark
							key={i}
							value={sliderMin + sliderStep * i}>
							{sliderMin + sliderStep * i}
						</SliderMark>
				  ))
				: null}
			<SliderTrack cursor="not-allowed">
				<SliderFilledTrack cursor="not-allowed" />
			</SliderTrack>
			<SliderThumb cursor="not-allowed" />
		</Slider>
	)
}

export default SliderAnswer
