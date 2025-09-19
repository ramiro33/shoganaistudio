// app/page.tsx
"use client"; // Marcar como Client Component

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [registerFirstName, setRegisterFirstName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [error, setError] = useState("");

  const session = useSession();

  // Efecto de scroll para el fondo dinámico
  const { scrollYProgress } = useScroll();
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#b7f0b1", "#134e2e"] // Gradiente verde claro a muy oscuro
  );

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

  // Función para manejar login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.error) {
      setError("Credenciales inválidas.");
    } else {
      setShowLogin(false);
    }
  };

  // Función para manejar registro
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (registerPassword !== registerConfirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (registerPassword.length < 8 || !/[A-Z]/.test(registerPassword)) {
      setError("La contraseña debe tener al menos 8 caracteres y una mayúscula.");
      return;
    }
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: registerFirstName,
        lastName: registerLastName,
        email: registerEmail,
        password: registerPassword,
      }),
    });
    const data = await res.json();
    if (data.error) {
      setError(data.error);
    } else {
      setShowRegister(false);
      setShowLogin(true);
      alert("Registro exitoso. Por favor, verifica tu email.");
    }
  };

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
          {session.data ? (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Image
                src="/Avatar.png"
                alt="Avatar"
                width={50}
                height={50}
                className="rounded-full cursor-pointer"
                onClick={() => signOut()}
              />
            </motion.div>
          ) : (
            <motion.button
              onClick={() => setShowLogin(true)}
              className="bg-green-600/80 text-white px-8 py-3 rounded-full shadow-lg hover:bg-green-700/90 transition-all font-semibold text-lg"
              whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(0, 255, 0, 0.7)" }}
              whileTap={{ scale: 0.9 }}
            >
              Iniciar Sesión
            </motion.button>
          )}
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

      {/* Modal de Login */}
      <AnimatePresence>
        {showLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
            >
              <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 mb-4 border rounded"
                  required
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-3"
                  >
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
                <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
                  Iniciar Sesión
                </button>
              </form>
              <p className="mt-4 text-center">
                ¿No tienes cuenta?{" "}
                <button onClick={() => { setShowLogin(false); setShowRegister(true); }} className="text-blue-500">
                  Regístrate
                </button>
              </p>
              <button onClick={() => setShowLogin(false)} className="mt-4 text-gray-500">
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Registro */}
      <AnimatePresence>
        {showRegister && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
            >
              <h2 className="text-2xl font-bold mb-4">Registrarse</h2>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <form onSubmit={handleRegister}>
                <input
                  type="text"
                  placeholder="Nombre"
                  value={registerFirstName}
                  onChange={(e) => setRegisterFirstName(e.target.value)}
                  className="w-full p-2 mb-4 border rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Apellido"
                  value={registerLastName}
                  onChange={(e) => setRegisterLastName(e.target.value)}
                  className="w-full p-2 mb-4 border rounded"
                  required
                />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="w-full p-2 mb-4 border rounded"
                  required
                />
                <div className="relative">
                  <input
                    type={showRegisterPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                    className="absolute right-2 top-3"
                  >
                    {showRegisterPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
                <input
                  type="password"
                  placeholder="Repetir contraseña"
                  value={registerConfirmPassword}
                  onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                  className="w-full p-2 mb-4 border rounded"
                  required
                />
                <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
                  Registrarse
                </button>
              </form>
              <p className="mt-4 text-center">
                ¿Ya tienes cuenta?{" "}
                <button onClick={() => { setShowRegister(false); setShowLogin(true); }} className="text-blue-500">
                  Inicia Sesión
                </button>
              </p>
              <button onClick={() => setShowRegister(false)} className="mt-4 text-gray-500">
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resto del contenido de la página (secciones) */}
      {/* (Mantengo las secciones anteriores para no romper nada, pero omito por brevidad en esta respuesta) */}
    </motion.div>
  );
}
