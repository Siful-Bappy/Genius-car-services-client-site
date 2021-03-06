import React from "react";
import { useForm } from "react-hook-form";

const AddService = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data)
    const url = `http://localhost:5000/service`
    fetch(url, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body:JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
      console.log(result);
    })
  };
  return (
    <div className="w-50 mx-auto">
      <h2>Please add a service</h2>
      <form className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
        <input className="ps-1 mb-2" placeholder="Name" {...register("name", { required: true, maxLength: 20 })} />
        <textarea className="ps-1 mb-2" placeholder="Description" {...register("description")} />
        <input className="ps-1 mb-2" placeholder="Price" type="number" {...register("price")} />
        <input className="ps-1 mb-2" placeholder="Photo URL" type="text" {...register("img")} />
        <input className="bg-primary text-white fw-bold p-1 rounded border-0"  type="Submit" value="Add Service" />
      </form>
    </div>
  );
};

export default AddService;
