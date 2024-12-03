import React from 'react'
import UserProfile from "@/assets/svg/post-user.svg";
import Edited from "@/assets/svg/post-edited.svg";
import Add from "@/assets/svg/post-add.svg";

function Feeds() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-light px-80 text-gray-dark p-[1rem]">
        <div className="flex flex-row mt-[1rem]">
            <div className="w-[15rem]"></div>

            <div className="flex flex-col ml-[1rem] mr-[1rem]">
                <div className="w-[39rem] h-[24rem]  py-[1.875rem] bg-gray-lighter rounded-xl drop-shadow flex flex-col items-center">
                    <div className="bg-black h-[10.75rem] w-[10.75rem] rounded-[50%] justify-center items-center flex">
                        <img src='gay'></img>
                    </div>

                    <h1 className=" text-4xl mt-[2rem] text-center">Welcome to Your Feeds,<br/> Tazkia Nizami</h1>

                    <p className="text-lg mt-[1rem]">Attain inspiration from posts shared by connected peers</p>
                </div>

                <div className="mt-[1rem] mb-[1rem] w-[39rem]">
                    <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center">
                            <span className="border-gray-dark w-full border-2" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="leading-none bg-gray-light px-2 text-[2rem] text-gray-600">
                                Discover Ideas
                            </span>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="w-[39rem] bg-gray-lighter p-[1.25rem] rounded-xl drop-shadow flex flex-col">
                        <div className="flex flex-row">
                            <p className="text-lg">from</p>
                            <img src={UserProfile} className=" ml-[0.5rem] mr-[0.5rem]"/>
                            <p className="text-lg text-blue-primary">Tazkia Nizami</p>
                        </div>

                        <div className="flex flex-row mt-[0.5rem]">
                            <p className="text-lg mr-[3.375rem]">15:14 | Nov 14, 2024</p>
                            <img src={Edited} className="mr-[0.5rem]"/>
                            <p className="text-lg">15:14 | Nov 14, 2024</p>
                        </div>

                        <div className="mt-[0.5rem]">
                            <p>       
                                at TypeScriptParserMixin.parseMaybeAssign (/app/node_modules/@babel/parser/lib/index.js:10379:21)
        frontend-1  |       at TypeScriptParserMixin.parseMaybeAssign (/app/node_modules/@babel/parser/lib/index.js:9438:20)
        frontend-1  |       at TypeScriptParserMixin.parseExpressionBase (/app/node_modules/@babel/parser/lib/index.js:10333:23)
        frontend-1  |       at /app/node_modules/@babel/parser/lib/index.js:10329:39
        frontend-1  |       at TypeScriptParserMixin.allowInAnd (/app/node_modules/@babel/parser/lib/index.js:11946:16)
        frontend-1  |       at TypeScriptParserMixin.parseExpression (/app/node_modules/@babel/parser/lib/index.js:10329:17)
        frontend-1  |       at TypeScriptParserMixin.parseReturnStatement (/app/node_modules/@babel/parser/lib/index.js:12636:28)
        frontend-1  | 11:27:10 AM [vite] hmr update /src/pages/Feeds.tsx, /src/index.css
        frontend-1  | 11:27:15 AM [vite] hmr update /src/pages/Feeds.tsx, /src/index.css
        frontend-1  | 11:27:17 AM [vite] hmr update /src/pages/Feeds.tsx, /src/index.css
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-[15rem] ">
                <div className="w-[15rem] h-[12.5rem] flex flex-row rounded-xl bg-gray-lighter drop-shadow flex flex-col items-center">
                    <div className="w-[15rem] h-[2.75rem] rounded-t-xl  bg-blue-secondary"></div>
                    <h1 className="text-xl mt-[1rem]">More Options</h1>
                    <div className="flex flex-col mt-2 space-y-[0.75rem]">
                        <button className="w-[8.25rem] h-[2rem] p-[0.5rem] bg-blue-primary bg-opacity-15 rounded-md flex items-center justify-center hover:bg-black">
                            <div className="flex flex-row opacity-100 w-fit">
                                <img src={Add}/>
                                <p className="leading-none text-base ml-2">Start a post</p>
                            </div>
                        </button>

                        <button className="w-[8.25rem] h-[2rem] p-[0.5rem] bg-blue-primary bg-opacity-15 rounded-md flex items-center justify-center hover:bg-black">
                            <p className="leading-none text-base">View your posts</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}

export default Feeds