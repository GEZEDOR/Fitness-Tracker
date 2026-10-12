import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createWorkout } from "../services/workoutsApi";
import WorkoutForm from "../components/WorkoutForm";

export default function WorkoutCreate() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(values) {
        setSubmitting(true);
        setError("");
        try {
            await createWorkout(values);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
            setSubmitting(false);
        }
    }

    return (
        <section>
            <h1 className="mb-6">Новая тренировка</h1>
            <WorkoutForm
                onSubmit={handleSubmit}
                submitLabel="Создать тренировку"
                submitting={submitting}
                error={error}
            />
        </section>
    );
}
