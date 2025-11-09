import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import './Profile.css';

axios.defaults.baseURL = 'http://localhost:5001/api';

const UploadAvatar = ({ onUploadSuccess }) => {
    const { user, token } = useAuth();
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(user?.avatar || '');
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setMessage({ type: 'error', text: 'Vui lòng chọn file ảnh!' });
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setMessage({ type: 'error', text: 'Kích thước ảnh không được vượt quá 5MB!' });
            return;
        }

        setSelectedFile(file);
        setMessage({ type: '', text: '' });

        // Preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setMessage({ type: 'error', text: 'Vui lòng chọn ảnh!' });
            return;
        }

        const formData = new FormData();
        formData.append('avatar', selectedFile);

        setUploading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await axios.post('/upload-avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            setMessage({ 
                type: 'success', 
                text: response.data.message || 'Upload avatar thành công!' 
            });

            // Callback to parent component
            if (onUploadSuccess && response.data.avatarUrl) {
                onUploadSuccess(response.data.avatarUrl);
            }

            setSelectedFile(null);

        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Upload thất bại. Vui lòng thử lại!'
            });
        } finally {
            setUploading(false);
        }
    };

    const handleRemovePreview = () => {
        setSelectedFile(null);
        setPreview(user?.avatar || '');
        setMessage({ type: '', text: '' });
    };

    return (
        <div className="upload-avatar-container">
            <h3>Ảnh Đại Diện</h3>

            <div className="avatar-preview">
                {preview ? (
                    <img src={preview} alt="Avatar" className="avatar-image" />
                ) : (
                    <div className="avatar-placeholder">
                        <span>Chưa có ảnh</span>
                    </div>
                )}
            </div>

            {message.text && (
                <div className={`alert ${message.type}`}>
                    {message.text}
                </div>
            )}

            <div className="upload-controls">
                <input
                    type="file"
                    id="avatar-input"
                    accept="image/*"
                    onChange={handleFileSelect}
                    disabled={uploading}
                    style={{ display: 'none' }}
                />
                
                <label htmlFor="avatar-input" className="btn-select-file">
                    📁 Chọn Ảnh
                </label>

                {selectedFile && (
                    <>
                        <button 
                            onClick={handleUpload} 
                            className="btn-upload"
                            disabled={uploading}
                        >
                            {uploading ? '⏳ Đang tải...' : '✓ Upload'}
                        </button>
                        <button 
                            onClick={handleRemovePreview} 
                            className="btn-cancel"
                            disabled={uploading}
                        >
                            ✕ Hủy
                        </button>
                    </>
                )}
            </div>

            <p className="upload-hint">
                Ảnh JPG, JPEG hoặc PNG. Tối đa 5MB.
            </p>
        </div>
    );
};

export default UploadAvatar;
