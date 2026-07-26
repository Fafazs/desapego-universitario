import React, { useState, useEffect } from 'react';
import { Search, PackageOpen } from 'lucide-react';
import type { Ad } from '../../../types/ad';
import { AdCard } from './AdCard';
import { api } from '../../../services/api';
import styles from './Vitrine.module.css';

const CATEGORIES = ['Todos', 'Livros', 'Eletrônicos', 'Móveis', 'Materiais', 'Outros'];

// Dados simulados para garantir que a UI mostre cards mesmo se o backend estiver offline
const DEMO_ADS: Ad[] = [
  {
    id: '1',
    title: 'Cálculo Volume 1 - James Stewart (8ª Edição)',
    description: 'Livro em ótimo estado de conservação, sem grifos nas páginas. Essencial para Engenharias.',
    price: 85.00,
    category: 'Livros',
    image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500',
    created_at: new Date().toISOString(),
    user_id: 'u1',
    user_name: 'Lucas Mendes',
    user_course: 'Engenharia Civil',
    user_whatsapp: '88999999999'
  },
  {
    id: '2',
    title: 'Calculadora Científica Casio FX-991EX',
    description: 'Funcionando 100%. Com tampa de proteção e bateria nova.',
    price: 120.00,
    category: 'Eletrônicos',
    image_url: 'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48a?w=500',
    created_at: new Date().toISOString(),
    user_id: 'u2',
    user_name: 'Mariana Lima',
    user_course: 'Ciência da Computação',
    user_whatsapp: '88988888888'
  },
  {
    id: '3',
    title: 'Jaleco Branco Algodão M - Unissex',
    description: 'Usado por 1 semestre na disciplina de química orgânica. Higienizado.',
    price: 45.00,
    category: 'Materiais',
    image_url: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500',
    created_at: new Date().toISOString(),
    user_id: 'u3',
    user_name: 'Beatriz Rocha',
    user_course: 'Medicina',
    user_whatsapp: '88977777777'
  }
];

export const Vitrine: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>(DEMO_ADS);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  useEffect(() => {
    // Busca os anúncios reais da API REST Node.js
    api.get('/ads')
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setAds(response.data);
        }
      })
      .catch(() => {
        console.log('Usando dados de demonstração para a Vitrine');
      });
  }, []);

  // Lógica de busca e filtragem por categoria
  const filteredAds = ads.filter((ad) => {
    const matchesSearch = ad.title.toLowerCase().includes(search.toLowerCase()) ||
                          ad.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || ad.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="vitrine" className={styles.vitrine}>
      <div className={styles.header}>
        <h2 className={styles.title}>Vitrine do Campus</h2>
        <p className={styles.subtitle}>Encontre oportunidades incríveis postadas por outros alunos</p>
      </div>

      <div className={styles.controls}>
        {/* Barra de Busca */}
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

        {/* Filtro de Categorias */}
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

      {/* Grid de Anúncios */}
      {filteredAds.length > 0 ? (
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
            Tente buscar com outros termos ou selecione outra categoria.
          </p>
        </div>
      )}
    </section>
  );
};