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

    async appwriteCreateAccount({ email, password, name }) {
        try {
            const user = await this.account.create(ID.unique(), email, password, name)

            if (user) {
                this.login(email, password)
            } else {
                return user
            }
        } catch (error) {
            throw error;
        }
    }

    async appwriteLogin({ email, password }) {
        try {
            const session = await this.account.createEmailSession(email, password)
            return session;
        } catch (error) {
            console.log("Appwrite service :: login :: error", error);
        }
    }

    async appwriteGetCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null
    }

    async appwriteLogout() {
        try {
            await this.account.deleteSessions();
        } catch {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new Authservice();

export default authService