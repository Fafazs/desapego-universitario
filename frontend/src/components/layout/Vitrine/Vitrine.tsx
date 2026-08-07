import React, { useState, useEffect } from 'react';
import { Search, PackageOpen, SlidersHorizontal } from 'lucide-react';
import { AdCard } from './AdCard';
import { api } from '../../../services/api';
import { useAdStore } from '../../../store/useAdStore';
import { useAuthStore } from '../../../store/useAuthStore';
import { UNIFOR_COURSES, ACADEMIC_CATEGORIES } from '../../../constants/academicData';
import styles from './Vitrine.module.css';

const PRICE_RANGES = ['Qualquer', 'Doação', 'Até R$ 50', 'Até R$ 100', 'Até R$ 200'];
const SORT_OPTIONS = ['Mais Recentes', 'Mais Antigos', 'Menor Preço', 'Maior Preço'];

export const Vitrine: React.FC = () => {
  const { ads, setAds } = useAdStore();
  const { user } = useAuthStore();
  
  // --- ESTADOS DOS FILTROS ---
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedCourse, setSelectedCourse] = useState('Todos');
  const [selectedPrice, setSelectedPrice] = useState('Qualquer');
  const [sortBy, setSortBy] = useState('Mais Recentes');
  
  const [viewFilter, setViewFilter] = useState<'all' | 'mine'>('all');
  const [loading, setLoading] = useState(true);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // --- NOVA FUNÇÃO: Lógica para limpar os filtros ao fechar o painel ---
  const handleToggleAdvancedFilters = () => {
    if (showAdvancedFilters) {
      // Se estava aberto e vai fechar, reseta os valores avançados
      setSelectedCourse('Todos');
      setSelectedPrice('Qualquer');
      setSortBy('Mais Recentes');
    }
    // Inverte o estado de visibilidade
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  // --- BUSCA INTELIGENTE NO BACKEND ---
  useEffect(() => {
    setLoading(true);
    
    const endpoint = viewFilter === 'mine' ? '/ads/mine' : '/ads';
    const params = new URLSearchParams();
    
    if (selectedCategory !== 'Todos') params.append('category', selectedCategory);
    if (selectedCourse !== 'Todos') params.append('course', selectedCourse);
    if (selectedPrice !== 'Qualquer') params.append('priceRange', selectedPrice);
    if (sortBy !== 'Mais Recentes') params.append('sortBy', sortBy);
    if (search.trim() !== '') params.append('search', search);

    api.get(`${endpoint}?${params.toString()}`)
      .then((response) => setAds(response.data))
      .catch((error) => console.error('Erro ao buscar anúncios:', error))
      .finally(() => setLoading(false));
      
  }, [search, selectedCategory, selectedCourse, selectedPrice, sortBy, viewFilter, setAds]);

  return (
    <section id="vitrine" className={styles.vitrine}>
      <div className={styles.header}>
        <h2 className={styles.title}>Vitrine do Campus</h2>
        <p className={styles.subtitle}>Encontre oportunidades incríveis postadas por outros alunos</p>
      </div>

      <div className={styles.controls}>
        
        {/* 1. BARRA DE BUSCA NO TOPO ABSOLUTO */}
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

        {/* 2. ABAS (TOGGLE) E CONTAGEM DE RESULTADOS (Linha divisória) */}
        <div className={styles.filterHeader}>
          {user && (
            <div className={styles.toggleWrapper}>
              <button 
                className={viewFilter === 'all' ? styles.toggleBtnActive : styles.toggleBtn}
                onClick={() => setViewFilter('all')}
              >
                Todos os Anúncios
              </button>
              <button 
                className={viewFilter === 'mine' ? styles.toggleBtnActive : styles.toggleBtn}
                onClick={() => setViewFilter('mine')}
              >
                Meus Anúncios
              </button>
            </div>
          )}
          
          {/* Contagem dinâmica baseada no array de anúncios carregados */}
          <div className={styles.resultsCount}>
            {!loading && `${ads.length} ${ads.length === 1 ? 'Resultado' : 'Resultados'}`}
          </div>
        </div>

        {/* 3. CATEGORIAS RÁPIDAS (Mantidas como estavam por enquanto) */}
        <div className={styles.categories}>
          {ACADEMIC_CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${styles.categoryBtn} ${selectedCategory === cat ? styles.activeCategory : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
          
          <button 
            className={`${styles.categoryBtn} ${showAdvancedFilters ? styles.activeCategory : ''}`}
            onClick={handleToggleAdvancedFilters}
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <SlidersHorizontal size={14} /> Filtros Avançados
          </button>
        </div>

        {/* MEGA PAINEL DE FILTROS AVANÇADOS (Mantido como estava por enquanto) */}
        {showAdvancedFilters && (
          <div className={styles.advancedFiltersPanel}>
            
            <div className={styles.filterGroup}>
              <label>Filtrar por Curso</label>
              <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} className={styles.select}>
                <option value="Todos">Todos</option>
                {UNIFOR_COURSES.map(course => <option key={course} value={course}>{course}</option>)}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label>Faixa de Preço</label>
              <select value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)} className={styles.select}>
                {PRICE_RANGES.map(price => <option key={price} value={price}>{price}</option>)}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label>Ordenar por</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={styles.select}>
                {SORT_OPTIONS.map(sort => <option key={sort} value={sort}>{sort}</option>)}
              </select>
            </div>

          </div>
        )}
      </div>

      {/* Grid de Resultados */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
          Carregando anúncios...
        </div>
      ) : ads.length > 0 ? (
        <div className={styles.grid}>
          {ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <PackageOpen size={48} className={styles.emptyStateIcon} />
          <h3>Nenhum item encontrado</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Tente mudar os filtros ou realizar uma nova busca.
          </p>
        </div>
      )}
    </section>
  );
};