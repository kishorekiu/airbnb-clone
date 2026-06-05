"use client";

import { useState } from "react";
import { handleGitHubSignIn, handleGoogleSignIn } from "@/app/actions/auth";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-neutral-200">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
            {isSignUp ? "Create your account" : "Welcome back"}
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            {isSignUp ? "Already have an account? " : "New to our platform? "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-medium text-rose-600 hover:text-rose-500 underline underline-offset-4 cursor-pointer"
            >
              {isSignUp ? "Sign In" : "Create an account"}
            </button>
          </p>
        </div>

        {/* Credentials Form */}
        <form className="mt-8 space-y-4" action="#">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-neutral-700">
                Name
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-lg shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 text-sm"
                placeholder="John Doe"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-neutral-700">
              Email address
            </label>
            <input
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-lg shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700">
              Password
            </label>
            <input
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-lg shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 text-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center cursor-pointer py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors"
          >
            {isSignUp ? "Sign Up" : "Sign In with Email"}
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6 relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-neutral-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-neutral-500">
              Or continue with
            </span>
          </div>
        </div>

        {/* Social Logins */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {/* Google */}
          <form action={handleGoogleSignIn}>
            <button
              type="submit"
              className="w-full inline-flex justify-center cursor-pointer py-2.5 px-4 border border-neutral-300 rounded-lg bg-white text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 transition-colors"
            >
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
              Google
            </button>
          </form>

          {/* GitHub */}
          <form action={handleGitHubSignIn}>
            <button
              type="submit"
              className="w-full inline-flex justify-center py-2.5 cursor-pointer px-4 border border-neutral-300 rounded-lg bg-white text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 transition-colors"
            >
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
              GitHub
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
