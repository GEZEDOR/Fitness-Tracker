import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useLoad from "../hooks/useLoad";
import { getWorkout, updateWorkout } from "../services/workoutsApi";
import WorkoutForm from "../components/WorkoutForm";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

export default function WorkoutEdit() {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const {
        data: workout,
        loading,
        error: loadError,
        reload,
    } = useLoad(() => getWorkout(id), [id]);

    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    if (loading) return <Loader />;
    if (loadError) return <ErrorMessage message={loadError} onRetry={reload} />;
    if (!workout) return <EmptyState text="Тренировка не найдена" />;

    if (workout.user_id !== user.id) {
        return (
            <ErrorMessage message="У вас нет прав на изменение этой записи" />
        );
    }

    async function handleSubmit(values) {
        setSubmitting(true);
        setError("");
        try {
            await updateWorkout(workout.id, values);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
            setSubmitting(false);
        }
    }

    const initialValues = {
        exercise: workout.exercise,
        date: workout.date,
        sets: String(workout.sets),
        reps: String(workout.reps),
        weight: String(workout.weight),
        note: workout.note ?? "",
    };

    return (
        <section>
            <h1 className="mb-6">Редактирование</h1>
            <WorkoutForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
                submitLabel="Сохранить изменения"
                submitting={submitting}
                error={error}
            />
        </section>
    );
}
