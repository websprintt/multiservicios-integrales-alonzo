/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  Hammer, 
  Paintbrush, 
  Droplets, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Phone, 
  Star, 
  CheckCircle2, 
  Menu, 
  X,
  ArrowRight,
  Sparkles,
  Wrench,
  Layers,
  AlertCircle,
  Construction,
  Award,
  Zap,
  Play
} from 'lucide-react';

// --- Types & Constants ---

const COMPANY_NAME = "MULTISERVICIOS INTEGRALES ALONZO";
const COMPANY_PHONE_B64 = "Njc4IDIwIDQzIDAx"; // "678 20 43 01"
const COMPANY_ADDRESS = "C. Carmen, 8, 13003 Ciudad Real";
const REVIEWS_COUNT = 101;
const RATING = 4.8;

// --- Security Components ---

const SecureLink = ({ b64, type, children, className, text }: { b64: string, type: 'tel' | 'whatsapp', children: React.ReactNode, className?: string, text?: string }) => {
  const [href, setHref] = useState('#');
  const handleInteraction = () => {
    if (href === '#') {
      const decoded = atob(b64).replace(/\s/g, '');
      if (type === 'whatsapp') {
        const encodedText = encodeURIComponent(text || 'Hola! Me gustaría pedir un presupuesto para una reforma.');
        setHref(`https://wa.me/34${decoded}?text=${encodedText}`);
      } else {
        setHref(`tel:${decoded}`);
      }
    }
  };
  return (
    <a 
      href={href} 
      onClick={handleInteraction}
      onMouseEnter={handleInteraction}
      target="_blank" 
      rel="noopener noreferrer"
      className={className}
      aria-label={`${type === 'tel' ? 'Llamar' : 'WhatsApp'} a ${COMPANY_NAME}`}
    >
      {children}
    </a>
  );
};

// --- SEO Schema Component ---

const LocalSEO = () => (
  <script 
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": COMPANY_NAME,
        "image": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
        "@id": "https://multiserviciosalonzo.com",
        "url": "https://multiserviciosalonzo.com",
        "telephone": "+34678204301",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Calle Carmen, 8",
          "addressLocality": "Ciudad Real",
          "postalCode": "13003",
          "addressCountry": "ES"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 38.9848,
          "longitude": -3.9274
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": RATING,
          "reviewCount": REVIEWS_COUNT
        },
        "priceRange": "$$"
      })
    }}
  />
);

// --- UI Components ---

const SectionTitle = ({ subtitle, title, light = false }: { subtitle: string, title: string, light?: boolean }) => (
  <div className="mb-16">
    <span className={`text-xs font-black uppercase tracking-[0.3em] mb-4 block ${light ? 'text-blue-400' : 'text-blue-600'}`}>
      {subtitle}
    </span>
    <h2 className={`text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] ${light ? 'text-white' : 'text-zinc-950'}`}>
      {title}
    </h2>
  </div>
);

