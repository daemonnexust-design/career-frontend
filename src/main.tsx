import { StrictMode } from 'react'
import './i18n'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { Component, ErrorInfo, ReactNode } from 'react'

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean, error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("❌ CRITICAL ERROR CAUGHT BY BOUNDARY:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center', background: '#fff', color: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
          <h1 style={{ color: '#e11d48' }}>Something went wrong</h1>
          <p>The application failed to load. Please check the console for details.</p>
          <pre style={{ background: '#f4f4f5', padding: '15px', borderRadius: '8px', maxWidth: '90%', overflow: 'auto', textAlign: 'left' }}>
            {this.state.error?.toString()}
          </pre>
          <button onClick={() => window.location.reload()} style={{ marginTop: '20px', padding: '10px 20px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            Reload Application
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

console.info("🚀 App Bootstrap Started");
console.info("📍 URL:", window.location.href);
console.info("⏱️ Time:", new Date().toISOString());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
