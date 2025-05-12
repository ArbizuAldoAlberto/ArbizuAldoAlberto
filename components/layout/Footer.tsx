import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    productos: [
      { name: 'Flores', href: '/productos/flores' },
      { name: 'Semillas', href: '/productos/semillas' },
      { name: 'Accesorios', href: '/productos/accesorios' },
      { name: 'CBD', href: '/productos/cbd' },
    ],
    informacion: [
      { name: 'Sobre Nosotros', href: '/sobre-nosotros' },
      { name: 'Blog', href: '/blog' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Contacto', href: '/contacto' },
    ],
    legal: [
      { name: 'Términos y Condiciones', href: '/terminos' },
      { name: 'Política de Privacidad', href: '/privacidad' },
      { name: 'Política de Cookies', href: '/cookies' },
      { name: 'Aviso Legal', href: '/aviso-legal' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: FaFacebook, href: 'https://facebook.com' },
    { name: 'Instagram', icon: FaInstagram, href: 'https://instagram.com' },
    { name: 'Twitter', icon: FaTwitter, href: 'https://twitter.com' },
    { name: 'WhatsApp', icon: FaWhatsapp, href: 'https://wa.me/1234567890' },
  ];

  return (
    <footer className="bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y Descripción */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold text-primary">
              Club Cannábico
            </Link>
            <p className="text-muted-foreground">
              Tu tienda de confianza para productos cannábicos de calidad. Envíos a todo el país.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Enlaces de Productos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Productos</h3>
            <ul className="space-y-2">
              {footerLinks.productos.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Información */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Información</h3>
            <ul className="space-y-2">
              {footerLinks.informacion.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Club Cannábico. Todos los derechos reservados.
            </p>
            <p className="text-muted-foreground text-sm mt-4 md:mt-0">
              Desarrollado con ❤️ por{' '}
              <a
                href="https://github.com/tu-usuario"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Tu Nombre
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 