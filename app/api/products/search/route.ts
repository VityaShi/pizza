import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/shared/api/prisma-client'

export async function GET(req: NextRequest) {
	const query = req.nextUrl.searchParams.get('query') || ''

	const products = await prisma.product.findMany({
		where: {
			name: {
				contains: query.toLowerCase()
			}
		},
		take: 5
	})

	return NextResponse.json(products)
}
