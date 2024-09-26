import { constants } from '.'
import { Product } from '@prisma/client'

import { axiosInstance } from './axios'

export const search = async (query: string): Promise<Product[]> => {
	const { data } = await axiosInstance.get<Product[]>(
		constants.ApiRoutes.SEARCH_PRODUCTS,
		{
			params: { query }
		}
	)
	return data
}
