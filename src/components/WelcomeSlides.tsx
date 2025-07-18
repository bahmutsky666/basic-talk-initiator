import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Sparkles, Target, Users, Zap } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Welcome to Your Journey",
    subtitle: "Discover endless possibilities",
    description: "Start your amazing adventure with us and unlock your full potential.",
    icon: Sparkles,
    gradient: "bg-gradient-hero"
  },
  {
    id: 2,
    title: "Set Your Goals",
    subtitle: "Define your success",
    description: "Create clear objectives and milestones that will guide you toward achievement.",
    icon: Target,
    gradient: "bg-gradient-primary"
  },
  {
    id: 3,
    title: "Build Community",
    subtitle: "Connect with others",
    description: "Join a vibrant community of like-minded individuals on similar journeys.",
    icon: Users,
    gradient: "bg-gradient-accent"
  },
  {
    id: 4,
    title: "Take Action",
    subtitle: "Transform your vision",
    description: "Turn your ideas into reality with powerful tools and unwavering support.",
    icon: Zap,
    gradient: "bg-gradient-primary"
  }
];

export const WelcomeSlides = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const currentSlideData = slides[currentSlide];
  const IconComponent = currentSlideData.icon;

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Main slide container */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        {/* Background gradient */}
        <div 
          className={`absolute inset-0 ${currentSlideData.gradient} opacity-10 transition-all duration-1000`}
        />
        
        {/* Slide content */}
        <Card className="relative z-10 max-w-4xl w-full p-8 md:p-12 bg-card/80 backdrop-blur-sm border-0 shadow-elegant">
          <div className="text-center space-y-8">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="p-6 rounded-full bg-gradient-primary shadow-glow animate-scale-in">
                <IconComponent className="w-12 h-12 text-primary-foreground" />
              </div>
            </div>

            {/* Title */}
            <div className="space-y-4 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                {currentSlideData.title}
              </h1>
              <h2 className="text-xl md:text-2xl text-muted-foreground font-medium">
                {currentSlideData.subtitle}
              </h2>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in">
              {currentSlideData.description}
            </p>

            {/* Navigation buttons */}
            <div className="flex items-center justify-center gap-4 pt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="rounded-full shadow-elegant hover:shadow-glow transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <div className="flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-primary shadow-glow scale-125"
                        : "bg-muted hover:bg-primary/50"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="rounded-full shadow-elegant hover:shadow-glow transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Action button */}
            <div className="pt-4">
              <Button 
                size="lg" 
                className="px-8 py-3 text-lg shadow-elegant hover:shadow-glow transition-all duration-300 bg-gradient-primary border-0"
              >
                Get Started
              </Button>
            </div>
          </div>
        </Card>

        {/* Progress bar */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-primary transition-all duration-300 rounded-full"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};