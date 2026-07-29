import React, { useState } from 'react';
import { X, Loader2, UploadCloud, Gift } from 'lucide-react';
import { useModalStore } from '../../store/useModalStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useAdStore } from '../../store/useAdStore';
import { api } from '../../services/api';
import type { Ad } from '../../types/Ad';
import styles from './Modal.module.css';

export const CreateAdModal: React.FC = () => {
  const { activeModal, closeModal } = useModalStore();
  const { user } = useAuthStore();
  const { addAd } = useAdStore();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isDonation, setIsDonation] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Livros',
  });
  
  // Novos estados para o arquivo físico e o preview visual na tela
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  if (activeModal !== 'createAd') return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      // Cria uma URL local apenas para o preview visual antes de enviar
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
    
    // PERMITE VALOR 0 (DOAÇÃO) - Só bloqueia se for menor que 0 ou NaN
    if (isNaN(priceNumber) || priceNumber < 0) {
      setErrorMsg('Informe um valor numérico válido (maior ou igual a zero).');
      setLoading(false);
      return;
    }

    // Criando um FormData para suportar envio de arquivo físico
    const uploadData = new FormData();
    uploadData.append('title', formData.title);
    uploadData.append('description', formData.description);
    uploadData.append('price', String(priceNumber));
    uploadData.append('category', formData.category);
    
    if (imageFile) {
      uploadData.append('image', imageFile); // Nome 'image' precisa ser igual ao do multer
    }

    try {
      // Faz o POST passando o FormData. O Axios entende sozinho e coloca o Content-Type correto
      const response = await api.post('/ads', uploadData);
      
      const createdAd: Ad = {
        ...response.data,
        seller_name: user?.name,
        seller_whatsapp: user?.whatsapp,
        user_course: user?.course,
      };

      addAd(createdAd);
      
      // Limpa os dados
      setFormData({ title: '', description: '', price: '', category: 'Livros' });
      setImageFile(null);
      setImagePreview('');
      setIsDonation(false);
      
      closeModal();
    } catch (error: any) {
      setErrorMsg(error.response?.data?.error || 'Erro ao publicar anúncio. Tente novamente.');
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
          <h2 className={styles.modalTitle}>Desapegar de um Item</h2>
          <p className={styles.modalSubtitle}>Publique para os estudantes do seu campus verem</p>
        </div>

        {errorMsg && (
          <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: 'var(--radius)', marginBottom: '1rem' }}>
            {errorMsg}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          
          {/* Seção de Upload de Imagem */}
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
                  <span>Clique para anexar uma foto real do produto</span>
                </div>
              )}
            </label>
          </div>

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

          {/* Opção de Doação + Preço */}
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

          <div className={styles.formGroup}>
            <label className={styles.label}>Descrição Detalhada</label>
            <textarea required className={styles.textarea} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          </div>

          <button type="submit" className={styles.btnSubmit} disabled={loading}>
            {loading ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : 'Publicar Anúncio Agora'}
          </button>
        </form>
      </div>
    </div>
  );
};