import React from 'react';
import { ShoppingBag, ShieldCheck, Sparkles } from 'lucide-react';
import { useModalStore } from '../../../store/useModalStore';
import styles from './Hero.module.css';

export const Hero: React.FC = () => {
  const { openModal } = useModalStore();

  return (
    <section id="inicio" className={styles.hero}>
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

        {/* Card Ilustrativo simulando a proposta de valor */}
        <div className={styles.illustration}>
          <div className={styles.cardPreview}>
            <div className={styles.cardHeader}>
              <ShieldCheck size={28} color="var(--secondary)" />
              <div>
                <strong>Conexão Direta</strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Negocie direto pelo WhatsApp
                </p>
              </div>
            </div>
            
            <div style={{
              background: '#f3f4f6', 
              height: '130px', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '1rem 0'
            }}>
              <span style={{ fontSize: '2.5rem' }}>📚 💻 🔬</span>
            </div>

            <span className={styles.cardTag}>Economia Circular</span>
            <h4 style={{ marginTop: '0.5rem', color: 'var(--text-primary)' }}>
              Apoie os colegas do seu próprio curso
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
};