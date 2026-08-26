import { useEffect, useState } from "react";

import { apiRequest } from "../services/api";

type Product = {
    id: string;
    name: string;
    brand: string | null;
    packageQuantity: number;
    unit: string;
    category: {
        id: string;
        name: string;
    };
};

type ProductsResponse = {
    products: Product[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};

type ShoppingList = {
    id: string;
    name: string;
};
type Category = {
    id: string;
    name: string;
};

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
    const [selectedListId, setSelectedListId] = useState("");
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [successMessage, setSuccessMessage] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryId, setCategoryId] = useState("");

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadProducts() {
            try {
                setLoading(true);

                const params = new URLSearchParams();

                params.set("page", String(page));
                params.set("limit", "10");

                if (search.trim()) {
                    params.set("search", search.trim());
                }

                if (categoryId) {
                    params.set("categoryId", categoryId);
                }

                const data: ProductsResponse = await apiRequest(
                    `/products?${params.toString()}`
                );

                setProducts(data.products);
                setPagination(data.pagination);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Could not load products"
                );
            } finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, [search, page, categoryId]);
    useEffect(() => {
        async function loadCategories() {
            try {
                const data = await apiRequest("/categories");

                setCategories(data);
            } catch (error) {
                console.error("Could not load categories", error);
            }
        }

        loadCategories();
    }, []);
    useEffect(() => {
        async function loadShoppingLists() {
            try {
                const data = await apiRequest("/shopping-lists");

                setShoppingLists(data);

                if (data.length > 0) {
                    setSelectedListId(data[0].id);
                }
            } catch (error) {
                console.error("Could not load shopping lists", error);
            }
        }

        loadShoppingLists();
    }, []);
    async function handleAddToList() {
        if (!selectedProductId || !selectedListId) {
            return;
        }

        try {
            await apiRequest(
                `/shopping-lists/${selectedListId}/items`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        productId: selectedProductId,
                        quantity,
                    }),
                }
            );

            setSuccessMessage("Product added to shopping list");
            setSelectedProductId(null);
            setQuantity(1);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Could not add product to shopping list"
            );
        }
    }
    return (
    <div className="products-page">
        <div className="page-header">
            <div>
                <h1>Products</h1>
                <p>Browse and search available products.</p>
            </div>
        </div>

        <div className="products-toolbar">
            {successMessage && (
                <p className="success-message">
                    {successMessage}
                </p>
            )}
            <input
                className="search-input"
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(event) => {
                    setSearch(event.target.value);
                    setPage(1);
                }}
            />

            <select
                className="category-select"
                value={categoryId}
                onChange={(event) => {
                    setCategoryId(event.target.value);
                    setPage(1);
                }}
            >
                <option value="">
                    All Categories
                </option>

                {categories.map((category) => (
                    <option
                        key={category.id}
                        value={category.id}
                    >
                        {category.name}
                    </option>
                ))}
            </select>
        </div>

        {loading && (
            <p className="empty-state">
                Loading products...
            </p>
        )}

        {error && (
            <p className="error-message">
                {error}
            </p>
        )}

        {!loading && !error && (
            <>
                {products.length === 0 ? (
                    <div className="panel">
                        <p className="empty-state">
                            No products found.
                        </p>
                    </div>
                ) : (
                    <div className="products-grid">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="product-card"
                            >
                                <div className="product-card-header">
                                    <div>
                                        <h3>{product.name}</h3>

                                        {product.brand && (
                                            <p>{product.brand}</p>
                                        )}
                                    </div>

                                    <span className="product-category">
                                        {product.category?.name ??
                                            "Uncategorized"}
                                    </span>
                                </div>

                                <div className="product-meta">
                                    <span>Package</span>

                                    <strong>
                                        {product.packageQuantity}{" "}
                                        {product.unit}
                                    </strong>
                                </div>
                                <button
                                    type="button"
                                    className="primary-button"
                                    onClick={() => {
                                        setSelectedProductId(product.id);
                                        setQuantity(1);
                                        setSuccessMessage("");
                                    }}
                                >
                                    Add to List
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                {selectedProductId && (
                    <div className="modal-overlay">
                        <div className="modal-card">
                            <h3>Add Product to Shopping List</h3>

                            <label>Shopping List</label>

                            <select
                                value={selectedListId}
                                onChange={(event) =>
                                    setSelectedListId(event.target.value)
                                }
                            >
                                {shoppingLists.map((list) => (
                                    <option
                                        key={list.id}
                                        value={list.id}
                                    >
                                        {list.name}
                                    </option>
                                ))}
                            </select>

                            <label>Quantity</label>

                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(event) =>
                                    setQuantity(Number(event.target.value))
                                }
                            />

                            <div className="modal-actions">
                                <button
                                    type="button"
                                    className="secondary-button"
                                    onClick={() =>
                                        setSelectedProductId(null)
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="primary-button"
                                    onClick={handleAddToList}
                                >
                                    Add Product
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <div className="pagination">
                    <button
                        type="button"
                        className="secondary-button"
                        disabled={page <= 1}
                        onClick={() =>
                            setPage((current) => current - 1)
                        }
                    >
                        Previous
                    </button>

                    <span>
                        Page {pagination.page} of{" "}
                        {pagination.totalPages}
                    </span>

                    <button
                        type="button"
                        className="secondary-button"
                        disabled={
                            page >= pagination.totalPages
                        }
                        onClick={() =>
                            setPage((current) => current + 1)
                        }
                    >
                        Next
                    </button>
                </div>
            </>
        )}
    </div>
);
}