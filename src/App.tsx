import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PhoneCall, 
  MessageCircle, 
  ShieldCheck, 
  Clock, 
  CheckCircle2,
  Leaf, 
  Menu, 
  X, 
  ArrowRight,
  HeartPulse,
  Baby,
  Activity,
  Wind,
  Stethoscope,
  Microscope,
  MapPin,
  Mail,
  ChevronDown,
  ChevronUp,
  Star,
  Instagram,
  CreditCard
} from 'lucide-react';

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// @ts-ignore
const doctorImage = 'https://drive.google.com/uc?export=view&id=1xvCoYLbquCQ178beYInuauYGI6r6Btu1';
const phoneNumber = "9229396272";
const whatsappUrl = `https://wa.me/91${phoneNumber}?text=Hi Dr. Shivrani, I would like to book an online consultation.`;

// Data
const SERVICES = [
  {
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80",
    icon: <HeartPulse className="w-6 h-6 text-primary-600" />,
    title: "Women's Health",
    desc: "Expert care for PCOS/PCOD, irregular periods, white discharge, and hormonal imbalances."
  },
  {
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&auto=format&fit=crop&q=80",
    icon: <Baby className="w-6 h-6 text-primary-600" />,
    title: "Child Health",
    desc: "Gentle and effective treatments for pediatric issues, immunity building, and growth concerns."
  },
  {
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&auto=format&fit=crop&q=80",
    icon: <Activity className="w-6 h-6 text-primary-600" />,
    title: "Skin & Hair",
    desc: "Natural solutions for acne, eczema, psoriasis, hair fall, and scalp conditions."
  },
  {
    image: "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?w=800&auto=format&fit=crop&q=80",
    icon: <Wind className="w-6 h-6 text-primary-600" />,
    title: "Respiratory & Allergies",
    desc: "Long-term relief from asthma, bronchitis, allergic rhinitis, and chronic cough."
  },
  {
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
    icon: <Microscope className="w-6 h-6 text-primary-600" />,
    title: "Digestive Disorders",
    desc: "Healing for acidity, IBS, gastric issues, constipation, and liver disorders."
  },
  {
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
    icon: <Stethoscope className="w-6 h-6 text-primary-600" />,
    title: "Chronic Diseases",
    desc: "Holistic management of thyroid, diabetes, joint pains, and autoimmune conditions."
  }
];

const FAQS = [
  {
    q: "Is homeopathy safe for children and pregnant women?",
    a: "Yes, homeopathic medicines are highly diluted, natural, and completely safe for people of all ages, including infants, pregnant women, and the elderly. They have no side effects."
  },
  {
    q: "How does the online consultation work?",
    a: "It's simple! You book an appointment via WhatsApp or Call. Dr. Shivrani will conduct a detailed case study over a voice or video call. After diagnosis, the prescribed customized medicines are either sent to your address or you can get them locally."
  },
  {
    q: "How long does the treatment take to show results?",
    a: "The duration varies depending on whether the disease is acute (short-term) or chronic (long-term). Acute problems like cold or fever can show results in a day, while chronic issues like PCOS or skin diseases may take a few months of regular treatment."
  },
  {
    q: "Do I need to follow any dietary restrictions?",
    a: "Usually, strong-smelling substances like raw onion, garlic, or coffee are asked to be avoided 15 minutes before and after taking the medicine, as homeopathic medicines act through nerve endings on the tongue."
  }
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    review: "Dr. Shivrani is amazing! She patiently listened to all my issues and the medicines worked wonders for my PCOS.",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    review: "I had severe skin allergies for years. After 3 months of homeopathic treatment, I am almost completely cured. Highly recommend!",
    rating: 5,
  },
  {
    name: "Sunita Devi",
    review: "Very convenient online consultation. The medicines were delivered on time and my child's immunity has significantly improved.",
    rating: 5,
  }
];

