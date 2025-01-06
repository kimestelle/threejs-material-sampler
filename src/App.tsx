import { AppProvider } from './context/AppContext';
import ThreeCanvas from './ThreeCanvas';
import Controls from './Controls';
import './App.css';

export default function App() {
  return (
    <AppProvider>
      <>
        <ThreeCanvas />
        <Controls />
      </>
    </AppProvider>
  );
}
