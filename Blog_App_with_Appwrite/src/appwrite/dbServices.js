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
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // we are using slug as document Id because it is syntax according to documentation
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Database service :: createPost :: error", error);
        }
    }
    // update post
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch(error) {
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
            const res= await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            console.log(res);
            
            return res
        } catch (error) {
            console.log("Database service :: getPost :: error", error);
            return false
        }
    }
    // list posts according to query
    async listPosts(queries = [Query.equal("status", "active")]) {
        try {
            const res= await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
          return res

        } catch (error) {
            console.log("Database service :: list :: error", error);
            return false
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
            // return false
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
        // console.log(fileId)
        try {
            const response = this.storage.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )        
            return response.href 
        } catch (error) {
            console.log("Database service :: getFilePreview :: error", error);
            return null
        }
    }
}

const dbService = new Service()

export default dbService