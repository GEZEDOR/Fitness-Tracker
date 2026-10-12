import { useState } from "react";

const emptyValues = {
    exercise: "",
    date: new Date().toLocaleDateString("en-CA"),
    sets: "",
    reps: "",
    weight: "",
    note: "",
};

function validate(f) {
    if (f.exercise.trim().length < 2)
        return "Название упражнения: минимум 2 символа";
    if (!Number.isInteger(Number(f.sets)) || Number(f.sets) < 1)
        return "Подходы: целое число от 1";
    if (!Number.isInteger(Number(f.reps)) || Number(f.reps) < 1)
        return "Повторы: целое число от 1";
    if (Number(f.weight) < 0) return "Вес не может быть отрицательным";
    return "";
}

export default function WorkoutForm({
    initialValues,
    onSubmit,
    submitLabel = "Сохранить",
    submitting = false,
    error = "",
}) {
    const [form, setForm] = useState(initialValues ?? emptyValues);
    const [formError, setFormError] = useState("");

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    function handleSubmit(e) {
        e.preventDefault();
        const problem = validate(form);
        setFormError(problem);
        if (problem) return;

        onSubmit({
            exercise: form.exercise.trim(),
            date: form.date,
            sets: Number(form.sets),
            reps: Number(form.reps),
            weight: Number(form.weight),
            note: form.note.trim() || null,
        });
    }

    const message = formError || error;

    return (
        <form onSubmit={handleSubmit} className="card grid max-w-lg gap-4">
            <div>
                <label htmlFor="exercise" className="label">
                    Упражнение
                </label>
                <input
                    id="exercise"
                    name="exercise"
                    value={form.exercise}
                    onChange={handleChange}
                    className="input"
                    placeholder="Жим лёжа"
                    required
                />
            </div>

            <div>
                <label htmlFor="date" className="label">
                    Дата
                </label>
                <input
                    id="date"
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    className="input"
                    required
                />
            </div>

            <div className="grid grid-cols-3 gap-3">
                <div>
                    <label htmlFor="sets" className="label">
                        Подходы
                    </label>
                    <input
                        id="sets"
                        name="sets"
                        type="number"
                        min="1"
                        value={form.sets}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="reps" className="label">
                        Повторы
                    </label>
                    <input
                        id="reps"
                        name="reps"
                        type="number"
                        min="1"
                        value={form.reps}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="weight" className="label">
                        Вес, кг
                    </label>
                    <input
                        id="weight"
                        name="weight"
                        type="number"
                        min="0"
                        step="0.5"
                        value={form.weight}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </div>
            </div>

            <div>
                <label htmlFor="note" className="label">
                    Заметка
                </label>
                <textarea
                    id="note"
                    name="note"
                    rows="3"
                    value={form.note}
                    onChange={handleChange}
                    className="input"
                />
            </div>

            {message && <p className="text-sm text-danger">{message}</p>}

            <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
            >
                {submitting ? "Сохранение…" : submitLabel}
            </button>
        </form>
    );
}
