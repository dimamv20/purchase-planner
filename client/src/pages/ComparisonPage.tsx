import { useLocation, useNavigate } from "react-router-dom";

type ComparisonResult = {
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

    optimizedTotal: number;
    budget: string | number | null;

    cheapestSingleStore: {
        storeId: string;
        storeName: string;
        total: number;
    } | null;

    cheapestSingleStoreTotal: number | null;

    savings: number;

    bestTwoStorePlan: {
        stores: {
            id: string;
            name: string;
        }[];
        total: number;
        items: {
            productId: string;
            productName: string;
            quantity: number;
            store: {
                id: string;
                name: string;
            };
            unitPrice: number;
            totalPrice: number;
        }[];
    } | null;
};

export default function ComparisonPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const comparison = location.state as ComparisonResult | null;

    if (!comparison) {
        return (
            <div>
                <p>No comparison result found.</p>

                <button onClick={() => navigate("/dashboard")}>
                    Back to Dashboard
                </button>
            </div>
        );
    }
    const budget =
        comparison.budget !== null
            ? Number(comparison.budget)
            : null;

    const budgetDifference =
        budget !== null
            ? budget - Number(comparison.optimizedTotal)
            : null;
    return (
        <div>
            <button onClick={() => navigate(-1)}>
                Back
            </button>

            <h1>Comparison Result</h1>

            <div>
                <h2>
                    Optimized Total: $
                    {comparison.optimizedTotal.toFixed(2)}
                </h2>
                {budget !== null && (
                    <div>
                        <p>
                            Budget: ${budget.toFixed(2)}
                        </p>

                        {budgetDifference !== null && budgetDifference >= 0 ? (
                            <p>
                                Remaining: ${budgetDifference.toFixed(2)}
                            </p>
                        ) : (
                            <p>
                                Over budget: $
                                {Math.abs(budgetDifference ?? 0).toFixed(2)}
                            </p>
                        )}
                    </div>
                )}
                <p>
                    Cheapest Single Store: $
                    {comparison.cheapestSingleStoreTotal?.toFixed(2) ?? "N/A"}
                </p>

                <p>
                    Savings: $
                    {comparison.savings.toFixed(2)}
                </p>
            </div>

            <h2>Optimized Plan</h2>

            <table>
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
                    {comparison.optimizedItems.map((item) => (
                        <tr key={item.productId}>
                            <td>{item.productName}</td>

                            <td>
                                {item.cheapestStore?.name ?? "Not available"}
                            </td>

                            <td>{item.quantity}</td>

                            <td>
                                {item.unitPrice !== null
                                    ? `$${item.unitPrice.toFixed(2)}`
                                    : "N/A"}
                            </td>

                            <td>
                                {item.totalPrice !== null
                                    ? `$${item.totalPrice.toFixed(2)}`
                                    : "N/A"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {comparison.bestTwoStorePlan && (
                <div>
                    <h2>Best Two Store Plan</h2>

                    <p>
                        Stores:{" "}
                        {comparison.bestTwoStorePlan.stores
                            .map((store) => store.name)
                            .join(" + ")}
                    </p>

                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Buy At</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {comparison.bestTwoStorePlan.items.map((item) => (
                                <tr key={item.productId}>
                                    <td>{item.productName}</td>

                                    <td>{item.store.name}</td>

                                    <td>{item.quantity}</td>

                                    <td>
                                        ${item.unitPrice.toFixed(2)}
                                    </td>

                                    <td>
                                        ${item.totalPrice.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h3>
                        Two Store Total: $
                        {comparison.bestTwoStorePlan.total.toFixed(2)}
                    </h3>
                </div>
            )}

            {comparison.cheapestSingleStore && (
                <div>
                    <h2>Best Single Store</h2>

                    <p>
                        {comparison.cheapestSingleStore.storeName}
                    </p>

                    <p>
                        Total: $
                        {comparison.cheapestSingleStore.total.toFixed(2)}
                    </p>
                </div>
            )}
        </div>
    );
}