import { useEffect, useState } from "react";

export default function useLoad(loader, deps = []) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        let ignore = false;
        setLoading(true);
        setError("");

        loader()
            .then((result) => {
                if (!ignore) setData(result);
            })
            .catch((err) => {
                if (!ignore)
                    setError(err.message || "Не удалось загрузить данные");
            })
            .finally(() => {
                if (!ignore) setLoading(false);
            });

        return () => {
            ignore = true;
        };
    }, [...deps, attempt]);

    const reload = () => setAttempt((n) => n + 1);

    return { data, setData, loading, error, reload };
}
