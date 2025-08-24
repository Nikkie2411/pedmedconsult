import React, { useState } from 'react';
import './Modal.css';

const DoseModal = ({ onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        singleDose: '', // Liều 1 lần
        interval: '', // Khoảng đưa liều (giờ)
        infusionTime: '', // Thời gian truyền (phút)
        date: new Date().toISOString().split('T')[0], // Ngày đưa liều
        time: '', // Giờ đưa liều
        createMultiple: false, // Tạo nhiều liều
        numberOfDoses: '' // Số liều (nếu tạo nhiều)
    });

    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const validateTime = (dateStr, timeStr, creatinineDateTime) => {
        if (!creatinineDateTime) return true; // Nếu không có SCr thì không cần validate
        
        const doseDateTime = new Date(`${dateStr}T${timeStr}`);
        const creatDateTime = new Date(creatinineDateTime);
        
        return doseDateTime >= creatDateTime;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.singleDose || !formData.interval || !formData.infusionTime || !formData.date || !formData.time) {
            setError('Vui lòng điền đầy đủ thông tin bắt buộc');
            return;
        }

        if (formData.createMultiple && (!formData.numberOfDoses || formData.numberOfDoses < 1)) {
            setError('Vui lòng nhập số liều hợp lệ (ít nhất 1)');
            return;
        }

        // TODO: Validate thời gian liều vs SCr time
        // Sẽ cần truyền creatinine datetime từ parent component

        const doses = [];
        const numberOfDoses = formData.createMultiple ? parseInt(formData.numberOfDoses) : 1;
        
        for (let i = 0; i < numberOfDoses; i++) {
            const doseDateTime = new Date(`${formData.date}T${formData.time}`);
            doseDateTime.setHours(doseDateTime.getHours() + (i * parseInt(formData.interval)));
            
            doses.push({
                singleDose: formData.singleDose,
                interval: formData.interval,
                infusionTime: formData.infusionTime,
                date: doseDateTime.toISOString().split('T')[0],
                time: doseDateTime.toTimeString().slice(0, 5),
                doseNumber: i + 1
            });
        }

        onAdd(doses);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Thêm liều dùng thuốc</h3>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Liều 1 lần (mg) *</label>
                        <input
                            type="number"
                            name="singleDose"
                            value={formData.singleDose}
                            onChange={handleInputChange}
                            step="0.1"
                            min="0"
                            required
                            placeholder="VD: 250"
                        />
                    </div>

                    <div className="form-group">
                        <label>Khoảng đưa liều (giờ) *</label>
                        <input
                            type="number"
                            name="interval"
                            value={formData.interval}
                            onChange={handleInputChange}
                            step="1"
                            min="1"
                            required
                            placeholder="VD: 8"
                        />
                    </div>

                    <div className="form-group">
                        <label>Thời gian truyền (phút) *</label>
                        <input
                            type="number"
                            name="infusionTime"
                            value={formData.infusionTime}
                            onChange={handleInputChange}
                            step="1"
                            min="1"
                            required
                            placeholder="VD: 30"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Ngày đưa liều *</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Giờ đưa liều *</label>
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                name="createMultiple"
                                checked={formData.createMultiple}
                                onChange={handleInputChange}
                            />
                            Tạo nhiều liều
                        </label>
                    </div>

                    {formData.createMultiple && (
                        <div className="form-group">
                            <label>Số liều cần tạo *</label>
                            <input
                                type="number"
                                name="numberOfDoses"
                                value={formData.numberOfDoses}
                                onChange={handleInputChange}
                                min="1"
                                max="20"
                                required
                                placeholder="VD: 5"
                            />
                            <small className="form-note">
                                Các liều tiếp theo sẽ được tính tự động dựa trên khoảng đưa liều
                            </small>
                        </div>
                    )}

                    <div className="modal-actions">
                        <button type="button" className="btn-secondary" onClick={onClose}>
                            Hủy
                        </button>
                        <button type="submit" className="btn-primary">
                            Lưu liều
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DoseModal;
