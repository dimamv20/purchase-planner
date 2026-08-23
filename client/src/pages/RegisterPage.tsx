import { useState } from "react";

import { useNavigate } from "react-router-dom";
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
        <div>
            <h1>Purchase Planner</h1>
            <h2>Create Account</h2>

            <form onSubmit={handleRegister}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>

                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                {error && <p>{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Account"}
                </button>
            </form>
        </div>
    );
}