'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'qs'
import React, { useEffect } from 'react'
import { useSet } from 'react-use'

import { useIngredients } from '@/shared/model/useFilterIngredients'
import { Input, RangeSlider, Title } from '@/shared/ui'

import { CheckboxFiltersGroup } from './checkbox-filters-groups'

interface Props {
	className?: string
}

interface PriceProps {
	priceFrom?: number
	priceTo?: number
}

interface QueryFilters extends PriceProps {
	sizes: string
	pizzaTypes: string
	ingredients: string
}

export const Filters: React.FC<Props> = ({ className }) => {
	const searchParams = useSearchParams() as unknown as Map<
		keyof QueryFilters,
		string
	>
	const router = useRouter()
	const { ingredients, loading, onAddId, selectedIds } = useIngredients()
	const [prices, setPrices] = React.useState<PriceProps>({
		priceFrom: Number(searchParams.get('priceFrom')) || undefined,
		priceTo: Number(searchParams.get('priceTo')) || undefined
	})
	const [sizes, { toggle: toggleSizes }] = useSet(
		new Set<string>(searchParams.get('sizes')?.split(',') || [])
	)
	const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
		new Set<string>(searchParams.get('sizes')?.split(',') || [])
	)
	// const filters = useFilters()

	// useQueryFilters(filters);

	const items = ingredients.map(item => ({
		value: String(item.id),
		text: item.name
	}))

	const updatePrices = (name: keyof PriceProps, value: number) => {
		// console.log(prices, 999)
		setPrices({ ...prices, [name]: value })
		//   filters.setPrices('priceFrom', prices[0]);
		//   filters.setPrices('priceTo', prices[1]);
	}
	useEffect(() => {
		const filters = {
			...prices,
			pizzaTypes: Array.from(pizzaTypes),
			sizes: Array.from(sizes),
			ingredients: Array.from(selectedIds)
		}
		const query = qs.stringify(filters, { arrayFormat: 'comma' })
		router.push(`?${query}`, { scroll: false })
	}, [selectedIds, prices, sizes, pizzaTypes])
	return (
		<div className={className}>
			<Title
				text='Фильтрация'
				size='sm'
				className='mb-5 font-bold'
			/>

			{/* Верхние чекбоксы */}
			<CheckboxFiltersGroup
				title='Тип теста'
				name='pizzaTypes'
				className='mb-5'
				onClickCheckbox={togglePizzaTypes}
				selected={pizzaTypes}
				items={[
					{ text: 'Тонкое', value: '1' },
					{ text: 'Традиционное', value: '2' }
				]}
			/>

			<CheckboxFiltersGroup
				title='Размеры'
				name='sizes'
				className='mb-5'
				onClickCheckbox={toggleSizes}
				selected={sizes}
				items={[
					{ text: '20 см', value: '20' },
					{ text: '30 см', value: '30' },
					{ text: '40 см', value: '40' }
				]}
			/>

			{/* Фильтр цен */}
			<div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
				<p className='font-bold mb-3'>Цена от и до:</p>
				<div className='flex gap-3 mb-5'>
					<Input
						type='number'
						placeholder='0'
						min={0}
						max={1000}
						value={String(prices.priceFrom)}
						onChange={e =>
							updatePrices('priceFrom', Number(e.target.value))
						}
					/>
					<Input
						type='number'
						min={100}
						max={1000}
						placeholder='1000'
						value={String(prices.priceTo)}
						onChange={e =>
							updatePrices('priceTo', Number(e.target.value))
						}
					/>
				</div>

				<RangeSlider
					min={0}
					max={1000}
					step={10}
					value={[prices.priceFrom || 0, prices.priceTo || 1000]}
					onValueChange={([priceFrom, priceTo]) =>
						setPrices({ priceFrom, priceTo })
					}
				/>
			</div>

			<CheckboxFiltersGroup
				title='Ингредиенты'
				name='ingredients'
				className='mt-5'
				limit={6}
				defaultItems={items.slice(0, 6)}
				items={items}
				loading={loading}
				onClickCheckbox={onAddId}
				selected={selectedIds}
			/>
		</div>
	)
}
