import { Link } from "react-router-dom";

const formatDate = (date) => date.split("-").reverse().join(".");

export default function WorkoutCard({ workout, children }) {
    const { id, exercise, date, sets, reps, weight, note } = workout;

    return (
        <article className="card flex flex-col gap-3">
            <div>
                <Link
                    to={`/items/${id}`}
                    className="text-lg font-semibold hover:text-accent"
                >
                    {exercise}
                </Link>
                <p className="text-sm text-muted">{formatDate(date)}</p>
            </div>

            <dl className="grid grid-cols-3 gap-2 text-sm">
                <div>
                    <dt className="text-muted">Подходы</dt>
                    <dd>{sets}</dd>
                </div>
                <div>
                    <dt className="text-muted">Повторы</dt>
                    <dd>{reps}</dd>
                </div>
                <div>
                    <dt className="text-muted">Вес, кг</dt>
                    <dd>{weight}</dd>
                </div>
            </dl>

            {note && <p className="text-sm text-muted">{note}</p>}

            {children && <div className="mt-auto flex gap-2">{children}</div>}
        </article>
    );
}
