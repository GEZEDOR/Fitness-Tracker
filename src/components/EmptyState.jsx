export default function EmptyState({ text = "Здесь пока пусто" }) {
    return <p className="py-10 text-center text-muted">{text}</p>;
}
