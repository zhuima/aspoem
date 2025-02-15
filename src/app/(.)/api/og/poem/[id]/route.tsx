import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { api } from "~/trpc/server";

// Image generation
export async function GET(
  _request: Request,
  { params }: { params: { id: number } },
) {
  const poem = await api.poem.findById.query(Number(params.id));

  if (!poem) return notFound();

  const content = poem.content.split("\n").slice(0, 4);

  return new ImageResponse(
    (
      <div
        lang="zh-CN"
        style={{
          background: "#0c0c0c",
          color: "#fff",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 32,
          position: "relative",
          fontFamily: "cursive",
        }}
      >
        <p
          style={{
            fontSize: 72,
            display: "flex",
            justifyContent: "center",
            marginTop: -72,
          }}
        >
          {poem.title}
        </p>
        <p
          style={{
            fontSize: 24,
            display: "flex",
            justifyContent: "center",
            marginTop: -12,
            opacity: 0.7,
          }}
        >
          {poem.author.dynasty} · {poem.author.name}
        </p>

        {content.map((_, index) => (
          <p
            key={index}
            style={{
              fontSize: 36,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              opacity: 0.8,
            }}
          >
            {_}
          </p>
        ))}

        <p
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            opacity: 0.7,
            position: "absolute",
            bottom: 18,
            left: 32,
            fontSize: 16,
          }}
        >
          aspoem.com
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
