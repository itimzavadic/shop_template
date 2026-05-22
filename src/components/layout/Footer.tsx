export function Footer() {
  return (
    <footer className="w-full border-t border-border mt-16">
      <div className="mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-sm tracking-wide font-medium text-foreground mb-3">
              UNIVERSE
            </h3>
            <p className="text-xs text-muted leading-5">
              ОДЕЖДА • ТРЕНДЫ • СТИЛЬ • МАНЕРА
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs tracking-wide font-medium text-foreground mb-3">
              ССЫЛКИ
            </h3>
            <ul className="space-y-2">
              {['О нас', 'Контакты', 'FAQ', 'Доставка и возврат'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-xs text-muted hover:text-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xs tracking-wide font-medium text-foreground mb-3">
              МЫ В СОЦСЕТЯХ
            </h3>
            <ul className="space-y-2">
              {['Instagram', 'Twitter', 'Pinterest'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-xs text-muted hover:text-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-2xs text-muted text-center">
            &copy; {new Date().getFullYear()} UNIVERSE. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}