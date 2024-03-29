import { useEffect, useState } from "react"

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import {
	Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text, useBoolean, useToast
} from "@chakra-ui/react"

import { useUpdateUserPasswordMutation } from "../../../api/auth"
import Card from "../../../components/Card"
import useAppDispatch from "../../../hooks/useAppDispatch"
import useOnlyAuthenticated from "../../../hooks/useOnlyAuthenticated"
import { setError } from "../../../slices/ErrorSlice"

const PasswordCard = () => {
	const { token } = useOnlyAuthenticated()
	const dispatch = useAppDispatch()
	const toast = useToast()

	const [updateUserPassword, { isLoading }] = useUpdateUserPasswordMutation()

	const [showOldPassword, setShowOldPassword] = useBoolean()
	const [showNewPassword, setShowNewPassword] = useBoolean()
	const [showConfirmPassword, setShowConfirmPassword] = useBoolean()
	const [oldPassword, setOldPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [oldPasswordError, setOldPasswordError] = useState<string | null>(null)
	const [newPasswordError, setNewPasswordError] = useState<string | null>(null)
	const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null)

	useEffect(() => {
		setOldPasswordError(null)
		setNewPasswordError(null)
		setConfirmPasswordError(null)
	}, [oldPassword, newPassword, confirmPassword])

	const handleSave = async () => {
		if (newPassword !== confirmPassword) {
			setConfirmPasswordError("Passwords do not match")
			return
		}

		const result = await updateUserPassword({
			token,
			old_password: oldPassword,
			new_password: newPassword
		})

		if ("data" in result) {
			setOldPassword("")
			setNewPassword("")
			setConfirmPassword("")
			toast({
				title: result.data.message,
				status: "success",
				isClosable: true
			})
		} else {
			dispatch(setError(result.error))

			if ("fields" in result.error) {
				const fields = result.error.fields!

				if ("old_password" in fields) {
					setOldPasswordError(fields.old_password!.join("\n"))
				}
				if ("new_password" in fields) {
					setNewPasswordError(fields.new_password!.join("\n"))
				}
			}
		}
	}

	return (
		<Card mt={4}>
			<FormControl isRequired>
				<FormLabel>Old Password</FormLabel>
				<InputGroup>
					<Input
						type={showOldPassword ? "text" : "password"}
						isInvalid={!!oldPasswordError}
						value={oldPassword}
						onChange={e => setOldPassword(e.target.value)}
					/>
					<InputRightElement h="full">
						<Button
							variant="ghost"
							onClick={setShowOldPassword.toggle}>
							{showOldPassword ? <ViewIcon /> : <ViewOffIcon />}
						</Button>
					</InputRightElement>
				</InputGroup>
				{oldPasswordError ? (
					<Text
						variant="inputError"
						mt={1}>
						{oldPasswordError}
					</Text>
				) : null}
			</FormControl>
			<FormControl
				mt={4}
				isRequired>
				<FormLabel>New Password</FormLabel>
				<InputGroup>
					<Input
						type={showNewPassword ? "text" : "password"}
						isInvalid={!!newPasswordError}
						value={newPassword}
						onChange={e => setNewPassword(e.target.value)}
					/>
					<InputRightElement h="full">
						<Button
							variant="ghost"
							onClick={setShowNewPassword.toggle}>
							{showNewPassword ? <ViewIcon /> : <ViewOffIcon />}
						</Button>
					</InputRightElement>
				</InputGroup>
				{newPasswordError ? (
					<Text
						variant="inputError"
						mt={1}>
						{newPasswordError}
					</Text>
				) : null}
			</FormControl>
			<FormControl
				mt={4}
				isRequired>
				<FormLabel>Confirm Password</FormLabel>
				<InputGroup>
					<Input
						type={showConfirmPassword ? "text" : "password"}
						isInvalid={!!confirmPasswordError}
						value={confirmPassword}
						onChange={e => setConfirmPassword(e.target.value)}
					/>
					<InputRightElement h="full">
						<Button
							variant="ghost"
							onClick={setShowConfirmPassword.toggle}>
							{showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
						</Button>
					</InputRightElement>
				</InputGroup>
				{confirmPasswordError ? (
					<Text
						variant="inputError"
						mt={1}>
						{confirmPasswordError}
					</Text>
				) : null}
			</FormControl>

			<Button
				mt={4}
				colorScheme="blue"
				isDisabled={!oldPassword}
				loadingText="Saving..."
				isLoading={isLoading}
				onClick={handleSave}>
				Save
			</Button>
		</Card>
	)
}

export default PasswordCard
