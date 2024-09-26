import React from 'react'

interface Props {
	className?: string
}

export const ProductPage: React.FC<any> = ({
	params: { id }
}: {
	params: { id: string }
}) => {
	return <p>Product {id}</p>
}
