import { Container, Title } from '@/shared/ui'

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
		</>
	)
}
