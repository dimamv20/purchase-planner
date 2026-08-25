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
        <div>
            <h1>Dashboard</h1>
            <p>Overview of your shopping activity.</p>

            <section>
                <div>
                    <h3>Shopping Lists</h3>
                    <p>{shoppingLists.length}</p>
                </div>

                <div>
                    <h3>Comparisons</h3>
                    <p>{comparisons.length}</p>
                </div>

                <div>
                    <h3>Total Saved</h3>
                    <p>${totalSaved.toFixed(2)}</p>
                </div>

                <div>
                    <h3>Saved This Month</h3>
                    <p>${savedThisMonth.toFixed(2)}</p>
                </div>
            </section>

            <section>
                <h2>Recent Shopping Lists</h2>

                {recentShoppingLists.length === 0 ? (
                    <p>No shopping lists yet.</p>
                ) : (
                    <ul>
                        {recentShoppingLists.map((list) => (
                            <li key={list.id}>
                                <Link
                                    to={`/shopping-lists/${list.id}`}
                                >
                                    {list.name}
                                </Link>

                                {list.budget !== null && (
                                    <span>
                                        {" "}
                                        — Budget: $
                                        {Number(list.budget).toFixed(2)}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                )}

                <Link to="/shopping-lists">
                    View all shopping lists
                </Link>
            </section>

            <section>
                <h2>Recent Comparisons</h2>

                {recentComparisons.length === 0 ? (
                    <p>No comparisons yet.</p>
                ) : (
                    <ul>
                        {recentComparisons.map((comparison) => (
                            <li key={comparison.id}>
                                <Link
                                    to={`/comparisons/${comparison.id}`}
                                >
                                    {comparison.shoppingListName}
                                </Link>

                                <span>
                                    {" "}
                                    — Saved: $
                                    {Number(
                                        comparison.savings
                                    ).toFixed(2)}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}

                <Link to="/comparisons">
                    View all comparisons
                </Link>
            </section>
        </div>
    );
}