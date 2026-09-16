import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    setError("");
    setIsLoggingIn(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setIsLoggingIn(false);
      return;
    }

    navigate("/dashboard");
  }

  return (
    <div className="login-page">
      <div className="login-container">

        {/* Login Form */}
        <div className="login-form-section">
          <div className="login-form-content">

            <h1>Login</h1>

            <p className="login-subtitle">
              Enter your credentials to get in
            </p>

            <form onSubmit={handleSubmit}>

              <div className="login-field">
                <label htmlFor="email">Email</label>

                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                />
              </div>

              <div className="login-field">
                <label htmlFor="password">Password</label>

                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                />
              </div>

              <div className="login-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>

                <span className="forgot-password">
                  Forgot password?
                </span>
              </div>

              {error && (
                <p className="login-error">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="login-button"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? "Logging in..." : "Login"}
              </button>

              <div className="login-divider">
                <span></span>
                <p>or</p>
                <span></span>
              </div>

              <p className="create-account">
                Not a member?{" "}
                <strong>Create an account</strong>
              </p>

            </form>
          </div>
        </div>

        {/* Visual Section */}
        <div className="login-visual-section">

          <div className="login-logo">
            a.
          </div>

          <div className="login-visual-content">
            <p>
              Be a Part of
            </p>

            <h2>
              Something <strong>Beautiful</strong>
            </h2>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;