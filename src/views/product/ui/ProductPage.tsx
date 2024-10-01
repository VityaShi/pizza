import { notFound } from 'next/navigation'
import React from 'react'

import { prisma } from '@/shared/api'
import { Container } from '@/shared/ui'

interface Props {
	className?: string
}

export const ProductPage: React.FC<any> = async ({
	params: { id }
}: {
	params: { id: string }
}) => {
	const product = await prisma.product.findFirst({
		where: { id: Number(id) }
	})
	if (!product) {
		return notFound()
	}
	return (
		<Container className='flex flex-col my-10'>
			<ProductImage imageUrl={product.imageUrl} />
		</Container>
	)
}
