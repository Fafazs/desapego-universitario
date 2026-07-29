import { Header } from './components/layout/Header/Header';
import { Hero } from './components/layout/Hero/Hero';
import { useAuthStore } from './store/useAuthStore';
import { Vitrine } from './components/layout/Vitrine/Vitrine';
import { AdDetailModal } from './components/modals/AdDetailModal';
import { Stats } from './components/layout/Stats/Stats';
import { Footer } from './components/layout/Footer/Footer';  
import { LoginModal } from './components/modals/LoginModal';
import { RegisterModal } from './components/modals/RegisterModal';
import { CreateAdModal } from './components/modals/CreateAdModal';
import { EditAdModal } from './components/modals/EditAdModal';

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
      <LoginModal />
      <RegisterModal />
      <CreateAdModal />
      <EditAdModal />
    </div>
  );
}

export default App;