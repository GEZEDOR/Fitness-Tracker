import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useLoad from "../hooks/useLoad";
import { getMyWorkouts, deleteWorkout } from "../services/workoutsApi";
import WorkoutCard from "../components/WorkoutCard";
import ConfirmModal from "../components/ConfirmModal";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

export default function Dashboard() {
    const { user } = useAuth();
    const {
        data: workouts,
        setData,
        loading,
        error,
        reload,
    } = useLoad(() => getMyWorkouts(user.id), [user.id]);

    const [toDelete, setToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState("");

    function closeModal() {
        setToDelete(null);
        setDeleteError("");
    }

    async function handleDelete() {
        setDeleting(true);
        setDeleteError("");
        try {
            await deleteWorkout(toDelete.id);
            setData(workouts.filter((w) => w.id !== toDelete.id));
            closeModal();
        } catch (err) {
            setDeleteError(err.message);
        } finally {
            setDeleting(false);
        }
    }

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} onRetry={reload} />;

    return (
        <section>
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1>Мои тренировки</h1>
                    <p className="mt-1 text-muted">
                        {user.user_metadata?.name ?? user.email}
                    </p>
                </div>
                <Link to="/dashboard/new" className="btn btn-primary">
                    Новая тренировка
                </Link>
            </div>

            {workouts.length === 0 ? (
                <EmptyState text="У вас пока нет тренировок. Добавьте первую." />
            ) : (
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {workouts.map((w) => (
                        <WorkoutCard key={w.id} workout={w}>
                            <Link
                                to={`/dashboard/edit/${w.id}`}
                                className="btn"
                            >
                                Изменить
                            </Link>
                            <button
                                className="btn btn-danger"
                                onClick={() => setToDelete(w)}
                            >
                                Удалить
                            </button>
                        </WorkoutCard>
                    ))}
                </div>
            )}

            {toDelete && (
                <ConfirmModal
                    title="Удалить тренировку?"
                    text={`Запись «${toDelete.exercise}» будет удалена без возможности восстановления.`}
                    onConfirm={handleDelete}
                    onCancel={closeModal}
                    loading={deleting}
                    error={deleteError}
                />
            )}
        </section>
    );
}
