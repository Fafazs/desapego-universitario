import React from 'react';
import { PlusCircle, Sparkles } from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore';
import { useModalStore } from '../../../store/useModalStore';
import studentLog from '../../../assets/studentLog.png';
import styles from './WelcomeHero.module.css';

export const WelcomeHero: React.FC = () => {
  const { user } = useAuthStore();
  const { openModal } = useModalStore();
  
  // Pega apenas o primeiro nome para ficar mais amigável
  const firstName = user?.name?.split(' ')[0] || 'Estudante';

  return (
    <section className={styles.welcomeHero} id="inicio">
      <div className={styles.container}>
        
        {/* Lado Esquerdo: Textos e Botões */}
        <div className={styles.textContent}>
          <div className={styles.badge}>
            <Sparkles size={16} />
            <span>Área do Aluno</span>
          </div>

          <h1 className={styles.title}>
            Seja bem-vindo, <span className={styles.highlight}>{firstName}</span>!
          </h1>

          <p className={styles.description}>
            Explore os itens recém-adicionados no campus ou aproveite para desapegar daquilo que você não usa mais.
          </p>

          <div className={styles.actions}>
            <button 
              className={styles.btnPrimary} 
              onClick={() => openModal('createAd')}
            >
              <PlusCircle size={20} />
              Desapegar Agora
            </button>
          </div>
        </div>

        {/* Lado Direito: Ilustração */}
        <div className={styles.imageContent}>
          
          {/* NOVO: Efeito de vidro focado na base */}
          <div className={styles.glassBackdrop}></div>

          <img 
            src={studentLog} 
            alt="Ilustração de um estudante" 
            className={styles.studentImage}
          />
        </div>

      </div>
    </section>
  );
};