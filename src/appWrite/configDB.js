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
            return false;
        }
    }
    async getPostList(queries = [Query.equal("status", "active")]) {
        try {
            // Validate that collection and database IDs are set
            if (!config.appwriteDatabaseId || !config.appwriteCollectionId) {
                throw new Error("Database ID or Collection ID is missing in config.");
            }

            // Ensure queries is an array
            if (!Array.isArray(queries)) {
                queries = [queries];
            }

            // Fetch documents
            const response = await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            );

            console.log("getPostList response:", response);
            return response;
        } catch (error) {
            console.error("appwrite::getPostList:: error", error.message || error);
            return false;
        }
    }



    // Upload Files and delete file
    async uploadFile(file) {
        if (!file) {
            throw new Error("File is required.");
        }

        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.error("appwrite::uploadFile::error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        if (!fileId) {
            throw new Error("File ID is required.");
        }

        try {
            await this.bucket.deleteFile(config.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.error("appwrite::deleteFile::error", error);
            return false;
        }
    }

    getPreview(fileId) {
        if (!fileId) {
            throw new Error("File ID is required.");
        }

        return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
    }

    getDownload(fileId) {
        if (!fileId) {
            throw new Error("File ID is required.");
        }

        return this.bucket.getFileDownload(config.appwriteBucketId, fileId);
    }
}

const service = new Service();
export default service;