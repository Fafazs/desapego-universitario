import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useModalStore } from '../../store/useModalStore';
import { useAuthStore } from '../../store/useAuthStore';
import { api } from '../../services/api';
import styles from './Modal.module.css';

export const LoginModal: React.FC = () => {
  const { activeModal, closeModal, openModal, modalData } = useModalStore();
  const { setAuth } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // SE VIER E-MAIL DO CADASTRO, PREENCHE AUTOMATICAMENTE
  useEffect(() => {
    if (activeModal === 'login' && modalData?.email) {
      setEmail(modalData.email);
    }
  }, [activeModal, modalData]);

  if (activeModal !== 'login') return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      setAuth(response.data.user, response.data.token);
      closeModal();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={closeModal}>
          <X size={20} />
        </button>

        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Bem-vindo de volta!</h2>
          <p className={styles.modalSubtitle}>Acesse sua conta para desapegar ou comprar</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>E-mail acadêmico / pessoal</label>
            <input 
              type="email" 
              required 
              placeholder="seu.email@aluno.ufc.br" 
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Senha</label>
            <input 
              type="password" 
              required 
              placeholder="••••••••" 
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus={!!modalData?.email}
            />
          </div>

          <button type="submit" className={styles.btnSubmit} disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar na Conta'}
          </button>
        </form>

        <div className={styles.switchAuth}>
          Não tem uma conta ainda?
          <button className={styles.switchAuthButton} onClick={() => openModal('register')}>
            Cadastre-se
          </button>
        </div>
      </div>
    </div>
  );
};