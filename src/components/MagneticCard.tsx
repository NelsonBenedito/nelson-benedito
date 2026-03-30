'use client';

import { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';

interface MagneticCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  icon: string;
  index: number;
}

export default function MagneticCard({ title, description, image, link, icon, index }: MagneticCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for the magnetic pull (Container)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Motion values for the glow (follows mouse)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for movement
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
  
  // Content parallax (moves more than the container)
  const contentX = useTransform(springX, (val) => val * 1.5);
  const contentY = useTransform(springY, (val) => val * 1.5);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Relative position from center (-0.5 to 0.5 range approx)
    const relX = (e.clientX - centerX) / (rect.width / 2);
    const relY = (e.clientY - centerY) / (rect.height / 2);

    // Update magnetic pull (Container moves max ~10px)
    x.set(relX * 10);
    y.set(relY * 10);

    // Update glow position relative to the card
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      className="project-card relative cursor-pointer overflow-hidden reveal-on-scroll opacity-0 translate-y-8"
      style={{
        x: springX,
        y: springY,
        transitionDelay: `${index * 100}ms`,
        willChange: 'transform',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Dynamic Glow Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 rounded-[20px] transition-opacity duration-300"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([mx, my]) => `radial-gradient(400px circle at ${mx}px ${my}px, var(--accent), transparent 70%)`
          ),
          opacity: isHovered ? 0.4 : 0,
        }}
      />

      {/* Content Container (Parallax) */}
      <motion.div 
        className="relative z-10 flex h-full flex-col"
        style={{ x: contentX, y: contentY }}
      >
        <div className="project-img relative overflow-hidden rounded-xl bg-[var(--bg-darker)]">
          <Image
            src={image}
            alt={title}
            fill
            className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
        </div>

        <div className="project-info mt-6 flex flex-1 flex-col">
          <h3 className="mb-3 flex items-center text-xl font-bold">
            <i className={`ph-bold ${icon} mr-3 text-[var(--primary)]`}></i>
            {title}
          </h3>
          <p className="mb-6 flex-1 text-sm text-[var(--text-dim)]">
            {description}
          </p>
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="project-link group inline-flex items-center gap-2 font-semibold text-[var(--accent)] transition-all hover:gap-3"
          >
            Ver Projeto 
            <i className="ph-bold ph-arrow-up-right"></i>
          </a>
        </div>
      </motion.div>
    </motion.article>
  );
}
