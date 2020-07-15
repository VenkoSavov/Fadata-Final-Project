import { handleErrorStausCodes } from './service-utils';
import { User } from '../model/user.model';
import { IdType } from '../shared/shared-types';

export const API_BASE = 'http://localhost:9000/api';

class UserService {
    constructor(private apiUrl: string) {}

    async getAllUsers() {
        const resp = await fetch(`${this.apiUrl}/users`);
        return handleErrorStausCodes<User[]>(resp);
    }

    async getUserById(userId: IdType) {
        const resp = await fetch(`${this.apiUrl}/users/${userId}`);
        return handleErrorStausCodes<User>(resp);
    }

    async createNewUser(user: User, authToken: string | undefined) {
        const resp = await fetch(`${this.apiUrl}/users`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken || ''}`
        },
            body: JSON.stringify(user),
        });
        return handleErrorStausCodes<User>(resp);
    }

    async updateUser(user: User) {
        const resp = await fetch(`${this.apiUrl}/users/${user._id}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user),
        });
        return handleErrorStausCodes<User>(resp);
    }

    async deleteUser(userId: IdType) {
        const resp = await fetch(`${this.apiUrl}/users/${userId}`, {
            method: 'DELETE',
            mode: 'cors'
        });
        return handleErrorStausCodes<User>(resp);
    }

}



export default new UserService(API_BASE);
