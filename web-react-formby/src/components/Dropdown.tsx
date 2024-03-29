import Select from "react-select"

import { useColorModeValue } from "@chakra-ui/react"

const Dropdown = <T extends string>({
	choices,
	selectedChoice,
	setSelectedChoice,
	isDisabled
}: {
	choices: T[]
	selectedChoice: T | null
	setSelectedChoice: (choice: T | null) => void
	isDisabled?: boolean
}) => {
	return (
		<Select
			value={selectedChoice ? { label: selectedChoice, value: selectedChoice } : undefined}
			options={choices.map(choice => ({ value: choice, label: choice }))}
			onChange={choice => setSelectedChoice(choice?.value ?? null)}
			isSearchable={false}
			isDisabled={isDisabled}
			placeholder="Select a choice"
			styles={{
				indicatorSeparator: provided => ({
					...provided,
					display: "none"
				}),
				control: provided => ({
					...provided,
					cursor: "pointer",
					background: "var(--chakra-colors-card)",
					borderWidth: "1px",
					borderColor: "var(--chakra-colors-chakra-border-color)",
					transition: "border-color 0.3s ease, border-width 0.3s ease",
					":hover": {
						borderColor: "var(--chakra-colors-primary)"
					}
				}),
				menu: provided => ({
					...provided,
					background: "var(--chakra-colors-card)"
				}),
				option: (provided, state) => ({
					...provided,
					cursor: "pointer",
					color: "var(--chakra-colors-chakra-body-text)",
					background: "var(--chakra-colors-card)",
					filter: state.isSelected
						? useColorModeValue("brightness(0.9)", "brightness(1.2)")
						: "none",
					":hover": {
						filter: useColorModeValue("brightness(0.9)", "brightness(1.2)"),
						background: "var(--chakra-colors-card)"
					}
				}),
				singleValue: provided => ({
					...provided,
					color: "var(--chakra-colors-chakra-body-text)"
				})
			}}
		/>
	)
}

export default Dropdown
