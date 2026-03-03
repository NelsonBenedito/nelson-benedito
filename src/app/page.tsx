'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Script from 'next/script';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Header transparency logic
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    // Scroll reveal logic
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const projects = [
    {
      title: "AskIt",
      description: "Webapp responsivo que permite fazer e responder perguntas de forma rápida e intuitiva pelo navegador.",
      image: "/project_askit.png",
      link: "https://askit-5c462.web.app/",
      icon: "ph-chat-circle-dots"
    },
    {
      title: "Cais Investimentos",
      description: "Uma landing page para a empresa Cais Investimentos. Desenvolvida com HTML, CSS e JavaScript.",
      image: "/project_cais.png",
      link: "https://www.caisinvestimentos.com.br",
      icon: "ph-chart-line-up"
    },
    {
      title: "Blog Filipe Benedito",
      description: "Site institucional e blog para o artista Filipe Benedito, com integração de contato e galeria musical.",
      image: "/project3.png",
      link: "https://filipebenedito.com.br/",
      icon: "ph-guitar"
    },
    {
      title: "Leads Extractor",
      description: "Transforme o Google Maps em sua máquina de vendas. Extraia contatos, WhatsApp e Instagram de empresas locais rapidamente.",
      image: "/project1.png",
      link: "https://www.leadsextractor.com.br/",
      icon: "ph-shuffle"
    }
  ];

  return (
    <>
      {/* Background Animated Blobs */}
      <div className="blob-container">
        <div className="blob"></div>
        <div className="blob"></div>
      </div>

      {/* Header / Nav */}
      <header style={{
        background: isScrolled ? 'rgba(8, 9, 12, 0.9)' : 'rgba(8, 9, 12, 0.7)',
        padding: isScrolled ? '5px 0' : '0'
      }}>
        <div className="nav">
          <ul className="nav-links">
            <li><a href="#about">Sobre</a></li>
            <li><a href="#projects">Projetos</a></li>
            <li><a href="#contact">Contato</a></li>
          </ul>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-8">
        {/* Hero Section */}
        <section id="about" className="hero reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
          <div className="hero-content">
            <h1 className="gradient-text">Olá! Sou Nelson Benedito</h1>
            <p>Desenvolvedor front-end apaixonado por criar interfaces web intuitivas e de alto desempenho. Me dedico a construir experiências de usuário excepcionais.</p>
            <div className="social-icons">
              <a href="https://github.com/NelsonBenedito" target="_blank" title="GitHub">
                <i className="ph-bold ph-github-logo"></i>
              </a>
              <a href="https://linkedin.com/in/nelson-bene/" target="_blank" title="LinkedIn">
                <i className="ph-bold ph-linkedin-logo"></i>
              </a>
              <a href="https://instagram.com/nelsonbenejm/" target="_blank" title="Instagram">
                <i className="ph-bold ph-instagram-logo"></i>
              </a>
              <a href="https://wa.me/5527995230714" target="_blank" title="WhatsApp">
                <i className="ph-bold ph-whatsapp-logo"></i>
              </a>
            </div>
          </div>

          <div className="hero-img">
            <div className="hero-img-wrapper">
              <Image
                src="/NelsonBenedito.png"
                alt="Nelson Benedito Portrait"
                width={400}
                height={400}
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects">
          <div className="section-header reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
            <h2>Alguns dos meus <span className="gradient-text">projetos</span></h2>
            <p>Confira os principais projetos desenvolvidos recentemente.</p>
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <article
                key={index}
                className="project-card reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="project-img">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-400"
                  />
                </div>
                <div className="project-info">
                  <h3>
                    <i className={`ph-bold ${project.icon}`} style={{ color: 'var(--primary)', marginRight: '10px' }}></i>
                    {project.title}
                  </h3>
                  <p>{project.description}</p>
                  <a href={project.link} target="_blank" className="project-link">
                    Ver Projeto <i className="ph-bold ph-arrow-up-right"></i>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="projects pt-12 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
          <div className="section-header">
            <h2>Vamos <span className="gradient-text">conversar?</span></h2>
            <p>Estou sempre aberto a novos projetos, colaborações e oportunidades.</p>
            <div className="mt-8">
              <a href="mailto:nelsonbenejm@gmail.com" className="project-link text-xl gap-4">
                <i className="ph-bold ph-envelope"></i> nelsonbenejm@gmail.com
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <p>&copy; 2026 Nelson Benedito. Desenvolvido com <i className="ph-fill ph-heart text-[var(--primary)]"></i> e dedicação.</p>
          <p className="mt-2"><a href="#about" className="hover:text-white transition-colors">Voltar ao topo</a></p>
        </div>
      </footer>

      {/* Load Phosphor Icons Script */}
      <Script src="https://unpkg.com/@phosphor-icons/web@2.1.1" strategy="afterInteractive" />
    </>
  );
}
