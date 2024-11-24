import { PostProps } from "../types";
import Link from "next/link";
export default function PostPreview({ post }: { post: PostProps }) {
    return (
    <Link href={`/post/${post.id}`}>
        <div className="bg-sky-400 rounded-x1 p-4 m-2 2-96">
        <h4 className="font-bold text-3x1">{post.alias}</h4>
        <h4 className="font-bold text-3x1">{post.url}</h4>
    </div>
    </Link>
    );
}