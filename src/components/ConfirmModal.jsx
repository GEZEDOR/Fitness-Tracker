import { useEffect } from "react";

export default function ConfirmModal({
    title,
    text,
    confirmLabel = "Удалить",
    onConfirm,
    onCancel,
    loading = false,
    error = "",
}) {
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") onCancel();
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onCancel]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={onCancel}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                className="card w-full max-w-sm"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 id="modal-title">{title}</h2>
                <p className="mt-2 text-sm text-muted">{text}</p>
                {error && <p className="mt-3 text-sm text-danger">{error}</p>}

                <div className="mt-6 flex justify-end gap-2">
                    <button
                        className="btn"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Отмена
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading ? "Удаление…" : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
