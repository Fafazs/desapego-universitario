import { Header } from './components/layout/Header/Header';
import { Hero } from './components/layout/Hero/Hero';
import { useAuthStore } from './store/useAuthStore';
import { Vitrine } from './components/layout/Vitrine/Vitrine';
import { AdDetailModal } from './components/modals/AdDetailModal';
import { Stats } from './components/layout/Stats/Stats';
import { Footer } from './components/layout/Footer/Footer';  

export function App() {
  const { user } = useAuthStore();

  return (
    <div>
      <Header />
      
      {!user && <Hero />}

      <Vitrine />

      <Stats />

      <Footer />

      <AdDetailModal />
    </div>
  );
}

export default App;