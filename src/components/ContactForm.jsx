import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, Zap, Clock, Globe } from 'lucide-react';
import { PROPERTY_DETAILS, HOUSE_RULES } from '../data/roomsData';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Format message for direct WhatsApp or email submission
    const msg = `New Message from Website Contact Form:
- *Name*: ${formData.name}
- *Email*: ${formData.email}
- *Phone*: ${formData.phone}
- *Subject*: ${formData.subject}
- *Message*: ${formData.message}`;

    const url = `https://wa.me/${PROPERTY_DETAILS.phoneClean}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-stone-100/80 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-500/30">
            <Mail className="w-3.5 h-3.5" /> Get in Touch
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950 mb-3">
            Contact Paradise Bungalow
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            Have questions about room availability, airport transfers, or custom arrangements? Send us a message and our team will respond right away.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-emerald-950 to-emerald-900 text-white p-8 rounded-3xl shadow-xl shadow-emerald-950/10 border border-emerald-800/40">
              <h3 className="font-serif text-2xl font-bold mb-6">
                Host Direct Contact
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-stone-300">Phone & WhatsApp</div>
                    <a href={`tel:${PROPERTY_DETAILS.phoneClean}`} className="font-bold hover:text-amber-300 transition-colors">
                      {PROPERTY_DETAILS.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-stone-300">Official Email</div>
                    <a href={`mailto:${PROPERTY_DETAILS.email}`} className="font-bold hover:text-amber-300 transition-colors">
                      {PROPERTY_DETAILS.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-stone-300">Address</div>
                    <div className="font-bold text-stone-100">
                      Midigama, Weligama, Southern Province, Sri Lanka
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-stone-300">Front Desk Hours</div>
                    <div className="font-semibold text-stone-200">
                      Check-in: {HOUSE_RULES.checkIn} • Check-out: {HOUSE_RULES.checkOut}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-stone-300">Languages Spoken</div>
                    <div className="font-semibold text-stone-200">
                      {HOUSE_RULES.languages.join(' • ')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Note */}
            <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl text-amber-950 text-xs sm:text-sm">
              <span className="font-bold flex items-center gap-1.5 mb-1">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                Fast Response Guarantee
              </span>
              For instant response, you can message host directly via WhatsApp or call our phone line at any time.
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-xl shadow-emerald-950/5">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-emerald-950">
                  Thank You for Reaching Out!
                </h3>
                <p className="text-stone-600 text-sm max-w-md mx-auto">
                  Your inquiry message has been submitted. Our team will review your request and contact you immediately.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-emerald-900 hover:bg-emerald-800 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-serif text-2xl font-bold text-emerald-950 mb-2">
                  Send Us a Direct Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none bg-stone-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none bg-stone-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1.5">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 234 567 890"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none bg-stone-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1.5">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full p-3.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none bg-stone-50"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Room Availability & Rates">Room Availability & Rates</option>
                      <option value="Airport Transfer & Shuttle">Airport Transfer & Shuttle</option>
                      <option value="Long Term / Group Stay">Long Term / Group Stay</option>
                      <option value="Special Request">Special Request</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Write your questions or details here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none bg-stone-50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-emerald-950 to-emerald-900 hover:from-emerald-900 hover:to-emerald-800 transition-all shadow-lg shadow-emerald-950/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5 text-amber-400" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
