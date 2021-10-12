import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./component/chat";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Staff } from "./pages/staff";
const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("User#");
  const [room, setRoom] = useState(Math.floor(100000 + Math.random() * 900000));
  const [showChat, setShowChat] = useState(false);

  const joinRoom = async () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <div className="App">
            {!showChat ? (
              <div className="joinChatContainer">
                <h3>Join A Chat</h3>
                <input
                  type="text"
                  placeholder="John..."
                  defaultValue={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
                <input
                  type="text"
                  defaultValue={room}
                  placeholder="Room ID..."
                  onChange={(event) => {
                    setRoom(event.target.value);
                  }}
                />
                <button onClick={joinRoom}>Join A Room</button>
              </div>
            ) : (
              <Chat socket={socket} username={username} room={room} />
            )}
          </div>
        </Route>
        <Route path="/staff" exact>
          <Staff socket={socket} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
