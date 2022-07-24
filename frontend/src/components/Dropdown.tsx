import { Select } from "chakra-react-select"
import { PropsWithChildren } from "react"

const Dropdown = <T extends string>(
	props: PropsWithChildren<{
		choices: T[]
		selectedChoice: T | null
		setSelectedChoice: (choice: T | null) => void
	}>
) => {
	const { choices, selectedChoice, setSelectedChoice } = props

	return (
		<Select
			onChange={option => {
				setSelectedChoice(option?.value ?? null)
			}}
			defaultInputValue={selectedChoice ?? undefined}
			options={choices.map(choice => ({ value: choice, label: choice }))}
			placeholder="Select a choice"
			colorScheme="primary"
			className="chakra-react-select"
			classNamePrefix="chakra-react-select"
			chakraStyles={{
				dropdownIndicator: provided => ({
					...provided,
					bg: "transparent",
					px: 2,
					cursor: "inherit"
				}),
				indicatorSeparator: provided => ({
					...provided,
					display: "none"
				})
			}}
		/>
	)
}

export default Dropdown
