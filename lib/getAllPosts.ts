import getCollection, {COLLECTION} from "@/db";
import { PostProps } from "../app/types";

export default async function getAllPosts(): Promise<PostProps[]> {
    const postsCollection = await getCollection(COLLECTION);
    const data = await postsCollection.find().toArray();

    const posts: PostProps[] = data.map((p) => ({
        id: p._id.toHexString(),
        alias: p.alias,
        url: p.url,
    }));
    return posts.reverse();
}