const Home = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-grow flex-col items-center justify-center bg-gray-100 p-4">
        <h1 className="mb-4 text-4xl font-bold">Welcome to LinkinPurry</h1>
        <p className="mb-4 text-lg">
          Connect with professionals{" "}
          <span className="text-red-500">around</span> the world
        </p>
        <button className="rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-800">
          Get Started
        </button>
      </main>
      <footer className="bg-gray-800 p-4 text-center text-white">
        <p>&copy; 2024 LinkinPurry. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