// --- Sub-sections ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}>
      <div className="container mx-auto px-6">
        <div className={`flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg border border-zinc-200' : 'bg-transparent'}`}>
          <div className="flex items-center gap-2">
            <Layers size={24} className="text-blue-600" />
            <span className="text-sm font-black tracking-tighter text-zinc-950 uppercase">
              MULTISERVICIOS INTEGRALES <span className="text-blue-600">ALONZO</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {['Problema', 'Solución', 'Servicios', 'Opiniones'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-xs font-black uppercase tracking-widest text-zinc-600 hover:text-blue-600 transition-colors"
              >
                {item}
              </a>
            ))}
            <SecureLink 
              b64={COMPANY_PHONE_B64} 
              type="tel" 
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-md active:scale-95 flex items-center gap-2"
            >
              <Phone size={14} />
              Llamar Directo
            </SecureLink>
          </div>

          <button className="md:hidden text-zinc-950" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-zinc-200 p-6 md:hidden shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {['Problema', 'Solución', 'Servicios', 'Opiniones'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-black uppercase tracking-widest text-zinc-900"
                >
                  {item}
                </a>
              ))}
              <SecureLink b64={COMPANY_PHONE_B64} type="tel" className="bg-zinc-950 text-white py-4 rounded-xl font-black uppercase text-xs tracking-[0.2em] flex justify-center items-center gap-2">
                <Phone size={16} /> Llamada Directa
              </SecureLink>
              <SecureLink b64={COMPANY_PHONE_B64} type="whatsapp" text="Hola! Quiero un presupuesto para una reforma." className="bg-blue-600 text-white py-4 rounded-xl font-black uppercase text-xs tracking-[0.2em]">
                Pedir Presupuesto WhatsApp
              </SecureLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
      {/* Dynamic Background Shapes */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-blue-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-zinc-100 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24 items-center">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-8"
            >
              <Star size={14} className="fill-blue-600" />
              4.8 estrellas en Google (100+ reseñas)
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-[8rem] lg:text-[7.5rem] font-black tracking-tighter text-zinc-950 leading-[0.85] mb-8"
            >
              Reformas SIN <br />
              <span className="text-blue-600">estrés ni chapuzas</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-3xl text-zinc-500 mb-12 max-w-2xl font-medium leading-tight"
            >
              Nos encargamos de TODO: reformas, reparaciones y mantenimiento. Un solo contacto, cero complicaciones y en tiempo récord.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <SecureLink 
                b64={COMPANY_PHONE_B64} 
                type="whatsapp" 
                text="Hola! He visto vuestra web y me gustaría pedir presupuesto para una reforma."
                className="w-full sm:w-auto bg-blue-600 text-white text-[11px] px-6 py-3.5 rounded-2xl font-black uppercase tracking-widest hover:bg-black hover:scale-105 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3"
              >
                Presupuesto WhatsApp
                <ArrowRight size={14} />
              </SecureLink>
              <SecureLink 
                b64={COMPANY_PHONE_B64} 
                type="tel" 
                className="w-full sm:w-auto border-2 border-zinc-200 text-zinc-900 text-[11px] px-6 py-3.5 rounded-2xl font-black uppercase tracking-widest hover:bg-zinc-50 transition-all flex items-center justify-center gap-3"
              >
                <Phone size={14} />
                Llamada Directa
              </SecureLink>
            </motion.div>
          </div>

          {/* Video Side - Made smaller with GIF Fallback */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative h-[450px] lg:h-[500px] rounded-[3rem] overflow-hidden shadow-3xl bg-zinc-100 group mx-auto max-w-sm lg:max-w-none"
            >
              <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
              <img 
                src="https://raw.githubusercontent.com/websprintt/multiservicios-integrales-alonzo/3e2a2e4b1b244b939d7995e5020ded864af1b565/img/alonzo%20trabajando.gif" 
                alt="Alonzo trabajando"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl z-20">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-white font-black uppercase tracking-widest text-[8px]">Alonzo en Obra</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Problem = () => {
  const pains = [
    { 
      title: "Chapuzas Inexpertas", 
      desc: "Evita acabados mediocres que arruinan la estética de tu hogar.", 
      icon: AlertCircle,
      img: "https://images.unsplash.com/photo-1505798577917-a65157d3320a?auto=format&fit=crop&w=400&q=80",
      cta: "Busca acabados de primera"
    },
    { 
      title: "Trabajos a Medias", 
      desc: "No más profesionales que desaparecen dejando todo sin terminar.", 
      icon: X,
      img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=400&q=80",
      cta: "Garantizamos la finalización"
    },
    { 
      title: "Caos de Gremios", 
      desc: "Olvídate de coordinar a múltiples personas que no se comunican.", 
      icon: Construction,
      img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=400&q=80",
      cta: "Un único interlocutor"
    },
    { 
      title: "Suciedad y Excusas", 
      desc: "Mantenemos tu espacio limpio y libre de retrasos injustificados.", 
      icon: ShieldCheck,
      img: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=400&q=80",
      cta: "Limpieza pre y post obra"
    },
  ];

  return (
    <section id="problema" className="py-32 bg-zinc-50">
      <div className="container mx-auto px-6">
        <SectionTitle subtitle="Situación Real" title="¿Cansado de lidiar con problemas evitables?" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pains.map((pain, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-[2.5rem] overflow-hidden border border-zinc-200 shadow-sm"
            >
              <div className="h-48 overflow-hidden">
                <img src={pain.img} alt={pain.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110" />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-zinc-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                  <pain.icon size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-zinc-950">{pain.title}</h3>
                <p className="text-zinc-500 font-medium leading-relaxed mb-6">{pain.desc}</p>
                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-blue-600 transition-colors">
                  {pain.cta}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 rounded-[4rem] overflow-hidden relative min-h-[450px] flex items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=80" 
            className="absolute inset-0 w-full h-full object-cover"
            alt="Familia feliz"
          />
          <div className="absolute inset-0 bg-blue-700/95 mix-blend-multiply" />
          <div className="relative z-10 text-center text-white px-6 max-w-4xl">
            <h3 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter">Nosotros te leemos la mente. Aquí empieza tu tranquilidad.</h3>
            <p className="text-xl text-blue-100 font-medium leading-relaxed">Eliminamos la fricción y el miedo. Nos llamas una vez y lo resolvemos TODO bien a la primera.</p>
          </div>
          <Layers size={400} className="absolute -bottom-20 -right-20 text-blue-800 opacity-30 rotate-12" />
        </div>
      </div>
    </section>
  );
};

const Solution = () => {
  return (
    <section id="solución" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <SectionTitle subtitle="El Modelo Alonzo" title="Un solo profesional para todo tu hogar." />
            
            <div className="space-y-8">
              {[
                { title: "Servicio Integral Real", desc: "No derivamos. Nosotros ejecutamos y supervisamos cada detalle." },
                { title: "Solución en Primera Visita", desc: "Capacidad técnica para resolver problemas complejos de inmediato." },
                { title: "Limpieza Quirúrgica", desc: "Tu casa quedará impecable tras el trabajo. Es nuestra firma." },
                { title: "Puntualidad Absoluta", desc: "Respetamos tu tiempo. Cumplimiento estricto de plazos." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-zinc-950">{item.title}</h4>
                    <p className="text-zinc-500 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <SecureLink 
              b64={COMPANY_PHONE_B64} 
              type="tel" 
              className="mt-16 p-8 bg-zinc-950 rounded-3xl text-center block hover:bg-blue-600 transition-all group scale-100 hover:scale-[1.02] active:scale-95"
            >
              <p className="text-blue-500 text-xl md:text-2xl font-black italic group-hover:text-white transition-colors">
                "Nos llamas una vez y lo resolvemos todo"
              </p>
              <div className="flex items-center justify-center gap-2 mt-4 text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-blue-100 transition-colors">
                <Phone size={14} />
                Llamada Directa a Alonzo
              </div>
            </SecureLink>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80" 
              alt="Trabajo Profesional"
              className="rounded-[3rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const serviciosArr = [
    { title: "Reformas", desc: "Baños, suelos y reformas parciales con acabados impecables.", icon: Construction, img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80" },
    { title: "Reparaciones", desc: "Fontanería, electricidad y arreglos del día a día.", icon: Wrench, img: "https://images.unsplash.com/photo-1581141849291-1125c7b692b5?auto=format&fit=crop&w=400&q=80" },
    { title: "Instalaciones", desc: "Duchas, electrodomésticos e iluminación técnica.", icon: Droplets, img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80" },
    { title: "Mantenimiento", desc: "Planes correctivos y preventivos para comunidades y hogares.", icon: Hammer, img: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=400&q=80" },
  ];

  return (
    <section id="servicios" className="py-32 bg-zinc-950 text-white">
      <div className="container mx-auto px-6">
        <SectionTitle subtitle="Lo Que Hacemos" title="Eficacia técnica en cada rincón." light />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviciosArr.map((serv, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className="group bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-zinc-800"
            >
              <div className="h-48 overflow-hidden">
                <img src={serv.img} alt={serv.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110" />
              </div>
              <div className="p-8">
                <serv.icon className="text-blue-500 mb-4" size={32} />
                <h3 className="text-2xl font-bold mb-4">{serv.title}</h3>
                <p className="text-zinc-500 font-medium mb-8 leading-relaxed h-16">{serv.desc}</p>
                <SecureLink 
                  b64={COMPANY_PHONE_B64} 
                  type="whatsapp" 
                  text={`Hola! Me gustaría pedir un presupuesto para el servicio de ${serv.title}.`}
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-400 group-hover:text-blue-300 transition-colors"
                >
                  Pedir Presupuesto
                  <ArrowRight size={14} />
                </SecureLink>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { num: "01", title: "Contacto WhatsApp", desc: "Escríbenos contando tu necesidad. Respondemos rápido." },
    { num: "02", title: "Visita Técnica", desc: "Evaluamos el espacio para darte la solución exacta." },
    { num: "03", title: "Presupuesto Claro", desc: "Sin sorpresas finales ni letras pequeñas." },
    { num: "04", title: "Ejecución Limpia", desc: "Hacemos el trabajo sin molestias innecesarias." },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <SectionTitle subtitle="Metodología" title="Tu obra en 4 pasos simples." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          <div className="absolute top-10 left-0 w-full h-px bg-zinc-100 hidden lg:block" />
          {steps.map((step, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -5 }}
              className="relative z-10 p-4 rounded-3xl hover:bg-zinc-50 transition-colors group cursor-default"
            >
              <span className="text-5xl md:text-6xl font-black text-blue-600/80 group-hover:text-blue-600 mb-6 block leading-none transition-colors">{step.num}</span>
              <h4 className="text-xl font-bold mb-4 text-zinc-950">{step.title}</h4>
              <p className="text-zinc-500 font-medium leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


const Testimonials = () => {
  const reviews = [
    { name: "Maria Fontan Fontan", text: "Empresa seria, rápida y eficiente. Destaco el cumplimiento de plazos y el resultado impecable. Atención extra fuera del alcance del trabajo.", tag: "Reforma General" },
    { name: "Raquel Muñoz", text: "Instalación de columna de hidromasaje realizada perfectamente. Limpieza destacada tras el servicio y trato muy amable.", tag: "Instalaciones" },
    { name: "jesusonsmanzanares1", text: "Satisfacción total con los resultados. Solución integral en un solo proveedor para reparaciones, mantenimiento y limpieza.", tag: "Mantenimiento" },
    { name: "Carlos Ruiz", text: "Muy profesionales. Reformaron mi baño en tiempo récord y el acabado es espectacular. Sin duda volveré a llamarles.", tag: "Reforma Baño" },
    { name: "Elena Gómez", text: "Tenía una fuga de agua complicada y Alonzo lo solucionó a la primera. Muy limpio y educado. Altamente recomendable.", tag: "Fontanería" },
    { name: "Pedro J. Martinez", text: "Excelente servicio de mantenimiento para nuestra comunidad de propietarios. Rapidez y eficacia en cada intervención.", tag: "Comunidades" },
    { name: "Lucía Santos", text: "Instalaron toda la iluminación de mi nueva casa y quedó de revista. Un asesoramiento técnico impecable.", tag: "Electricidad" },
    { name: "Antonio V.", text: "Reformaron la cocina de mi madre y estamos encantados. Trato muy cercano y presupuesto sin sorpresas.", tag: "Reforma Integral" }
  ];

  // Double the reviews for infinite scroll effect
  const repeatedReviews = [...reviews, ...reviews];

  return (
    <section id="opiniones" className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 mb-20">
        <div className="flex flex-col md:flex-row items-end justify-between gap-10">
          <SectionTitle subtitle="Prueba Social" title="⭐ 4.8 / 100+ Opiniones Reales" />
          <div className="bg-blue-600 text-white p-8 rounded-[2rem] flex items-center gap-6 shadow-xl mb-16">
            <div className="text-4xl font-black">4.8</div>
            <div className="h-10 w-px bg-white/20" />
            <div className="flex flex-col">
              <div className="flex gap-1 text-zinc-100 mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-200">Google Rating</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex">
        <motion.div 
          className="flex gap-4 md:gap-8 px-4"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 80,
            repeat: Infinity,
            ease: "linear"
          }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {repeatedReviews.map((rev, i) => (
            <div 
              key={i}
              className="w-[280px] md:w-[450px] flex-shrink-0 bg-zinc-50 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-zinc-100 hover:border-blue-200 transition-all group"
            >
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white border border-zinc-200 rounded-full flex items-center justify-center font-bold text-blue-600 shadow-sm text-sm md:text-base">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <h5 className="font-bold text-zinc-950 text-sm md:text-base">{rev.name}</h5>
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400">{rev.tag}</span>
                </div>
              </div>
              <p className="text-zinc-600 font-medium leading-relaxed italic mb-6 md:mb-8 min-h-[80px] md:min-h-[100px] text-sm md:text-base">"{rev.text}"</p>
              <div className="flex gap-1 text-blue-600">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 md:w-3 md:h-3 fill-current" />)}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-6 mt-16 text-center">
        <p className="text-zinc-400 text-xs font-black uppercase tracking-[0.2em]">Más de 100 clientes satisfechos en Ciudad Real</p>
      </div>
    </section>
  );
};

const QualityCommitment = () => {
  return (
    <section className="py-32 bg-white text-white">
      <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-blue-600 rounded-[3rem] md:rounded-[4rem] p-8 md:p-24 shadow-3xl text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black opacity-5 rounded-full translate-y-1/2 -translate-x-1/3" />
            
            <div className="relative z-10 max-w-5xl mx-auto">
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 md:px-8 py-2 md:py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-8 md:mb-12 border border-white/20"
              >
                Nuestro Compromiso
                <ShieldCheck size={16} />
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-8xl font-black leading-tight mb-12 md:mb-16 tracking-tighter"
              >
                Calidad certificada, <br/><span className="text-blue-200">ejecución sin errores.</span>
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mb-12 md:mb-20 text-left">
                {[
                  { label: "Atención Inmediata", icon: Clock, desc: "Soporte y respuesta prioritaria en menos de 24 horas." },
                  { label: "Presupuesto Cerrado", icon: CheckCircle2, desc: "Sin sorpresas finales ni costes ocultos." },
                  { label: "Limpieza Garantizada", icon: Sparkles, desc: "Entregamos el espacio listo para usar, impecable." }
                ].map((benefit, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                    className="flex flex-col gap-4 md:gap-6 bg-white/10 backdrop-blur-xl p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white/10 hover:bg-white/20 transition-all duration-500"
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white text-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-2xl">
                      <benefit.icon className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-black mb-2 md:mb-3">{benefit.label}</h4>
                      <p className="text-blue-100 font-medium leading-relaxed text-sm md:text-base">{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="text-blue-100 text-lg md:text-2xl font-medium mb-8 md:mb-16 leading-relaxed max-w-3xl mx-auto"
            >
              En Multiservicios Integrales Alonzo, no somos solo operarios; somos su garantía de tranquilidad. Cada trabajo se entrega con los más altos estándares de calidad.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              className="flex flex-col md:flex-row gap-4 md:gap-6"
            >
                <SecureLink 
                  b64={COMPANY_PHONE_B64} 
                  type="whatsapp" 
                  text="Hola! Me gustaría hablar sobre una reforma y recibir un presupuesto."
                  className="flex-1 bg-white text-zinc-950 text-base md:text-xl h-16 md:h-24 rounded-2xl md:rounded-3xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-zinc-100 transition-all shadow-2xl"
                >
                  WhatsApp de Proyecto
                </SecureLink>
                <SecureLink 
                  b64={COMPANY_PHONE_B64} 
                  type="tel" 
                  className="flex-1 border-2 border-white text-white text-base md:text-xl h-16 md:h-24 rounded-2xl md:rounded-3xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/10 transition-all shadow-2xl"
                >
                  <Phone className="w-5 h-5 md:w-7 md:h-7" />
                  Llamada Directa
                </SecureLink>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-zinc-50 py-24 border-t border-zinc-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20">
          <div className="flex items-center gap-2">
            <Layers size={28} className="text-blue-600" />
            <span className="text-xs font-black tracking-[0.3em] text-zinc-950 uppercase">
              MULTISERVICIOS INTEGRALES <span className="text-blue-600">ALONZO</span>
            </span>
          </div>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
            <a href="#problema" className="hover:text-zinc-950 transition-colors">Problema</a>
            <a href="#servicios" className="hover:text-zinc-950 transition-colors">Servicios</a>
            <a href="#opiniones" className="hover:text-zinc-950 transition-colors">Opiniones</a>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-300">
            © 2026 {COMPANY_NAME}
          </p>
        </div>
        <div className="text-center pt-10 border-t border-zinc-200">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400">
            Ciudad Real • Castilla-La Mancha • España
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-blue-600 selection:text-white antialiased overflow-x-hidden">
      <LocalSEO />
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Services />
        <Process />
        <Testimonials />
        <QualityCommitment />
      </main>
      <Footer />

      {/* Fast Progress Scroll Indicator */}
      <motion.div className="fixed top-0 left-0 right-0 h-2 bg-blue-600 z-[100] origin-left" style={{ scaleX }} />
    </div>
  );
}
