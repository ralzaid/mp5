"use server";
import getCollection, {COLLECTION} from "@/db";
import { PostProps } from "../app/types";

export default async function createNewPost(
    alias: string,
    url: string,
): Promise<PostProps | null> {
    const postsCollection = await getCollection(COLLECTION);
    const used = await postsCollection.findOne({alias});
    if (used) throw new Error ("Use a different alias. This one has been used.")
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