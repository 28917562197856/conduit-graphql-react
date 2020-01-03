import React from "react";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../generated";
import { Global } from "../global";
import { navigate } from "@reach/router";

export let Register: React.FC = () => {
  let { register, handleSubmit } = useForm();
  let [registerMutation] = useRegisterMutation();

  async function onSubmit(data: any) {
    let res = await registerMutation({
      variables: {
        username: data.username,
        email: data.email,
        password: data.password
      }
    });
    console.log(res);
    Global.token = res?.data?.register?.token!;
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
};
