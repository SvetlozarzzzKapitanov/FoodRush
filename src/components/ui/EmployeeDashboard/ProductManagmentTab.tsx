import React, { useEffect, useState } from 'react';
import { Product } from '../../../types';
import {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from '../../../api/productApi';
import './ProductManagmentTab.css';

interface Props {
    restaurantId: number;
}

const ProductManagementTab: React.FC<Props> = ({ restaurantId }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [editId, setEditId] = useState<number | null>(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: 0,
        category: '',
        description: ''
    });

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const all = await getAllProducts();
                const filtered = all.filter(p => p.restaurantId === restaurantId);
                setProducts(filtered);
            } catch (err) {
                console.error('Failed to load products', err);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [restaurantId]);

    const updateProductField = (id: number, field: keyof Product, value: any) => {
        setProducts(prev =>
            prev.map(p => (p.id === id ? { ...p, [field]: value } : p))
        );
    };

    const handleUpdate = async (p: Product) => {
        try {
            const updated = await updateProduct(p.id, {
                ...p,
                category: p.category.toUpperCase(),
                restaurant: { id: restaurantId }
            });
            setProducts(prev =>
                prev.map(prod => (prod.id === p.id ? updated : prod))
            );
            setEditId(null);
        } catch (err) {
            console.error('Update failed', err);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteProduct(id);
            setProducts(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            console.error('Delete failed', err);
        }
    };

    const handleAdd = async () => {
        try {
            const payload = {
                name: newProduct.name || '',
                price: newProduct.price || 0,
                category: (newProduct.category || 'OTHER').toUpperCase(),
                description: newProduct.description || 'N/A',
                restaurant: { id: restaurantId }
            };

            const created = await createProduct(payload as unknown as Product);
            setProducts(prev => [...prev, created]);

            setNewProduct({
                name: '',
                price: 0,
                category: '',
                description: ''
            });

            setSuccessMessage('✅ Product added successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);

        } catch (err) {
            console.error('Create failed', err);
            alert('Failed to create product. See console for details.');
        }
    };


    return (
        <section className="product-management">
            <h3>Product Management</h3>
            {loading ? (
                <p>Loading products...</p>
            ) : (
                <>
                    {successMessage && <div className="success-message">{successMessage}</div>}
                    <div className="add-product-form">
                        <input
                            placeholder="New name"
                            value={newProduct.name}
                            onChange={e => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={newProduct.price || ''}
                            onChange={e => setNewProduct(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                        />
                        <input
                            placeholder="Category"
                            value={newProduct.category}
                            onChange={e => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                        />
                        <input
                            placeholder="Description"
                            value={newProduct.description}
                            onChange={e => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                        />
                        <button className="save" onClick={handleAdd}>Add</button>
                    </div>

                    {products.map(p => (
                        <div key={p.id} className="product-row">
                            {editId === p.id ? (
                                <>
                                    <input
                                        value={p.name}
                                        onChange={e => updateProductField(p.id, 'name', e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        value={p.price}
                                        onChange={e => updateProductField(p.id, 'price', parseFloat(e.target.value))}
                                    />
                                    <input
                                        value={p.category}
                                        onChange={e => updateProductField(p.id, 'category', e.target.value)}
                                    />
                                    <input
                                        value={p.description}
                                        onChange={e => updateProductField(p.id, 'description', e.target.value)}
                                    />
                                    <div className="product-actions">
                                        <button className="save" onClick={() => handleUpdate(p)}>Save</button>
                                        <button className="delete" onClick={() => setEditId(null)}>Cancel</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>{p.name}</div>
                                    <div>${p.price.toFixed(2)}</div>
                                    <div>{p.category}</div>
                                    <div>{p.description}</div>
                                    <div className="product-actions">
                                        <button className="edit" onClick={() => setEditId(p.id)}>Edit</button>
                                        <button className="delete" onClick={() => handleDelete(p.id)}>Delete</button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </>
            )}
        </section>
    );
};

export default ProductManagementTab;
