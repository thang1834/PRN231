import React, { useState, useEffect } from 'react';

const Modal = ({ visible, onClose, payment, statusModal, onCreate, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: '',
        amount: 0,
        description: '',
        userId: 0, // Chỉ cần cho tạo mới
    });

    useEffect(() => {
        if (statusModal === 'update' && payment) {
            setFormData({
                name: payment.name,
                amount: payment.amount,
                description: payment.description,
                // Không cần userId cho cập nhật
            });
        }
    }, [payment, statusModal]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (statusModal === 'create') {
            onCreate(formData);
        } else if (statusModal === 'update') {
            onUpdate({ ...formData, id: payment.id });
        }
    };

    if (!visible) return null;

    return (
        <div className="modal">
            {/* Modal content */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Amount"
                    required
                />
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                />
                {statusModal === 'create' && (
                    <input
                        type="number"
                        name="userId"
                        value={formData.userId}
                        onChange={handleChange}
                        placeholder="User ID"
                        required
                    />
                )}
                <button type="submit">Submit</button>
            </form>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default Modal;
