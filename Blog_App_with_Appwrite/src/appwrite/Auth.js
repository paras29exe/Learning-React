import conf from '../conf/conf'
import { Client, Account, ID } from 'appwrite'

export class Authservice {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteEndpointUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name}) {
        try {
            const user = await this.account.create(ID.unique(), email, password,name)
            if (user) {
                return this.login({email, password})
            } else {
                return user
            }
        } catch (error) {
            console.error("Appwrite service :: createAccount :: error", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
            
        } catch (error) {
            console.log("Appwrite service :: login :: error", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null
    }

    async logout() {
        try {
            await this.account.deleteSession('current');
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new Authservice();

export default authService