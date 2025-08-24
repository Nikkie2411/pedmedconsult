import React, { useState } from 'react';
import DoseModal from '../components/DoseModal';
import ConcentrationModal from '../components/ConcentrationModal';
import './NewRequestPage.css';

const NewRequestPage = ({ onBack }) => {
    const [formData, setFormData] = useState({
        createdDate: new Date().toISOString().split('T')[0], // Ngày khởi tạo mặc định hôm nay
        patientName: '',
        gender: '',
        dob: '',
        patientCode: '',
        contactEmail: '',
        department: '',
        weight: '',
        height: '',
        isICU: false, // ICU (Có/Không)
        isNewborn: false,
        gestationalAge: '',
        correctedAge: '',
        birthWeight: '', // Cân nặng khi sinh (cho trẻ sơ sinh)
        isObese: false, // Béo phì (Có/Không)
        hasCancer: false, // Ung thư (Có/Không)
        drugName: '',
        indication: '',
        creatinine: '', // Giá trị creatinine
        creatinineDate: '', // Ngày đo creatinine
        creatinineTime: '', // Giờ đo creatinine
        doctorName: '', // Họ tên bác sĩ
        doctorPhone: '', // SĐT bác sĩ
        doctorEmail: '', // Email bác sĩ
        additionalInfo: '',
        ageDays: '',
        bun: '',
        clinicalHistory: ''
    });

    const [doses, setDoses] = useState([]);
    const [concentrations, setConcentrations] = useState([]);
    const [showDoseModal, setShowDoseModal] = useState(false);
    const [showConcentrationModal, setShowConcentrationModal] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const departments = [
        'Nhi khoa',
        'Nội tiết',
        'Tim mạch',
        'Thận',
        'Hồi sức cấp cứu',
        'Sơ sinh'
    ];

    const pharmacists = [
        'DS. Nguyễn Văn A',
        'DS. Trần Thị B',
        'DS. Lê Văn C',
        'DS. Phạm Thị D'
    ];

    const drugs = [
        'Vancomycin',
        'Digoxin',
        'Theophylline',
        'Phenytoin',
        'Carbamazepine',
        'Lithium'
    ];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', { ...formData, doses, concentrations });
        // Ở đây sẽ gọi API để lưu dữ liệu
        alert('Yêu cầu TDM đã được tạo thành công!');
        onBack();
    };

    const addDose = (doses) => {
        // doses có thể là array (nhiều liều) hoặc single object (1 liều)
        const dosesToAdd = Array.isArray(doses) ? doses : [doses];
        
        dosesToAdd.forEach(dose => {
            setDoses(prev => [...prev, { ...dose, id: Date.now() + Math.random() }]);
        });
        
        setShowDoseModal(false);
    };

    const removeDose = (id) => {
        setDoses(prev => prev.filter(dose => dose.id !== id));
    };

    const addConcentration = (concentration) => {
        setConcentrations(prev => [...prev, { ...concentration, id: Date.now() }]);
        setShowConcentrationModal(false);
    };

    const removeConcentration = (id) => {
        setConcentrations(prev => prev.filter(conc => conc.id !== id));
    };

    return (
        <div className="new-request-page">
            <div className="header">
                <button className="back-button" onClick={onBack}>
                    ← Quay lại
                </button>
                <h1>Tạo yêu cầu TDM mới</h1>
            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="request-form">
                {/* General Information */}
                <div className="form-section">
                    <h3>Thông tin chung</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Ngày khởi tạo *</label>
                            <input
                                type="date"
                                name="createdDate"
                                value={formData.createdDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Khoa *</label>
                            <select
                                name="department"
                                value={formData.department}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Chọn khoa</option>
                                {departments.map((dept, index) => (
                                    <option key={index} value={dept}>
                                        {dept}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Patient Information */}
                <div className="form-section">
                    <h3>Thông tin bệnh nhân</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Tên bệnh nhân *</label>
                            <input
                                type="text"
                                name="patientName"
                                value={formData.patientName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Mã bệnh nhân *</label>
                            <input
                                type="text"
                                name="patientCode"
                                value={formData.patientCode}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Giới tính *</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Chọn giới tính</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Ngày sinh *</label>
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Cân nặng (kg)</label>
                            <input
                                type="number"
                                name="weight"
                                value={formData.weight}
                                onChange={handleInputChange}
                                step="0.1"
                            />
                        </div>

                        <div className="form-group">
                            <label>Chiều cao (cm)</label>
                            <input
                                type="number"
                                name="height"
                                value={formData.height}
                                onChange={handleInputChange}
                                step="0.1"
                            />
                        </div>
                    </div>

                    {/* Condition checkboxes */}
                    <div className="form-grid">
                        <div className="form-group checkbox-group">
                            <label>
                                <input
                                    type="checkbox"
                                    name="isICU"
                                    checked={formData.isICU}
                                    onChange={handleInputChange}
                                />
                                ICU
                            </label>
                        </div>

                        <div className="form-group checkbox-group">
                            <label>
                                <input
                                    type="checkbox"
                                    name="isNewborn"
                                    checked={formData.isNewborn}
                                    onChange={handleInputChange}
                                />
                                Sơ sinh
                            </label>
                        </div>

                        <div className="form-group checkbox-group">
                            <label>
                                <input
                                    type="checkbox"
                                    name="isObese"
                                    checked={formData.isObese}
                                    onChange={handleInputChange}
                                />
                                Béo phì
                            </label>
                        </div>

                        <div className="form-group checkbox-group">
                            <label>
                                <input
                                    type="checkbox"
                                    name="hasCancer"
                                    checked={formData.hasCancer}
                                    onChange={handleInputChange}
                                />
                                Ung thư
                            </label>
                        </div>
                    </div>

                    {/* Newborn specific fields */}
                    {formData.isNewborn && (
                        <div className="newborn-section">
                            <h4>Thông tin trẻ sơ sinh</h4>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Tuổi thai (tuần)</label>
                                    <input
                                        type="number"
                                        name="gestationalAge"
                                        value={formData.gestationalAge}
                                        onChange={handleInputChange}
                                        step="0.1"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Tuổi hiệu chỉnh (tuần)</label>
                                    <input
                                        type="number"
                                        name="correctedAge"
                                        value={formData.correctedAge}
                                        onChange={handleInputChange}
                                        step="0.1"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Cân nặng khi sinh (kg)</label>
                                    <input
                                        type="number"
                                        name="birthWeight"
                                        value={formData.birthWeight}
                                        onChange={handleInputChange}
                                        step="0.1"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="form-grid">
                        <div className="form-group">
                            <label>Tuổi (ngày)</label>
                            <input
                                type="number"
                                name="ageDays"
                                value={formData.ageDays}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>BUN (mg/dL)</label>
                            <input
                                type="number"
                                name="bun"
                                value={formData.bun}
                                onChange={handleInputChange}
                                step="0.1"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Tiền sử bệnh lý</label>
                        <textarea
                            name="clinicalHistory"
                            value={formData.clinicalHistory}
                            onChange={handleInputChange}
                            rows="3"
                        />
                    </div>
                </div>

                {/* Creatinine Information */}
                <div className="form-section">
                    <h3>Thông tin Creatinine</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Giá trị Creatinine (mg/dL)</label>
                            <input
                                type="number"
                                name="creatinine"
                                value={formData.creatinine}
                                onChange={handleInputChange}
                                step="0.1"
                            />
                        </div>
                        <div className="form-group">
                            <label>Ngày đo Creatinine</label>
                            <input
                                type="date"
                                name="creatinineDate"
                                value={formData.creatinineDate}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Giờ đo Creatinine</label>
                            <input
                                type="time"
                                name="creatinineTime"
                                value={formData.creatinineTime}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Doctor Information */}
                <div className="form-section">
                    <h3>Thông tin bác sĩ</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Họ tên bác sĩ *</label>
                            <input
                                type="text"
                                name="doctorName"
                                value={formData.doctorName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Số điện thoại bác sĩ *</label>
                            <input
                                type="tel"
                                name="doctorPhone"
                                value={formData.doctorPhone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email bác sĩ *</label>
                            <input
                                type="email"
                                name="doctorEmail"
                                value={formData.doctorEmail}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Drug Information */}
                <div className="form-section">
                    <h3>Thông tin thuốc TDM</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Thuốc cần TDM *</label>
                            <select
                                name="drugName"
                                value={formData.drugName}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Chọn thuốc</option>
                                {drugs.map((drug, index) => (
                                    <option key={index} value={drug}>
                                        {drug}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Chỉ định</label>
                            <input
                                type="text"
                                name="indication"
                                value={formData.indication}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Thông tin bổ sung</label>
                        <textarea
                            name="additionalInfo"
                            value={formData.additionalInfo}
                            onChange={handleInputChange}
                            rows="3"
                            placeholder="Nhập thêm thông tin cần thiết về bệnh nhân hoặc yêu cầu tư vấn..."
                        />
                    </div>
                </div>

                {/* Dose Management */}
                <div className="form-section">
                    <div className="section-header">
                        <h3>Liều dùng thuốc</h3>
                        <button
                            type="button"
                            className="btn-add"
                            onClick={() => setShowDoseModal(true)}
                        >
                            + Thêm liều
                        </button>
                    </div>

                    {doses.length > 0 && (
                        <div className="dose-list">
                            {doses.map((dose) => (
                                <div key={dose.id} className="dose-item">
                                    <span>
                                        Liều {dose.doseNumber || 1}: {dose.singleDose}mg - 
                                        Truyền {dose.infusionTime}p - 
                                        Khoảng cách {dose.interval}h - 
                                        {dose.time} ({dose.date})
                                    </span>
                                    <button
                                        type="button"
                                        className="btn-remove"
                                        onClick={() => removeDose(dose.id)}
                                    >
                                        Xóa
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Concentration Management */}
                <div className="form-section">
                    <div className="section-header">
                        <h3>Nồng độ thuốc</h3>
                        <button
                            type="button"
                            className="btn-add"
                            onClick={() => setShowConcentrationModal(true)}
                        >
                            + Thêm nồng độ
                        </button>
                    </div>

                    {concentrations.length > 0 && (
                        <div className="concentration-list">
                            {concentrations.map((conc) => (
                                <div key={conc.id} className="concentration-item">
                                    <span>
                                        {conc.level} {conc.unit} vào {conc.time} ({conc.date})
                                        {conc.type && ` - ${conc.type}`}
                                    </span>
                                    <button
                                        type="button"
                                        className="btn-remove"
                                        onClick={() => removeConcentration(conc.id)}
                                    >
                                        Xóa
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Submit button */}
                <div className="form-actions">
                    <button
                        type="submit"
                        className="btn-submit"
                        disabled={loading}
                    >
                        {loading ? 'Đang tạo...' : 'Tạo yêu cầu'}
                    </button>
                </div>
            </form>

            {/* Modals */}
            {showDoseModal && (
                <DoseModal
                    onClose={() => setShowDoseModal(false)}
                    onAdd={addDose}
                />
            )}

            {showConcentrationModal && (
                <ConcentrationModal
                    onClose={() => setShowConcentrationModal(false)}
                    onAdd={addConcentration}
                />
            )}
        </div>
    );
};

export default NewRequestPage;

