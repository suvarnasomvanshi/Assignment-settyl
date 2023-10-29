import axios from "axios";
import React, { useEffect, useState } from "react";
import AddItem from "./AddItem";


axios.defaults.withCredentials = true;

const Home = () => {
  const [user, setUser] = useState();
  console.log(user)

  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:8000/api/user", { withCredentials: true })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);

  return <div>{user && <h1>{user.name}</h1>}</div>;
};

export default Home;
