import React from 'react';
import { ShoppingBag, Users, Coins, Recycle } from 'lucide-react';
import styles from './Stats.module.css';

const STATS_DATA = [
  {
    icon: <ShoppingBag size={26} />,
    number: '+500',
    label: 'Anúncios Publicados',
  },
  {
    icon: <Coins size={26} />,
    number: 'R$ 18 mil+',
    label: 'Economizados pelos Alunos',
  },
  {
    icon: <Users size={26} />,
    number: '+1.200',
    label: 'Estudantes Conectados',
  },
  {
    icon: <Recycle size={26} />,
    number: '100%',
    label: 'Economia Circular no Campus',
  },
];

export const Stats: React.FC = () => {
  return (
    <section id="impacto" className={styles.stats}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Nosso Impacto no Campus</h2>
          <p className={styles.subtitle}>
            Transformando o desapego universitário em economia sustentável e colaboração
          </p>
        </div>

        <div className={styles.grid}>
          {STATS_DATA.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrapper}>{item.icon}</div>
              <div className={styles.number}>{item.number}</div>
              <div className={styles.label}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};