"use client";

import type Post from "../models/post";
import type { WithId } from "mongodb";
import Link from "next/link";

export default function ListItem({ result }: { result: WithId<Post>[] }) {
  return (
    <div className="space-y-4">
      {result.map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between bg-white rounded-lg shadow p-4 hover:shadow-md transition-all duration-200"
        >
          <div className="flex-1">
            <Link href={"/detail/" + result[i]._id}>
              <h4 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                {result[i].title}
              </h4>
            </Link>
            <p className="text-sm text-gray-500 mt-1">1월 1일</p>
          </div>

          <div className="flex items-center gap-3 text-xl">
            <Link
              href={"/edit/" + result[i]._id}
              className="hover:text-yellow-500 transition-colors"
            >
              ✏️
            </Link>

            <span
              className="cursor-pointer hover:text-red-500 transition-colors"
              onClick={(e) => {
                fetch("/api/post/delete", {
                  method: "DELETE",
                  body: result[i]._id.toString(),
                })
                  .then((r) => r.json())
                  .then(() => {
                    const target = e.target as HTMLElement;
                    const parent = target.parentElement;
                    if (parent) {
                      parent.style.opacity = "0";
                      setTimeout(() => {
                        parent.style.display = "none";
                      }, 1000);
                    }
                  });
              }}
            >
              🗑️
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
