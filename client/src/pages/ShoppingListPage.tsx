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

    const [error, setError] = useState("");
    const [products, setProducts] = useState<AvailableProduct[]>([]);

    const [quantities, setQuantities] = useState<Record<string, number>>({});


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
    return (
        <div>
            <h1>{shoppingList.name}</h1>
            {shoppingList.budget !== null && (
                <p>
                    Budget: ${Number(shoppingList.budget).toFixed(2)}
                </p>
            )}
            {shoppingList.items.length === 0 ? (
                <p>No products in this list.</p>
            ) : (
                <ul>
                    {shoppingList.items.map((item) => (
                        <li key={item.id}>
                            <span>{item.product.name}</span>

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
                                -
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
                            <button
                                type="button"
                                onClick={() => handleDeleteItem(item.id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <h2>Available Products</h2>

            {products.length === 0 ? (
                <p>No products available.</p>
            ) : (
                <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <span>
                            {product.name}
                            {product.brand && ` — ${product.brand}`}
                        </span>

                        <input
                            type="number"
                            min="1"
                            value={quantities[product.id] ?? 1}
                            onChange={(event) =>
                                setQuantities((current) => ({
                                    ...current,
                                    [product.id]: Number(event.target.value),
                                }))
                            }
                        />

                        <button
                            type="button"
                            onClick={() => handleAddProduct(product.id)}
                        >
                            Add
                        </button>
                        
                    </li>
                ))}
            </ul>
            )}
            <button
                type="button"
                onClick={handleCompare}
            >
                Compare Prices
            </button>
        </div>
        
    );
}