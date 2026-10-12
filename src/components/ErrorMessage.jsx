export default function ErrorMessage({
    message = "Не удалось загрузить данные",
    onRetry,
}) {
    return (
        <div className="card flex flex-col items-center gap-3 py-8 text-center">
            <p className="text-danger">{message}</p>
            {onRetry && (
                <button onClick={onRetry} className="btn">
                    Повторить
                </button>
            )}
        </div>
    );
}
