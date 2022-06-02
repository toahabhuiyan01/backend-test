import app from "../dist/index";
import request from "supertest";
import { describe, expect, test } from '@jest/globals'
import { nanoid } from "nanoid";


describe("test", () => {

	test("Create User and check if created or not.", async () => {
		const phoneNumber = nanoid(11);
		const user = await request(app).post('/users').send({phoneNumber});

		const userAfter = await request(app).get(`/users?id=${user.body.body.user.id}`);

		expect(user.body.statusCode).toBe(201);

		expect(user.body.body.user.phone_no).toBe(userAfter.body.body[0].phone_no);
	})

	test("Create a user and update that user and check if it is updated", async () => {
		const phoneNumber = nanoid(11);
		const phoneNumberUp = nanoid(11);
		const user = await request(app).post('/users').send({phoneNumber});

		const userAfter = await request(app)
							.patch(`/users`)
							.query({
								id: user.body.body.user.id,
								phoneNumber: phoneNumberUp
							});
		// console.log(userAfter.body.body)
		expect(phoneNumberUp).toStrictEqual(userAfter.body.body.updated[0].phone_no);
	})

	test("Create user and delete user and check if its deleted or not", async () => {
		const phoneNumber = nanoid(11);
		const user = await request(app).post('/users').send({phoneNumber});

		const userAfter = await request(app)
							.delete(`/users`)
							.query({
								id: user.body.body.user.id
							});
		expect(phoneNumber).toStrictEqual(userAfter.body.body.deleted[0].phone_no);
	})

	test("Created multiple users and check if users updated", async () => {
		const numberOfUsers = 5;
		let userIds: any = [];
		let phoneNumbers: any = [];

		const promisesBeforeCreate = [...Array(numberOfUsers)].map(async () => {
			const phoneNumber = nanoid(11);
			const user = await request(app).post('/users').send({phoneNumber});
			expect(user.body.statusCode).toBe(201)
			console.log(user.body);
			userIds.push(user.body.body.user.id);
			phoneNumbers.push(user.body.body.user.phone_no);
		})
		await Promise.all(promisesBeforeCreate);

		const updatedPhones: any = [];
		[...Array(numberOfUsers)].map(async () => {
			const phoneNumber = nanoid(11);
			updatedPhones.push(phoneNumber);
		})
		
		const updatedUsers = await request(app)
							.patch("/users")
							.query({
								id: userIds.join(","), 
								phoneNumber: updatedPhones.join(",")
							})
		let updatedUserCount: number = 0;

		updatedUsers.body.body.updated.map(user => {
			if(userIds.includes(user.id))
				updatedUserCount++;
		})

		expect(updatedUserCount).toBe(numberOfUsers);
	})

	test("Create multiple users and check users deleted or not.", async () => {
		const numberOfUsers = 5;
		let userIds: any = [];
		let phoneNumbers: any = [];

		const promisesBeforeCreate = [...Array(numberOfUsers)].map(async () => {
			const phoneNumber = nanoid(11);
			const user = await request(app).post('/users').send({phoneNumber});
			expect(user.body.statusCode).toBe(201)
			console.log(user.body);
			userIds.push(user.body.body.user.id);
			phoneNumbers.push(user.body.body.user.phone_no);
		})
		await Promise.all(promisesBeforeCreate);

		const updatedPhones: any = [];
		[...Array(numberOfUsers)].map(async () => {
			const phoneNumber = nanoid(11);
			updatedPhones.push(phoneNumber);
		})
		
		const updatedUsers = await request(app)
							.delete("/users")
							.query({
								id: userIds.join(",")
							})
		let deletedUserCount: number = 0;

		updatedUsers.body.body.deleted.map(user => {
			if(phoneNumbers.includes(user.phone_no))
				deletedUserCount++;
		})

		expect(deletedUserCount).toBe(numberOfUsers);
	})

})