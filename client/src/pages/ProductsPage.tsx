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

type Category = {
    id: string;
    name: string;
};

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

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
    return (
        <div>
            <h1>Products</h1>

            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(event) => {
                    setSearch(event.target.value);
                    setPage(1);
                }}
            />
            <select
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

            {loading && <p>Loading...</p>}

            {error && <p>{error}</p>}

            {!loading && !error && (
                <>
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>
                                <strong>{product.name}</strong>

                                {product.brand && (
                                    <> — {product.brand}</>
                                )}

                                {" — "}
                                {product.packageQuantity} {product.unit}
                            </li>
                        ))}
                    </ul>

                    <div>
                        <button
                            type="button"
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