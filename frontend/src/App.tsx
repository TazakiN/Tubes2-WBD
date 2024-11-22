import reactLogo from "./assets/react.svg";
function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <header className="bg-blue-700 text-white p-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src={reactLogo} className="h-8 w-8 mr-2" alt="React Logo" />
            <span className="text-xl font-bold">LinkedIn Clone</span>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Network
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Jobs
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Messaging
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Notifications
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <main className="flex-grow flex flex-col items-center justify-center bg-gray-100 p-4">
          <h1 className="text-4xl font-bold mb-4">Welcome to LinkedIn Clone</h1>
          <p className="text-lg mb-4">
            Connect with professionals around the world
          </p>
          <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
            Get Started
          </button>
        </main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>&copy; 2023 LinkedIn Clone. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

export default App;
