import React from 'react';
import { GraduationCap, PlusCircle, LogOut } from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore';
import { useModalStore } from '../../../store/useModalStore';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { openModal } = useModalStore();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo que zera o scroll ao clicar */}
        <a href="#inicio" className={styles.logo}>
          <GraduationCap size={28} />
          <span>Desapego Universitário</span>
        </a>

        {/* Links de Navegação */}
        <nav className={styles.nav}>
          {!user && <a href="#inicio" className={styles.navLink}>Início</a>}
          <a href="#vitrine" className={styles.navLink}>Vitrine</a>
          <a href="#impacto" className={styles.navLink}>Impacto</a>
        </nav>

        {/* Ações de Autenticação / Perfil */}
        <div className={styles.authActions}>
          {user ? (
            <>
              {/* Botão discreto sem fundo azul chamativo */}
              <button 
                className={styles.btnGhost} 
                onClick={() => openModal('createAd')}
              >
                <PlusCircle size={18} />
                Anunciar
              </button>

              <button 
                className={styles.btnLogout} 
                onClick={logout}
                title="Sair da conta"
              >
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <>
              <button 
                className={styles.btnOutline} 
                onClick={() => openModal('login')}
              >
                Entrar
              </button>

              <button 
                className={styles.btnPrimary} 
                onClick={() => openModal('register')}
              >
                Criar Conta
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};