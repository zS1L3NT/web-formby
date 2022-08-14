import { useRef } from "react"

import { CloseIcon } from "@chakra-ui/icons"
import { Box, Flex, IconButton, Input } from "@chakra-ui/react"

const ListMaker = ({
	items,
	setItems,
	leading
}: {
	items: string[]
	setItems: (items: string[]) => void
	leading?: (item: string | null, i: number | null) => JSX.Element | null
}) => {
	const parentRef = useRef<HTMLDivElement>(null)

	const getInputs = () => {
		return parentRef.current?.getElementsByTagName("input")
	}

	const generateName = () => {
		let i = 1

		while (true) {
			if (items.includes(`Item ${i + 0}`)) {
				i++
				continue
			}

			return `Item ${i + 0}`
		}
	}

	return (
		<Box ref={parentRef}>
			{items.map((item, i) => (
				<Flex
					key={i}
					my={4}>
					{leading ? leading(item, i) : null}
					<Input
						flex={1}
						mr={items.length === 1 ? 12 : 0}
						defaultValue={item}
						onBlur={e => {
							const newItem = e.target.value.trim()
							if (newItem !== "" && !items.includes(newItem)) {
								setItems(items.map((c, j) => (i === j ? newItem : c)))
							} else {
								e.target.value = item
							}
						}}
					/>

					{items.length > 1 ? (
						<IconButton
							aria-label="close"
							variant="ghost"
							size="sm"
							ml={2}
							mr={{ base: 0, md: 2 }}
							my="auto"
							w={4}
							onClick={() => {
								const inputs = getInputs()!
								const input = inputs.item(inputs.length - 1)!
								input.focus()
								setItems(items.filter((_, j) => i !== j))
							}}>
							<CloseIcon color="gray.300" />
						</IconButton>
					) : null}
				</Flex>
			))}

			<Flex my={4}>
				{leading && leading(null, null)}
				<Input
					flex={1}
					mr={{ base: 10, md: 12 }}
					onFocus={() => {
						setItems([...items, generateName()])
						setTimeout(() => {
							const inputs = getInputs()!
							const input = inputs.item(inputs.length - 2)!
							input.focus()
							input.setSelectionRange(0, -1)
						}, 0)
					}}
				/>
			</Flex>
		</Box>
	)
}

export default ListMaker
