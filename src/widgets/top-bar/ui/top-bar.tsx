import { Category } from '@prisma/client'
import React from 'react'

import { cn } from '@/shared/lib'
import { Container } from '@/shared/ui'

import { Categories } from './categories'
import { SortPopup } from './sort-popup'

interface Props {
	categories: Category[]
	className?: string
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
	return (
		<div
			className={cn(
				'sticky top-0 z-10 bg-white py-5 shadow-lg shadow-black/5',
				className
			)}
		>
			<Container className='flex items-center justify-between'>
				<Categories items={categories} />
				<SortPopup />
			</Container>
		</div>
	)
}
