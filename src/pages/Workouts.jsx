import { useState } from "react";
import useLoad from "../hooks/useLoad";
import { getAllWorkouts } from "../services/workoutsApi";
import WorkoutCard from "../components/WorkoutCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

export default function Workouts() {
    const { data: workouts, loading, error, reload } = useLoad(getAllWorkouts);
    const [search, setSearch] = useState("");

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} onRetry={reload} />;

    const query = search.trim().toLowerCase();
    const filtered = workouts.filter((w) =>
        w.exercise.toLowerCase().includes(query),
    );

    return (
        <section>
            <h1>Тренировки</h1>
            <p className="mt-2 text-muted">Все записи пользователей.</p>

            <input
                className="input mt-6 max-w-sm"
                placeholder="Поиск по упражнению"
                aria-label="Поиск по упражнению"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {filtered.length === 0 ? (
                <EmptyState
                    text={
                        query
                            ? "Ничего не найдено"
                            : "Пока нет ни одной тренировки"
                    }
                />
            ) : (
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((w) => (
                        <WorkoutCard key={w.id} workout={w} />
                    ))}
                </div>
            )}
        </section>
    );
}
