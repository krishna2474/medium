import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInputs } from "@krishnakukreja85/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const SignupAuth = () => {
  const navigate = useNavigate();
  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        postInputs
      );
      const jwt = response.data.token;
      console.log(response.data.token);
      localStorage.setItem("token", "Bearer " + jwt);
      navigate("/blogs");
    } catch (e) {
      alert(e);
    }
  }
  const [postInputs, setPostInputs] = useState<SignupInputs>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  return (
    <>
      <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
          <div>
            <div className="px-5 py-2">
              <div className="text-4xl font-extrabold text-center">
                Create an Account
              </div>
              <div className="text-slate-400 text-center mt-2">
                Already have an account?
                <Link to={"/signin"} className="pl-2 underline">
                  Login
                </Link>
              </div>
            </div>
            <div className="pt-4">
              <div>
                <LabelledInput
                  label="Firstname"
                  placeholder="Enter Your Firstname"
                  onChange={(e) => {
                    setPostInputs({
                      ...postInputs,
                      firstName: e.target.value,
                    });
                  }}
                />
                <LabelledInput
                  label="Lastname"
                  placeholder="Enter Your Lastname"
                  onChange={(e) => {
                    setPostInputs({
                      ...postInputs,
                      lastName: e.target.value,
                    });
                  }}
                />
              </div>

              <LabelledInput
                label="Username"
                placeholder="abc@gmail.com"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    username: e.target.value,
                  });
                }}
              />
              <LabelledInput
                label="Password"
                placeholder="Enter Password"
                type="password"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    password: e.target.value,
                  });
                }}
              />
            </div>
            <div className="pt-5">
              <button
                onClick={sendRequest}
                type="button"
                className="text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string | "text";
}
function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-black">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-blue-700 block p-2.5 w-full"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
