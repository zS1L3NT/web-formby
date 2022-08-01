import { createRef, RefObject, useState } from "react"

import { CloseIcon } from "@chakra-ui/icons"
import { Flex, IconButton, Input } from "@chakra-ui/react"

const ListMaker = ({
	editable,
	items,
	setItems,
	leading
}: {
	editable: boolean
	items: string[]
	setItems: (items: string[]) => void
	leading?: (item: string | null, i: number | null) => JSX.Element | null
}) => {
	const [refs, setRefs] = useState(items.map<RefObject<HTMLInputElement>>(createRef))

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
		<>
			{items.map((item, i) => (
				<Flex
					key={i}
					my={4}>
					{leading ? leading(item, i) : null}
					{editable ? (
						<Input
							ref={refs[i]}
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
					) : null}

					{editable && items.length > 1 ? (
						<IconButton
							aria-label="close"
							variant="ghost"
							size="sm"
							ml={2}
							mr={{ base: 0, md: 2 }}
							my="auto"
							w={4}
							onClick={() => {
								const newItems = items.filter((_, j) => i !== j)
								const newRefs = refs.filter((_, j) => i !== j)

								//  Since the inputs are not controlled inputs, we need to set it again
								for (let i = 0; i < newRefs.length; i++) {
									newRefs[i]!.current!.value = newItems[i]!
								}

								setItems(items.filter((_, j) => i !== j))
								setRefs(newRefs)
							}}>
							<CloseIcon color="gray.300" />
						</IconButton>
					) : null}
				</Flex>
			))}

			{editable ? (
				<Flex my={4}>
					{leading && leading(null, null)}
					<Input
						flex={1}
						mr={{ base: 10, md: 12 }}
						onFocus={() => {
							const ref = createRef<HTMLInputElement>()
							setItems([...items, generateName()])
							setRefs([...refs, ref])
							setTimeout(() => {
								ref.current!.focus()
								ref.current!.setSelectionRange(0, -1)
							}, 0)
						}}
					/>
				</Flex>
			) : null}
		</>
	)
}

export default ListMaker
