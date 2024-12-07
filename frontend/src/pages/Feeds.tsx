import UserProfile from "@/assets/svg/post-user.svg";
import Edited from "@/assets/svg/post-edited.svg";
import Add from "@/assets/svg/post-add.svg";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function Feeds() {
  const [cursor] = useState(0);
  const { data, error, isLoading, isError } = useQuery({
    staleTime: 1000 * 60 * 5,
    queryKey: ["feeds"],
    queryFn: () =>
      fetch(
        import.meta.env.VITE_API_BASE_URL +
          "/feed?" +
          new URLSearchParams({ limit: "10", cursor: cursor.toString() }),
      ).then((res) => res.json()),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  console.log(data);

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-light p-[1rem] px-80 text-gray-dark">
      <div className="mt-[1rem] flex flex-row">
        <div className="w-[15rem]"></div>

        <div className="ml-[1rem] mr-[1rem] flex flex-col">
          <div className="flex h-[24rem] w-[39rem] flex-col items-center rounded-xl bg-gray-lighter py-[1.875rem] drop-shadow">
            <div className="flex h-[10.75rem] w-[10.75rem] items-center justify-center rounded-[50%] bg-black">
              <img src="gay"></img>
            </div>

            <h1 className="mt-[2rem] text-center text-4xl">
              Welcome to Your Feeds,
              <br /> Tazkia Nizami
            </h1>

            <p className="mt-[1rem] text-lg">
              Attain inspiration from posts shared by connected peers
            </p>
          </div>

          <div className="mb-[1rem] mt-[1rem] w-[39rem]">
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-2 border-gray-dark" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-light px-2 text-[2rem] leading-none text-gray-600">
                  Discover Ideas
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex w-[39rem] flex-col rounded-xl bg-gray-lighter p-[1.25rem] drop-shadow">
              <div className="flex flex-row">
                <p className="text-lg">from</p>
                <img src={UserProfile} className="ml-[0.5rem] mr-[0.5rem]" />
                <p className="text-lg text-blue-primary">Tazkia Nizami</p>
              </div>

              <div className="mt-[0.5rem] flex flex-row">
                <p className="mr-[3.375rem] text-lg">15:14 | Nov 14, 2024</p>
                <img src={Edited} className="mr-[0.5rem]" />
                <p className="text-lg">15:14 | Nov 14, 2024</p>
              </div>

              <div className="mt-[0.5rem]">
                <p>
                  at TypeScriptParserMixin.parseMaybeAssign
                  (/app/node_modules/@babel/parser/lib/index.js:10379:21)
                  frontend-1 | at TypeScriptParserMixin.parseMaybeAssign
                  (/app/node_modules/@babel/parser/lib/index.js:9438:20)
                  frontend-1 | at TypeScriptParserMixin.parseExpressionBase
                  (/app/node_modules/@babel/parser/lib/index.js:10333:23)
                  frontend-1 | at
                  /app/node_modules/@babel/parser/lib/index.js:10329:39
                  frontend-1 | at TypeScriptParserMixin.allowInAnd
                  (/app/node_modules/@babel/parser/lib/index.js:11946:16)
                  frontend-1 | at TypeScriptParserMixin.parseExpression
                  (/app/node_modules/@babel/parser/lib/index.js:10329:17)
                  frontend-1 | at TypeScriptParserMixin.parseReturnStatement
                  (/app/node_modules/@babel/parser/lib/index.js:12636:28)
                  frontend-1 | 11:27:10 AM [vite] hmr update
                  /src/pages/Feeds.tsx, /src/index.css frontend-1 | 11:27:15 AM
                  [vite] hmr update /src/pages/Feeds.tsx, /src/index.css
                  frontend-1 | 11:27:17 AM [vite] hmr update
                  /src/pages/Feeds.tsx, /src/index.css
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[15rem]">
          <div className="flex h-[12.5rem] w-[15rem] flex-col items-center rounded-xl bg-gray-lighter drop-shadow">
            <div className="h-[2.75rem] w-[15rem] rounded-t-xl bg-blue-secondary"></div>
            <h1 className="mt-[1rem] text-xl">More Options</h1>
            <div className="mt-2 flex flex-col space-y-[0.75rem]">
              <button className="flex h-[2rem] w-[8.25rem] items-center justify-center rounded-md bg-blue-primary bg-opacity-15 p-[0.5rem] hover:bg-black">
                <div className="flex w-fit flex-row opacity-100">
                  <img src={Add} />
                  <p className="ml-2 text-base leading-none">Start a post</p>
                </div>
              </button>

              <button className="flex h-[2rem] w-[8.25rem] items-center justify-center rounded-md bg-blue-primary bg-opacity-15 p-[0.5rem] hover:bg-black">
                <p className="text-base leading-none">View your posts</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Feeds;
