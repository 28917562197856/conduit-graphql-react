import React from "react";
import { useForm } from "react-hook-form";
import { useAddArticleMutation } from "../generated";

export let Editor: React.FC = () => {
  let { register, handleSubmit } = useForm();
  let [addArticle] = useAddArticleMutation();
  function onSubmit(data: any) {
    console.log(data);
    addArticle({
      variables: {
        title: data.title,
        description: data.description,
        body: data.body,
        taglist: data.taglist.split(" "),
        user_id: 5
      }
    });
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
};
