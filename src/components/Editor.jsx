import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import ky from "ky";
import { TokenContext } from "../App";

export default function Editor() {
  let { register, handleSubmit } = useForm();
  let tokenContext = useContext(TokenContext);

  async function onSubmit(data) {
    console.log(tokenContext);
    let article = await ky
      .post("http://localhost:4000/articles", {
        credentials: "include",
        headers: { authorization: `Bearer ${tokenContext.token}` },
        json: {
          title: data.title,
          description: data.description,
          body: data.body,
          tagList: data.taglist.split(" ")
        }
      })
      .json();
    console.log(article);
    // addArticle({
    //   variables: {
    //     title: data.title,
    //     description: data.description,
    //     body: data.body,
    //     tagList: data.taglist.split(" "),
    //     userId: 5
    //   }
    // });
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="title"
          placeholder="Article title"
          ref={register({ required: true })}
        />
        <input
          name="description"
          placeholder="What's this article about?"
          ref={register({ required: true })}
        />
        <input
          name="body"
          placeholder="Write your article (in markdown)"
          ref={register({ required: true })}
        />
        <input name="taglist" placeholder="Enter tags" ref={register} />
        <input type="submit" />
      </form>
    </div>
  );
}
