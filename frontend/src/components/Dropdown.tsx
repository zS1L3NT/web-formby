import { Select } from "chakra-react-select"
import { FC, PropsWithChildren } from "react"

const Dropdown: FC<
	PropsWithChildren<{
		choices: string[]
		selectedChoice: string | null
		setSelectedChoice: (choice: string | null) => void
	}>
> = props => {
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
