import { Container } from './primitives';
import { profile } from '../data/resume';

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex items-center justify-center">
        <p className="font-mono text-xs text-faint">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </Container>
    </footer>
  );
}
