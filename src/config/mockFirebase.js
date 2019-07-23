const mockEmail = 'testuser@mail.com';
const mockId = 'coPmxoqfItLsSR23oikAZ2pmp';

class MockFirebase {
	constructor() {
		this.auth = {
			currentUser: {
				email: mockEmail,
				id: mockId,
			},
			onAuthStateChanged: callback => {
				callback({
					email:mockEmail
				})
			}
		};
		this.db = {
			collection: () => {
				return {
					add: () => new Promise(resolve => resolve()),
					where: () => {
						return {
							onSnapshot: callback => {
								let arr = [
									{
										id: 1,
										data: function(){
											return {
												email: mockEmail,
												url: 'stackoverflow.com',
												password: 'aaAA11!',
												username: 'fakeAccount1',
												createdAt: '12-08-2010',
												updatedAt: '12-08-2010',
											}
										}
									},
									{
										id: 2,
										data: function(){
											return {
												email: mockEmail,
												url: 'github.com',
												password: 'bbBB99!',
												username: 'fakeAccount2',	
												createdAt: '12-08-2010',
												updatedAt: '12-08-2010',
											}
										}
									},
									{
										id: 3,
										data: function(){
											return {
												email: mockEmail,
												url: 'yahoo.com',
												password: 'ccCC33!',
												username: 'fakeAccount3',
												createdAt: '12-08-2010',
												updatedAt: '12-08-2010',
											}
										}
									},
								]
								callback(arr)
								return () => {}
							}
						}
					},
					doc: id => {
						return {
							get:() => new Promise(resolve => resolve({
								data: function(){
									return {
										email: mockEmail,
										url: 'github.com',
										password: 'bbBB99!',
										username: 'fakeAccount2',	
										createdAt: '12-08-2010',
										updatedAt: '12-08-2010',
									}
								},
								exists:true,
								id:1
							})),
							delete: () => new Promise(resolve => resolve()),
							set: updates => new Promise(resolve => resolve(updates))
						}
					}
				}
			}
		};
		this.session = 'fake session';
	}
	register(email, password) {
		return new Promise((resolve, reject) => {
			if(email === 'existinguser@mail.com') {
				reject({
					message:'error bro'
				})
			} else {
				resolve({ user: {email, password} } )
			}
		})
	}
	login(email, password) {
		return new Promise((resolve, reject) => {
			if(password === 'wrongpassword') {
				reject({
					message:'error bro'
				})
			} else {
				resolve({ user: {email, password} } )
			}
		})
	}	
	logout() {
		return new Promise(resolve => resolve())
	}
	isInitialized() {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve()
			}, 200);
		})
	}
}

let mockFirebase = new MockFirebase()

export default mockFirebase;