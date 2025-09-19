"use client"; // Marcar como Client Component

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { signIn } from "next-auth/react";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Efecto de scroll para el fondo dinámico
  const { scrollYProgress } = useScroll();
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#b7f0b1", "#134e2e"] // Gradiente verde claro a muy oscuro
  );

  // Función para el login con Google
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" }); // Abre la ventana de login de Google
  };

  // Manejar cambio de header al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Partículas animadas (30 partículas para un efecto más rico)
  const particles = Array.from({ length: 30 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute bg-green-400/40 rounded-full"
      style={{
        width: Math.random() * 12 + 6,
        height: Math.random() * 12 + 6,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [0, -30, 0],
        opacity: [0.3, 1, 0.3],
        scale: [1, 1.3, 1],
        rotate: [0, 360],
      }}
      transition={{
        duration: Math.random() * 6 + 4,
        repeat: Infinity,
        repeatType: "loop",
      }}
    />
  ));

  return (
    <motion.div
      style={{ backgroundColor }}
      className="min-h-screen overflow-x-hidden relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Partículas de fondo */}
      <div className="fixed inset-0 pointer-events-none z-0">{particles}</div>

      {/* Header */}
      <motion.header
        className={`fixed top-0 left-0 w-full p-4 transition-all duration-500 z-50 ${
          scrolled ? "bg-green-900/90 backdrop-blur-lg shadow-2xl" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.15, rotate: 5 }} whileTap={{ scale: 0.95 }}>
            <Image
              src="/logo.png"
              alt="ShoganaiStudio Logo"
              width={90}
              height={90}
              className="rounded-full shadow-xl border-4 border-green-400/70"
            />
          </motion.div>
          <nav className="flex space-x-10">
            {["Inicio", "Características", "Servicios", "Contacto"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white font-semibold text-xl hover:text-green-300 transition-colors duration-300"
                whileHover={{ y: -6, scale: 1.1, textShadow: "0 0 10px rgba(0, 255, 0, 0.7)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>
          <motion.button
            onClick={() => setShowLogin(!showLogin)}
            className="bg-green-600/80 text-white px-8 py-3 rounded-full shadow-lg hover:bg-green-700/90 transition-all font-semibold text-lg"
            whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(0, 255, 0, 0.7)" }}
            whileTap={{ scale: 0.9 }}
          >
            Iniciar Sesión
          </motion.button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section id="inicio" className="min-h-screen flex items-center justify-center text-center relative z-10">
        <motion.div
          className="container mx-auto px-4"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-700 mb-8 drop-shadow-2xl"
            animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            ShoganaiStudio
          </motion.h1>
          <motion.p
            className="text-3xl text-white/90 mb-12 max-w-3xl mx-auto font-light tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Donde la creatividad se encuentra con la pasión. Diseñamos experiencias únicas con un toque de magia verde.
          </motion.p>
          <div className="flex justify-center space-x-8">
            {[
              { href: "/informacion", label: "INFORMACIÓN", target: "_blank" },
              { href: "/pedidos", label: "PEDIDOS", target: "_blank" },
              { href: "#", label: "TIENDA" },
              { href: "#", label: "HOSTING" },
            ].map((btn, i) => (
              <motion.a
                key={btn.label}
                href={btn.href}
                target={btn.target || "_self"}
                rel={btn.target ? "noopener noreferrer" : undefined}
                className="bg-green-500/80 text-white px-10 py-4 rounded-full shadow-xl hover:bg-green-600/90 transition-all font-semibold text-lg"
                whileHover={{ scale: 1.15, rotate: i % 2 === 0 ? 5 : -5, boxShadow: "0 0 20px rgba(0, 255, 0, 0.7)" }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                {btn.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Sección de Login */}
      <AnimatePresence>
        {showLogin && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-12 right-12 bg-white/95 p-10 rounded-2xl shadow-2xl z-50 max-w-md border-2 border-green-400/50"
          >
            <motion.h2
              className="text-3xl font-bold mb-8 text-green-800 tracking-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Inicia Sesión
            </motion.h2>
            <motion.button
              onClick={handleGoogleSignIn}
              className="bg-green-600 text-white px-8 py-4 rounded-full shadow-lg hover:bg-green-700 transition-all w-full font-semibold text-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 255, 0, 0.7)" }}
              whileTap={{ scale: 0.95 }}
            >
              INICIAR SESIÓN CON GOOGLE
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sección de Características */}
      <section id="caracteristicas" className="py-32 bg-green-300/10">
        <div className="container mx-auto text-center px-4">
          <motion.h2
            className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-700 mb-20 drop-shadow-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Lo que nos distingue
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              { title: "Diseño Único", desc: "Creaciones visuales que capturan corazones." },
              { title: "Hosting Premium", desc: "Rendimiento y seguridad garantizados." },
              { title: "Tienda Online", desc: "Vende con estilo y facilidad." },
              { title: "Soporte 24/7", desc: "Siempre contigo, con pasión." },
              { title: "Animaciones", desc: "Interacciones fluidas y mágicas." },
              { title: "SEO Avanzado", desc: "Destaca en los motores de búsqueda." },
              { title: "Integraciones", desc: "Conecta con cualquier plataforma." },
              { title: "Responsividad", desc: "Perfecto en todos los dispositivos." },
              { title: "Branding", desc: "Crea una identidad inolvidable." },
              { title: "Consultoría", desc: "Asesoría creativa para tu éxito." },
              { title: "Publicidad", desc: "Campañas que enganchan." },
              { title: "Analítica", desc: "Datos para decisiones inteligentes." },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="bg-white/15 p-8 rounded-xl shadow-xl hover:bg-green-400/30 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-green-800 mb-4">{feature.title}</h3>
                <p className="text-white/90 text-lg">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de Servicios */}
      <section id="servicios" className="py-32 bg-green-800/20">
        <div className="container mx-auto text-center px-4">
          <motion.h2
            className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-700 mb-20 drop-shadow-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Nuestros Servicios
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              "Diseño Web Profesional",
              "Hosting Ultrarápido",
              "Tienda Online Integrada",
              "Pedidos Personalizados",
              "Consultoría Creativa",
              "Optimización SEO",
              "Integraciones API",
              "Diseño Gráfico",
              "Desarrollo Móvil",
              "Soporte Técnico 24/7",
              "Branding Completo",
              "Estrategias Digitales",
              "Campañas Publicitarias",
              "Gestión de Redes Sociales",
              "Analítica Web Avanzada",
              "Automatización de Procesos",
              "Diseño de UX/UI",
              "Desarrollo Backend",
              "Seguridad Web",
              "Capacitación Digital",
            ].map((service, i) => (
              <motion.div
                key={i}
                className="bg-green-500/15 p-6 rounded-lg shadow-md hover:bg-green-500/40 transition-all duration-300"
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-white text-lg font-semibold">{service}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de Contacto */}
      <section id="contacto" className="py-32 bg-green-900/40">
        <div className="container mx-auto text-center px-4">
          <motion.h2
            className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-700 mb-20 drop-shadow-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            ¡Hagamos Magia Juntos!
          </motion.h2>
          <motion.p
            className="text-white text-xl mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Convierte tus ideas en realidad con nuestro equipo lleno de pasión y profesionalidad.
          </motion.p>
          <motion.button
            className="bg-green-600 text-white px-12 py-5 rounded-full shadow-2xl hover:bg-green-700 transition-all font-semibold text-lg"
            whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(0, 255, 0, 0.8)" }}
            whileTap={{ scale: 0.9 }}
          >
            Contáctanos Ahora
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-white bg-green-950">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-lg"
        >
          &copy; 2025 ShoganaiStudio. Todos los derechos reservados. Hecho con ❤️ y pasión.
        </motion.p>
        <div className="flex justify-center space-x-8 mt-6">
          {["Twitter", "Instagram", "LinkedIn", "Facebook", "YouTube", "TikTok", "Pinterest"].map((social, i) => (
            <motion.a
              key={social}
              href="#"
              className="text-green-300 hover:text-green-400 transition-colors duration-300 text-lg"
              whileHover={{ y: -6, scale: 1.2, textShadow: "0 0 10px rgba(0, 255, 0, 0.7)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {social}
            </motion.a>
          ))}
        </div>
      </footer>
    </motion.div>
  );
}
