import { NextResponse } from 'next/server'

import { prisma } from '@/shared/api/prisma-client'

export async function GET() {
	const ingredients = await prisma.ingredient.findMany()
	return NextResponse.json(ingredients)
}
