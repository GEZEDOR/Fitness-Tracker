import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toRussian } from "../services/errors";

export default function Login() {
    const { user, login } = useAuth();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/dashboard";

    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    if (user) return <Navigate to={from} replace />;

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        setError("");
        try {
            await login(form.email.trim(), form.password);
        } catch (err) {
            setError(toRussian(err.message));
            setSubmitting(false);
        }
    }

    return (
        <section>
            <h1 className="mb-6">Вход</h1>
            <form onSubmit={handleSubmit} className="card grid max-w-sm gap-4">
                <div>
                    <label htmlFor="email" className="label">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="label">
                        Пароль
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        value={form.password}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </div>

                {error && <p className="text-sm text-danger">{error}</p>}

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submitting}
                >
                    {submitting ? "Входим…" : "Войти"}
                </button>
                <p className="text-sm text-muted">
                    Нет аккаунта?{" "}
                    <Link
                        to="/register"
                        className="text-accent hover:underline"
                    >
                        Зарегистрироваться
                    </Link>
                </p>
            </form>
        </section>
    );
}
