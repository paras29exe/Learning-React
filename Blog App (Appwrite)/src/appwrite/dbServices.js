import conf from '../conf/conf'
import { Client, ID, Databases, Storage, Query } from 'appwrite'

export class Service {
    client = new Client();
    database;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteEndpointUrl)
            .setProject(conf.appwriteProjectId);
        this.database = new Databases(this.client)
        this.storage = new Storage(this.client)
    }
    // async create post
    async createPost({ title, slug, content, featuredimage, status, userId }) {
        // try catch
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // we are using slug as document Id because it is syntax according to documentation
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userId
                }
            )
        } catch {
            console.log("Database service :: create :: error", error);
        }
    }
    // update post
    async updatePost(slug, { title, content, featuredimage, status }) {
        try {
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status
                }
            )
        } catch {
            console.log("Database service :: update :: error", error);
        }
    }
    // delete post
    async deletePost(slug) {
        try {
            await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch {
            console.log("Database service :: delete :: error", error);
        }
    }
    // get particular post
    async getPost(slug) {
        try {
            const response = await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch {
            console.log("Database service :: get :: error", error);
        }
    }
    // list posts according to query
    async listPosts() {
        try {
            const response = await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("status", "active")
                ]
            )
        } catch {
            console.log("Database service :: list :: error", error);
        }
    }

    // file upload services

    // upload file
    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )

        } catch (error) {
            console.log("Database service :: uploadFile :: error", error);
            return false
        }
    }
    // delete file
    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Database service :: deleteFile :: error", error);
            return false
        }
    }
    // get file preview
    async getFilePreview(fileId) {
        try {
            return this.storage.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Database service :: getFilePreview :: error", error);
            return false
        }
    }
}

const service = new Service()

export default service