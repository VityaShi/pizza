'use client'

import { Ingredient } from '@prisma/client'
import React from 'react'
import { useSet } from 'react-use'

import { api } from '../api'

interface ReturnProps {
	ingredients: Ingredient[]
	loading: boolean
	selectedIds: Set<string>
	onAddId: (id: string) => void
}

export const useIngredients = (): ReturnProps => {
	const [ingredients, setIngredients] = React.useState<Ingredient[]>([])
	const [loading, setLoading] = React.useState(true)

	const [selectedIds, { toggle }] = useSet(new Set<string>([]))

	React.useEffect(() => {
		async function fetchIngredients() {
			try {
				setLoading(true)
				const ingredients = await api.ingredients.getAll()
				setIngredients(ingredients)
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false)
			}
		}

		fetchIngredients()
	}, [])

	return {
		ingredients,
		loading,
		onAddId: toggle,
		selectedIds
	}
}
