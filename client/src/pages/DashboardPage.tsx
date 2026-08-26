import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { apiRequest } from "../services/api";

type ShoppingList = {
    id: string;
    name: string;
    budget: string | number | null;
    createdAt: string;
    updatedAt: string;
};

type Comparison = {
    id: string;
    shoppingListName: string;
    savings: number | string;
    optimizedTotal: number | string;
    createdAt: string;
};

export default function DashboardPage() {
    const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
    const [comparisons, setComparisons] = useState<Comparison[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadDashboard() {
            try {
                const [shoppingListsData, comparisonsData] =
                    await Promise.all([
                        apiRequest("/shopping-lists"),
                        apiRequest("/comparisons"),
                    ]);

                setShoppingLists(shoppingListsData);
                setComparisons(comparisonsData);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Could not load dashboard"
                );
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const totalSaved = comparisons.reduce((sum, comparison) => {
        return sum + Number(comparison.savings);
    }, 0);

    const now = new Date();

    const savedThisMonth = comparisons.reduce((sum, comparison) => {
        const comparisonDate = new Date(comparison.createdAt);

        const isThisMonth =
            comparisonDate.getMonth() === now.getMonth() &&
            comparisonDate.getFullYear() === now.getFullYear();

        return isThisMonth
            ? sum + Number(comparison.savings)
            : sum;
    }, 0);

    const recentShoppingLists = shoppingLists.slice(0, 3);
    const recentComparisons = comparisons.slice(0, 3);

    return (
        <div className="dashboard-page">
            <div className="page-header">
                <div>
                    <h1>Dashboard</h1>
                    <p>Overview of your shopping activity.</p>
                </div>
            </div>

            <section className="stats-grid">
                <div className="stat-card">
                    <span className="stat-label">Shopping Lists</span>
                    <strong>{shoppingLists.length}</strong>
                </div>

                <div className="stat-card">
                    <span className="stat-label">Comparisons</span>
                    <strong>{comparisons.length}</strong>
                </div>

                <div className="stat-card">
                    <span className="stat-label">Total Saved</span>
                    <strong>${totalSaved.toFixed(2)}</strong>
                </div>

                <div className="stat-card">
                    <span className="stat-label">Saved This Month</span>
                    <strong>${savedThisMonth.toFixed(2)}</strong>
                </div>
            </section>

            <section className="dashboard-grid">
                <div className="panel">
                    <div className="panel-header">
                        <h2>Recent Shopping Lists</h2>
                        <Link to="/shopping-lists">View all</Link>
                    </div>

                    {recentShoppingLists.length === 0 ? (
                        <p className="empty-state">
                            No shopping lists yet.
                        </p>
                    ) : (
                        <div className="dashboard-list">
                            {recentShoppingLists.map((list) => (
                                <Link
                                    key={list.id}
                                    to={`/shopping-lists/${list.id}`}
                                    className="dashboard-list-item"
                                >
                                    <div>
                                        <strong>{list.name}</strong>
                                        <span>
                                            {new Date(
                                                list.createdAt
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <div>
                                        {list.budget !== null
                                            ? `$${Number(list.budget).toFixed(2)}`
                                            : "No budget"}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                <div className="panel">
                    <div className="panel-header">
                        <h2>Recent Comparisons</h2>
                        <Link to="/comparisons">View all</Link>
                    </div>

                    {recentComparisons.length === 0 ? (
                        <p className="empty-state">
                            No comparisons yet.
                        </p>
                    ) : (
                        <div className="dashboard-list">
                            {recentComparisons.map((comparison) => (
                                <Link
                                    key={comparison.id}
                                    to={`/comparisons/${comparison.id}`}
                                    className="dashboard-list-item"
                                >
                                    <div>
                                        <strong>
                                            {comparison.shoppingListName}
                                        </strong>

                                        <span>
                                            {new Date(
                                                comparison.createdAt
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <div className="saved-value">
                                        +$
                                        {Number(
                                            comparison.savings
                                        ).toFixed(2)}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}