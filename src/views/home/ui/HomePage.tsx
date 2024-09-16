import { Filters } from '@/widgets/filters'
import { TopBar } from '@/widgets/top-bar'

import { Container, Title } from '@/shared/ui'

// import { Categories } from '../../../widgets/top-bar/ui/categories'
// import { SortPopup } from '../../../widgets/top-bar/ui/sort-popup'

export default function Home() {
	return (
		<>
			<Container className='mt-10'>
				<Title
					text='Все пиццы'
					size='lg'
					className='font-extrabold'
				/>
			</Container>
			<TopBar />
			<Container className='mt-10 pb-14'>
				<div className='flex gap-[60px]'>
					<div className='w-[250px]'>
						<Filters />
					</div>
					<div className='flex-1'>
						<div className='flex flex-col gap-16'>Product list</div>
					</div>
				</div>
			</Container>
		</>
	)
}
