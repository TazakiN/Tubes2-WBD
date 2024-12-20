import Add from "@/assets/svg/post-add.svg";
import MessageCard from "@/components/Feeds/PostCard.jsx";
import { Link } from "@tanstack/react-router";
import { useInfiniteQuery } from "@tanstack/react-query";

function Feeds() {
  const {
    data,
    error,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["feeds"],
    queryFn: ({ pageParam = 0 }) =>
      fetch(
        import.meta.env.VITE_API_BASE_URL +
          "/feed?" +
          new URLSearchParams({ limit: "10", cursor: pageParam.toString() }),
      ).then((res) => res.json()),
    getNextPageParam: (lastPage) => {
      // Update based on your API's response structure
      return lastPage.nextCursor ?? undefined;
    },
    initialPageParam: 0,
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

          <div
            className="flex flex-col space-y-[1rem]"
            style={{ maxHeight: "50rem", overflowY: "auto" }}
            onScroll={(e) => {
              const target = e.currentTarget;
              if (
                target.scrollHeight - target.scrollTop <=
                target.clientHeight + 100
              ) {
                if (hasNextPage && !isFetchingNextPage) {
                  fetchNextPage();
                }
              }
            }}
          >
            {data &&
              data.pages.map((page, pageIndex) =>
                page.messages.map(
                  (
                    message: {
                      from: string;
                      timestamp: string;
                      content: string;
                      editedAt?: string;
                    },
                    messageIndex: number,
                  ) => (
                    <MessageCard
                      key={`${pageIndex}-${messageIndex}`}
                      from={message.from}
                      timestamp={message.timestamp}
                      content={message.content}
                      editedAt={message.editedAt}
                    />
                  ),
                ),
              )}
            {isFetchingNextPage && <div>Loading more...</div>}
          </div>
        </div>

        <div className="w-[15rem]">
          <div className="flex h-[12.5rem] w-[15rem] flex-col items-center rounded-xl bg-gray-lighter drop-shadow">
            <div className="h-[2.75rem] w-[15rem] rounded-t-xl bg-blue-secondary"></div>
            <h1 className="mt-[1rem] text-xl">More Options</h1>
            <div className="mt-2 flex flex-col space-y-[0.75rem]">
              <Link to="/createpost">
                <button className="flex h-[2rem] w-[8.25rem] items-center justify-center rounded-md bg-blue-primary bg-opacity-15 p-[0.5rem] hover:bg-black">
                  <div className="flex w-fit flex-row opacity-100">
                    <img src={Add} alt="icon" />
                    <p className="ml-2 text-base leading-none">Start a post</p>
                  </div>
                </button>
              </Link>
              {/* 
              <button className="flex h-[2rem] w-[8.25rem] items-center justify-center rounded-md bg-blue-primary bg-opacity-15 p-[0.5rem] hover:bg-black">
                <p className="text-base leading-none">View your posts</p>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Feeds;
