import React, { useState } from 'react';
import './Modal.css';

const ConcentrationModal = ({ onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        level: '',
        unit: 'mcg/mL',
        time: '',
        date: new Date().toISOString().split('T')[0],
        type: 'Trough',
        notes: ''
    });

    const [error, setError] = useState('');

    const units = ['mcg/mL', 'mg/L', 'ng/mL', 'mmol/L'];
    const types = ['Trough', 'Peak', 'Random'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.level || !formData.time || !formData.date) {
            setError('Vui lòng điền đầy đủ thông tin bắt buộc');
            return;
        }

        // Validate time format (HH:MM)
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(formData.time)) {
            setError('Vui lòng nhập thời gian đúng định dạng (VD: 08:30)');
            return;
        }

        onAdd(formData);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Thêm nồng độ thuốc</h3>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Nồng độ *</label>
                            <input
                                type="number"
                                name="level"
                                value={formData.level}
                                onChange={handleInputChange}
                                step="0.1"
                                min="0"
                                required
                                placeholder="VD: 15.5"
                            />
                        </div>

                        <div className="form-group">
                            <label>Đơn vị *</label>
                            <select
                                name="unit"
                                value={formData.unit}
                                onChange={handleInputChange}
                                required
                            >
                                {units.map((unit) => (
                                    <option key={unit} value={unit}>
                                        {unit}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Thời gian *</label>
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Ngày *</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Loại mẫu</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                        >
                            {types.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Ghi chú</label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            rows="3"
                            placeholder="Ghi chú thêm về nồng độ..."
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-secondary" onClick={onClose}>
                            Hủy
                        </button>
                        <button type="submit" className="btn-primary">
                            Thêm nồng độ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ConcentrationModal;
