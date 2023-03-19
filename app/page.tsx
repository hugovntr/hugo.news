import { NextPage } from "next";
import { allBlogs } from "contentlayer/generated";
import Link from "next/link";

const Page: NextPage = () => {
    return (
        <div>
            <h1>Hugo Ventura</h1>
            {allBlogs.map((post) => (
                <Link href={`/blog/${post.slug}`} key={post.slug}>
                    <p>{post.title}</p>
                    Read
                </Link>
            ))}
        </div>
    );
};

export default Page;
