import { Link } from "react-router-dom";
import Logo from "@/../public/Logo.png";
import { AnimateIn } from "../components/AnimateIn";

const footerLinks = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Workflow Engine", href: "#workflow" },
      { label: "Security", href: "#security" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "For Startups", href: "#solutions-startups" },
      { label: "For Enterprises", href: "#solutions-enterprise" },
      { label: "For HR Teams", href: "#solutions-hr" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const LandingFooter = () => {
  return (
    <footer className="bg-secondary-900 border-t border-secondary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          <AnimateIn animation="fade-up" duration={500} className="col-span-2 sm:col-span-4 lg:col-span-2">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <img src={Logo} alt="Flow Off Logo" className="h-8 w-auto" />
                <span className="text-base font-extrabold text-white tracking-widest">
                  FLOW OFF
                </span>
              </div>
              <p className="text-sm text-secondary-400 leading-relaxed max-w-xs mb-6">
                Enterprise leave management built for teams that move fast. Simple for employees, powerful for HR.
              </p>
              <div className="flex items-center gap-3">
                {[
                  { label: "Twitter", path: "M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" },
                  { label: "GitHub", path: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="h-8 w-8 rounded-lg bg-secondary-800 hover:bg-secondary-700 flex items-center justify-center transition-colors"
                  >
                    <svg className="h-4 w-4 text-secondary-400 fill-current" viewBox="0 0 24 24">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </AnimateIn>

          {footerLinks.map((col, i) => (
            <AnimateIn key={col.heading} animation="fade-up" delay={80 + i * 80} duration={500}>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-secondary-500 mb-4">
                  {col.heading}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith("/") ? (
                        <Link
                          to={link.href}
                          className="text-sm text-secondary-400 hover:text-white transition-colors"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="text-sm text-secondary-400 hover:text-white transition-colors"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn animation="fade-up" delay={200} duration={500}>
          <div className="mt-12 pt-6 border-t border-secondary-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-secondary-500">
              © {new Date().getFullYear()} Flow Off. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-xs text-secondary-500 hover:text-secondary-300 transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-secondary-500 hover:text-secondary-300 transition-colors">Terms of Service</a>
            </div>
          </div>
        </AnimateIn>
      </div>
    </footer>
  );
};

export default LandingFooter;
