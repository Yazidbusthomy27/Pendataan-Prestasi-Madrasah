/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useCurrentPath } from './router';
import Home from './pages/Home';
import FormSelection from './pages/FormSelection';
import FormSiswa from './pages/FormSiswa';
import FormGuru from './pages/FormGuru';
import FormKepala from './pages/FormKepala';
import FormMadrasah from './pages/FormMadrasah';
import Dashboard from './pages/Dashboard';
import DataSiswa from './pages/DataSiswa';
import DataGuru from './pages/DataGuru';
import DataKepala from './pages/DataKepala';
import DataMadrasah from './pages/DataMadrasah';

export default function App() {
  const path = useCurrentPath();

  const renderPage = () => {
    switch (path) {
      case '/': return <Home />;
      case '/form': return <FormSelection />;
      case '/form-siswa': return <FormSiswa />;
      case '/form-guru': return <FormGuru />;
      case '/form-kepala': return <FormKepala />;
      case '/form-madrasah': return <FormMadrasah />;
      case '/dashboard': return <Dashboard />;
      case '/data-siswa': return <DataSiswa />;
      case '/data-guru': return <DataGuru />;
      case '/data-kepala': return <DataKepala />;
      case '/data-madrasah': return <DataMadrasah />;
      default: return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans relative">
      {renderPage()}
    </div>
  );
}
