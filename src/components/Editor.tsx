import React from "react";
import { useForm } from "react-hook-form";

export let Editor: React.FC = () => {
  let { register, handleSubmit } = useForm();
  function onSubmit(data: any) {
    console.log(data);
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
};
