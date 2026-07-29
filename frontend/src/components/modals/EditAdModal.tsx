import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useModalStore } from '../../store/useModalStore';
import { useAdStore } from '../../store/useAdStore';
import { api } from '../../services/api';
import type { Ad } from '../../types/ad'; // <-- IMPORTANTE: Importamos a tipagem Ad
import styles from './Modal.module.css';

export const EditAdModal: React.FC = () => {
  const { activeModal, modalData, closeModal } = useModalStore();
  const { updateAd } = useAdStore();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Livros',
    image_url: '',
  });

  // Convertemos o modalData para o tipo Ad para o TypeScript parar de reclamar
  const adToEdit = modalData as Ad;

  useEffect(() => {
    if (activeModal === 'editAd' && adToEdit) {
      setFormData({
        title: adToEdit.title || '',
        description: adToEdit.description || '',
        price: adToEdit.price ? String(adToEdit.price) : '',
        category: adToEdit.category || 'Livros',
        image_url: adToEdit.image_url || '',
      });
    }
  }, [activeModal, adToEdit]);

  if (activeModal !== 'editAd' || !adToEdit) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const priceNumber = parseFloat(formData.price);
    
    const payload = {
      title: formData.title,
      description: formData.description,
      price: priceNumber,
      category: formData.category,
      image_url: formData.image_url,
    };

    try {
      const response = await api.put(`/ads/${adToEdit.id}`, payload);
      
      // Atualiza a tela mantendo os dados do vendedor e sobrescrevendo os dados editados
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
          <div className={styles.formGroup}>
            <label className={styles.label}>Título do Anúncio</label>
            <input type="text" required className={styles.input} value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Categoria</label>
            <select className={styles.select} value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
              <option value="Livros">Livros</option>
              <option value="Eletrônicos">Eletrônicos</option>
              <option value="Móveis">Móveis</option>
              <option value="Materiais">Materiais</option>
              <option value="Outros">Outros</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Preço (R$)</label>
            <input type="number" step="0.01" required className={styles.input} value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>URL da Imagem</label>
            <input type="url" className={styles.input} value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} />
          </div>

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