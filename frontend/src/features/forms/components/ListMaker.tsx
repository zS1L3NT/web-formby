import { createRef, FC, PropsWithChildren, RefObject, useState } from "react"

import { CloseIcon } from "@chakra-ui/icons"
import { Flex, Input } from "@chakra-ui/react"

const ListMaker: FC<
	PropsWithChildren<{
		leading?: (item: string | null, i: number | null) => JSX.Element | null
		items: string[]
		setItems: (items: string[]) => void
	}>
> = props => {
	const { leading, items, setItems } = props

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

					{items.length > 1 ? (
						<CloseIcon
							mx={4}
							my="auto"
							color="gray.300"
							onClick={() => {
								const newItems = items.filter((_, j) => i !== j)
								const newRefs = refs.filter((_, j) => i !== j)

								//  Since the inputs are not controlled inputs, we need to set it again
								for (let i = 0; i < newRefs.length; i++) {
									newRefs[i]!.current!.value = newItems[i]!
								}

								setItems(items.filter((_, j) => i !== j))
								setRefs(newRefs)
							}}
						/>
					) : null}
				</Flex>
			))}

			<Flex my={4}>
				{leading && leading(null, null)}
				<Input
					flex={1}
					mr={12}
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
		</>
	)
}

export default ListMaker
