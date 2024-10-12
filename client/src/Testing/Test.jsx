import React, { useState } from 'react';
import { 
  ExpandMore as ExpandMoreIcon, 
  ExpandLess as ExpandLessIcon, 
  LocalShipping as LocalShippingIcon 
} from '@mui/icons-material';

const OrderComponent = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Sample order data
  const order = {
    id: '12345',
    address: '7 Abelard Avenue',
    total: 507.4,
    items: 4,
    paymentMethod: 'cash',
    date: '10-10-2024',
    products: [
      { name: 'Margherita Pizza', quantity: 2, price: 15.99, image: '/placeholder.svg?height=80&width=80' },
      { name: 'Chicken Wings', quantity: 1, price: 12.99, image: '/placeholder.svg?height=80&width=80' },
      { name: 'Caesar Salad', quantity: 1, price: 8.99, image: '/placeholder.svg?height=80&width=80' },
      { name: 'Chocolate Cake', quantity: 1, price: 6.99, image: '/placeholder.svg?height=80&width=80' },
      { name: 'Iced Tea', quantity: 2, price: 2.99, image: '/placeholder.svg?height=80&width=80' },
    ],
  };

  return (
    <div className="order-component">
      <div className="order-summary" onClick={toggleExpand}>
        <div className="order-icon">
          <LocalShippingIcon style={{ fontSize: 24 }} />
        </div>
        <div className="order-details">
          <span className="order-address">{order.address}</span>
          <span className="order-total">${order.total.toFixed(2)}</span>
          <span className="order-items">Items: {order.items}</span>
          <span className="order-payment">{order.paymentMethod}</span>
        </div>
        <button className="track-button">Track Order</button>
        <div className="expand-icon">
          {isExpanded ? <ExpandLessIcon style={{ fontSize: 24 }} /> : <ExpandMoreIcon style={{ fontSize: 24 }} />}
        </div>
      </div>
      {isExpanded && (
        <div className="order-expanded">
          <div className="order-date">Order Date: {order.date}</div>
          <div className="product-list">
            {order.products.map((product, index) => (
              <div key={index} className="product-item">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-details">
                  <span className="product-name">{product.name}</span>
                  <span className="product-quantity">x{product.quantity}</span>
                  <span className="product-price">${product.price.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <style jsx>{`
        .order-component {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          margin-bottom: 16px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
        }
        .order-summary {
          display: flex;
          align-items: center;
          padding: 16px;
          cursor: pointer;
          background-color: #fff;
          transition: background-color 0.3s ease;
        }
        .order-summary:hover {
          background-color: #f9f9f9;
        }
        .order-icon {
          margin-right: 16px;
          color: #ff4081;
        }
        .order-details {
          flex-grow: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .order-address, .order-total {
          font-weight: bold;
        }
        .track-button {
          padding: 8px 16px;
          background-color: #000;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .track-button:hover {
          background-color: #333;
        }
        .expand-icon {
          margin-left: 16px;
        }
        .order-expanded {
          padding: 16px;
          background-color: #f5f5f5;
          border-top: 1px solid #e0e0e0;
        }
        .order-date {
          margin-bottom: 8px;
          font-style: italic;
          color: #666;
        }
        .product-list {
          display: grid;
          gap: 8px;
          max-height: 300px;
          overflow-y: auto;
          padding-right: 8px;
        }
        .product-list::-webkit-scrollbar {
          width: 6px;
        }
        .product-list::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .product-list::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 3px;
        }
        .product-list::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        .product-item {
          display: flex;
          align-items: center;
          background-color: #fff;
          padding: 8px;
          border-radius: 4px;
        }
        .product-image {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 4px;
          margin-right: 12px;
        }
        .product-details {
          flex-grow: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .product-name {
          font-weight: bold;
          flex-grow: 1;
        }
        .product-quantity {
          color: #666;
          margin: 0 12px;
        }
        .product-price {
          font-weight: bold;
          color: #ff4081;
        }
      `}</style>
    </div>
  );
};

export default OrderComponent;