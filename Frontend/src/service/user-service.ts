import { handleErrorStausCodes } from './service-utils';
import { User } from '../model/user.model';

export const API_BASE = 'http://localhost:9000/api';

class UserService {
    constructor(private apiUrl: string) {}

    // async getAllPosts() {
    //     const resp = await fetch(`${this.apiUrl}/posts`);
    //     return handleErrorStausCodes<Post[]>(resp);
    // }

    // async getPostById(postId: IdType) {
    //     const resp = await fetch(`${this.apiUrl}/posts/${postId}`);
    //     return handleErrorStausCodes<Post>(resp);
    // }

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

    // async updatePost(post: Post) {
    //     const resp = await fetch(`${this.apiUrl}/posts/${post._id}`, {
    //         method: 'PUT',
    //         mode: 'cors',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify(post),
    //     });
    //     return handleErrorStausCodes<Post>(resp);
    // }

    // async deletePost(postId: IdType) {
    //     const resp = await fetch(`${this.apiUrl}/posts/${postId}`, {
    //         method: 'DELETE',
    //         mode: 'cors'
    //     });
    //     return handleErrorStausCodes<Post>(resp);
    // }

}



export default new UserService(API_BASE);
