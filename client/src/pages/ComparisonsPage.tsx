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
        <div>
            <h1>Comparison History</h1>

            {comparisons.length === 0 ? (
                <p>No comparisons yet.</p>
            ) : (
                <ul>
                    {comparisons.map((comparison) => (
                        <li key={comparison.id}>
                            <h3>
                                <Link to={`/comparisons/${comparison.id}`}>
                                    {comparison.shoppingListName}
                                </Link>
                            </h3>

                            <p>
                                Optimized total: $
                                {Number(comparison.optimizedTotal).toFixed(2)}
                            </p>

                            <p>
                                Best single store: $
                                {comparison.cheapestSingleStoreTotal !== null
                                    ? Number(comparison.cheapestSingleStoreTotal).toFixed(2)
                                    : "N/A"}
                            </p>

                            <p>
                                Savings: $
                                {Number(comparison.savings).toFixed(2)}
                            </p>

                            <p>
                                Date:{" "}
                                {new Date(
                                    comparison.createdAt
                                ).toLocaleString()}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}