import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { apiRequest } from "../services/api";

type ComparisonDetails = {
    id: string;
    shoppingListId: string;
    shoppingListName: string;
    optimizedTotal: number | string;
    cheapestSingleStoreTotal: number | string | null;
    savings: number | string;
    optimizedItems: {
        productId: string;
        productName: string;
        quantity: number;
        cheapestStore: {
            id: string;
            name: string;
        } | null;
        unitPrice: number | null;
        totalPrice: number | null;
    }[];
    createdAt: string;
};

export default function ComparisonDetailsPage() {
    const { id } = useParams();

    const [comparison, setComparison] =
        useState<ComparisonDetails | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadComparison() {
            if (!id) {
                return;
            }

            try {
                const data = await apiRequest(`/comparisons/${id}`);

                setComparison(data);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Could not load comparison"
                );
            } finally {
                setLoading(false);
            }
        }

        loadComparison();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!comparison) {
        return <p>Comparison not found.</p>;
    }

    return (
        <div>
            <h1>{comparison.shoppingListName}</h1>

            <p>
                Date: {new Date(comparison.createdAt).toLocaleString()}
            </p>

            <p>
                Optimized total: $
                {Number(comparison.optimizedTotal).toFixed(2)}
            </p>

            <p>
                Best single store total: $
                {comparison.cheapestSingleStoreTotal !== null
                    ? Number(
                          comparison.cheapestSingleStoreTotal
                      ).toFixed(2)
                    : "N/A"}
            </p>

            <p>
                Savings: $
                {Number(comparison.savings).toFixed(2)}
            </p>

            <h2>Optimized Items</h2>

            <ul>
                {comparison.optimizedItems.map((item) => (
                    <li key={item.productId}>
                        {item.productName}
                        {" — "}
                        {item.cheapestStore?.name ?? "Not available"}
                        {" — "}
                        Quantity: {item.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
}