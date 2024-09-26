import { constants } from '.'
import { Ingredient } from '@prisma/client'

import { axiosInstance } from './axios'

export const getAll = async (): Promise<Ingredient[]> => {
	const { data } = await axiosInstance.get<Ingredient[]>(
		constants.ApiRoutes.INGREDIENTS
	)
	return data
}
