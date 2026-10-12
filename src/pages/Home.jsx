import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useLoad from "../hooks/useLoad";
import { getAllWorkouts } from "../services/workoutsApi";
import WorkoutCard from "../components/WorkoutCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

export default function Home() {
    const { user } = useAuth();
    const { data: workouts, loading, error, reload } = useLoad(getAllWorkouts);

    return (
        <section>
            <h1>Дневник тренировок</h1>
            <p className="mt-2 max-w-xl text-muted">
                Записывай упражнения, подходы и рабочие веса, чтобы видеть
                прогресс от тренировки к тренировке.
            </p>

            <div className="mt-6 flex gap-2">
                {user ? (
                    <Link to="/dashboard/new" className="btn btn-primary">
                        Добавить тренировку
                    </Link>
                ) : (
                    <>
                        <Link to="/register" className="btn btn-primary">
                            Создать аккаунт
                        </Link>
                        <Link to="/login" className="btn">
                            Войти
                        </Link>
                    </>
                )}
            </div>

            <h2 className="mt-10 mb-4">Последние тренировки</h2>
            {loading && <Loader />}
            {error && <ErrorMessage message={error} onRetry={reload} />}
            {!loading && !error && workouts.length === 0 && (
                <EmptyState text="Пока нет ни одной тренировки" />
            )}
            {!loading && !error && workouts.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {workouts.slice(0, 3).map((w) => (
                        <WorkoutCard key={w.id} workout={w} />
                    ))}
                </div>
            )}
        </section>
    );
}
