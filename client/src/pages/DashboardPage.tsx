import { useEffect, useState } from "react";
import { apiRequest } from "../services/api";
import { Link } from "react-router-dom";

type ShoppingList = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
};

export default function DashboardPage() {
    const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [newListName, setNewListName] = useState("");
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

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }
    async function handleCreateList(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!newListName.trim()) {
            return;
        }

        try {
            const newList = await apiRequest("/shopping-lists", {
                method: "POST",
                body: JSON.stringify({
                    name: newListName,
                }),
            });

            setShoppingLists((currentLists) => [
                newList,
                ...currentLists,
            ]);

            setNewListName("");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Could not create shopping list"
            );
        }
    }
    return (
        <div>
            <h1>Purchase Planner</h1>
            <h2>My Shopping Lists</h2>
            <form onSubmit={handleCreateList}>
                <input
                    type="text"
                    placeholder="Shopping list name"
                    value={newListName}
                    onChange={(event) => setNewListName(event.target.value)}
                />

                <button type="submit">
                    Create List
                </button>
            </form>
            {shoppingLists.length === 0 ? (
                <p>No shopping lists yet.</p>
            ) : (
                <ul>
                    {shoppingLists.map((list) => (
                        <li key={list.id}>
                            <Link to={`/shopping-lists/${list.id}`}>
                                {list.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}