"use client"; // Marcar como Client Component

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" }); // Abre la ventana de login de Google
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #90ee90, #228b22)", // Gradiente de verde claro a oscuro
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src="/logo.png" // Asegúrate de que logo.png esté en public/
          alt="ShoganaiStudio Logo"
          width={200}
          height={200}
        />
      </motion.div>

      <div style={{ display: "flex", gap: "20px", marginTop: "40px" }}>
        <motion.a
          href="/informacion"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: "rgba(144, 238, 144, 0.5)", // Verde transparente
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            textDecoration: "none",
            cursor: "pointer",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          INFORMACION
        </motion.a>

        <motion.a
          href="/pedidos"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: "rgba(144, 238, 144, 0.5)", // Verde transparente
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            textDecoration: "none",
            cursor: "pointer",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          PEDIDOS
        </motion.a>

        <motion.button
          style={{
            backgroundColor: "rgba(144, 238, 144, 0.5)", // Verde transparente
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          TIENDA
        </motion.button>

        <motion.button
          style={{
            backgroundColor: "rgba(144, 238, 144, 0.5)", // Verde transparente
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          HOSTING
        </motion.button>
      </div>

      <motion.button
        onClick={() => setShowLogin(!showLogin)}
        style={{
          backgroundColor: "rgba(144, 238, 144, 0.5)", // Verde transparente
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          marginTop: "40px",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Iniciar sesión
      </motion.button>

      {showLogin && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            marginTop: "20px",
            padding: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <motion.button
            onClick={handleGoogleSignIn}
            style={{
              backgroundColor: "rgba(144, 238, 144, 0.5)", // Verde transparente
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            INICIAR SESION CON GOOGLE
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
