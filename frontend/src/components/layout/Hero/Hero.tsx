import React from 'react';
import { ShoppingBag, ShieldCheck, Sparkles, BookOpen, Laptop, HeartHandshake } from 'lucide-react';
import { useModalStore } from '../../../store/useModalStore';
import styles from './Hero.module.css';
import student from '../../../assets/studentA.png';
import university from '../../../assets/campos.webp';

export const Hero: React.FC = () => {
  const { openModal } = useModalStore();

  return (
    <section id="inicio" className={styles.hero} style={{ backgroundImage: `linear-gradient(rgba(0, 34, 102, 0.6), rgba(15, 23, 42, 0.9)), url(${university})` }}>
      <div className={styles.container}>
        <div>
          <div className={styles.badge}>
            <Sparkles size={16} />
            <span>Exclusivo para a Comunidade Universitária</span>
          </div>

          <h1 className={styles.title}>
            Desapegue, Venda ou <span className={styles.highlight}>Doe</span>. <br />
            O ciclo não para.
          </h1>

          <p className={styles.description}>
            O marketplace universitário onde você compra, vende e <strong>doa</strong> livros, calculadoras e equipamentos direto com colegas do seu campus, fomentando a economia circular e a inclusão.
          </p>

          <div className={styles.actions}>
            <a href="#vitrine" className={styles.btnPrimary}>
              <ShoppingBag size={20} />
              Explorar Vitrine
            </a>

            <button 
              className={styles.btnSecondary}
              onClick={() => openModal('register')}
            >
              <HeartHandshake size={20} />
              Quero Desapegar
            </button>
          </div>
        </div>
        
        {/* Container da Imagem com Widgets Flutuantes */}
        <div className={styles.illustration}>
          <div className={styles.imageWrapper}>
            
            {/* NOVO: Backdrop Futurista (Efeito Vidro) */}
            <div className={styles.glassBackdrop}></div>
            
            <img src={student} alt="Estudante" className={styles.studentImage} />
            
            {/* Widget Flutuante 1: Conexão Direta (Topo Esquerda) */}
            <div className={`${styles.floatingCard} ${styles.cardTop}`}>
              <ShieldCheck size={24} color="var(--primary)" />
              <div>
                <strong style={{ color: 'var(--text-primary)', fontSize: '0.9rem', display: 'block' }}>Conexão Direta</strong>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Via WhatsApp ou E-mail
                </p>
              </div>
            </div>

            {/* Widget Flutuante 2: Economia Circular (Base Direita) */}
            <div className={`${styles.floatingCard} ${styles.cardBottom}`}>
              <span className={styles.cardTag}>Impacto Social</span>
              <h4 style={{ marginTop: '0.4rem', marginBottom: '0.5rem', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                Apoie seus colegas
              </h4>
              <div className={styles.iconShowcase}>
                <BookOpen size={18} color="var(--primary)" />
                <Laptop size={18} color="var(--primary)" />
                <HeartHandshake size={18} color="var(--primary)" />
              </div>
            </div>

          </div>
        </div>
          
      </div>
    </section>
  );
};