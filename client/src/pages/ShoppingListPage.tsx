import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { apiRequest } from "../services/api";


type Product = {
    id: string;
    name: string;
    brand: string;
};

type ShoppingListItem = {
    id: string;
    quantity: number;
    product: Product;
};

type ShoppingList = {
    id: string;
    name: string;
    budget: string | number | null;
    items: ShoppingListItem[];
};

type AvailableProduct = {
    id: string;
    name: string;
    brand: string | null;
};

type ProductsResponse = {
    products: AvailableProduct[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};


export default function ShoppingListPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [shoppingList, setShoppingList] =
        useState<ShoppingList | null>(null);

    const [loading, setLoading] = useState(true);
    const [budgetInput, setBudgetInput] = useState("");
    const [error, setError] = useState("");
    const [products, setProducts] = useState<AvailableProduct[]>([]);
    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const [nameInput, setNameInput] = useState("");

    useEffect(() => {
        async function loadShoppingList() {
            if (!id) {
                return;
            }

            try {
                const data = await apiRequest(
                    `/shopping-lists/${id}`
                );

                setShoppingList(data);
                setNameInput(data.name);
                setBudgetInput(data.budget !== null? String(data.budget): "");
                const productsData: ProductsResponse = await apiRequest("/products");

                setProducts(productsData.products);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Could not load shopping list"
                );
            } finally {
                setLoading(false);
            }
        }

        loadShoppingList();
        
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!shoppingList) {
        return <p>Shopping list not found.</p>;
    }
    async function handleAddProduct(productId: string) {
        if (!id) {
            return;
        }

        const quantity = quantities[productId] ?? 1;

        try {
            const newItem = await apiRequest(
                `/shopping-lists/${id}/items`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        productId,
                        quantity,
                    }),
                }
            );

            setShoppingList((currentList) => {
                if (!currentList) {
                    return currentList;
                }

                return {
                    ...currentList,
                    items: [
                        ...currentList.items,
                        newItem,
                    ],
                };
            });
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Could not add product"
            );
        }
    }
    async function handleUpdateQuantity(
        itemId: string,
        newQuantity: number
    ) {
        if (newQuantity <= 0) {
            return;
        }

        try {
            const updatedItem = await apiRequest(
                `/shopping-list-items/${itemId}`,
                {
                    method: "PATCH",
                    body: JSON.stringify({
                        quantity: newQuantity,
                    }),
                }
            );

            setShoppingList((currentList) => {
                if (!currentList) {
                    return currentList;
                }

                return {
                    ...currentList,
                    items: currentList.items.map((item) =>
                        item.id === itemId
                            ? updatedItem
                            : item
                    ),
                };
            });
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Could not update quantity"
            );
        }
    }
    async function handleDeleteItem(itemId: string) {
        try {
            await apiRequest(
                `/shopping-list-items/${itemId}`,
                {
                    method: "DELETE",
                }
            );

            setShoppingList((currentList) => {
                if (!currentList) {
                    return currentList;
                }

                return {
                    ...currentList,
                    items: currentList.items.filter(
                        (item) => item.id !== itemId
                    ),
                };  
            });
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Could not delete item"
            );
        }
    }

    async function handleUpdateName() {
        if (!id || !shoppingList) {
            return;
        }

        const trimmedName = nameInput.trim();

        if (!trimmedName) {
            setError("Shopping list name is required");
            return;
        }

        try {
            const updatedList = await apiRequest(
                `/shopping-lists/${id}`,
                {
                    method: "PATCH",
                    body: JSON.stringify({
                        name: trimmedName,
                    }),
                }
            );

            setShoppingList(updatedList);
            setNameInput(updatedList.name);
            setError("");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Could not update shopping list name"
            );
        }
    }

    async function handleDeleteShoppingList() {
        if (!id || !shoppingList) {
            return;
        }

        const confirmed = window.confirm(
            `Delete "${shoppingList.name}"? This action cannot be undone.`
        );

        if (!confirmed) {
            return;
        }

        try {
            await apiRequest(
                `/shopping-lists/${id}`,
                {
                    method: "DELETE",
                }
            );

            navigate("/shopping-lists");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Could not delete shopping list"
            );
        }
    }

    async function handleCompare() {
        if (!id || !shoppingList) {
            return;
        }

        try {
            const result = await apiRequest(
                `/shopping-lists/${id}/compare`
            );

            navigate("/comparison", {
                state: {
                    ...result,
                    budget: shoppingList.budget,
                },
            });
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Could not compare prices"
            );
        }
    }

    async function handleUpdateBudget() {
        if (!id || !shoppingList) {
            return;
        }

        try {
            const updatedList = await apiRequest(
                `/shopping-lists/${id}`,
                {
                    method: "PATCH",
                    body: JSON.stringify({
                        budget: budgetInput
                            ? Number(budgetInput)
                            : null,
                    }),
                }
            );

            setShoppingList(updatedList);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Could not update budget"
            );
        }
    }

    return (
        <div className="shopping-list-details-page">
            <div className="shopping-list-header">
                <div className="shopping-list-title-section">
                    <p className="eyebrow">
                        Shopping List
                    </p>

                    <div className="shopping-list-name-editor">
                        <input
                            type="text"
                            value={nameInput}
                            onChange={(event) =>
                                setNameInput(event.target.value)
                            }
                        />

                        <button
                            type="button"
                            className="secondary-button"
                            onClick={handleUpdateName}
                            disabled={
                                !nameInput.trim() ||
                                nameInput.trim() === shoppingList.name
                            }
                        >
                            Rename
                        </button>
                    </div>

                    {shoppingList.budget !== null && (
                        <p className="budget-text">
                            Budget: $
                            {Number(
                                shoppingList.budget
                            ).toFixed(2)}
                        </p>
                    )}
                </div>

                <div className="shopping-list-toolbar">
                    <input
                        className="budget-toolbar-input"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Budget"
                        value={budgetInput}
                        onChange={(event) =>
                            setBudgetInput(event.target.value)
                        }
                        aria-label="Shopping list budget"
                    />

                    <button
                        type="button"
                        className="secondary-button toolbar-button"
                        onClick={handleUpdateBudget}
                    >
                        Update Budget
                    </button>

                    <button
                        type="button"
                        className="primary-button toolbar-button"
                        onClick={handleCompare}
                        disabled={shoppingList.items.length === 0}
                    >
                        Compare Prices
                    </button>

                    <button
                        type="button"
                        className="delete-list-button toolbar-button"
                        onClick={handleDeleteShoppingList}
                    >
                        Delete List
                    </button>
                </div>
            </div>

            <div className="shopping-list-layout">
                <section className="panel shopping-items-panel">
                    <div className="panel-header">
                        <div>
                            <h2>Items in this List</h2>
                            <p>
                                {shoppingList.items.length}{" "}
                                {shoppingList.items.length === 1
                                    ? "item"
                                    : "items"}
                            </p>
                        </div>
                    </div>

                    {shoppingList.items.length === 0 ? (
                        <p className="empty-state">
                            No products in this list.
                        </p>
                    ) : (
                        <div className="shopping-items-list">
                            {shoppingList.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="shopping-item-row"
                                >
                                    <div className="shopping-item-info">
                                        <strong>
                                            {item.product.name}
                                        </strong>

                                        <span>
                                            {item.product.brand}
                                        </span>
                                    </div>

                                    <div className="quantity-control">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleUpdateQuantity(
                                                    item.id,
                                                    item.quantity - 1
                                                )
                                            }
                                            disabled={item.quantity <= 1}
                                        >
                                            −
                                        </button>

                                        <span>
                                            {item.quantity}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleUpdateQuantity(
                                                    item.id,
                                                    item.quantity + 1
                                                )
                                            }
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        type="button"
                                        className="delete-button"
                                        onClick={() =>
                                            handleDeleteItem(item.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <section className="panel available-products-panel">
                    <div className="panel-header">
                        <div>
                            <h2>Available Products</h2>
                            <p>Add products to this list.</p>
                        </div>
                    </div>

                    {products.length === 0 ? (
                        <p className="empty-state">
                            No products available.
                        </p>
                    ) : (
                        <div className="available-products-list">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="available-product-row"
                                >
                                    <div>
                                        <strong>{product.name}</strong>

                                        {product.brand && (
                                            <span>
                                                {product.brand}
                                            </span>
                                        )}
                                    </div>

                                    <input
                                        type="number"
                                        min="1"
                                        value={
                                            quantities[product.id] ?? 1
                                        }
                                        onChange={(event) =>
                                            setQuantities(
                                                (current) => ({
                                                    ...current,
                                                    [product.id]:
                                                        Number(
                                                            event.target
                                                                .value
                                                        ),
                                                })
                                            )
                                        }
                                    />

                                    <button
                                        type="button"
                                        className="secondary-button"
                                        onClick={() =>
                                            handleAddProduct(product.id)
                                        }
                                    >
                                        Add
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}