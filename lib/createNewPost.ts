"use server";
import getCollection, {COLLECTION} from "@/db";
import { PostProps } from "../app/types";


function isValidUrl(url: string): boolean {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
    } catch {
        return false;
    }
}

export default async function createNewPost(
    alias: string,
    url: string,
): Promise<PostProps | null> {
    const postsCollection = await getCollection(COLLECTION);
    const used = await postsCollection.findOne({alias});
    if (used) throw new Error ("Use a different alias. This one has been used.")
    if (!isValidUrl(url)) {
        throw new Error("Invalid URL, include the http protocol.");
    }    
    
    const p = {
        alias: alias,
        url: url,
    };
    const res = await postsCollection.insertOne(p);

    if (!res.acknowledged) {
        return null;
    }

    return {...p, id: res.insertedId.toHexString()};
}