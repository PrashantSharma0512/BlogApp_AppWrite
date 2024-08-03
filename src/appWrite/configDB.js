import config from "../config/config";
import { Client, ID, Databases, Query, Storage } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async createPost({ title, slug, featureImage, content, status, userId }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status,
                    userId,
                },
            )
            
        } catch (error) {
            throw error;
        }
    }
    async updatePost(slug, { title, featureImage, content, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    featureImage,
                    content,
                    status,
                },
            )
        } catch (error) {
            throw error;
        }
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
            )
            return true;

        } catch (error) {
            console.log("appwrite:: error", error);
            return false;
        }
    }
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
            )

        } catch (error) {
            console.log("appwrite::getpost:: error", error);
        }
    }
    async getPostList(query = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                query,
            )
        } catch (error) {
            console.log("appwrite :: getList:: error", error);
        }
    }

    // Upload Files and delete file
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file,
            );
        } catch (error) {
            console.log("appwrite :: upload file:: error", error);
        }
    }
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId,
            )
            return true
        } catch (error) {
            console.log("appwrite::deletefile:: error", error);
            return false;
        }
    }
    getPreview(fileId) {
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId,
        )
    }
    getDownload(fileId) {
        return this.bucket.getFileDownload(
            config.appwriteBucketId,
            fileId,
        );
    }
}

const service = new Service();
export default service;