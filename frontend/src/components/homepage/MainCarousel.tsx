import React, { act, useState } from "react";
import { Box, IconButton, MobileStepper } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

type CarouselSlide = {
  id: number;
  image: string;
  alt_text: string;
  caption?: string;
  link_url?: string;
  sort_order?: number;
};

interface MainCarouselProps {
  slides: CarouselSlide[];
}

export default function MainCarousel({ slides }: MainCarouselProps): JSX.Element{
  const [activeStep, setActiveStep] = useState<number>(0);
  const maxSteps: number = slides && slides.length;

  const handleNext = (): void => {
    setActiveStep((prevStep) => (prevStep+1) % maxSteps);
  };

  const handleBack = (): void => {
    setActiveStep((prevStep) => (prevStep === 0 ? maxSteps - 1 : prevStep - 1 ));
  };

  if (!slides || slides.length === 0){
    return null;
  }

  const currentSlide = slides[activeStep];

  return (
    <Box sx={{ display: "flex", justifyContent: "center"}}>
      <Box sx={{ maxWidth: 1600, flexGrow: 1, position: "relative"}}>
        {/* Image (with optional link) */}
        {currentSlide.link_url ? (
          <a href={currentSlide.link_url} target="_blank" rel="noopener noreferrer">
            <Box
              component="img"
              src={currentSlide.image}
              alt={currentSlide.alt_text}
              sx={{
                width: "100%",
                maxHeight: 600,
                objectFit: "cover",
                cursor: "pointer",
              }} />
          </a>
        ) : (
            <Box
            component="img"
            src={currentSlide.image}
            alt={currentSlide.alt_text}
            sx={{
              width: "100%",
              maxHeight: 600,
              objectFit: "cover",
            }}
          />
        )}

        {/* Caption */}
        {currentSlide.caption && (
          <Box
            sx={{
              position: "absolute",
              bottom: 30,
              left: 0,
              width: "100%",
              color: "#fff",
              bgcolor: "rgba(0,0,0,0.4)",
              textAlign: "center",
              py: 1,
              fontSize: 20,
              fontWeight: 500,
            }}
          >
            {currentSlide.caption}
          </Box>
        )}

         {/* Left Arrow */}
        <IconButton
          onClick={handleBack}
          sx={{
            position: "absolute",
            top: "50%",
            left: 10,
            transform: "translateY(-50%)",
            bgcolor: "rgba(255,255,255,0.7)",
          }}
        >
          <KeyboardArrowLeft />
        </IconButton>

        {/* Right Arrow */}
        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            top: "50%",
            right: 10,
            transform: "translateY(-50%)",
            bgcolor: "rgba(255,255,255,0.7)",
          }}
        >
          <KeyboardArrowRight />
        </IconButton>

        {/* Bottom Circles */}
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{
            justifyContent: "center",
            bgcolor: "transparent",
            mt: 1,
          }}
          backButton={null}
          nextButton={null}
        />


      </Box>

    </Box>
  )
}