import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { apiRequest } from "../services/api";

type Store = {
    id: string;
    name: string;
};

type Price = {
    id: string;
    regularPrice: string | number;
    salePrice: string | number | null;
    isAvailable: boolean;
    store: Store;
};

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

    prices: Price[];
};

export default function ProductDetailsPage() {
    const { id } = useParams();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadProduct() {
            if (!id) {
                return;
            }

            try {
                const data = await apiRequest(`/products/${id}`);

                setProduct(data);
                console.log(data);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Could not load product"
                );
            } finally {
                setLoading(false);
            }
        }

        loadProduct();
    }, [id]);

    if (loading) {
        return <p className="empty-state">Loading product...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (!product) {
        return <p className="empty-state">Product not found.</p>;
    }

    const getCurrentPrice = (price: Price) => {
        return price.salePrice !== null
            ? Number(price.salePrice)
            : Number(price.regularPrice);
    };

    const sortedPrices = [...product.prices].sort(
        (a, b) => getCurrentPrice(a) - getCurrentPrice(b)
    );

    return (
        <div className="product-details-page">
            <Link
                to="/products"
                className="back-link"
            >
                ← Back to Products
            </Link>

            <div className="product-details-card">
                <div className="product-details-header">
                    <div>
                        <span className="product-category">
                            {product.category.name}
                        </span>

                        <h1>{product.name}</h1>

                        {product.brand && (
                            <p>{product.brand}</p>
                        )}
                    </div>
                </div>

                <div className="product-info-grid">
                    <div>
                        <span>Category</span>
                        <strong>{product.category.name}</strong>
                    </div>

                    <div>
                        <span>Package</span>
                        <strong>
                            {product.packageQuantity} {product.unit}
                        </strong>
                    </div>
                </div>
            </div>

            <div className="prices-panel">
                <div className="panel-header">
                    <div>
                        <h2>Available Prices</h2>
                        <p>Compare prices across stores.</p>
                    </div>
                </div>

                {sortedPrices.length === 0 ? (
                    <p className="empty-state">
                        No prices available for this product.
                    </p>
                ) : (
                    <div className="prices-list">
                        {sortedPrices.map((price, index) => (
                            <div
                                key={price.id}
                                className="price-row"
                            >
                                <div>
                                    <strong>{price.store.name}</strong>

                                    {index === 0 && (
                                        <span className="best-price-badge">
                                            Best Price
                                        </span>
                                    )}
                                </div>

                                <strong className="price-value">
                                    ${getCurrentPrice(price).toFixed(2)}
                                </strong>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}