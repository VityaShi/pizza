import { Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'

import { categories, ingredients, products } from './constants'
import { prisma } from './prisma-client'

const randomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) + min)
}

const generatePizza = (
	productId: number,
	type: number,
	size: number
): Prisma.ProductItemUncheckedCreateInput => {
	return {
		productId,
		size,
		pizzaType: type,
		price: randomNumber(190, 600)
	}
}

async function up() {
	await prisma.user.createMany({
		data: [
			{
				fullName: 'User',
				email: 'test@user',
				password: hashSync('test', 10),
				verified: new Date(),
				role: 'USER'
			},
			{
				fullName: 'Admin',
				email: 'test@admin',
				password: hashSync('test', 10),
				verified: new Date(),
				role: 'ADMIN'
			}
		]
	})
	await prisma.category.createMany({
		data: categories
	})
	await prisma.ingredient.createMany({
		data: ingredients
	})
	await prisma.product.createMany({
		data: products
	})
	const pizza1 = await prisma.product.create({
		data: {
			name: 'Сырная',
			imageUrl:
				'https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(0, 5)
			}
		}
	})
	const pizza2 = await prisma.product.create({
		data: {
			name: 'Пепперони Фреш',
			imageUrl:
				'https://media.dodostatic.net/image/r:292x292/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(5, 10)
			}
		}
	})
	const pizza3 = await prisma.product.create({
		data: {
			name: 'Мясная с аджикой',
			imageUrl:
				'https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.avif',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(10, 15)
			}
		}
	})
	await prisma.productItem.createMany({
		data: [
			generatePizza(1, 1, 20),
			generatePizza(1, 2, 30),
			generatePizza(1, 3, 40),

			generatePizza(2, 1, 20),
			generatePizza(2, 2, 30),
			generatePizza(2, 3, 40),

			generatePizza(3, 1, 20),
			generatePizza(3, 2, 30),
			generatePizza(3, 3, 40)
		]
	})
}

// 	await prisma.pizza.createMany({
// 		data: [
// 			generatePizza(1, 1, 20),
// 			generatePizza(1, 2, 30),
// 			generatePizza(1, 3, 40),

// 			generatePizza(2, 1, 20),
// 			generatePizza(2, 2, 30),
// 			generatePizza(2, 3, 40),

// 			generatePizza(3, 1, 20),
// 			generatePizza(3, 2, 30),
// 			generatePizza(3, 3, 40)
// 		]
// 	})

// 	await prisma.cart.createMany({
// 		data: [
// 			{
// 				userId: 1,
// 				totalAmount: 0
// 			},
// 			{
// 				userId: 2,
// 				totalAmount: 0
// 			}
// 		]
// 	})

// 	await prisma.cartItem.create({
// 		data: {
// 			pizzaId: 1,
// 			cartId: 1,
// 			userId: 1,
// 			quantity: 1,
// 			ingredients: {
// 				connect: [{ id: 1 }, { id: 2 }, { id: 3 }]
// 			}
// 		}
// 	})
// }

async function down() {
	await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`
	await prisma.$executeRaw`TRUNCATE TABLE User;`
	await prisma.$executeRaw`TRUNCATE TABLE Category;`
	await prisma.$executeRaw`TRUNCATE TABLE Product;`
	await prisma.$executeRaw`TRUNCATE TABLE Ingredient;`
	await prisma.$executeRaw`TRUNCATE TABLE \`Order\`;`
	await prisma.$executeRaw`TRUNCATE TABLE VerificationCode;`
	await prisma.$executeRaw`TRUNCATE TABLE Cart;`
	await prisma.$executeRaw`TRUNCATE TABLE CartItem;`
	await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`
}

async function main() {
	try {
		await down()
		await up()
	} catch (e) {
		console.error(e)
	}
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
