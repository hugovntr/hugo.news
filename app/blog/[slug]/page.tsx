import { allBlogs } from "contentlayer/generated";
import type { Metadata, NextPage } from "next";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx";

type Params = {
    slug: string;
};

export async function generateStaticParams() {
    return allBlogs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Params;
}): Promise<Metadata | undefined> {
    const post = allBlogs.find((doc) => doc.slug === params.slug);
    if (!post) return;

    return {
        title: post.title,
    };
}

const Page: NextPage<{ params: Params }> = (props) => {
    const {
        params: { slug },
    } = props;
    console.log(slug);
    const post = allBlogs.find((doc) => doc.slug === slug);
    if (!post) notFound();

    return (
        <section>
            <h1>{post.title}</h1>
            <Mdx code={post.body.code} />
        </section>
    );
};

export default Page;
