import React from 'react';
import { ShoppingBag, Coins, Users, Recycle } from 'lucide-react';
import styles from './Stats.module.css';

const STATS_DATA = [
  {
    icon: <ShoppingBag size={28} strokeWidth={1.5} />,
    number: '+500',
    description: 'Anúncios de livros, eletrônicos e materiais publicados pela nossa comunidade todos os dias.',
  },
  {
    icon: <Coins size={28} strokeWidth={1.5} />,
    number: 'R$ 18 mil+',
    description: 'Reais economizados pelos alunos ao optarem por comprar itens seminovos no próprio campus.',
  },
  {
    icon: <Users size={28} strokeWidth={1.5} />,
    number: '+1.200',
    description: 'Estudantes conectados, negociando de forma segura e prática dentro da própria universidade.',
  },
  {
    icon: <Recycle size={28} strokeWidth={1.5} />,
    number: '100%',
    description: 'Foco em economia circular. Menos desperdício, mais sustentabilidade e colaboração para todos.',
  },
];

export const Stats: React.FC = () => {
  return (
    <section id="impacto" className={styles.section}>
      <div className={styles.container}>
        
        <div className={styles.mainWrapper}>
          
          <div className={styles.topBanner}>
            O marketplace universitário que transforma desapego em economia real.
          </div>

          <div className={styles.grid}>
            {STATS_DATA.map((item, index) => {
              const isHighlight = index === 0;

              return (
                <div 
                  key={index} 
                  className={`${styles.card} ${isHighlight ? styles.highlightCard : styles.standardCard}`}
                >
                  {/* O ícone voltou e tem seu próprio espaço agora! */}
                  <div className={styles.iconWrapper}>{item.icon}</div>
                  <div className={styles.number}>{item.number}</div>
                  <div className={styles.description}>{item.description}</div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};