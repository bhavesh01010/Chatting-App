import { useState } from "react";
import React from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";

const Form = ({ isSignInPage = 0 }) => {
  const [data, setData] = useState({
    ...(!isSignInPage && {
      fullName: "",
    }),
    email: "",
    password: "",
  });
  return (
    <div className="bg-white w-[600px] h-[680px] shadow-lg rounded-lg flex flex-col justify-center items-center">
      <div className="text-4xl font-extrabold">
        Welcome {isSignInPage && "back!"}
      </div>
      <div className="text-xl font-light mb-14">
        {isSignInPage ? "Sign in" : "Sign up"} now to get{" "}
        {isSignInPage ? "explored" : "started"}
      </div>
      <form
        className="flex flex-col items-center w-full"
        onSubmit={()=>console.log("submitted")}
      >
        {!isSignInPage && (
          <Input
            label="Full Name"
            name="name"
            placeholder="Enter your name"
            className="mb-6"
            value={data.fullName}
            onChange={(e) => setData({ ...data, fullName: e.target.value })}
          />
        )}
        <Input
          label="Email address"
          type="email"
          name="email"
          placeholder="Enter your email"
          className="mb-6"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter password"
          className="mb-14"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <Button
          label={isSignInPage ? "Sign in" : "Sign up"}
          type="submit"
          className="w-1/2 mb-6"
        />
      </form>
      <div>
        {isSignInPage ? "Create new account" : "Already have an account?"}
        <span className="text-primary cursor-pointer underline">
          {isSignInPage ? "Sign up" : "Sign in"}
        </span>
      </div>
    </div>
  );
};

export default Form;
