import React, { useState, useEffect } from 'react';
import { X, Loader2, UploadCloud, Gift } from 'lucide-react';
import { useModalStore } from '../../store/useModalStore';
import { useAdStore } from '../../store/useAdStore';
import { api } from '../../services/api';
import type { Ad } from '../../types/Ad';
import styles from './Modal.module.css';

// 👇 1. Importação das constantes acadêmicas
import { ACADEMIC_CATEGORIES } from '../../constants/academicData';

// 👇 2. Filtra a opção 'Todos' para a lista do modal
const VALID_CATEGORIES = ACADEMIC_CATEGORIES.filter((category) => category !== 'Todos');

export const EditAdModal: React.FC = () => {
  const { activeModal, modalData, closeModal } = useModalStore();
  const { updateAd } = useAdStore();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isDonation, setIsDonation] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: VALID_CATEGORIES[0] || 'Livros & Apostilas',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const adToEdit = modalData as Ad;

  // Preenche os campos do formulário assim que o modal de edição abre
  useEffect(() => {
    if (activeModal === 'editAd' && adToEdit) {
      const priceNum = Number(adToEdit.price);
      const isZeroPrice = priceNum === 0;

      setFormData({
        title: adToEdit.title || '',
        description: adToEdit.description || '',
        price: adToEdit.price !== undefined && adToEdit.price !== null ? String(adToEdit.price) : '',
        category: adToEdit.category || VALID_CATEGORIES[0] || 'Livros & Apostilas',
      });
      
      setIsDonation(isZeroPrice);
      setImagePreview(adToEdit.image_url || '');
      setImageFile(null);
    }
  }, [activeModal, adToEdit]);

  if (activeModal !== 'editAd' || !adToEdit) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDonationToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsDonation(checked);
    setFormData((prev) => ({
      ...prev,
      price: checked ? '0' : '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const priceNumber = parseFloat(formData.price);
    
    if (isNaN(priceNumber) || priceNumber < 0) {
      setErrorMsg('Informe um valor numérico válido (maior ou igual a zero).');
      setLoading(false);
      return;
    }

    // Suporte para multipart/form-data caso uma nova imagem seja selecionada
    const uploadData = new FormData();
    uploadData.append('title', formData.title);
    uploadData.append('description', formData.description);
    uploadData.append('price', String(priceNumber));
    uploadData.append('category', formData.category);

    if (imageFile) {
      uploadData.append('image', imageFile);
    }

    try {
      const response = await api.put(`/ads/${adToEdit.id}`, uploadData);
      
      updateAd({ ...adToEdit, ...response.data });
      closeModal();
    } catch (error: any) {
      setErrorMsg(error.response?.data?.error || 'Erro ao atualizar anúncio.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={closeModal}>
          <X size={20} />
        </button>

        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Editar Anúncio</h2>
          <p className={styles.modalSubtitle}>Atualize as informações do seu item</p>
        </div>

        {errorMsg && (
          <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: 'var(--radius)', marginBottom: '1rem' }}>
            {errorMsg}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          
          {/* Seção de Foto com Preview da imagem atual */}
          <div className={styles.formGroup} style={{ textAlign: 'center' }}>
            <label className={styles.label}>Foto do Produto</label>
            <label 
              style={{
                display: 'block', border: '2px dashed #cbd5e1', borderRadius: '0.5rem', 
                padding: imagePreview ? '0' : '2rem', cursor: 'pointer', overflow: 'hidden', position: 'relative'
              }}
            >
              <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              ) : (
                <div style={{ color: '#64748b' }}>
                  <UploadCloud size={32} style={{ margin: '0 auto', marginBottom: '0.5rem' }} />
                  <span>Clique para alterar a foto do produto</span>
                </div>
              )}
            </label>
          </div>

          {/* Título */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Título do Anúncio</label>
            <input type="text" required className={styles.input} value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          </div>

          {/* Categoria */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Categoria</label>
            <select 
              className={styles.select} 
              value={formData.category} 
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {/* 👇 Renderização dinâmica das opções filtradas */}
              {VALID_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Preço e Opção de Doação */}
          <div className={styles.formGroup}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <label className={styles.label} style={{ margin: 0 }}>Preço (R$)</label>
              
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', fontSize: '0.85rem', color: '#10B981', fontWeight: 600 }}>
                <input 
                  type="checkbox" 
                  checked={isDonation} 
                  onChange={handleDonationToggle}
                  style={{ accentColor: '#10B981', cursor: 'pointer' }}
                />
                <Gift size={14} /> Quero doar este item
              </label>
            </div>

            <input 
              type="number" 
              step="0.01" 
              min="0"
              required 
              disabled={isDonation}
              className={styles.input} 
              value={formData.price} 
              onChange={(e) => setFormData({ ...formData, price: e.target.value })} 
              placeholder={isDonation ? "0.00 (Doação Gratuita)" : "0.00"}
              style={isDonation ? { backgroundColor: '#f1f5f9', color: '#64748b', cursor: 'not-allowed' } : {}}
            />
          </div>

          {/* Descrição Detalhada */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Descrição Detalhada</label>
            <textarea required className={styles.textarea} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          </div>

          <button type="submit" className={styles.btnSubmit} disabled={loading}>
            {loading ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : 'Salvar Alterações'}
          </button>
        </form>
      </div>
    </div>
  );
};