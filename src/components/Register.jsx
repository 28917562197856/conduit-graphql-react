import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { navigate } from "@reach/router";
import ky from "ky";
import { TokenContext } from "../App";

export default function Register() {
  let { register, handleSubmit } = useForm();
  let tokenContext = useContext(TokenContext);

  async function onSubmit(data) {
    let res = await ky
      .post("http://localhost:4000/register", {
        credentials: "include",
        json: {
          username: data.username,
          email: data.email,
          password: data.password
        }
      })
      .json();
    console.log(res);
    tokenContext.setToken(res.token);
    navigate("/");
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="username"
          placeholder="username"
          ref={register({ required: true })}
        />
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
        <input
          name="passwordConfirm"
          placeholder="confirm password"
          ref={register({ required: true })}
        />
        <input type="submit" />
      </form>
    </div>
  );
}
