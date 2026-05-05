import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { HowItWorks } from "@/components/how-it-works";
import { Pricing } from "@/components/pricing";
import { Gallery } from "@/components/gallery";
import { Testimonials } from "@/components/testimonials";
import { BookingForm } from "@/components/booking-form";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <HowItWorks />
      <Pricing />
      <Gallery />
      <Testimonials />
      <BookingForm />
      <Contact />
      <Footer />
    </div>
  );
}
