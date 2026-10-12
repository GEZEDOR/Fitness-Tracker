import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toRussian } from "../services/errors";

export default function Register() {
    const { user, register } = useAuth();

    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    if (user) return <Navigate to="/dashboard" replace />;

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    async function handleSubmit(e) {
        e.preventDefault();
        if (form.name.trim().length < 2) {
            setError("Имя: минимум 2 символа");
            return;
        }
        if (form.password.length < 6) {
            setError("Пароль должен быть не короче 6 символов");
            return;
        }

        setSubmitting(true);
        setError("");
        try {
            await register(form.name.trim(), form.email.trim(), form.password);
        } catch (err) {
            setError(toRussian(err.message));
            setSubmitting(false);
        }
    }

    return (
        <section>
            <h1 className="mb-6">Регистрация</h1>
            <form onSubmit={handleSubmit} className="card grid max-w-sm gap-4">
                <div>
                    <label htmlFor="name" className="label">
                        Имя
                    </label>
                    <input
                        id="name"
                        name="name"
                        autoComplete="name"
                        value={form.name}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </div>
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
                        Пароль (минимум 6 символов)
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        minLength={6}
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
                    {submitting ? "Создаём аккаунт…" : "Создать аккаунт"}
                </button>
                <p className="text-sm text-muted">
                    Уже есть аккаунт?{" "}
                    <Link to="/login" className="text-accent hover:underline">
                        Войти
                    </Link>
                </p>
            </form>
        </section>
    );
}
