import { display } from "@mui/system";
import React, { useState, useEffect } from "react";

const ProductTable = ({ products, onDeleteProduct, onEditQuantity, onEditNote, onAddProduct, selectedWorkspace }) => {
    const [productDetails, setProductDetails] = useState([]);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        if (selectedWorkspace) {
            fetchProductInWorkspace(selectedWorkspace);
        }
    }, [selectedWorkspace]);

    const fetchProductInWorkspace = async (workspace_name) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/workspace/${workspace_name}/products`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const productsData = await response.json();
            setProductList(productsData);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    const calculateTotal = (quantity, price) => {
        return quantity * price;
    };

    const handleQuantityChange = (index, event) => {
        const newQuantity = parseInt(event.target.value);
        onEditQuantity(index, newQuantity);
    };

    const handleNoteChange = (index, event) => {
        const newNote = event.target.value;
        onEditNote(index, newNote);
    };

    const handleProductChange = (index, event) => {
        const productId = parseInt(event.target.value);
        const updatedProducts = [...products];
        updatedProducts[index].productId = productId;
        fetchProductInWorkspace(selectedWorkspace);
        // Update the parent component with the updated products
        // (onDeleteProduct, onEditQuantity, onEditNote)
    };

    return (
        <table className="w-full border-collapse border border-gray-300 my-3">
            <thead>
                <tr className="bg-gray-100">
                    <th className="p-2">Tên sản phẩm</th>
                    <th className="p-2">Mô tả</th>
                    <th className="p-2">Số lượng</th>
                    <th className="p-2">Giá(vnd)</th>
                    <th className="p-2">Tổng cộng</th>
                    <th className="p-2">Ghi chú</th>
                    <th className="p-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) => {
                    const productData = product;
                    // const productDetail = productDetails.find(detail => detail.id === product.productId);
                    const selectedProduct = productList.find(item => item.id === product.productId);
                    const { price, description } = selectedProduct || {};
                    return (
                        <tr key={index} style={{ textAlign: "center", lineHeight: "4rem" }}>
                            <td >
                                <select
                                    value={productData.productId}
                                    onChange={(event) => handleProductChange(index, event)}
                                >
                                    <option value="">sản phẩm<meta httpEquiv="X-UA-Compatible" content="ie=edge" /></option>
                                    {productList.map((detail) => (
                                        <option key={detail.id} value={detail.id}>
                                            {detail.name}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>

                                {description}


                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={product.quantity}
                                    onChange={(event) => handleQuantityChange(index, event)}
                                />
                            </td>
                            <td>{price || 0}</td>
                            <td>{calculateTotal(product.quantity, price || 0)}</td>
                            <td>
                                <input
                                    type="text"
                                    value={product.description || ""}
                                    onChange={(event) => handleNoteChange(index, event)}
                                />
                            </td>
                            <td>
                                <button onClick={() => onDeleteProduct(index)}><span className='decoration-neutral-400 font-bold text-red-600'>Xóa</span></button>
                            </td>
                        </tr>
                    );
                })}
                <tr>
                    <td colSpan="7">
                        <button className="text-sky-600 font-bold text-2xl p-4" onClick={onAddProduct}>Thêm sản phẩm</button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default ProductTable;
