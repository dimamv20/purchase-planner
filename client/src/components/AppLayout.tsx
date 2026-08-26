import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function AppLayout() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <div className="app-shell">
            <aside className="sidebar">
                <div className="sidebar-brand">
                    <div className="brand-mark">PP</div>

                    <div>
                        <h2>Purchase Planner</h2>
                        <p>Smart shopping</p>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/products"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Products
                    </NavLink>

                    <NavLink
                        to="/shopping-lists"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Shopping Lists
                    </NavLink>

                    <NavLink
                        to="/comparisons"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Comparisons
                    </NavLink>
                </nav>

                <button
                    className="logout-button"
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