import { useEffect, useState } from "react";
import { getRecipes } from "../services/externalApi";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

export default function Explore() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [attempt, setAttempt] = useState(0);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("default");

    useEffect(() => {
        const controller = new AbortController();

        getRecipes(controller.signal)
            .then(setRecipes)
            .catch((err) => {
                if (err.name !== "AbortError") setError(err.message);
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false);
            });

        return () => controller.abort();
    }, [attempt]);

    if (loading) return <Loader />;
    if (error)
        return (
            <ErrorMessage
                onRetry={() => {
                    setLoading(true);
                    setError("");
                    setAttempt((n) => n + 1);
                }}
            />
        );

    const query = search.trim().toLowerCase();
    const visible = recipes.filter((r) => r.name.toLowerCase().includes(query));
    if (sort === "asc")
        visible.sort((a, b) => a.caloriesPerServing - b.caloriesPerServing);
    if (sort === "desc")
        visible.sort((a, b) => b.caloriesPerServing - a.caloriesPerServing);

    return (
        <section>
            <h1>Обзор</h1>
            <p className="mt-2 text-muted">
                Рецепты из внешнего API: идеи для питания между тренировками.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
                <input
                    className="input max-w-sm"
                    placeholder="Поиск по названию"
                    aria-label="Поиск по названию"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="input w-auto"
                    aria-label="Сортировка"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="default">Без сортировки</option>
                    <option value="asc">Меньше калорий</option>
                    <option value="desc">Больше калорий</option>
                </select>
            </div>

            {visible.length === 0 ? (
                <EmptyState text="Ничего не найдено" />
            ) : (
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {visible.map((r) => (
                        <article
                            key={r.id}
                            className="card flex flex-col gap-3"
                        >
                            <img
                                src={r.image}
                                alt={r.name}
                                loading="lazy"
                                className="h-40 w-full rounded-md object-cover"
                            />
                            <h2 className="text-base">{r.name}</h2>
                            <dl className="grid grid-cols-3 gap-2 text-sm">
                                <div>
                                    <dt className="text-muted">
                                        Ккал / порция
                                    </dt>
                                    <dd>{r.caloriesPerServing}</dd>
                                </div>
                                <div>
                                    <dt className="text-muted">Время</dt>
                                    <dd>
                                        {r.prepTimeMinutes + r.cookTimeMinutes}{" "}
                                        мин
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-muted">Кухня</dt>
                                    <dd>{r.cuisine}</dd>
                                </div>
                            </dl>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}
