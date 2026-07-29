import React, { useState, useEffect } from 'react';
import { Search, PackageOpen } from 'lucide-react';
import { AdCard } from './AdCard';
import { api } from '../../../services/api';
import { useAdStore } from '../../../store/useAdStore';
import { useAuthStore } from '../../../store/useAuthStore'; // <-- Adicionado para saber quem está logado
import styles from './Vitrine.module.css';

const CATEGORIES = ['Todos', 'Livros', 'Eletrônicos', 'Móveis', 'Materiais', 'Outros'];

export const Vitrine: React.FC = () => {
  const { ads, setAds } = useAdStore();
  const { user } = useAuthStore(); // <-- Pegamos o usuário logado
  
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [loading, setLoading] = useState(true);
  
  // Novo estado para controlar se vemos "Todos" ou "Meus Anúncios"
  const [viewFilter, setViewFilter] = useState<'all' | 'mine'>('all');

  // Busca os dados reais do Banco de Dados
  useEffect(() => {
    setLoading(true);
    api.get('/ads')
      .then((response) => {
        setAds(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar anúncios do banco:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setAds]);

  const filteredAds = ads.filter((ad) => {
    const matchesSearch = ad.title.toLowerCase().includes(search.toLowerCase()) ||
                          ad.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || ad.category === selectedCategory;
    
    // Nova regra: Filtra pelos anúncios do usuário se a aba "mine" estiver ativa
    const matchesOwnership = viewFilter === 'all' || ad.user_id === user?.id;
    
    return matchesSearch && matchesCategory && matchesOwnership;
  });

  return (
    <section id="vitrine" className={styles.vitrine}>
      <div className={styles.header}>
        <h2 className={styles.title}>Vitrine do Campus</h2>
        <p className={styles.subtitle}>Encontre oportunidades incríveis postadas por outros alunos</p>
      </div>

      <div className={styles.controls}>
        
        {/* Toggle de Filtro: Só aparece se o usuário estiver logado */}
        {user && (
          <div style={{ 
            display: 'flex', 
            gap: '0.5rem', 
            marginBottom: '1.5rem', 
            background: 'var(--surface-50, #f8fafc)', 
            padding: '0.35rem', 
            borderRadius: '0.5rem', 
            width: 'fit-content' 
          }}>
            <button 
              onClick={() => setViewFilter('all')}
              style={{
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontWeight: 500,
                background: viewFilter === 'all' ? 'var(--primary, #2563eb)' : 'transparent',
                color: viewFilter === 'all' ? 'white' : 'var(--text-secondary, #64748b)',
                transition: 'all 0.2s'
              }}
            >
              Todos os Anúncios
            </button>
            <button 
              onClick={() => setViewFilter('mine')}
              style={{
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontWeight: 500,
                background: viewFilter === 'mine' ? 'var(--primary, #2563eb)' : 'transparent',
                color: viewFilter === 'mine' ? 'white' : 'var(--text-secondary, #64748b)',
                transition: 'all 0.2s'
              }}
            >
              Meus Anúncios
            </button>
          </div>
        )}

        <div className={styles.searchBar}>
          <Search size={20} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Buscar por livro, calculadora, cadeira..." 
            className={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.categories}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${styles.categoryBtn} ${selectedCategory === cat ? styles.activeCategory : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
          Carregando anúncios...
        </div>
      ) : filteredAds.length > 0 ? (
        <div className={styles.grid}>
          {filteredAds.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <PackageOpen size={48} className={styles.emptyStateIcon} />
          <h3>Nenhum item encontrado</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            {viewFilter === 'mine' 
              ? 'Você ainda não publicou nenhum anúncio.' 
              : 'Ainda não há anúncios nesta categoria ou com este nome.'}
          </p>
        </div>
      )}
    </section>
  );
};