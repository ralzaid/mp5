"use client";
import { PostProps } from "@/app/types";
import { useState } from "react"
import NewPost from "./new-post";
import createNewPost from "@/lib/createNewPost";

export default function DisplayAllPosts({
  inputPosts,
}: {
  inputPosts: PostProps[];
}) {
  const [posts, setPosts] = useState(inputPosts);
  async function addNewPost(alias: string, url: string) {
    const p = await createNewPost(alias, url);
    if (p === null) {
      return false;
    }
    setPosts([p, ...posts])
    return true;
  }

  return (
    <div className="flex flex-col items-center">
      <NewPost createFunc={addNewPost} />
    </div>
  );
}