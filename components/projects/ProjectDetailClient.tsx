"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ProjectMeta } from "@/types/project";
import { useI18n } from "@/context/i18n-context";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  FiArrowLeft,
  FiArrowRight,
  FiExternalLink,
  FiCpu,
  FiCheckCircle,
  FiLayers,
  FiImage,
  FiMaximize2,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiZoomIn,
  FiZoomOut,
  FiRefreshCw,
} from "react-icons/fi";

interface ProjectDetailClientProps {
  project: ProjectMeta;
  prevProject: ProjectMeta | null;
  nextProject: ProjectMeta | null;
}

export const ProjectDetailClient: React.FC<ProjectDetailClientProps> = ({
  project,
  prevProject,
  nextProject,
}) => {
  const { locale, t } = useI18n();
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Zoom & Pan state for Lightbox
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lightboxThumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  const images = project.images || [];

  const resetZoom = useCallback(() => {
    setZoomScale(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const handleNextImage = useCallback(() => {
    if (images.length === 0) return;
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrevImage = useCallback(() => {
    if (images.length === 0) return;
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleLightboxNext = useCallback(() => {
    if (images.length === 0 || lightboxIndex === null) return;
    resetZoom();
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
  }, [images.length, lightboxIndex, resetZoom]);

  const handleLightboxPrev = useCallback(() => {
    if (images.length === 0 || lightboxIndex === null) return;
    resetZoom();
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
  }, [images.length, lightboxIndex, resetZoom]);

  // Auto-scroll main showcase thumbnail list when active image changes
  useEffect(() => {
    if (thumbnailRefs.current[activeImageIndex]) {
      thumbnailRefs.current[activeImageIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeImageIndex]);

  // Auto-scroll lightbox thumbnail list when lightbox index changes
  useEffect(() => {
    if (lightboxIndex !== null && lightboxThumbnailRefs.current[lightboxIndex]) {
      lightboxThumbnailRefs.current[lightboxIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [lightboxIndex]);

  // Keyboard navigation & body scroll locking for Lightbox
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") {
        setLightboxIndex(null);
        resetZoom();
      }
      if (e.key === "ArrowRight") handleLightboxNext();
      if (e.key === "ArrowLeft") handleLightboxPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, handleLightboxNext, handleLightboxPrev, resetZoom]);

  // Prevent browser pinch-to-zoom / touchpad page zooming & handle custom zoom
  useEffect(() => {
    const modalEl = modalRef.current;
    if (!modalEl || lightboxIndex === null) return;

    const handleNativeWheel = (e: WheelEvent) => {
      // Prevent browser page zoom on touchpad pinch / Ctrl+wheel
      e.preventDefault();

      const delta = -e.deltaY;
      // Trackpads emit e.ctrlKey === true during pinch gestures
      const step = e.ctrlKey ? 0.08 : 0.25;

      setZoomScale((prev) => {
        const newScale = prev + (delta > 0 ? step : -step);
        const clamped = Math.min(Math.max(1, newScale), 4.5);
        if (clamped === 1) setPan({ x: 0, y: 0 });
        return clamped;
      });
    };

    const preventGesture = (e: Event) => {
      e.preventDefault();
    };

    modalEl.addEventListener("wheel", handleNativeWheel, { passive: false });
    modalEl.addEventListener("gesturestart", preventGesture, { passive: false });
    modalEl.addEventListener("gesturechange", preventGesture, { passive: false });

    return () => {
      modalEl.removeEventListener("wheel", handleNativeWheel);
      modalEl.removeEventListener("gesturestart", preventGesture);
      modalEl.removeEventListener("gesturechange", preventGesture);
    };
  }, [lightboxIndex]);

  // Manual Zoom controls
  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(prev + 0.5, 4.5));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => {
      const nextScale = Math.max(prev - 0.5, 1);
      if (nextScale === 1) setPan({ x: 0, y: 0 });
      return nextScale;
    });
  };

  const handleDoubleClick = () => {
    if (zoomScale > 1) {
      resetZoom();
    } else {
      setZoomScale(2.2);
    }
  };

  // Dragging / Panning handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomScale <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomScale <= 1) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoomScale <= 1 || e.touches.length !== 1) return;
    setIsDragging(true);
    setDragStart({
      x: e.touches[0].clientX - pan.x,
      y: e.touches[0].clientY - pan.y,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || zoomScale <= 1 || e.touches.length !== 1) return;
    setPan({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };

  const title = project.name;
  const shortDesc =
    project.short_description?.[locale] ||
    project.short_description?.en ||
    project.short_description?.id ||
    "";

  const fullDesc =
    project.description?.[locale] ||
    project.description?.en ||
    project.description?.id ||
    "";

  const role =
    project.role?.[locale] ||
    project.role?.en ||
    project.role?.id ||
    "";

  const rawContribution =
    project.contribution?.[locale] ||
    project.contribution?.en ||
    project.contribution?.id ||
    [];

  const contributionList: string[] = Array.isArray(rawContribution)
    ? rawContribution
    : rawContribution
    ? [rawContribution]
    : [];

  const generalFeatures =
    project.features?.general?.[locale] ||
    project.features?.general?.en ||
    project.features?.general?.id ||
    [];

  const nerdFeatures =
    project.features?.nerd?.[locale] ||
    project.features?.nerd?.en ||
    project.features?.nerd?.id ||
    [];

  return (
    <div className="w-full py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[var(--navy)] hover:text-[var(--green)] transition-colors px-3 py-1.5 bg-[var(--surface-light)] border border-[var(--navy)] retro-shadow-sm"
          >
            <FiArrowLeft className="w-3.5 h-3.5" />
            <span>{t.projects.details.backToProjects}</span>
          </Link>
        </div>

        {/* Project Header Banner */}
        <div className="bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow p-6 sm:p-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-[var(--navy)]">
            <div className="flex items-center gap-2 font-mono text-xs">
              <Badge variant="navy" size="md">
                SYS_ID: {project.id}
              </Badge>
              <Badge variant="gold" size="md">
                {project.category.toUpperCase()}
              </Badge>
            </div>

            {project.link && (
              <Button
                href={project.link}
                external
                variant="secondary"
                size="sm"
                rightIcon={<FiExternalLink className="w-3.5 h-3.5" />}
              >
                {t.projects.details.liveDemo}
              </Button>
            )}
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-display text-[var(--navy)] tracking-tight">
              {title}
            </h1>
            <p className="text-base sm:text-lg text-[var(--green)] font-mono font-semibold">
              {shortDesc}
            </p>
          </div>

          <div className="border-t border-[var(--navy)]/10 pt-4">
            <span className="font-mono text-xs font-bold text-[var(--navy)] uppercase tracking-wider block mb-2">
              {"//"} {t.projects.details.technologiesTitle}:
            </span>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="surface" size="md" className="font-bold">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Main 16:9 Image Showcase Banner (if images exist) */}
        {images.length > 0 && (
          <div className="bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[var(--navy)] font-mono text-xs">
              <div className="flex items-center gap-2 text-[var(--navy)] font-bold">
                <FiImage className="w-4 h-4 text-[var(--green)]" />
                <span>PROJECT SCREENSHOTS (16:9 HD)</span>
              </div>
              <span className="text-[var(--navy)]/60 font-bold">
                [{activeImageIndex + 1} / {images.length}]
              </span>
            </div>

            {/* Main 16:9 Featured Frame */}
            <div className="relative w-full aspect-video bg-[var(--navy-dark)] border-2 border-[var(--navy)] overflow-hidden group">
              <Image
                src={images[activeImageIndex]}
                alt={`${project.name} preview ${activeImageIndex + 1}`}
                fill
                sizes="(max-width: 1200px) 100vw, 1100px"
                priority
                className="object-cover cursor-pointer transition-transform duration-300 group-hover:scale-102"
                onClick={() => {
                  setLightboxIndex(activeImageIndex);
                  resetZoom();
                }}
              />

              {/* Prev / Next controls */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-[var(--navy)]/80 hover:bg-[var(--navy)] text-white border border-white/20 transition-all opacity-80 hover:opacity-100 cursor-pointer shadow-md"
                    aria-label="Previous image"
                  >
                    <FiChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-[var(--navy)]/80 hover:bg-[var(--navy)] text-white border border-white/20 transition-all opacity-80 hover:opacity-100 cursor-pointer shadow-md"
                    aria-label="Next image"
                  >
                    <FiChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Lightbox Maximize Overlay Button */}
              <button
                onClick={() => {
                  setLightboxIndex(activeImageIndex);
                  resetZoom();
                }}
                className="absolute bottom-3 right-3 px-3 py-1.5 bg-[var(--navy)]/90 hover:bg-[var(--navy)] text-[var(--gold)] border border-[var(--gold)]/30 font-mono text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors shadow-md"
              >
                <FiMaximize2 className="w-3.5 h-3.5" />
                <span>EXPAND FULLSCREEN</span>
              </button>
            </div>

            {/* Thumbnail Navigation Row with Auto-Scroll */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    ref={(el) => {
                      thumbnailRefs.current[idx] = el;
                    }}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-28 sm:w-36 aspect-video shrink-0 border-2 overflow-hidden cursor-pointer transition-all ${
                      activeImageIndex === idx
                        ? "border-[var(--green)] ring-2 ring-[var(--green)]/50 scale-105 opacity-100 z-10"
                        : "border-[var(--navy)]/40 opacity-70 hover:opacity-100 hover:border-[var(--navy)]"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="150px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Main Content: Overview & Features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Descriptions & General Features */}
          <div className="lg:col-span-7 space-y-8">
            {/* Overview */}
            <div className="bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b-2 border-[var(--navy)]">
                <FiLayers className="w-5 h-5 text-[var(--green)]" />
                <h2 className="font-display font-extrabold text-xl text-[var(--navy)]">
                  {t.projects.details.overviewTitle}
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[var(--navy)]/90 font-sans leading-relaxed">
                {fullDesc}
              </p>

              {(role || contributionList.length > 0) && (
                <div className="border-t border-[var(--navy)]/10 pt-4 space-y-4">
                  {role && (
                    <div>
                      <span className="font-mono text-xs font-bold text-[var(--navy)] uppercase tracking-wider block mb-1">
                        {"//"} {t.projects.details.roleTitle}:
                      </span>
                      <p className="text-sm sm:text-base font-bold text-[var(--green)] font-sans">
                        {role}
                      </p>
                    </div>
                  )}
                  {contributionList.length > 0 && (
                    <div>
                      <span className="font-mono text-xs font-bold text-[var(--navy)] uppercase tracking-wider block mb-2">
                        {"//"} {t.projects.details.contributionTitle}:
                      </span>
                      <ul className="space-y-2">
                        {contributionList.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--navy)]/90 font-sans leading-relaxed"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] shrink-0 mt-2" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* General Features */}
            {generalFeatures.length > 0 && (
              <div className="bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b-2 border-[var(--navy)]">
                  <FiCheckCircle className="w-5 h-5 text-[var(--green)]" />
                  <h2 className="font-display font-extrabold text-xl text-[var(--navy)]">
                    {t.projects.details.featuresGeneralTitle}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {generalFeatures.map((feat, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-xs sm:text-sm text-[var(--navy)]/90 font-sans leading-relaxed"
                    >
                      <span className="w-5 h-5 bg-[var(--green-muted)] text-[var(--green)] border border-[var(--green)] flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Nerd Architecture Features */}
          <div className="lg:col-span-5 space-y-8">
            {nerdFeatures.length > 0 && (
              <div className="bg-[var(--navy-dark)] text-[var(--surface)] border-2 border-[var(--navy)] retro-shadow-lg p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b-2 border-[var(--gold)]">
                  <FiCpu className="w-5 h-5 text-[var(--gold)]" />
                  <h2 className="font-display font-extrabold text-lg sm:text-xl text-white">
                    {t.projects.details.featuresNerdTitle}
                  </h2>
                </div>
                <p className="text-xs font-mono text-[var(--gold)]">
                  {"// DEEP_TECH_SPECS & INTEGRATION"}
                </p>
                <ul className="space-y-3">
                  {nerdFeatures.map((feat, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm font-mono text-white/90 leading-relaxed bg-[var(--navy)] p-2.5 border border-white/15"
                    >
                      <span className="text-[var(--gold)] font-bold shrink-0">&gt;</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Gallery Grid (All 16:9 Screenshots) */}
        {images.length > 0 && (
          <div className="bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[var(--navy)]">
              <div className="flex items-center gap-2">
                <FiImage className="w-5 h-5 text-[var(--green)]" />
                <h2 className="font-display font-extrabold text-xl text-[var(--navy)]">
                  {t.projects.details.galleryTitle}
                </h2>
              </div>
              <span className="font-mono text-xs text-[var(--navy)]/60 font-bold">
                {images.length} SCREENSHOTS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveImageIndex(idx);
                    setLightboxIndex(idx);
                    resetZoom();
                  }}
                  className="relative w-full aspect-video border-2 border-[var(--navy)] overflow-hidden bg-[var(--navy-dark)] cursor-pointer group hover:retro-shadow transition-all duration-200"
                >
                  <Image
                    src={img}
                    alt={`${project.name} preview ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 550px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-[var(--navy)]/0 group-hover:bg-[var(--navy)]/30 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--navy)] text-[var(--gold)] font-mono text-xs font-bold px-3 py-1.5 border border-[var(--gold)] flex items-center gap-2 shadow-lg">
                      <FiMaximize2 className="w-3.5 h-3.5" />
                      VIEW {idx + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* True Fullscreen Lightbox Modal (No Background Bleed, Trackpad Pinch Prevention) */}
        {lightboxIndex !== null && images[lightboxIndex] && (
          <div
            ref={modalRef}
            className="fixed inset-0 z-50 w-screen h-screen bg-black overflow-hidden flex flex-col justify-between select-none"
          >
            {/* Top Toolbar */}
            <div className="relative z-30 h-14 px-4 sm:px-6 bg-[#0b132b] text-white flex items-center justify-between border-b border-white/20 font-mono text-xs shadow-md shrink-0">
              <div className="flex items-center gap-3 truncate">
                <Badge variant="gold" size="sm">
                  {project.id}
                </Badge>
                <span className="hidden sm:inline font-bold truncate text-white/90">
                  {project.name}
                </span>
                <span className="text-[var(--green)] font-bold">
                  [{lightboxIndex + 1}/{images.length}]
                </span>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={handleZoomOut}
                  disabled={zoomScale <= 1}
                  className="p-1.5 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 text-white rounded-xs transition-colors cursor-pointer"
                  title="Zoom Out (-)"
                  aria-label="Zoom Out"
                >
                  <FiZoomOut className="w-4 h-4" />
                </button>

                <span className="px-2 py-0.5 bg-black/60 text-[var(--gold)] font-bold text-[11px] min-w-[50px] text-center border border-white/10">
                  {Math.round(zoomScale * 100)}%
                </span>

                <button
                  onClick={handleZoomIn}
                  disabled={zoomScale >= 4.5}
                  className="p-1.5 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 text-white rounded-xs transition-colors cursor-pointer"
                  title="Zoom In (+)"
                  aria-label="Zoom In"
                >
                  <FiZoomIn className="w-4 h-4" />
                </button>

                {zoomScale > 1 && (
                  <button
                    onClick={resetZoom}
                    className="p-1.5 bg-white/10 hover:bg-white/20 text-[var(--green)] rounded-xs transition-colors cursor-pointer flex items-center gap-1"
                    title="Reset Zoom"
                    aria-label="Reset Zoom"
                  >
                    <FiRefreshCw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline text-[10px] font-bold">RESET</span>
                  </button>
                )}

                <div className="w-px h-5 bg-white/20 mx-1 sm:mx-2" />

                {/* Close Button */}
                <button
                  onClick={() => {
                    setLightboxIndex(null);
                    resetZoom();
                  }}
                  className="p-1.5 bg-red-600/90 hover:bg-red-600 text-white border border-red-400/40 rounded-xs cursor-pointer transition-colors flex items-center gap-1 font-bold"
                  aria-label="Close modal"
                >
                  <FiX className="w-4 h-4" />
                  <span className="hidden sm:inline text-[10px]">ESC</span>
                </button>
              </div>
            </div>

            {/* Main Fullscreen Display Area */}
            <div
              className={`relative flex-1 w-full h-full overflow-hidden flex items-center justify-center bg-black ${
                zoomScale > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in"
              }`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
              onDoubleClick={handleDoubleClick}
            >
              <div
                className="relative w-full h-full transition-transform duration-75 ease-out flex items-center justify-center p-2 sm:p-4"
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomScale})`,
                }}
              >
                <Image
                  src={images[lightboxIndex]}
                  alt={`${project.name} screenshot ${lightboxIndex + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain pointer-events-none select-none drop-shadow-2xl"
                  priority
                />
              </div>

              {/* Prev & Next Floating Navigation Buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLightboxPrev();
                    }}
                    className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-[#0b132b]/90 hover:bg-[#0b132b] text-[var(--gold)] border border-[var(--gold)]/50 transition-all cursor-pointer shadow-2xl rounded-xs"
                    aria-label="Previous image"
                  >
                    <FiChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLightboxNext();
                    }}
                    className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-[#0b132b]/90 hover:bg-[#0b132b] text-[var(--gold)] border border-[var(--gold)]/50 transition-all cursor-pointer shadow-2xl rounded-xs"
                    aria-label="Next image"
                  >
                    <FiChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
                  </button>
                </>
              )}

              {/* Hint Bar */}
              {zoomScale === 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1 bg-black/80 text-white/80 font-mono text-[10px] border border-white/20 rounded-full pointer-events-none hidden sm:block shadow-md">
                  Pinch or double-click to zoom &bull; Drag to pan
                </div>
              )}
            </div>

            {/* Bottom Thumbnail Strip inside Lightbox Modal (100% Solid Solid Background) */}
            {images.length > 1 && (
              <div className="relative z-30 h-20 bg-[#0b132b] border-t border-white/20 px-4 flex items-center justify-center shrink-0 w-full">
                <div className="flex items-center gap-3 overflow-x-auto py-2 max-w-5xl scrollbar-thin">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      ref={(el) => {
                        lightboxThumbnailRefs.current[idx] = el;
                      }}
                      onClick={() => {
                        resetZoom();
                        setLightboxIndex(idx);
                        setActiveImageIndex(idx);
                      }}
                      className={`relative w-20 sm:w-24 aspect-video shrink-0 border-2 overflow-hidden cursor-pointer transition-all ${
                        lightboxIndex === idx
                          ? "border-[var(--green)] ring-2 ring-[var(--green)]/60 scale-105 opacity-100 z-10"
                          : "border-white/30 opacity-60 hover:opacity-100 hover:border-white/70"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Lightbox thumbnail ${idx + 1}`}
                        fill
                        sizes="100px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Project Pagination Navigation */}
        <div className="border-t-2 border-[var(--navy)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-2 p-3 bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow-sm hover:bg-[var(--surface-light)] transition-colors font-bold text-[var(--navy)]"
            >
              <FiArrowLeft className="w-4 h-4" />
              <div className="text-left">
                <span className="text-[10px] text-[var(--navy)]/50 block">PREVIOUS</span>
                <span className="truncate max-w-[200px] block">{prevProject.name}</span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-end gap-2 p-3 bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow-sm hover:bg-[var(--surface-light)] transition-colors font-bold text-[var(--navy)]"
            >
              <div className="text-right">
                <span className="text-[10px] text-[var(--navy)]/50 block">NEXT</span>
                <span className="truncate max-w-[200px] block">{nextProject.name}</span>
              </div>
              <FiArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};
