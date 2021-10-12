import { useEffect, useState } from "react";

export const Staff = (props) => {
  const { socket } = props;
  const [Users, setUsers] = useState([]);
  console.log(Users);
  useEffect(() => {
    console.log("Called Socket");
    socket.on("user_joined", (data) => {
      console.log(data);
      setUsers((list) => [...list, data]); // eslint-disable-next-line
    });
  }, [socket]);
  const RenderUser = Users.map((item) => {
    return <h4 key={item}>User#{item}</h4>;
  });

  return (
    <>
      <h1 className="ms-auto">Hello Joker!!</h1>
      {RenderUser}
    </>
  );
};
