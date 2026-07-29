import React, { useState } from 'react';
import { MessageCircle, Lock, User, GraduationCap, Trash2, Edit } from 'lucide-react';
import type { Ad } from '../../../types/ad';
import { useAuthStore } from '../../../store/useAuthStore';
import { useModalStore } from '../../../store/useModalStore';
import { useAdStore } from '../../../store/useAdStore';
import { api } from '../../../services/api';
import styles from './AdCard.module.css';

interface AdCardProps {
  ad: Ad;
}

export const AdCard: React.FC<AdCardProps> = ({ ad }) => {
  const { user } = useAuthStore();
  const { openModal } = useModalStore();
  const { removeAd } = useAdStore();
  const [isDeleting, setIsDeleting] = useState(false);

  // Verifica se o usuário logado é o dono do anúncio
  const isOwner = user?.id === ad.user_id;
  
  // VERIFICAÇÃO DE DOAÇÃO
  const isDonation = Number(ad.price) === 0;

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(ad.price);

  const whatsappUrl = `https://wa.me/55${ad.seller_whatsapp}?text=${encodeURIComponent(
    `Olá ${ad.seller_name || 'vendedor'}, vi seu anúncio "${ad.title}" no Desapego Universitário e tenho interesse!`
  )}`;

  const handleCardClick = () => {
    openModal('adDetail', ad);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Tem certeza que deseja excluir este anúncio?')) return;

    setIsDeleting(true);
    try {
      await api.delete(`/ads/${ad.id}`);
      removeAd(ad.id);
    } catch (error) {
      alert('Erro ao excluir anúncio.');
      setIsDeleting(false);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    openModal('editAd', ad);
  };

  return (
    <div className={styles.card} onClick={handleCardClick} style={{ cursor: 'pointer', position: 'relative', opacity: isDeleting ? 0.5 : 1 }}>
      
      {isOwner && (
        <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '0.5rem', zIndex: 10 }}>
          <button 
            onClick={handleEdit}
            style={{ background: 'white', border: 'none', padding: '0.4rem', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
          >
            <Edit size={16} color="var(--primary)" />
          </button>
          <button 
            onClick={handleDelete}
            style={{ background: 'white', border: 'none', padding: '0.4rem', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
            disabled={isDeleting}
          >
            <Trash2 size={16} color="var(--danger, #dc2626)" />
          </button>
        </div>
      )}

      <div className={styles.imageContainer}>
        <img 
          src={ad.image_url || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500'} 
          alt={ad.title} 
          className={styles.image} 
        />
        <span className={styles.categoryTag}>{ad.category}</span>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{ad.title}</h3>
        
        {/* Lógica condicional de Doação aplicada aqui */}
        {isDonation ? (
          <div className={styles.donationBadge}>DOAÇÃO</div>
        ) : (
          <div className={styles.price}>{formattedPrice}</div>
        )}
        
        <p className={styles.description}>{ad.description}</p>

        <div className={styles.sellerInfo}>
          <span className={styles.sellerName}>
            <User size={14} />
            {ad.seller_name || 'Você'}
          </span>
          {ad.user_course && (
            <span className={styles.sellerCourse}>
              <GraduationCap size={12} style={{ display: 'inline', marginRight: 4 }} />
              {ad.user_course}
            </span>
          )}
        </div>

        {!isOwner && (
          user ? (
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.btnWhatsapp}
              onClick={(e) => e.stopPropagation()}
            >
              <MessageCircle size={18} />
              Chamar no WhatsApp
            </a>
          ) : (
            <button 
              className={styles.btnLocked}
              onClick={(e) => {
                e.stopPropagation();
                openModal('login');
              }}
            >
              <Lock size={16} />
              Login para ver contato
            </button>
          )
        )}
      </div>
    </div>
  );
};