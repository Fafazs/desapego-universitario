import React from 'react';
import { MessageCircle, Lock, User, GraduationCap } from 'lucide-react';
import type { Ad } from '../../../types/ad';
import { useAuthStore } from '../../../store/useAuthStore';
import { useModalStore } from '../../../store/useModalStore';
import styles from './AdCard.module.css';

interface AdCardProps {
  ad: Ad;
}

export const AdCard: React.FC<AdCardProps> = ({ ad }) => {
  const { user } = useAuthStore();
  const { openModal } = useModalStore();

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(ad.price);

  const whatsappUrl = `https://wa.me/55${ad.user_whatsapp}?text=${encodeURIComponent(
    `Olá ${ad.user_name || 'vendedor'}, vi seu anúncio "${ad.title}" no Desapego Universitário e tenho interesse!`
  )}`;

  // Função para abrir os detalhes expandidos
  const handleCardClick = () => {
    openModal('adDetail', ad);
  };

  return (
    <div className={styles.card} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
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
        <div className={styles.price}>{formattedPrice}</div>
        <p className={styles.description}>{ad.description}</p>

        <div className={styles.sellerInfo}>
          <span className={styles.sellerName}>
            <User size={14} />
            {ad.user_name || 'Estudante'}
          </span>
          {ad.user_course && (
            <span className={styles.sellerCourse}>
              <GraduationCap size={12} style={{ display: 'inline', marginRight: 4 }} />
              {ad.user_course}
            </span>
          )}
        </div>

        {/* Impede a propagação do clique do card para o botão */}
        {user ? (
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
            title="Faça login para contatar o vendedor"
          >
            <Lock size={16} />
            Login para ver contato
          </button>
        )}
      </div>
    </div>
  );
};