import { Container } from './primitives';
import { profile } from '../data/resume';

export default function Footer() {
  return (
    <footer className="bg-black py-8">
      <Container className="flex items-center justify-center">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-white">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </Container>
    </footer>
  );
}
