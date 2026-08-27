import { useEffect, useState } from "react";
import { apiRequest } from "../services/api";
import { Link } from "react-router-dom";
type Comparison = {
    id: string;
    shoppingListId: string;
    shoppingListName: string;
    optimizedTotal: number | string;
    cheapestSingleStoreTotal: number | string | null;
    savings: number | string;
    createdAt: string;
};

export default function ComparisonsPage() {
    const [comparisons, setComparisons] = useState<Comparison[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadComparisons() {
            try {
                const data = await apiRequest("/comparisons");

                setComparisons(data);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Could not load comparisons"
                );
            } finally {
                setLoading(false);
            }
        }

        loadComparisons();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="comparisons-page">
            <div className="page-header">
                <div>
                    <p className="eyebrow">History</p>
                    <h1>Comparison History</h1>
                    <p>
                        Review your previous shopping price comparisons.
                    </p>
                </div>
            </div>

            {comparisons.length === 0 ? (
                <div className="panel">
                    <p className="empty-state">
                        No comparisons yet.
                    </p>
                </div>
            ) : (
                <div className="comparisons-list">
                    {comparisons.map((comparison) => (
                        <Link
                            key={comparison.id}
                            to={`/comparisons/${comparison.id}`}
                            className="comparison-history-card"
                        >
                            <div className="comparison-history-header">
                                <div>
                                    <h3>
                                        {comparison.shoppingListName}
                                    </h3>

                                    <span>
                                        {new Date(
                                            comparison.createdAt
                                        ).toLocaleString()}
                                    </span>
                                </div>

                                <span className="comparison-view-link">
                                    View Details →
                                </span>
                            </div>

                            <div className="comparison-history-stats">
                                <div>
                                    <span>Optimized Total</span>

                                    <strong>
                                        $
                                        {Number(
                                            comparison.optimizedTotal
                                        ).toFixed(2)}
                                    </strong>
                                </div>

                                <div>
                                    <span>Best Single Store</span>

                                    <strong>
                                        {comparison.cheapestSingleStoreTotal !==
                                        null
                                            ? `$${Number(
                                                comparison.cheapestSingleStoreTotal
                                            ).toFixed(2)}`
                                            : "N/A"}
                                    </strong>
                                </div>

                                <div>
                                    <span>Savings</span>

                                    <strong className="history-savings">
                                        +$
                                        {Number(
                                            comparison.savings
                                        ).toFixed(2)}
                                    </strong>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}