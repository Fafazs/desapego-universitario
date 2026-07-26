import React from 'react';
import { X, MessageCircle, Lock, User, GraduationCap } from 'lucide-react';
import { useModalStore } from '../../store/useModalStore';
import { useAuthStore } from '../../store/useAuthStore';
import styles from './Modal.module.css';

export const AdDetailModal: React.FC = () => {
  const { activeModal, selectedAd, closeModal, openModal } = useModalStore();
  const { user } = useAuthStore();

  if (activeModal !== 'adDetail' || !selectedAd) return null;

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(selectedAd.price);

  const whatsappUrl = `https://wa.me/55${selectedAd.user_whatsapp}?text=${encodeURIComponent(
    `Olá ${selectedAd.user_name || 'vendedor'}, vi seu anúncio "${selectedAd.title}" no Desapego Universitário e tenho interesse!`
  )}`;

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={closeModal}>
          <X size={20} />
        </button>

        <div className={styles.detailGrid}>
          <img 
            src={selectedAd.image_url || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500'} 
            alt={selectedAd.title} 
            className={styles.detailImage}
          />

          <div className={styles.detailInfo}>
            <span className={styles.badge}>{selectedAd.category}</span>
            <h2 className={styles.title}>{selectedAd.title}</h2>
            <div className={styles.price}>{formattedPrice}</div>
            
            <p className={styles.description}>{selectedAd.description}</p>

            <div className={styles.sellerBox}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                <User size={16} />
                <strong>{selectedAd.user_name || 'Estudante'}</strong>
              </div>
              {selectedAd.user_course && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <GraduationCap size={14} color="var(--primary)" />
                  <span>{selectedAd.user_course}</span>
                </div>
              )}
            </div>

            {user ? (
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.btnWhatsapp}
                style={{
                  backgroundColor: 'var(--secondary)',
                  color: 'white',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius)',
                  textAlign: 'center',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <MessageCircle size={20} />
                Conversar no WhatsApp
              </a>
            ) : (
              <button 
                onClick={() => openModal('login')}
                style={{
                  backgroundColor: 'var(--bg-main)',
                  border: '1px dashed var(--text-secondary)',
                  color: 'var(--text-secondary)',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  width: '100%'
                }}
              >
                <Lock size={18} />
                Faça login para ver o contato
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};