import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { navigate } from "@reach/router";
import { UserContext } from "../App";
import ky from "ky";

export let Login = () => {
  let { register, handleSubmit } = useForm();
  let user = useContext(UserContext);

  async function onSubmit(data) {
    let res = await ky
      .post("http://localhost:4000/login", {
        credentials: "include",
        json: {
          email: data.email,
          password: data.password
        }
      })
      .json();
    user.setToken(res.token);
    navigate("/");
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="email"
          placeholder="email"
          ref={register({ required: true })}
        />
        <input
          name="password"
          placeholder="password"
          ref={register({ required: true })}
        />
        <input type="submit" />
      </form>
    </div>
  );
};
