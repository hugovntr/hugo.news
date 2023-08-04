import { ImageResponse } from "@vercel/og";
import { NextRequest, NextResponse } from "next/server";
import { allBlogs } from "contentlayer/generated";
import Background from "public/og.jpg";

export const runtime = "edge";

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const slug = searchParams.get("slug");
    const document = allBlogs.find((d) => d.slug === slug);
    if (!document) return NextResponse.error();

    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    backgroundColor: "black",
                    color: "white",
                    backgroundImage: `url(${
                        request.nextUrl.origin + Background.src
                    })`,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: 160,
                        marginRight: 160,
                        marginTop: 160,
                    }}
                >
                    <p
                        style={{
                            fontSize: 112,
                            lineHeight: "0.9em",
                            fontWeight: "700",
                            whiteSpace: "pre-wrap",
                            marginBottom: 32,
                        }}
                    >
                        {document.title}
                    </p>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 32,
                        }}
                    >
                        {document.tags?.map((tag) => (
                            <p
                                key={tag}
                                style={{
                                    backgroundColor: "#111",
                                    padding: "8px 24px",
                                    fontSize: 16,
                                    letterSpacing: "0.15em",
                                    textTransform: "uppercase",
                                }}
                            >
                                {tag}
                            </p>
                        ))}
                        <p style={{ fontSize: 56 }}>
                            {document.lang === "fr" ? "🇫🇷" : "🇬🇧"}
                        </p>
                    </div>
                </div>
            </div>
        ),
        {
            width: 1920,
            height: 1080,
            emoji: "twemoji",
        }
    );
}