// Components
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />
            <span className="font-serif font-bold text-xl sm:text-2xl text-primary-900">Elixir Homoeo</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">About</a>
            <a href="#services" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">Treatments</a>
            <a href="#how-it-works" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">How it Works</a>
            <a href="#faq" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">FAQ</a>
            <a 
              href="https://www.instagram.com/dr._shivrani?igsh=djFpM2tpY2NjZHFq" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-pink-600 transition-colors flex items-center justify-center"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href={`tel:+91${phoneNumber}`}
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-primary-700 transition-colors shadow-sm"
            >
              <PhoneCall className="w-4 h-4" />
              Call Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-primary-600 p-2">
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-20 left-0 w-full bg-white shadow-xl border-b border-slate-100"
          >
            <div className="px-4 py-6 flex flex-col space-y-4">
              <a href="#about" onClick={() => setIsOpen(false)} className="text-slate-800 hover:text-primary-600 font-medium text-lg px-4 py-2 bg-slate-50 rounded-xl transition-colors">About</a>
              <a href="#services" onClick={() => setIsOpen(false)} className="text-slate-800 hover:text-primary-600 font-medium text-lg px-4 py-2 bg-slate-50 rounded-xl transition-colors">Treatments</a>
              <a href="#how-it-works" onClick={() => setIsOpen(false)} className="text-slate-800 hover:text-primary-600 font-medium text-lg px-4 py-2 bg-slate-50 rounded-xl transition-colors">How it Works</a>
              <a href="#faq" onClick={() => setIsOpen(false)} className="text-slate-800 hover:text-primary-600 font-medium text-lg px-4 py-2 bg-slate-50 rounded-xl transition-colors">FAQ</a>
              <a 
                href="https://www.instagram.com/dr._shivrani?igsh=djFpM2tpY2NjZHFq" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)} 
                className="text-slate-800 hover:text-pink-600 font-medium text-lg flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl transition-colors"
              >
                <Instagram className="w-5 h-5 text-pink-600" />
                Instagram
              </a>
              <div className="pt-2">
                <a 
                  href={`tel:+91${phoneNumber}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-5 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-md"
                  onClick={() => setIsOpen(false)}
                >
                  <PhoneCall className="w-4 h-4" />
                  Call Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-24 pb-16 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -z-10 translate-x-1/3 -translate-y-1/4">
        <div className="w-[600px] h-[600px] rounded-full bg-primary-50 blur-3xl opacity-60"></div>
      </div>
      <div className="absolute bottom-0 left-0 -z-10 -translate-x-1/3 translate-y-1/4">
        <div className="w-[500px] h-[500px] rounded-full bg-blue-50 blur-3xl opacity-60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
              100% Online Consultation across India
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-900 leading-tight mb-6">
              Natural Healing for Every Age with <span className="text-primary-600">Homeopathy</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
              Expert online homeopathic consultation by <strong className="text-slate-800">Dr. Shivrani Kumari</strong>. Safe, personalized, and effective treatment for chronic and acute diseases—delivered to your home.
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl shadow-primary-600/20 text-sm sm:text-base"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                Book Consultation
              </a>
              <a 
                href={`tel:+91${phoneNumber}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-700 border-2 border-slate-200 px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-semibold hover:border-primary-600 hover:text-primary-600 transition-colors text-sm sm:text-base"
              >
                <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5" />
                Call Now
              </a>
              <a 
                href="https://www.instagram.com/dr._shivrani?igsh=djFpM2tpY2NjZHFq"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-lg text-sm sm:text-base"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                Instagram
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600" />
                <span className="text-xs sm:text-sm font-medium text-slate-600">No Side Effects</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartPulse className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600" />
                <span className="text-xs sm:text-sm font-medium text-slate-600">Holistic Care</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative lg:ml-auto"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] md:aspect-square lg:aspect-[4/5] max-w-md mx-auto shadow-2xl">
              <img 
                src={doctorImage} 
                alt="Doctor consulting" 
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur rounded-2xl p-4 shadow-lg border border-white/20">
                  <h3 className="font-serif font-bold text-lg text-slate-900">Dr. Shivrani Kumari</h3>
                  <p className="text-primary-600 font-medium text-sm">BHMS BU • Reg. 35573</p>
                  <p className="text-slate-500 text-xs mt-1">4+ Years of Clinical Experience</p>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:bottom-auto md:top-12 md:-right-12 bg-white p-3 md:p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 md:gap-4 animate-bounce z-10 w-[90%] md:w-auto" style={{ animationDuration: '3s' }}>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 md:w-6 md:h-6 text-primary-600" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm md:text-base">Available Daily</p>
                <p className="text-xs md:text-sm text-slate-500">10:00 AM - 9:00 PM</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="relative mx-4 md:mx-0">
              <div className="absolute inset-0 bg-primary-600 rounded-[2rem] md:rounded-[3rem] translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4 opacity-10"></div>
              <img 
                src="https://balancingyourhealth.com/wp-content/uploads/2020/03/bigstock-Homeopathic-Medicine-60143171.jpg"
                alt="Natural Homeopathy" 
                className="relative rounded-[2rem] md:rounded-[3rem] shadow-xl w-full object-cover aspect-[4/3] object-[center_20%]"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 lg:pl-8"
          >
            <h2 className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-2">About The Doctor</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6 leading-tight">
              Dedicated to Long-Term Healing and Wellness
            </h3>
            
            <p className="text-slate-600 text-lg mb-6 leading-relaxed">
              <strong>Dr. Shivrani Kumari</strong> (BHMS BU, Reg. 35573) is a dedicated homeopathic physician with over 4 years of clinical experience. At <strong>Elixir Homoeo</strong>, we believe in treating the root cause of the disease, not just suppressing the symptoms.
            </p>
            
            <p className="text-slate-600 mb-8 leading-relaxed">
              While specializing in female health conditions, she provides comprehensive, personalized treatment for children, adults, and the elderly. Every case is studied in profound detail to ensure a prescription that perfectly matches the patient's constitution.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                "Safe & natural treatment",
                "Suitable for all age groups",
                "Personalized case study",
                "No side effects"
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 fill-primary-50" />
                  <span className="text-slate-700 font-medium">{point}</span>
                </div>
              ))}
            </div>

            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 transition-colors group"
            >
              Consult Dr. Shivrani
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-16 md:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-2">Conditions We Treat</h2>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
            Comprehensive Care for Every Stage of Life
          </h3>
          <p className="text-slate-600 text-lg">
            Homeopathy offers gentle, deep-acting remedies that stimulate the body's self-healing mechanisms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute -bottom-6 left-6 w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-lg z-10">
                  {service.icon}
                </div>
              </div>
              <div className="p-6 pt-10">
                <h4 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h4>
                <p className="text-slate-600 leading-relaxed">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-slate-500 mb-6">Don't see your condition listed? We treat a wide variety of acute and chronic ailments.</p>
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-slate-800 transition-colors"
          >
            Ask About Your Condition
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      num: "01",
      title: "Book an Appointment",
      desc: "Reach out via WhatsApp or call to schedule your convenient online consultation time."
    },
    {
      num: "02",
      title: "Detailed Case Study",
      desc: "A thorough phone or video consultation with Dr. Shivrani to understand your physical, mental, and emotional symptoms."
    },
    {
      num: "03",
      title: "Personalized Prescription",
      desc: "Based on the diagnosis, customized medicines are prescribed and can be delivered to your doorstep."
    },
    {
      num: "04",
      title: "Follow-up & Recovery",
      desc: "Regular check-ins to monitor your progress and ensure you are on the path to complete holistic healing."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-20 bg-primary-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary-400 font-bold tracking-wider uppercase text-sm mb-2">Simple Process</h2>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            How Online Consultation Works
          </h3>
          <p className="text-primary-100 text-lg">
            Getting expert homeopathic care is now easier than ever, from the comfort of your home anywhere in India.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-[1px] bg-primary-800"></div>
              )}
              <div className="bg-primary-900 border border-primary-800 rounded-2xl p-6 relative z-10 h-full hover:bg-primary-800 transition-colors">
                <span className="font-serif text-5xl font-bold text-primary-400/30 absolute top-4 right-4 leading-none">
                  {step.num}
                </span>
                <h4 className="text-xl font-bold text-white mb-3 mt-8 relative z-10">{step.title}</h4>
                <p className="text-primary-100/80 leading-relaxed text-sm relative z-10">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 md:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-2">Patient Stories</h2>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
            Hear From Our Patients
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
            >
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed mb-6 italic">"{testimonial.review}"</p>
              <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
              <p className="text-sm text-slate-500">Verified Patient</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-2">Got Questions?</h2>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div 
              key={idx} 
              className={`border rounded-2xl overflow-hidden transition-colors ${openIdx === idx ? 'border-primary-200 bg-primary-50' : 'border-slate-200 bg-white'}`}
            >
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
              >
                <span className="font-bold text-slate-900 pr-8">{faq.q}</span>
                {openIdx === idx ? (
                  <ChevronUp className="w-5 h-5 text-primary-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                )}
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-slate-600 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-16 md:py-20 bg-slate-50 relative pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">
              Start Your Healing Journey Today
            </h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Whether you're dealing with a chronic issue or an acute ailment, homeopathy offers a gentle, permanent cure. Reach out to schedule your online consultation.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                  <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mb-1">Phone & WhatsApp</p>
                  <a href={`tel:+91${phoneNumber}`} className="text-lg sm:text-xl font-bold text-slate-900 hover:text-primary-600 transition-colors">
                    +91 {phoneNumber}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mb-1">Consultation Timings</p>
                  <p className="text-base sm:text-lg font-bold text-slate-900">
                    10:00 AM - 9:00 PM <span className="text-xs sm:text-sm font-normal text-slate-500">(Daily)</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                  <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mb-1">Consultation Fees</p>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-xl sm:text-2xl font-bold text-slate-900">
                      ₹99
                    </p>
                    <a 
                      href="upi://pay?pa=dr.shivranisah143-1@oksbi&pn=Dr.%20Shivrani%20Kumari&cu=INR&am=99"
                      className="inline-flex items-center gap-1.5 bg-primary-600 text-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-primary-700 transition-colors shadow-sm"
                    >
                      Pay Now
                    </a>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">UPI ID: <span className="text-slate-700 select-all">dr.shivranisah143-1@oksbi</span></p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mb-1">Email Us</p>
                  <a href="mailto:dr.shivranisah143@gmail.com" className="text-base sm:text-lg font-bold text-slate-900 hover:text-primary-600 transition-colors break-all">
                    dr.shivranisah143@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-semibold hover:bg-[#1ebd57] transition-colors shadow-lg shadow-green-600/20 text-sm sm:text-base"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                Chat on WhatsApp
              </a>
              <a 
                href="https://www.instagram.com/dr._shivrani?igsh=djFpM2tpY2NjZHFq"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-lg text-sm sm:text-base"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                Instagram
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl border border-slate-100"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Book an Appointment</h3>
            <form className="space-y-6" onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you! However, for prompt response, please contact via WhatsApp or Call.");
            }}>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
                  placeholder="+91"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Briefly describe your condition</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors resize-none"
                  placeholder="Tell us about the symptoms you're experiencing..."
                  required
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
              >
                Send Request <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-center md:items-start text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6 text-primary-500" />
              <span className="font-serif font-bold text-xl text-white">Elixir Homoeo</span>
            </div>
            <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
              Natural healing for every age. Expert online homeopathic consultation for patients across India.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <div className="space-y-2 flex flex-col items-center md:items-start">
              <a href="#about" className="text-sm hover:text-primary-400 transition-colors">About Doctor</a>
              <a href="#services" className="text-sm hover:text-primary-400 transition-colors">Treatments</a>
              <a href="#how-it-works" className="text-sm hover:text-primary-400 transition-colors">How it works</a>
              <a href="#faq" className="text-sm hover:text-primary-400 transition-colors">FAQs</a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white font-bold mb-4">Contact Info</h4>
            <div className="space-y-2 flex flex-col items-center md:items-start text-sm text-slate-400">
              <p>Dr. Shivrani Kumari (BHMS BU)</p>
              <p>Reg No: 35573</p>
              <p>Ph: +91 {phoneNumber}</p>
              <p>Hours: 10:00 AM - 9:00 PM</p>
            </div>
            
            <a 
              href="https://www.instagram.com/dr._shivrani?igsh=djFpM2tpY2NjZHFq" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-6 inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span>Follow on Instagram</span>
            </a>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2024 Elixir Homoeo. All rights reserved.</p>
          <p>Designed for Holistic Health</p>
        </div>
      </div>
    </footer>
  );
}

import { ReviewSection } from './components/ReviewSection';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden selection:bg-primary-200 selection:text-primary-900 font-sans">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <HowItWorks />
        <Testimonials />
        <ReviewSection />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      
      {/* Floating WhatsApp Button for Mobile */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.3)] hover:scale-110 transition-transform z-50 flex items-center justify-center animate-bounce"
        style={{ animationDuration: '3s' }}
      >
        <WhatsappIcon className="w-6 h-6 md:w-8 md:h-8" />
      </a>
    </div>
  );
}
