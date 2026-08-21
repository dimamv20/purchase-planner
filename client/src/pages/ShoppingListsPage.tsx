import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { apiRequest } from "../services/api";

type ShoppingList = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
};

export default function ShoppingListsPage() {
    const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
    const [newListName, setNewListName] = useState("");
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

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Shopping Lists</h1>

            <form onSubmit={handleCreateList}>
                <input
                    type="text"
                    placeholder="New shopping list name"
                    value={newListName}
                    onChange={(event) =>
                        setNewListName(event.target.value)
                    }
                />

                <button type="submit">
                    Create List
                </button>
            </form>

            {error && <p>{error}</p>}

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