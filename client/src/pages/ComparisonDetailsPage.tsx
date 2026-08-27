import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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
        <div className="comparison-details-page">
            <Link
                to="/comparisons"
                className="back-link"
            >
                ← Back to Comparison History
            </Link>

            <div className="page-header comparison-details-header">
                <div>
                    <p className="eyebrow">Saved Comparison</p>

                    <h1>{comparison.shoppingListName}</h1>

                    <p>
                        {new Date(
                            comparison.createdAt
                        ).toLocaleString()}
                    </p>
                </div>
            </div>

            <section className="comparison-details-summary">
                <div className="comparison-summary-card primary-summary">
                    <span>Optimized Total</span>

                    <strong>
                        $
                        {Number(
                            comparison.optimizedTotal
                        ).toFixed(2)}
                    </strong>

                    <small>
                        Lowest calculated total
                    </small>
                </div>

                <div className="comparison-summary-card">
                    <span>Best Single Store</span>

                    <strong>
                        {comparison.cheapestSingleStoreTotal !== null
                            ? `$${Number(
                                comparison.cheapestSingleStoreTotal
                            ).toFixed(2)}`
                            : "N/A"}
                    </strong>

                    <small>
                        Cost when shopping at one store
                    </small>
                </div>

                <div className="comparison-summary-card savings-summary">
                    <span>Savings</span>

                    <strong>
                        +$
                        {Number(
                            comparison.savings
                        ).toFixed(2)}
                    </strong>

                    <small>
                        Savings using optimized plan
                    </small>
                </div>
            </section>

            <section className="panel comparison-section">
                <div className="panel-header">
                    <div>
                        <h2>Optimized Items</h2>

                        <p>
                            Recommended store for each product.
                        </p>
                    </div>
                </div>

                <div className="comparison-table-wrapper">
                    <table className="comparison-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Store</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {comparison.optimizedItems.map(
                                (item) => (
                                    <tr key={item.productId}>
                                        <td>
                                            <strong>
                                                {item.productName}
                                            </strong>
                                        </td>

                                        <td>
                                            {item.cheapestStore?.name ??
                                                "Not available"}
                                        </td>

                                        <td>
                                            {item.quantity}
                                        </td>

                                        <td>
                                            {item.unitPrice !== null
                                                ? `$${Number(
                                                    item.unitPrice
                                                ).toFixed(2)}`
                                                : "N/A"}
                                        </td>

                                        <td>
                                            {item.totalPrice !== null
                                                ? `$${Number(
                                                    item.totalPrice
                                                ).toFixed(2)}`
                                                : "N/A"}
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}