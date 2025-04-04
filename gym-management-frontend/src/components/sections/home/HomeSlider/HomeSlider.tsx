import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/swiper-bundle.css"; // Import tất cả các style cần thiết

import Button from "../../../common/Button";

interface SlideProps {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  cta: {
    primary: {
      text: string;
      link: string;
    };
    secondary?: {
      text: string;
      link: string;
    };
  };
}

const slides: SlideProps[] = [
  {
    id: 1,
    image: "/images/hero/slide-1.jpg",
    title: "Transform Your Body",
    subtitle: "START YOUR FITNESS JOURNEY TODAY",
    description:
      "Join our fitness community and achieve your health goals with personalized training programs.",
    cta: {
      primary: {
        text: "Join Now",
        link: "/contact",
      },
      secondary: {
        text: "Learn More",
        link: "/about",
      },
    },
  },
  {
    id: 2,
    image: "/images/hero/slide-2.jpg",
    title: "Expert Trainers",
    subtitle: "PROFESSIONAL GUIDANCE",
    description:
      "Our certified trainers will help you reach your fitness goals safely and effectively.",
    cta: {
      primary: {
        text: "Meet Our Team",
        link: "/about/team",
      },
      secondary: {
        text: "Book a Session",
        link: "/schedule",
      },
    },
  },
  {
    id: 3,
    image: "/images/hero/slide-3.jpg",
    title: "Modern Facilities",
    subtitle: "STATE-OF-THE-ART EQUIPMENT",
    description:
      "Train with the latest fitness equipment in our spacious and modern gym facilities.",
    cta: {
      primary: {
        text: "View Facilities",
        link: "/about/facilities",
      },
      secondary: {
        text: "Free Trial",
        link: "/contact",
      },
    },
  },
];

const HomeSlider: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const slideVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  if (!isClient) {
    return <div className="h-screen bg-gray-900"></div>;
  }

  return (
    <section className="relative h-screen min-h-[600px] w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} w-3 h-3"></span>`;
          },
        }}
        navigation
        loop
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative flex h-full w-full items-center px-4 md:px-12 lg:px-24"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="container mx-auto max-w-4xl text-white">
                <motion.h3
                  custom={0}
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  className="mb-4 text-lg font-bold tracking-wider text-[#0CC6F0] md:text-xl"
                >
                  {slide.subtitle}
                </motion.h3>
                <motion.h1
                  custom={1}
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl"
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  custom={2}
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  className="mb-8 max-w-3xl text-lg text-gray-200 md:text-xl"
                >
                  {slide.description}
                </motion.p>
                <motion.div
                  custom={3}
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-wrap gap-4"
                >
                  <Button size="large" as={Link} to={slide.cta.primary.link}>
                    {slide.cta.primary.text}
                  </Button>
                  {slide.cta.secondary && (
                    <Button
                      variant="outline"
                      size="large"
                      as={Link}
                      to={slide.cta.secondary.link}
                    >
                      {slide.cta.secondary.text}
                    </Button>
                  )}
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-pagination absolute bottom-10 left-0 right-0 z-10"></div>
    </section>
  );
};

export default HomeSlider;
