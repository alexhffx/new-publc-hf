import { Studio } from 'sanity';
import config from '../../sanity/sanity.config';

export default function SanityStudio() {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Studio config={config} />
    </div>
  );
}
