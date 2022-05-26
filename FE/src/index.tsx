import { createRoot } from 'react-dom/client';

import App from '@/App';

const container: Element | DocumentFragment | null = document.getElementById('root');
if (container) {
  const root = createRoot(container as Element);

  root.render(<App />);
}
