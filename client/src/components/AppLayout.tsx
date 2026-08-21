import { Link, Outlet, useNavigate } from "react-router-dom";

export default function AppLayout() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <div className="app-layout">
            <aside className="sidebar">
                <h2>Purchase Planner</h2>

                <nav>
                    <Link to="/dashboard">
                        Dashboard
                    </Link>

                    <Link to="/products">
                        Products
                    </Link>

                    <Link to="/shopping-lists">
                        Shopping Lists
                    </Link>

                    <Link to="/comparisons">
                        Comparisons
                    </Link>
                </nav>

                <button
                    type="button"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </aside>

            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}