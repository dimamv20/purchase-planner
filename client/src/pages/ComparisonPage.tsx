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
        <div className="comparison-page">
            <button
                type="button"
                className="back-link-button"
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>

            <div className="page-header">
                <div>
                    <p className="eyebrow">Price Comparison</p>
                    <h1>Comparison Result</h1>
                    <p>
                        Review the most cost-effective way to complete your
                        shopping list.
                    </p>
                </div>
            </div>

            <section className="comparison-summary-grid">
                <div className="comparison-summary-card primary-summary">
                    <span>Optimized Total</span>
                    <strong>
                        ${Number(comparison.optimizedTotal).toFixed(2)}
                    </strong>
                    <small>Lowest possible total</small>
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
                        {comparison.cheapestSingleStore?.storeName ??
                            "No complete store available"}
                    </small>
                </div>

                <div className="comparison-summary-card savings-summary">
                    <span>Savings</span>

                    <strong>
                        +${Number(comparison.savings).toFixed(2)}
                    </strong>

                    <small>
                        Compared with the best single store
                    </small>
                </div>

                {budget !== null && (
                    <div
                        className={`comparison-summary-card ${
                            budgetDifference !== null &&
                            budgetDifference < 0
                                ? "budget-over"
                                : "budget-safe"
                        }`}
                    >
                        <span>Budget Status</span>

                        <strong>
                            {budgetDifference !== null &&
                            budgetDifference >= 0
                                ? `$${budgetDifference.toFixed(2)} left`
                                : `$${Math.abs(
                                    budgetDifference ?? 0
                                ).toFixed(2)} over`}
                        </strong>

                        <small>
                            Budget: ${budget.toFixed(2)}
                        </small>
                    </div>
                )}
            </section>

            {budget !== null && (
                <section className="panel budget-panel">
                    <div className="budget-panel-header">
                        <div>
                            <h2>Budget</h2>
                            <p>
                                ${Number(comparison.optimizedTotal).toFixed(2)} of $
                                {budget.toFixed(2)}
                            </p>
                        </div>

                        <strong>
                            {Math.round(
                                (Number(comparison.optimizedTotal) / budget) *
                                    100
                            )}
                            %
                        </strong>
                    </div>

                    <div className="budget-progress">
                        <div
                            className="budget-progress-value"
                            style={{
                                width: `${Math.min(
                                    (Number(comparison.optimizedTotal) /
                                        budget) *
                                        100,
                                    100
                                )}%`,
                            }}
                        />
                    </div>
                </section>
            )}

            <section className="panel comparison-section">
                <div className="panel-header">
                    <div>
                        <h2>Optimized Purchase Plan</h2>
                        <p>
                            Buy each product where it is currently cheapest.
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
                            {comparison.optimizedItems.map((item) => (
                                <tr key={item.productId}>
                                    <td>
                                        <strong>{item.productName}</strong>
                                    </td>

                                    <td>
                                        {item.cheapestStore?.name ??
                                            "Not available"}
                                    </td>

                                    <td>{item.quantity}</td>

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
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {comparison.bestTwoStorePlan && (
                <section className="panel comparison-section">
                    <div className="panel-header">
                        <div>
                            <h2>Best Two Store Plan</h2>

                            <p>
                                {comparison.bestTwoStorePlan.stores
                                    .map((store) => store.name)
                                    .join(" + ")}
                            </p>
                        </div>

                        <strong className="section-total">
                            $
                            {Number(
                                comparison.bestTwoStorePlan.total
                            ).toFixed(2)}
                        </strong>
                    </div>

                    <div className="comparison-table-wrapper">
                        <table className="comparison-table">
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
                                {comparison.bestTwoStorePlan.items.map(
                                    (item) => (
                                        <tr key={item.productId}>
                                            <td>
                                                <strong>
                                                    {item.productName}
                                                </strong>
                                            </td>

                                            <td>{item.store.name}</td>
                                            <td>{item.quantity}</td>

                                            <td>
                                                $
                                                {Number(
                                                    item.unitPrice
                                                ).toFixed(2)}
                                            </td>

                                            <td>
                                                $
                                                {Number(
                                                    item.totalPrice
                                                ).toFixed(2)}
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            {comparison.cheapestSingleStore && (
                <section className="panel single-store-panel">
                    <div>
                        <p className="eyebrow">Best Single Store</p>

                        <h2>
                            {comparison.cheapestSingleStore.storeName}
                        </h2>

                        <p>
                            Buy the entire available shopping list at one
                            location.
                        </p>
                    </div>

                    <strong>
                        $
                        {Number(
                            comparison.cheapestSingleStore.total
                        ).toFixed(2)}
                    </strong>
                </section>
            )}
        </div>
    );
}