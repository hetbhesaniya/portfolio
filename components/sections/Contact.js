import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Instagram, Send, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "@/components/layout/ThemeProvider";
import emailjs from '@emailjs/browser';
import SectionHeader from "@/components/common/SectionHeader";

export default function Contact() {
    const { theme } = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        
        try {
            const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
            const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
            const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

            if (!serviceId || !templateId || !publicKey) {
                throw new Error('EmailJS configuration is missing. Please check your environment variables.');
            }

            await emailjs.send(
                serviceId,
                templateId,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message,
                    to_name: 'Het Bhesaniya',
                },
                publicKey
            );

            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });
            
            setTimeout(() => {
                setSubmitStatus(null);
            }, 5000);
        } catch {
            setSubmitStatus('error');
            
            setTimeout(() => {
                setSubmitStatus(null);
            }, 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const contactInfo = [
        {
            icon: Mail,
            label: "Email",
            value: "hetbhesaniya0096@gmail.com",
            link: "mailto:hetbhesaniya0096@gmail.com"
        },
        {
            icon: Phone,
            label: "Phone",
            value: "+1 (623) 296-3036",
            link: "tel:+16232963036"
        },
        {
            icon: MapPin,
            label: "Location",
            value: "Tempe, AZ • USA",
            link: null
        }
    ];

    const socialLinks = [
        { icon: Github, link: "https://github.com/hetbhesaniya", label: "GitHub" },
        { icon: Linkedin, link: "https://www.linkedin.com/in/het-bhesaniya/", label: "LinkedIn" },
        { icon: Instagram, link: "https://www.instagram.com/het__oo96", label: "Instagram" }
    ];

    return (
        <section id="contact" className="py-20" style={{ background: 'var(--asu-ink)' }}>
            <div className="container mx-auto px-6">
                <SectionHeader 
                    title="Lets Connect" 
                    subtitle="Open to collaborations, opportunities, or just a good tech chat." 
                />

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-2xl font-bold mb-6 uppercase tracking-widest" style={{ color: 'var(--heading-accent)' }}>Get in Touch</h3>
                            <div className="space-y-6">
                                {contactInfo.map((info, index) => (
                                    <motion.div
                                        key={info.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.1 * index }}
                                        className="flex items-center space-x-4"
                                    >
                                        <div className="p-3 rounded-md" style={{ background: theme === 'asu-dark' ? 'rgba(255,198,39,0.12)' : 'rgba(140,29,64,0.12)' }}>
                                            <info.icon className="w-5 h-5" style={{ color: theme === 'asu-dark' ? 'var(--asu-gold)' : 'var(--asu-maroon)' }} />
                                        </div>
                                        <div>
                                            <p className="text-sm" style={{ color: 'var(--asu-text-muted)' }}>{info.label}</p>
                                            {info.link ? (
                                                <a
                                                    href={info.link}
                                                    className="transition-colors duration-300"
                                                    style={{ color: 'var(--asu-text)' }}
                                                >
                                                    {info.value}
                                                </a>
                                            ) : (
                                                <p style={{ color: 'var(--asu-text)' }}>{info.value}</p>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold mb-6 uppercase tracking-widest" style={{ color: 'var(--heading-accent)' }}>Social Network</h3>
                            <div className="flex space-x-4">
                                {socialLinks.map((social) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, y: -5 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="p-3 rounded-md transition-all duration-300"
                                        style={{ background: 'var(--asu-ink)', color: 'var(--asu-text-muted)', border: '1px solid var(--asu-border)' }}
                                    >
                                        <social.icon size={24} />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="p-8 rounded-md border"
                        style={{ background: 'var(--asu-ink)', borderColor: 'var(--asu-border)' }}
                    >
                        <h3 className="text-2xl font-bold mb-6 uppercase tracking-widest" style={{ color: 'var(--heading-accent)' }}>Send Message</h3>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Input
                                    type="text"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    required
                                    className="rounded-sm"
                                    style={{ background: 'var(--asu-sand)', borderColor: 'var(--asu-border)', color: 'var(--asu-text)' }}
                                />
                            </div>
                            
                            <div>
                                <Input
                                    type="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    required
                                    className="rounded-sm"
                                    style={{ background: 'var(--asu-sand)', borderColor: 'var(--asu-border)', color: 'var(--asu-text)' }}
                                />
                            </div>
                            
                            <div>
                                <Textarea
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={(e) => handleInputChange('message', e.target.value)}
                                    required
                                    rows={6}
                                    className="resize-none rounded-sm"
                                    style={{ background: 'var(--asu-sand)', borderColor: 'var(--asu-border)', color: 'var(--asu-text)' }}
                                />
                            </div>
                            
                            {submitStatus === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 rounded-md flex items-center space-x-3"
                                    style={{ 
                                        background: 'rgba(76, 175, 80, 0.1)', 
                                        border: '1px solid rgba(76, 175, 80, 0.3)',
                                        color: '#4caf50'
                                    }}
                                >
                                    <CheckCircle size={20} />
                                    <span className="font-medium">Message sent successfully! I'll get back to you soon.</span>
                                </motion.div>
                            )}
                            
                            {submitStatus === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 rounded-md flex items-center space-x-3"
                                    style={{ 
                                        background: 'rgba(244, 67, 54, 0.1)', 
                                        border: '1px solid rgba(244, 67, 54, 0.3)',
                                        color: '#f44336'
                                    }}
                                >
                                    <XCircle size={20} />
                                    <span className="font-medium">Failed to send message. Please try again or email me directly.</span>
                                </motion.div>
                            )}

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 rounded-sm asu-btn-primary asu-gold-glow"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="animate-spin w-4 h-4 border-2 border-black border-t-transparent rounded-full"></div>
                                        <span>Sending...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center space-x-2">
                                        <Send size={16} />
                                        <span>Transmit Message</span>
                                    </div>
                                )}
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
