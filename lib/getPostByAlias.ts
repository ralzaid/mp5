import getCollection, { COLLECTION }  from "@/db";
import { PostProps } from "@/app/types";

export default async function getPostByAlias(
    alias: string,
): Promise<PostProps | null> {
    const postsCollection = await getCollection(COLLECTION);
    const data = await postsCollection.findOne({ alias });

    if (data === null){
        return null;
    }

    const post : PostProps = {
        id: data._id.toHexString(),
        alias: data.alias,
        url: data.url,
    };

    return post;
}