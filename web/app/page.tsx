import type { NextPage } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme";
import { cache, Suspense } from "react";
import { Octokit } from "@octokit/core";
import { type Commit, type User } from "@octokit/graphql-schema";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Github } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const runtime = "edge";
export const revalidate = 10000;

const Page: NextPage = async () => {
    return (
        <>
            <div className="container mt-16 max-w-prose">
                <Image
                    src={"https://avatars.githubusercontent.com/hugovntr"}
                    height={96}
                    width={96}
                    className="bg-muted shadow-brand-200 dark:shadow-brand-950 mb-8 h-20 w-20 rounded-full object-cover shadow-2xl"
                    alt="Hugo Ventura"
                />
                <h1 className="mb-4 text-2xl">
                    <span className="block">👋🏻 Hello! I am</span>
                    <span className="font-title block text-5xl font-semibold">
                        Hugo
                    </span>
                </h1>
                <p>
                    <strong>Software engineer</strong> with a strong interest
                    and expertise in <strong>Design</strong> and{" "}
                    <strong>Generative AI</strong>.
                </p>
                <div className="mt-8 flex items-center justify-between">
                    <div className="grid grid-flow-col gap-2">
                        <Button asChild variant="outline" size="icon">
                            <Link href="https://x.com/hugovntr" target="_blank">
                                <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="icon">
                            <Link
                                href="https://github.com/hugovntr"
                                target="_blank"
                            >
                                {/* prettier-ignore */}
                                <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="currentColor"/></svg>
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="icon">
                            <Link
                                href="https://huggingface.co/hugovntr"
                                target="_blank"
                            >
                                🤗
                            </Link>
                        </Button>
                    </div>
                    <Button asChild variant="link" className="ml-auto mr-4 p-0">
                        <Link href={"/gallery"} className="inline-flex">
                            <span>AI Gallery</span>
                            <ArrowUpRight className="ml-1 h-4 w-4" />
                        </Link>
                    </Button>
                    <ThemeSwitcher />
                </div>
            </div>
            <div className="prose dark:prose-invert container mt-12">
                <p>
                    Passionate software engineer with over 10 years of
                    experience,
                </p>
                <p>
                    Late 2022, I decided to approach new challenges with
                    generative AI. Whether it is with{" "}
                    <Link href="https://x.com/hugovntr/status/1708792093814976925">
                        completely autonomous agents
                    </Link>{" "}
                    or{" "}
                    <Link href="https://x.com/hugovntr/status/1718672506112860317">
                        Fine-tuned Large Language Model
                    </Link>
                    . This journey is fueled by a love for pushing the
                    boundaries of technology.
                </p>
            </div>
            <div className="divide-accent container my-12 grid max-w-prose grid-cols-1 gap-12 lg:grid-cols-2">
                <Suspense fallback={<FallbackCard />}>
                    <GitHubCard />
                </Suspense>
                <Suspense fallback={<FallbackCard />}>
                    <HuggingFaceCard />
                </Suspense>
            </div>
            <div className="prose dark:prose-invert container mb-16">
                <p>
                    A meaningful example that reflects my values is my
                    commitment to knowledge-sharing. Having self-taught much of
                    what I know, I understand the challenges of that journey. In
                    response, I actively share my insights and learnings online,
                    be it through various platforms or contributing to projects.
                </p>
                <p>
                    My intent is not just to educate, but to provide a helping
                    hand by sharing the discoveries and experiences that would
                    have greatly benefited me when I first started. It is my way
                    of giving back to the community and making the learning path
                    a bit smoother for others who are on a similar journey of
                    self-discovery in the vast realm of modern tech
                </p>
            </div>
        </>
    );
};

const fetchGithub = cache(async () => {
    const octokit = new Octokit({ auth: process.env.GH_TOKEN });

    return octokit.graphql<{ user: User }>(`{
        user(login: "hugovntr") {
            avatarUrl
            url
            name
            repositories(first:100, ownerAffiliations: [OWNER, ORGANIZATION_MEMBER]) {
                totalCount
                nodes {
                    defaultBranchRef {
                        target {
                            ... on Commit {
                                history {
                                    totalCount
                                }
                            }
                        }
                    }
                }
            }
        }
    }`);
});

const GitHubCard = async () => {
    const gh = await fetchGithub();
    const commits = gh.user.repositories.nodes.reduce((acc, cur) => {
        return acc + (cur.defaultBranchRef.target as Commit).history.totalCount;
    }, 0);

    return (
        <Link
            href={gh.user.url}
            target="_blank"
            className="bg-background flex items-center gap-4"
        >
            <figure className="relative flex-shrink-0">
                <Image
                    src={gh.user.avatarUrl}
                    alt={gh.user.name}
                    height={56}
                    width={56}
                    className="rounded-full"
                />
                <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border bg-gray-100">
                    {/* prettier-ignore */}
                    <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                </div>
            </figure>
            <div>
                <p className="font-title font-semibold">{gh.user.name}</p>
                <div className="inline-flex gap-4">
                    <p className="text-sm">
                        <span className="tabular-nums">{commits}</span> commits
                    </p>
                    <p className="text-sm">
                        <span className="tabular-nums">
                            {gh.user.repositories.totalCount}
                        </span>{" "}
                        repositories
                    </p>
                </div>
            </div>
            <ArrowUpRight className="ml-auto h-5 w-5 flex-shrink-0" />
        </Link>
    );
};

const HuggingFaceCard = () => {
    return (
        <Link
            href="https://huggingface.co/syntonomous"
            target="_blank"
            className="bg-background flex items-center gap-4"
        >
            <figure className="relative flex-shrink-0">
                <Image
                    src={
                        "https://aeiljuispo.cloudimg.io/v7/https://cdn-uploads.huggingface.co/production/uploads/64a8f44f9a803a657dd9c845/QzsAvNyjdayFL4eCvmLDf.png?w=200&h=200&f=face"
                    }
                    alt={"syntonomous"}
                    height={56}
                    width={56}
                    className="rounded-full"
                />
                <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border bg-gray-100">
                    <span className="text-xs">🤗</span>
                </div>
            </figure>
            <div>
                <p className="font-title font-semibold">Syntonomous</p>
                <p>
                    <span className="tabular-nums">2</span> models
                </p>
            </div>
            <ArrowUpRight className="ml-auto h-5 w-5 flex-shrink-0" />
        </Link>
    );
};

const FallbackCard = () => {
    return (
        <div className="bg-background flex items-center gap-4">
            <Skeleton className="h-14 w-14 flex-shrink-0 rounded-full" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/3" />
            </div>
        </div>
    );
};

export default Page;
