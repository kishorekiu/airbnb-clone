// Inside any Server Component or Action
import { handleGitHubSignIn, handleGoogleSignIn } from "@/app/actions/auth";

const LoginPage = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Google OAuth */}
      <form action={handleGoogleSignIn}>
        <button type="submit">Sign in with Google</button>
      </form>

      {/* GitHub OAuth */}
      <form action={handleGitHubSignIn}>
        <button type="submit">Sign in with GitHub</button>
      </form>
    </div>
  );
};

export default LoginPage;
