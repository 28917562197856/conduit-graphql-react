import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../generated";
import { navigate } from "@reach/router";
import { UserContext } from "../App";

export let Login: React.FC = () => {
  let { register, handleSubmit } = useForm();
  let [loginMutation] = useLoginMutation();
  let user = useContext(UserContext);

  async function onSubmit(data: any) {
    let res = await loginMutation({
      variables: {
        email: data.email,
        password: data.password
      }
    });
    console.log(res);
    user.setToken(res.data!.login!.token);
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
