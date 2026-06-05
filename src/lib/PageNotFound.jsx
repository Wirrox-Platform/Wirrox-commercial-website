import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-canvas">
      <div className="max-w-md w-full text-center space-y-8">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-bronze mb-4">Error 404</p>
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.02em] text-ink leading-[1.1] mb-4">
            Page not found
          </h1>
          <p className="text-[0.9375rem] text-muted-foreground leading-[1.75]">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>
        <Link
          to="/"
          className="inline-block px-8 py-3.5 bg-ink text-canvas text-[11px] font-mono uppercase tracking-[0.2em] hover:bg-bronze hover:text-ink transition-colors duration-300"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
