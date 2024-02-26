/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-02-26 17:00:09
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-02-26 17:16:44
 * @FilePath: /aspoem/src/app/(.)/poem/[id]/components/body.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import { type Author, type Poem } from "@prisma/client";
import { Verse } from "~/components/verse";
import { cn } from "~/utils";
import CopyButton from "./copybutton";

export const Body = (props: {
  poem: Poem & { author: Author };
  py?: boolean;
}) => {
  const { py, poem } = props;

  const content = poem.content.split("\n");
  const contentPinYin = poem.contentPinYin?.split("\n") ?? [];

  const annotation = JSON.parse(poem.annotation ?? "{}") as {
    [key in string]: string;
  };

  const titlePinYin = py ? poem.titlePinYin ?? "" : "";

  const shi = poem.genre === "诗";

  return (
    <article className="group py-8">
      <div className={cn(py && "space-y-4")}>
        <Verse
          variant="title"
          content={poem.title}
          py={titlePinYin}
          className={cn(py ? "pt-4" : "", "px-4")}
        />
        <Verse
          content={`${poem.author.dynasty}·${poem.author.name}`}
          className={cn(
            py ? "!mb-8" : "mb-6 mt-4",
            "text-secondary-foreground",
          )}
        />

        {/* 额外信息 */}
        {poem.introduce && (
          <p
            className={cn(
              "px-4 py-2 text-left text-base !not-italic text-muted-foreground transition-all md:px-0",
              py && "mb-12",
            )}
          >
            {poem.introduce}
          </p>
        )}

        {content.map((line, index) => (
          <Verse
            key={line}
            content={line}
            annotation={annotation}
            variant={shi ? "shi" : "body"}
            py={py ? contentPinYin[index] : ""}
            className={cn(!shi && "px-4 md:px-0")}
          />
        ))}
      </div>

      <CopyButton
        data={poem}
        className="absolute right-1 top-1 transition-all group-hover:opacity-100 md:opacity-0"
      />
    </article>
  );
};
