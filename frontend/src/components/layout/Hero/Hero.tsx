import React from 'react';
import { ShoppingBag, ShieldCheck, Sparkles } from 'lucide-react';
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
            Desapegue do que não usa. <br />
            Encontre o que <span className={styles.highlight}>precisa</span>.
          </h1>

          <p className={styles.description}>
            O marketplace universitário seguro onde você compra e vende livros, calculadoras, móveis e eletrônicos direto com colegas do seu próprio campus.
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
              Cadastre-se Grátis
            </button>
          </div>
        </div>
         {/* Container da Imagem com Widgets Flutuantes */}
        <div className={styles.illustration}>
          <div className={styles.imageWrapper}>
            
            {/* Fundo decorativo para destacar o estudante */}
            <div className={styles.imageBackdrop}></div>
            
            <img src={student} alt="Estudante" className={styles.studentImage} />
            
            {/* Widget Flutuante 1: Conexão Direta (Topo Esquerda) */}
            <div className={`${styles.floatingCard} ${styles.cardTop}`}>
              <ShieldCheck size={24} color="var(--primary)" />
              <div>
                <strong style={{ color: 'var(--text-primary)', fontSize: '0.9rem', display: 'block' }}>Conexão Direta</strong>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Negocie pelo WhatsApp
                </p>
              </div>
            </div>

            {/* Widget Flutuante 2: Economia Circular (Base Direita) */}
            <div className={`${styles.floatingCard} ${styles.cardBottom}`}>
              <span className={styles.cardTag}>Economia Circular</span>
              <h4 style={{ marginTop: '0.4rem', marginBottom: '0.5rem', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                Apoie colegas do curso
              </h4>
              <div className={styles.iconShowcase}>
                <span style={{ fontSize: '1.25rem' }}>📚 💻 🔬</span>
              </div>
            </div>

          </div>
        </div>
         
      </div>
    </section>
  );
};