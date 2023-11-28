import Link from "next/link";
import Image from "next/image";
import { ReactNode, Suspense } from "react";
import { SocialButtons } from "@/components/socials";
import { ThemeSwitcher } from "@/components/theme";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div>
            <div className="container">
                <Link href="/">
                    <Image
                        src={"https://avatars.githubusercontent.com/hugovntr"}
                        height={96}
                        width={96}
                        className="bg-muted mx-auto mt-4 h-12 w-12 rounded-full object-cover"
                        alt="Hugo Ventura"
                    />
                </Link>
            </div>
            <div className="container mt-4 flex max-w-prose justify-between">
                <SocialButtons />
                <div className="flex items-center gap-4">
                    <Suspense>
                        <Breadcrumb />
                    </Suspense>
                    <ThemeSwitcher />
                </div>
            </div>
            <main className="py-24">{children}</main>
        </div>
    );
}

const Breadcrumb = async () => {
    return (
        <div className="flex items-center gap-4">
            <Button asChild variant="link" className="p-0">
                <Link href={"/blog"} className="inline-flex">
                    <span>Blog</span>
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
            </Button>
            <Button asChild variant="link" className="p-0">
                <Link href={"/gallery"} className="inline-flex">
                    <span>AI Gallery</span>
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
            </Button>
        </div>
    );
};
