import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

function Register({ openLogin }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const value = {
      username,
      password,
    };

    try {
      const response = await axios.post(
        "http://192.168.12.206:5000/chat/user/register",
        value
      );

      if (response.status === 200) {
        openLogin();

        Swal.fire({
          title: ` ${response.data.message}`,
          icon: "success",
          draggable: true,
        });
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        Swal.fire({
          title: "Bad Request",
          text: error.response.data.message || "Invalid data provided.",
          icon: "error",
          draggable: true,
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Something went wrong!",
          icon: "error",
          draggable: true,
        });
      }

      console.error("Error response:", error);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-4 rounded-lg border p-7 shadow-lg sm:p-10 bg-cyan-800 text-white">
      <h1 className="text-3xl font-semibold tracking-tight">Sign Up</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2 text-sm">
          <label
            htmlFor="username"
            className="block text-zinc-700 dark:text-zinc-300 font-medium"
          >
            Username
          </label>
          <input
            className="flex text-black  h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
            id="username"
            placeholder="Enter username"
            name="username"
            type="text"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="space-y-2 text-sm">
          <label
            htmlFor="password"
            className="block text-zinc-700 dark:text-zinc-300 font-medium"
          >
            Password
          </label>
          <input
            className="flex text-black rounded-lg h-10 w-full border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
            id="password"
            placeholder="Enter password"
            name="password"
            type="text"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="rounded-md bg-sky-500 px-4 py-2 text-white transition-colors hover:bg-sky-600 dark:bg-sky-700">
          Submit
        </button>
      </form>
      <p className="text-center text-sm text-zinc-700 dark:text-zinc-300">
        Already have an account? <span></span>
        <span
          onClick={openLogin}
          className="font-semibold underline cursor-pointer"
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default Register;
