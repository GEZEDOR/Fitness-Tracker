import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navLink = ({ isActive }) =>
    `rounded-md px-3 py-1.5 text-sm transition-colors ${
        isActive
            ? "bg-surface text-ink"
            : "text-muted hover:bg-surface hover:text-ink"
    }`;

export default function Layout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
        navigate("/");
    }

    return (
        <div className="min-h-screen">
            <header className="border-b border-line">
                <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-1 px-4 py-3">
                    <Link to="/" className="mr-4 font-semibold">
                        Fitness Tracker
                    </Link>
                    <NavLink to="/workouts" className={navLink}>
                        Тренировки
                    </NavLink>
                    <NavLink to="/explore" className={navLink}>
                        Обзор
                    </NavLink>

                    <div className="ml-auto flex items-center gap-1">
                        {user ? (
                            <>
                                <NavLink to="/dashboard" className={navLink}>
                                    Кабинет
                                </NavLink>
                                <button onClick={handleLogout} className="btn">
                                    Выйти
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login" className={navLink}>
                                    Вход
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className="btn btn-primary"
                                >
                                    Регистрация
                                </NavLink>
                            </>
                        )}
                    </div>
                </nav>
            </header>

            <main className="mx-auto max-w-5xl px-4 py-8">
                <Outlet />
            </main>
        </div>
    );
}
