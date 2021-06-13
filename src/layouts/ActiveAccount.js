import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { axios } from "../axios";
import NotFound404 from "./NotFound404";
import jwt from "jsonwebtoken";

const ConfirmedContainer = styled.div`
  margin-top: 147px;
  padding-top: 40px;
  background-color: #111;
  color: white;
  padding-bottom: 50px;
`;

const ActiveAccount = (props) => {
  const [user, setUser] = useState([]);
  let { id } = useParams();

  const getUser = async () => {
    await axios
      .get(`/users?verify=${id}`)
      .then((res) => {
        setUser(res.data[0]);
      })
      .catch((e) => console.log(e));
  };

  const setActive = (user) => {
    const data = {
      ...user,
      active: true,
      verify: "",
    };
    axios
      .put(`/users/${user.id}`, data)
      .then(() => {
        const token = jwt.sign(data.id, "secret");
        localStorage.setItem("token", token);
        props.setUser(data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (user) {
      setActive(user);
    }
  }, [user]);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <ConfirmedContainer>
      {!user && <NotFound404 />}
      {user && (
        <div className="container text-center">
          <h1 style={{ color: "#ffc107" }}>
            Welcome {user.lastName} {user.firstName} to WaMo!!
          </h1>
          <h3>Your accout was activated</h3>
          <h3>Enjoy the best movies at WaMo!</h3>
          <div className="text-center">
            <img src="../bear-love.gif" alt="" />
          </div>
        </div>
      )}
    </ConfirmedContainer>
  );
};

export default ActiveAccount;
