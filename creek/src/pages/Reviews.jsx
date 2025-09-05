import React from "react";
import ReviewsSection from "../components/ReviewsSection";
import Contact from "../components/Contact";
import RatingsSection from "../components/RatingsSection";
import QuoteScroll from "../components/QuoteScroll";
import MovieGallery from "../components/MovieGallery";


export default function Reviews() {
    return (
       <>
       <ReviewsSection />
       <RatingsSection />
       <QuoteScroll />

       <MovieGallery />

       <Contact />

       
       
       </>
    );
}