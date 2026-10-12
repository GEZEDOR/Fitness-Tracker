import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useLoad from "../hooks/useLoad";
import { getWorkout } from "../services/workoutsApi";
import WorkoutCard from "../components/WorkoutCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

export default function WorkoutDetails() {
    const { id } = useParams();
    const { user } = useAuth();
    const {
        data: workout,
        loading,
        error,
        reload,
    } = useLoad(() => getWorkout(id), [id]);

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} onRetry={reload} />;
    if (!workout) return <EmptyState text="Тренировка не найдена" />;

    const isOwner = user?.id === workout.user_id;

    return (
        <section className="max-w-md">
            <Link to="/workouts" className="text-sm text-muted hover:text-ink">
                Назад к списку
            </Link>
            <div className="mt-4">
                <WorkoutCard workout={workout}>
                    {isOwner && (
                        <Link
                            to={`/dashboard/edit/${workout.id}`}
                            className="btn"
                        >
                            Изменить
                        </Link>
                    )}
                </WorkoutCard>
            </div>
        </section>
    );
}
