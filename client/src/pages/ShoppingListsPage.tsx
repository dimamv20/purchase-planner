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

export default function ShoppingListsPage() {
    const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
    const [newListName, setNewListName] = useState("");
    const [budget, setBudget] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadShoppingLists() {
            try {
                const data = await apiRequest("/shopping-lists");

                setShoppingLists(data);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Could not load shopping lists"
                );
            } finally {
                setLoading(false);
            }
        }

        loadShoppingLists();
    }, []);

    async function handleCreateList(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (!newListName.trim()) {
            return;
        }

        try {
            const newList = await apiRequest("/shopping-lists", {
                method: "POST",
                body: JSON.stringify({
                    name: newListName,
                    budget: budget ? Number(budget) : undefined,
                }),
            });

            setShoppingLists((currentLists) => [
                newList,
                ...currentLists,
            ]);

            setNewListName("");
            setBudget("");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Could not create shopping list"
            );
        }
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="shopping-lists-page">
            <div className="page-header">
                <div>
                    <h1>Shopping Lists</h1>
                    <p>Create and manage your shopping lists.</p>
                </div>
            </div>

            <div className="panel create-list-panel">
                <h2>Create Shopping List</h2>

                <form
                    onSubmit={handleCreateList}
                    className="create-list-form"
                >
                    <input
                        type="text"
                        placeholder="Shopping list name"
                        value={newListName}
                        onChange={(event) =>
                            setNewListName(event.target.value)
                        }
                    />

                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Budget"
                        value={budget}
                        onChange={(event) =>
                            setBudget(event.target.value)
                        }
                    />

                    <button
                        type="submit"
                        className="primary-button"
                    >
                        Create List
                    </button>
                </form>
            </div>

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            {shoppingLists.length === 0 ? (
                <div className="panel">
                    <p className="empty-state">
                        No shopping lists yet.
                    </p>
                </div>
            ) : (
                <div className="shopping-lists-grid">
                    {shoppingLists.map((list) => (
                        <Link
                            key={list.id}
                            to={`/shopping-lists/${list.id}`}
                            className="shopping-list-card"
                        >
                            <div>
                                <h3>{list.name}</h3>

                                <p>
                                    Created{" "}
                                    {new Date(
                                        list.createdAt
                                    ).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="shopping-list-budget">
                                {list.budget !== null
                                    ? `$${Number(
                                        list.budget
                                    ).toFixed(2)}`
                                    : "No budget"}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}