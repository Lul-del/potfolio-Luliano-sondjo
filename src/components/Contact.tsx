import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Send, CheckCircle2, AlertCircle, Loader2, Phone } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { SectionTitle } from './SectionTitle';
import { GithubIcon, LinkedinIcon, WhatsAppIcon, XIcon, InstagramIcon, BehanceIcon } from './icons';

const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';

const contactInfo = [
  { icon: <Mail  className="w-5 h-5" />, label: 'Email',    value: 'cephassondjo@gmail.com' },
  { icon: <Phone className="w-5 h-5" />, label: 'WhatsApp', value: '+229 01 54408382' },
];

const socialLinks = [
  { icon: <GithubIcon    className="w-5 h-5" />, label: 'GitHub',    href: 'https://github.com/Lul-del' },
  { icon: <LinkedinIcon  className="w-5 h-5" />, label: 'LinkedIn',  href: 'https://www.linkedin.com/in/c%C3%A9phas-sondjo-65145b3b6/' },
  { icon: <XIcon         className="w-5 h-5" />, label: 'X/Twitter', href: 'https://x.com/CephasSondjo' },
  { icon: <InstagramIcon className="w-5 h-5" />, label: 'Instagram', href: 'https://www.instagram.com/sondjoluliano/' },
  { icon: <BehanceIcon   className="w-5 h-5" />, label: 'Behance',   href: 'https://behance.net/cephasdev' },
  { icon: <WhatsAppIcon  className="w-5 h-5" />, label: 'WhatsApp',  href: 'https://wa.me/2290154408382' },
];

type Status = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  service: string;
  budget: string;
  delay: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  service?: string;
  budget?: string;
  delay?: string;
  message?: string;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim())    errors.name    = 'Le nom est requis.';
  if (!data.email.trim()) {
    errors.email = "L'email est requis.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Email invalide.';
  }
  if (!data.service.trim()) errors.service = 'Le service est requis.';
  if (!data.message.trim()) errors.message = 'Le message est requis.';
  else if (data.message.trim().length < 10) errors.message = 'Message trop court (min 10 caractères).';
  return errors;
}

export function Contact() {
  const { ref, inView } = useInView();
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState<FormData>({ name: '', email: '', service: '', budget: '', delay: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('loading');
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current!,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setStatus('success');
      setForm({ name: '', email: '', service: '', budget: '', delay: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-all text-sm ${
      errors[field]
        ? 'border-rose-500/60 focus:border-rose-500/80 focus:ring-rose-500/20'
        : 'border-white/10 focus:border-violet-500/50 focus:ring-violet-500/20'
    }`;

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 dot-bg opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionTitle sub="contact" title="Parlons de ton projet" desc="Remplis le formulaire : la demande apparaîtra dans la page admin de ce portfolio." />

        <div ref={ref} className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left - Info */}
          <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="space-y-5 sm:space-y-6 mb-8 sm:mb-10">
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                <span className="text-white font-semibold">Disponible pour missions freelance.</span>{' '}
                Site web, dashboard, application mobile, automatisation IA ou amélioration d'un produit existant.
              </p>

              {contactInfo.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">{item.label}</p>
                    <p className="text-white font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {socialLinks.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-violet-500/20 hover:border-violet-500/30 transition-all hover:scale-110">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="glass-card rounded-2xl p-5 sm:p-7 lg:p-8 border-gradient">
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Nom</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass('name')}
                      placeholder="Votre nom"
                    />
                    {errors.name && <p className="mt-1 text-xs text-rose-400">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass('email')}
                      placeholder="votre@email.com"
                    />
                    {errors.email && <p className="mt-1 text-xs text-rose-400">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Service</label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    aria-label="Service souhaité"
                    className={`${inputClass('service')} appearance-none`}
                  >
                    <option value="" disabled className="bg-[#1C1C2A]">Choisir un service</option>
                    <option value="Site web" className="bg-[#1C1C2A]">Site web</option>
                    <option value="Dashboard" className="bg-[#1C1C2A]">Dashboard</option>
                    <option value="Application mobile" className="bg-[#1C1C2A]">Application mobile</option>
                    <option value="Automatisation IA" className="bg-[#1C1C2A]">Automatisation IA</option>
                    <option value="Amélioration produit existant" className="bg-[#1C1C2A]">Amélioration produit existant</option>
                    <option value="Autre" className="bg-[#1C1C2A]">Autre</option>
                  </select>
                  {errors.service && <p className="mt-1 text-xs text-rose-400">{errors.service}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Budget</label>
                    <input
                      type="text"
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className={inputClass('budget')}
                      placeholder="ex: 300 000 FCFA"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Délai souhaité</label>
                    <input
                      type="text"
                      name="delay"
                      value={form.delay}
                      onChange={handleChange}
                      className={inputClass('delay')}
                      placeholder="ex: 3 semaines"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Message</label>
                  <textarea
                    rows={4}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass('message')} resize-none`}
                    placeholder="Décrivez votre projet..."
                  />
                  {errors.message && <p className="mt-1 text-xs text-rose-400">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 rounded-xl bg-violet-500 text-[#0D0D13] font-semibold flex items-center justify-center gap-2 hover:bg-violet-400 transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                >
                  {status === 'loading' && <><Loader2 className="w-5 h-5 animate-spin" /> Envoi en cours...</>}
                  {status === 'success' && <><CheckCircle2 className="w-5 h-5" /> Demande envoyée !</>}
                  {status === 'error'   && <><AlertCircle className="w-5 h-5" /> Erreur — réessaie</>}
                  {status === 'idle'    && <><Send className="w-5 h-5" /> Envoyer la demande</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
