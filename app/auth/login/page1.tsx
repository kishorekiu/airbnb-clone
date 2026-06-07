import { handleGitHubSignIn, handleGoogleSignIn } from "@/app/actions/auth";
import React, { useState } from "react";

const signInFormdata = {
  feilds: [
    {
      label: "Email address",
      placeHolder: "you@example.com",
      type: "email",
      required: true,
    },
    {
      label: "Password",
      placeHolder: "••••••••",
      type: "password",
      required: true,
    },
  ],
  submitButton: {
    label: "Sign In with Email",
  },
};
const signUpFormdata = {
  feilds: [
    {
      label: "Name",
      placeHolder: "John Doe",
      type: "text",
      required: true,
    },
    {
      label: "Email address",
      placeHolder: "you@example.com",
      type: "email",
      required: true,
    },
    {
      label: "Password",
      placeHolder: "••••••••",
      type: "password",
      required: true,
    },
  ],
  submitButton: {
    label: "Sign Up",
  },
};
const socialLoginsData = [
  {
    label: "Google",
    slug: "google",
  },
  {
    label: "Github",
    slug: "github",
  },
];

const socialActionMap = {
  google: handleGoogleSignIn,
  github: handleGitHubSignIn,
};

const socialSvgMap = {
  google: (
    <svg
      className="h-5 w-5 mr-2"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="matrix(1, 0, 0, 1, 0, 0)">
        <path
          d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.6h3.29c1.92,-1.77 3.02,-4.38 3.02,-7.4C21.65,11.73 21.55,11.4 21.35,11.1z"
          fill="#4285F4"
        />
        <path
          d="M12,20.5c2.57,0 4.71,-0.85 6.29,-2.3l-3.29,-2.6c-0.91,0.61 -2.08,0.97 -3Helper,3.0 -2.45,0 -4.53,-1.66 -5.27,-3.9H2.81v2.7C4.38,17.58 7.94,20.5 12,20.5z"
          fill="#34A853"
        />
        <path
          d="M6.73,14.7c-0.19,-0.57 -0.3,-1.17 -0.3,-1.8s0.11,-1.23 0.3,-1.8V8.4H2.81c-0.64,1.28 -1.01,2.72 -1.01,4.3s0.37,3.02 1.01,4.3l3.92,-2.7z"
          fill="#FBBC05"
        />
        <path
          d="M12,6.1c1.39,0 2.65,0.48 3.63,1.41l2.72,-2.72C16.7,3.28 14.56,2.5 12,2.5c-4.06,0 -7.62,2.92 -9.19,6.2l3.92,2.7C7.47,9.06 9.55,6.1 12,6.1z"
          fill="#EA4335"
        />
      </g>
    </svg>
  ),
  github: (
    <svg
      className="h-5 w-5 mr-2"
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
        clipRule="evenodd"
      />
    </svg>
  ),
};

const Page1 = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(signInFormdata);
  const handleToggle = () => {
    setIsSignup((prev) => {
      if (prev === false) setFormData(signUpFormdata);
      else setFormData(signInFormdata);
      return !prev;
    });
    setFormData(signUpFormdata);
  };

  return (
    // <div className="max-h-screen w-full bg-neutral-50 px-4 py-4 flex justify-center items-center">
    <div className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-8 max-w-md w-full">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-neutral-900 tracking-tight ">
          {isSignup ? "Create your account" : "Welcome back"}
        </h2>
        <p className="mt-2 inline-flex text-sm text-neutral-600">
          {isSignup ? "Already have an account?" : "New to our platform?"}
          <button
            className="ml-1 text-rose-600 hover:text-rose-500 underline underline-offset-4 font-medium cursor-pointer"
            onClick={handleToggle}
          >
            {isSignup ? "Sign in" : "Create an account"}
          </button>
        </p>
      </div>
      <form action="#" className="flex flex-col gap-3 mt-6">
        {formData.feilds.map(({ label, placeHolder, required, type }) => (
          <div key={label}>
            <label className="text-sm text-neutral-700 font-medium ">
              {label}
            </label>
            <input
              type={type}
              required={required}
              placeholder={placeHolder}
              className="mt-1 w-full border rounded-xl shadow-sm py-2  px-3 placeholder-neutral-400 text-sm border-neutral-300 focus:ring-rose-500 focus:border-rose-500 focus:outline-none"
            />
          </div>
        ))}
      </form>
      <button
        type="submit"
        className="mt-4 w-full bg-rose-600 text-white border border-transparent text-sm font-medium hover:bg-rose-700 rounded-md shadow px-3 py-2.5 flex justify-center items-center focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-offset-2"
      >
        {formData.submitButton.label}
      </button>

      {/* divider */}
      <div className="text-sm text-neutral-500 text-center m-6">
        Or continue with
      </div>

      {/* socila logins */}
      <div className="grid grid-cols-2 gap-2">
        {socialLoginsData.map(({ label, slug }) => {
          const typedSlug = slug as keyof typeof socialActionMap;
          return (
            <form key={slug} action={socialActionMap[typedSlug]}>
              <button className="w-full flex items-center justify-center gap-2 border rounded-xl border-neutral-300 bg-white p-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
                {socialSvgMap[typedSlug]}
                {label}
              </button>
            </form>
          );
        })}
      </div>
    </div>
    // </div>
  );
};

export default Page1;
