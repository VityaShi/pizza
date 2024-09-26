'use client'

import { Product } from '@prisma/client'
import { Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useDebounce } from 'react-use'

import { api } from '../api'
import { cn } from '../lib'

interface Props {
	className?: string
}

export const SearchInput: React.FC<Props> = ({ className }) => {
	const [searchQuery, setSearchQuery] = React.useState('')
	const [isFocused, setIsFocused] = React.useState(false)
	const [products, setProducts] = React.useState<Product[]>([])
	const handleFocus = () => setIsFocused(true)
	const handleBlur = () => setIsFocused(false)

	useDebounce(
		() => {
			api.products.search(searchQuery).then(res => {
				setProducts(res)
			})
		},
		300,
		[searchQuery]
	)
	const handleClickItem = () => {
		setIsFocused(false)
		setSearchQuery('')
		setProducts([])
	}
	return (
		<>
			{isFocused && (
				<div
					onClick={handleBlur}
					className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30'
				/>
			)}
			<div
				className={cn(
					'flex rounded-2xl flex-1 justify-between relative h-11 z-30',
					className
				)}
			>
				<Search className='absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400 ' />
				<input
					className='rounded-2xl outline-none w-full bg-gray-100 pl-11'
					type='text'
					placeholder='Search for products...'
					onFocus={handleFocus}
					onBlur={handleBlur}
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
				/>
				{products.length > 0 && (
					<div
						className={cn(
							'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
							isFocused && 'visible opacity-100 top-12'
						)}
					>
						{products.map(product => (
							<Link
								onClick={handleClickItem}
								key={product.id}
								className='flex items-center w-full px-3 py-2 hover:bg-primary/10 gap-3'
								href={`/product/${product.id}`}
							>
								<img
									alt={product.name}
									src={product.imageUrl}
									className='rounded-sm h-8 w-8'
								/>
								<span>{product.name}</span>
							</Link>
						))}
						{/*  */}
					</div>
				)}
			</div>
		</>
	)
}
