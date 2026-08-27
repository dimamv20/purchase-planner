import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import { apiRequest } from "../services/api";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    async function handleRegister(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            await apiRequest("/auth/register", {
                method: "POST",
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            navigate("/login");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-brand">
                    <div className="auth-brand-mark">
                        PP
                    </div>

                    <div>
                        <h1>Purchase Planner</h1>
                        <p>Smart shopping made simple.</p>
                    </div>
                </div>

                <div className="auth-heading">
                    <p className="eyebrow">Get Started</p>
                    <h2>Create your account</h2>

                    <p>
                        Start organizing shopping lists and finding
                        better prices.
                    </p>
                </div>

                <form
                    onSubmit={handleRegister}
                    className="auth-form"
                >
                    <div className="auth-field">
                        <label htmlFor="name">
                            Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            required
                            autoComplete="name"
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="primary-button auth-submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Account"}
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account?{" "}
                    <Link to="/login">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}