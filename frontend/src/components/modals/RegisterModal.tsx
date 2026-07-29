import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useModalStore } from '../../store/useModalStore';
import { api } from '../../services/api';
import styles from './Modal.module.css';

export const RegisterModal: React.FC = () => {
  const { activeModal, closeModal, openModal } = useModalStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    course: '',
    whatsapp: '',
  });

  if (activeModal !== 'register') return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post('/auth/register', formData);
      alert('Conta criada com sucesso! Faça login para continuar.');
      openModal('login'); // Redireciona para o login em vez de logar direto
    } catch (error: any) {
      alert(error.response?.data?.error || 'Erro ao criar conta');
    }
  };

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={closeModal}>
          <X size={20} />
        </button>

        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Criar sua Conta</h2>
          <p className={styles.modalSubtitle}>Conecte-se com alunos do seu campus</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nome Completo</label>
            <input 
              type="text" 
              required 
              placeholder="Ex: Fabricio Silva" 
              className={styles.input}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>E-mail</label>
            <input 
              type="email" 
              required 
              placeholder="seu.email@universidade.br" 
              className={styles.input}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Senha</label>
            <input 
              type="password" 
              required 
              placeholder="Mínimo 6 caracteres" 
              className={styles.input}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Seu Curso / Faculdade</label>
            <input 
              type="text" 
              required 
              placeholder="Ex: Engenharia Civil, Direito, Medicina" 
              className={styles.input}
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>WhatsApp (com DDD - apenas números)</label>
            <input 
              type="tel" 
              required 
              placeholder="85999998888" 
              className={styles.input}
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            />
          </div>

          <button type="submit" className={styles.btnSubmit}>
            Concluir Cadastro
          </button>
        </form>

        <div className={styles.switchAuth}>
          Já tem uma conta?
          <button className={styles.switchAuthButton} onClick={() => openModal('login')}>
            Fazer Login
          </button>
        </div>
      </div>
    </div>
  );
};