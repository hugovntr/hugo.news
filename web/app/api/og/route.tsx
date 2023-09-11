// import { ImageResponse } from "next/server";
//
// export const runtime = "edge";
//
// // noinspection JSUnresolvedReference
// const key = crypto.subtle.importKey(
//     "raw",
//     new TextEncoder().encode(process.env.ENCRYPT_KEY),
//     { name: "HMAC", hash: { name: "SHA-256" } },
//     false,
//     ["sign"]
// );
//
// function toHex(buffer: ArrayBuffer) {
//     return Array.prototype.map
//         .call(new Uint8Array(buffer), (n: number) =>
//             n.toString(16).padStart(2, "0")
//         )
//         .join("");
// }
//
// const titleFont = fetch(
//     new URL("../../../assets/montserrat.ttf", import.meta.url)
// ).then((r) => r.arrayBuffer());
// const textFont = fetch(
//     new URL("../../../assets/inter.ttf", import.meta.url)
// ).then((r) => r.arrayBuffer());
//
export interface OGPayload {
    title: string;
    url: string;
    withPrompt: boolean;
}
//
// export async function GET(req: Request) {
//     const { searchParams } = new URL(req.url);
//
//     const data = searchParams.get("data");
//     const token = searchParams.get("token");
//     const verifyToken = toHex(
//         await crypto.subtle.sign(
//             "HMAC",
//             await key,
//             new TextEncoder().encode(data!)
//         )
//     );
//
//     const payload: OGPayload = JSON.parse(
//         Buffer.from(data!, "base64").toString("ascii")
//     );
//     if (token !== verifyToken)
//         return new Response("Invalid token", { status: 401 });
//
//     const titleFontData = await titleFont;
//     const textFontData = await textFont;
//
//     // @ts-ignore
//     return new ImageResponse(
//         (
//             <div
//                 style={{
//                     height: "100%",
//                     width: "100%",
//                     display: "flex",
//                     flexDirection: "row",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     backgroundColor: "#fff",
//                 }}
//             >
//                 <div
//                     style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         justifyContent: "center",
//                         width: "60%",
//                         height: "100%",
//                         padding: "0 10%",
//                         overflow: "hidden",
//                         gap: 16,
//                     }}
//                 >
//                     <div
//                         style={{
//                             display: "flex",
//                             flexDirection: "row",
//                             alignItems: "center",
//                             gap: 16,
//                         }}
//                     >
//                         <img
//                             src={
//                                 "https://avatars.githubusercontent.com/hugovntr"
//                             }
//                             height="42"
//                             width="42"
//                             style={{ borderRadius: 42, objectFit: "cover" }}
//                             alt="Hugo Ventura"
//                         />
//                         <div
//                             style={{ display: "flex", flexDirection: "column" }}
//                         >
//                             <p
//                                 style={{
//                                     fontFamily: "Inter",
//                                     fontWeight: 500,
//                                     fontSize: 20,
//                                     color: "#525252",
//                                     lineHeight: 1,
//                                     padding: 0,
//                                     marginBottom: 4,
//                                     marginTop: 0,
//                                 }}
//                             >
//                                 Hugo Ventura.
//                             </p>
//                             <p
//                                 style={{
//                                     fontFamily: "Inter",
//                                     fontWeight: 400,
//                                     fontSize: 16,
//                                     color: "#a3a3a3",
//                                     lineHeight: 1,
//                                     padding: 0,
//                                     margin: 0,
//                                 }}
//                             >
//                                 hugo.news
//                             </p>
//                         </div>
//                     </div>
//                     <h1
//                         style={{
//                             fontFamily: "Montserrat",
//                             fontSize: 88,
//                             fontWeight: 900,
//                             width: "100%",
//                             height: "auto",
//                             display: "flex",
//                             flexWrap: "wrap",
//                             gap: 16,
//                             lineHeight: 0.8,
//                         }}
//                     >
//                         {payload.title.split(" ").map((w) => (
//                             <span key={w}>{w}</span>
//                         ))}
//                     </h1>
//                     {payload.withPrompt && (
//                         <div
//                             style={{
//                                 display: "flex",
//                                 justifyContent: "flex-start",
//                                 flexDirection: "row",
//                             }}
//                         >
//                             <p
//                                 style={{
//                                     fontFamily: "Inter",
//                                     fontWeight: 500,
//                                     fontSize: 14,
//                                     padding: "6px 16px",
//                                     borderRadius: "999px",
//                                     backgroundColor: "#ffedd5",
//                                     color: "#ea580c",
//                                     lineHeight: 1,
//                                 }}
//                             >
//                                 WITH PROMPT
//                             </p>
//                         </div>
//                     )}
//                 </div>
//                 <div
//                     style={{
//                         display: "flex",
//                         height: "100%",
//                         width: "40%",
//                         backgroundColor: "#f5f5f5",
//                     }}
//                 >
//                     <img
//                         height="120%"
//                         width="100%"
//                         style={{
//                             objectFit: "cover",
//                             transform: "translateX(24px)",
//                             transformOrigin: "top left",
//                         }}
//                         alt={payload.title}
//                         src={payload.url}
//                     />
//                 </div>
//             </div>
//         ),
//         {
//             height: 630,
//             width: 1200,
//             fonts: [
//                 { name: "Montserrat", data: titleFontData, style: "normal" },
//                 { name: "Inter", data: textFontData, style: "normal" },
//             ],
//         }
//     );
// }

import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: Request) {
    return new Response();
}
