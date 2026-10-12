import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <section className="py-16 text-center">
            <h1>404</h1>
            <p className="mt-2 text-muted">Такой страницы нет.</p>
            <Link to="/" className="btn btn-primary mt-6">
                На главную
            </Link>
        </section>
    );
}
