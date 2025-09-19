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
    ["#a8e4a0", "#1a5c38"] // Gradiente verde claro a oscuro
  );

  // Manejar cambio de header al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animación para partículas de fondo
  const particles = Array.from({ length: 20 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute bg-green-300/30 rounded-full"
      style={{
        width: Math.random() * 10 + 5,
        height: Math.random() * 10 + 5,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [0, -20, 0],
        opacity: [0.2, 0.8, 0.2],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: Math.random() * 5 + 5,
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
      transition={{ duration: 1.2 }}
    >
      {/* Partículas de fondo */}
      <div className="fixed inset-0 pointer-events-none">{particles}</div>

      {/* Header */}
      <motion.header
        className={`fixed top-0 left-0 w-full p-4 transition-all duration-300 z-50 ${
          scrolled ? "bg-green-900/80 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Image
              src="/logo.png"
              alt="ShoganaiStudio Logo"
              width={80}
              height={80}
              className="rounded-full shadow-lg border-2 border-green-300"
            />
          </motion.div>
          <nav className="flex space-x-8">
            {["Inicio", "Características", "Servicios", "Contacto"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white font-semibold text-lg hover:text-green-300 transition-colors"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>
          <motion.button
            onClick={() => setShowLogin(!showLogin)}
            className="bg-green-500/70 text-white px-6 py-2 rounded-full shadow-lg hover:bg-green-600/90 transition-all font-semibold"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            Iniciar Sesión
          </motion.button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section id="inicio" className="min-h-screen flex items-center justify-center text-center relative">
        <motion.div
          className="container mx-auto z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-7xl font-extrabold text-white mb-6 drop-shadow-2xl bg-gradient-to-r from-green-300 to-green-600 bg-clip-text text-transparent"
            animate={{ y: [0, -15, 0], scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            ShoganaiStudio
          </motion.h1>
          <motion.p
            className="text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Creatividad, pasión y profesionalidad en cada proyecto. ¡Únete a la magia verde!
          </motion.p>
          <div className="flex justify-center space-x-6">
            {[
              { href: "/informacion", label: "INFORMACION", target: "_blank" },
              { href: "/pedidos", label: "PEDIDOS", target: "_blank" },
              { href: "#", label: "TIENDA" },
              { href: "#", label: "HOSTING" },
            ].map((btn, i) => (
              <motion.a
                key={btn.label}
                href={btn.href}
                target={btn.target || "_self"}
                rel={btn.target ? "noopener noreferrer" : undefined}
                className="bg-green-500/70 text-white px-8 py-3 rounded-full shadow-xl hover:bg-green-600/90 transition-all font-semibold text-lg"
                whileHover={{ scale: 1.1, rotate: i % 2 === 0 ? 5 : -5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
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
            className="fixed bottom-10 right-10 bg-white/90 p-8 rounded-2xl shadow-2xl z-50 max-w-sm"
          >
            <motion.h2
              className="text-2xl font-bold mb-6 text-green-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Inicia Sesión con Google
            </motion.h2>
            <motion.button
              onClick={handleGoogleSignIn}
              className="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 transition-all w-full font-semibold"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0, 255, 0, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              INICIAR SESIÓN CON GOOGLE
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sección de Características */}
      <section id="caracteristicas" className="py-24 bg-green-200/20">
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-5xl font-bold text-white mb-16 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Lo que nos hace únicos
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            {[
              { title: "Diseño Creativo", desc: "Diseños únicos con un toque de magia verde." },
              { title: "Hosting Ultrarápido", desc: "Servidores confiables para tu éxito." },
              { title: "Tienda Personalizada", desc: "Crea tu tienda con estilo y facilidad." },
              { title: "Soporte 24/7", desc: "Siempre aquí con pasión y compromiso." },
              { title: "Animaciones Suaves", desc: "Experiencias visuales que cautivan." },
              { title: "SEO Optimizado", desc: "Llega a más clientes con visibilidad." },
              { title: "Integraciones API", desc: "Conecta tu sitio con cualquier servicio." },
              { title: "Diseño Responsivo", desc: "Perfecto en cualquier dispositivo." },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="bg-white/20 p-6 rounded-xl shadow-lg hover:bg-green-300/30 transition-all"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-green-800 mb-4">{feature.title}</h3>
                <p className="text-white/90">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de Servicios */}
      <section id="servicios" className="py-24 bg-green-800/30">
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-5xl font-bold text-white mb-16 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Nuestros Servicios
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
            {[
              "Diseño Web Profesional",
              "Hosting y Mantenimiento",
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
              "Analítica Web",
            ].map((service, i) => (
              <motion.div
                key={i}
                className="bg-green-500/20 p-4 rounded-lg shadow-md hover:bg-green-500/40 transition-all"
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
      <section id="contacto" className="py-24 bg-green-900/50">
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-5xl font-bold text-white mb-16 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            ¡Contáctanos!
          </motion.h2>
          <motion.p
            className="text-white text-xl mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Estamos listos para llevar tu proyecto al siguiente nivel con amor y profesionalidad.
          </motion.p>
          <motion.button
            className="bg-green-600 text-white px-10 py-4 rounded-full shadow-xl hover:bg-green-700 transition-all font-semibold text-lg"
            whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(0, 255, 0, 0.5)" }}
            whileTap={{ scale: 0.9 }}
          >
            Enviar Mensaje
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-white bg-green-900">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          &copy; 2025 ShoganaiStudio. Todos los derechos reservados. Hecho con ❤️ y profesionalidad.
        </motion.p>
        <div className="flex justify-center space-x-6 mt-4">
          {["Twitter", "Instagram", "LinkedIn", "Facebook", "YouTube"].map((social, i) => (
            <motion.a
              key={social}
              href="#"
              className="text-green-300 hover:text-green-400 transition-colors"
              whileHover={{ y: -5, scale: 1.2 }}
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
