import Link from 'next/link';

export function Header() {
  return (
    <header className="w-full bg-background">
      <div className="mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-sm tracking-wide font-medium text-foreground"
        >
          ABOVE THE CLOUDS
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <Link
            href="/menu"
            className="text-sm tracking-wide text-muted hover:text-foreground transition-colors"
          >
            MENU
          </Link>
          <Link
            href="/search"
            className="text-sm tracking-wide text-muted hover:text-foreground transition-colors"
          >
            SEARCH
          </Link>
          <Link
            href="/cart"
            className="text-sm tracking-wide text-muted hover:text-foreground transition-colors"
          >
            CART
          </Link>
        </nav>
      </div>
    </header>
  );
}