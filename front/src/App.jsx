import { useState } from "react";
import NavBar from "./components/NavBar";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <div className="container mx-auto px-4 flex justify-center items-center">
        {!user && <Login setUser={setUser} />}
      </div>
    </>
  );
}

export default App;
