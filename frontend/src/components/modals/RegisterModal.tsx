import React, { useState } from 'react';
import { X, CheckCircle, Loader2 } from 'lucide-react';
import { useModalStore } from '../../store/useModalStore';
import { api } from '../../services/api';
import styles from './Modal.module.css';

const UNIFOR_COURSES = [
  'Administração', 'Arquitetura e Urbanismo', 'Ciência da Computação',
  'Ciências Contábeis', 'Design', 'Direito', 'Educação Física', 'Enfermagem',
  'Engenharia Civil', 'Engenharia de Produção', 'Engenharia Elétrica',
  'Engenharia Mecânica', 'Farmácia', 'Fisioterapia', 'Jornalismo',
  'Medicina', 'Medicina Veterinária', 'Nutrição', 'Odontologia', 'Psicologia'
];

export const RegisterModal: React.FC = () => {
  const { activeModal, closeModal, openModal } = useModalStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    course: '',
    whatsapp: '',
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  if (activeModal !== 'register') return null;

  // REGRAS DE VALIDAÇÃO
  const isNameValid = formData.name.trim().length >= 3;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const showEmailError = formData.email.length > 0 && !isEmailValid;

  const isPasswordValid = formData.password.length >= 6;
  const showPasswordError = formData.password.length > 0 && !isPasswordValid;

  const isConfirmPasswordValid = formData.confirmPassword === formData.password && isPasswordValid;
  const showConfirmError = formData.confirmPassword.length > 0 && !isConfirmPasswordValid;

  const isCourseValid = formData.course !== '';
  const isWhatsappValid = formData.whatsapp.replace(/\D/g, '').length === 11;

  const isFormValid = isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isCourseValid && isWhatsappValid;

  // MÁSCARA WHATSAPP (com '9' obrigatório)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2 && value[2] !== '9') value = value.slice(0, 2) + '9' + value.slice(2);
    if (value.length > 11) value = value.slice(0, 11);

    let formatted = value;
    if (value.length > 2) formatted = `(${value.slice(0, 2)}) ` + value.slice(2);
    if (value.length > 7) formatted = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;

    setFormData({ ...formData, whatsapp: formatted });
  };

  // FORÇA DA SENHA
  const getPasswordStrength = () => {
    if (!formData.password) return { width: '0%', color: 'transparent' };
    if (formData.password.length < 6) return { width: '33%', color: '#ef4444' };
    if (/[A-Z]/.test(formData.password) && /[0-9]/.test(formData.password) && formData.password.length >= 8) {
      return { width: '100%', color: '#22c55e' };
    }
    return { width: '66%', color: '#eab308' };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        course: formData.course,
        whatsapp: formData.whatsapp.replace(/\D/g, '')
      };

      await api.post('/auth/register', payload);

      // Ativa estado visual de sucesso
      setIsSuccess(true);

      // Aguarda 1.5s e abre Login passando o e-mail
      setTimeout(() => {
        setIsSuccess(false);
        openModal('login', { email: formData.email });
      }, 1500);

    } catch (error: any) {
      alert(error.response?.data?.error || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={styles.overlay}>
        <div className={styles.successCard}>
          <CheckCircle size={64} className={styles.successIcon} />
          <h2>Conta Criada com Sucesso!</h2>
          <p>Redirecionando você para o login...</p>
        </div>
      </div>
    );
  }

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
          
          {/* NOME */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Nome Completo</label>
            <div className={styles.inputWrapper}>
              <input 
                type="text" required placeholder="Ex: Fabricio Silva" className={styles.input}
                value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {isNameValid && <CheckCircle className={styles.checkIcon} size={18} />}
            </div>
          </div>

          {/* E-MAIL */}
          <div className={styles.formGroup}>
            <label className={styles.label}>E-mail</label>
            <div className={styles.inputWrapper}>
              <input 
                type="email" required placeholder="seu.email@universidade.br" 
                className={`${styles.input} ${showEmailError ? styles.inputError : ''}`}
                value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {isEmailValid && <CheckCircle className={styles.checkIcon} size={18} />}
            </div>
            {showEmailError && <span className={styles.errorText}>e-mail incorreto</span>}
          </div>

          {/* SENHA */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Senha</label>
            <div className={styles.inputWrapper}>
              <input 
                type="password" required placeholder="Mínimo 6 caracteres" 
                className={`${styles.input} ${showPasswordError ? styles.inputError : ''}`}
                value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              {isPasswordValid && <CheckCircle className={styles.checkIcon} size={18} />}
            </div>
            <div className={styles.passwordBarContainer}>
              <div className={styles.passwordBarFill} style={{ width: getPasswordStrength().width, backgroundColor: getPasswordStrength().color }}></div>
            </div>
            {showPasswordError && <span className={styles.errorText}>senha incompleta (mín. 6 caracteres)</span>}
          </div>

          {/* CONFIRMAR SENHA */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Confirmar Senha</label>
            <div className={styles.inputWrapper}>
              <input 
                type="password" required placeholder="Repita sua senha" 
                className={`${styles.input} ${showConfirmError ? styles.inputError : ''}`}
                value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
              {isConfirmPasswordValid && <CheckCircle className={styles.checkIcon} size={18} />}
            </div>
            {showConfirmError && <span className={styles.errorText}>as senhas não coincidem</span>}
          </div>

          {/* CURSO */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Seu Curso</label>
            <div className={styles.inputWrapper}>
              <select required className={styles.select} value={formData.course} onChange={(e) => setFormData({ ...formData, course: e.target.value })}>
                <option value="" disabled>Selecione um curso...</option>
                {UNIFOR_COURSES.map(curso => (
                  <option key={curso} value={curso}>{curso}</option>
                ))}
              </select>
              {isCourseValid && <CheckCircle className={styles.checkIconSelect} size={18} />}
            </div>
          </div>

          {/* WHATSAPP */}
          <div className={styles.formGroup}>
            <label className={styles.label}>WhatsApp</label>
            <div className={styles.inputWrapper}>
              <input type="tel" required placeholder="(85) 99999-9999" className={styles.input} value={formData.whatsapp} onChange={handlePhoneChange} />
              {isWhatsappValid && <CheckCircle className={styles.checkIcon} size={18} />}
            </div>
          </div>

          <button type="submit" className={styles.btnSubmit} disabled={!isFormValid || loading}>
            {loading ? <Loader2 className={styles.spinner} size={20} /> : 'Concluir Cadastro'}
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