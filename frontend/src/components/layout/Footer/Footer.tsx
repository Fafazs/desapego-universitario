import React from 'react';
import { GraduationCap, Heart } from 'lucide-react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Marca & Slogan */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <GraduationCap size={26} color="var(--primary)" />
            <span>Desapego Universitário</span>
          </div>
          <p className={styles.slogan}>
            A plataforma oficial de negociação entre estudantes. Conectando quem precisa vender com quem precisa comprar no campus.
          </p>
        </div>

        {/* Links Rápidos */}
        <div>
          <h4 className={styles.title}>Navegação</h4>
          <div className={styles.links}>
            <a href="#inicio" className={styles.link}>Início</a>
            <a href="#vitrine" className={styles.link}>Vitrine de Anúncios</a>
            <a href="#impacto" className={styles.link}>Nosso Impacto</a>
          </div>
        </div>

        {/* Créditos do Projeto */}
        <div>
          <h4 className={styles.title}>Projeto Acadêmico</h4>
          <p className={styles.credits}>
            Desenvolvido como projeto de Engenharia de Software. Foco em privacidade, usabilidade e suporte à comunidade universitária.
          </p>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>© {new Date().getFullYear()} Desapego Universitário. Todos os direitos reservados.</p>
        <p>
          Feito com <Heart size={14} className={styles.heart} /> por estudantes para estudantes.
        </p>
      </div>
    </footer>
  );
};