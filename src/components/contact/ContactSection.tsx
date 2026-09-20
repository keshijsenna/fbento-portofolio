import React, { useState } from 'react';
import { Send, CheckCircle2, Copy, ExternalLink, Terminal } from 'lucide-react';
import { PROFILE_DATA } from '../../data/profile';
import { ScanTitle } from '../common/ScanTitle';
import { Button } from '../common/Button';
import { ScrambleText } from '../animations/ScrambleText';
import { LangCycler } from '../animations/LangCycler';
import { VOCABULARY } from '../../data/languages';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    callsign: '',
    email: '',
    payload: '',
  });
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isDispatched, setIsDispatched] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.payload) return;

    setIsTransmitting(true);
    setTimeout(() => {
      setIsTransmitting(false);
      setIsDispatched(true);
      setFormData({ callsign: '', email: '', payload: '' });
      setTimeout(() => setIsDispatched(false), 5000);
    }, 1200);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(PROFILE_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Ghost Numeral '04' and Section Header */}
      <ScanTitle
        ghostNumber="04"
        eyebrowTag="SECURE CHANNEL // TRANSMISSION"
        line1="INITIATE CONTACT"
        line2={{
          en: 'OPEN FOR CONTRACT',
          jp: '通信回線接続',
          zh: '建立通信信道',
        }}
        subtitle="Direct transmission pipeline for architecture contracts, engineering leadership inquiries, and technical advisory."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Transmission Form (7 cols) */}
        <div className="lg:col-span-7 bg-white border-3 border-[#0a0a0a] shadow-[6px_6px_0px_#0a0a0a] p-6 sm:p-8 bg-card-dots">
          <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-6">
            <span className="font-mono text-xs font-black uppercase text-[#0a0a0a]">
              ENCRYPTED DISPATCH PACKET
            </span>
            <span className="px-2 py-0.5 bg-[#ccff00] text-black border border-black font-mono text-[10px] font-black uppercase">
              STATUS: READY
            </span>
          </div>

          {isDispatched ? (
            <div className="p-8 bg-[#ccff00] border-2 border-black text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-black mx-auto stroke-[2.5]" />
              <div className="font-display text-2xl font-black uppercase text-black">
                TRANSMISSION ACKNOWLEDGED
              </div>
              <p className="font-mono text-xs font-bold text-black max-w-md mx-auto">
                Payload received and queued in operator dispatch buffer. Expect response within 24 standard business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Callsign / Name */}
              <div>
                <label className="block font-mono text-xs font-bold uppercase text-[#0a0a0a] mb-1.5">
                  OPERATOR CALLSIGN / SENDER NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Mercer"
                  value={formData.callsign}
                  onChange={(e) => setFormData({ ...formData, callsign: e.target.value })}
                  className="w-full bg-[#faf9f5] border-2 border-[#0a0a0a] shadow-[2px_2px_0px_#0a0a0a] px-4 py-2.5 font-mono text-sm text-[#0a0a0a] focus:bg-white transition-colors"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block font-mono text-xs font-bold uppercase text-[#0a0a0a] mb-1.5">
                  RETURN FREQUENCY / EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  placeholder="operator@enterprise.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#faf9f5] border-2 border-[#0a0a0a] shadow-[2px_2px_0px_#0a0a0a] px-4 py-2.5 font-mono text-sm text-[#0a0a0a] focus:bg-white transition-colors"
                />
              </div>

              {/* Payload Message */}
              <div>
                <label className="block font-mono text-xs font-bold uppercase text-[#0a0a0a] mb-1.5">
                  PAYLOAD / PROJECT SPECIFICATION
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Outline engineering scope, timelines, or architecture requirements..."
                  value={formData.payload}
                  onChange={(e) => setFormData({ ...formData, payload: e.target.value })}
                  className="w-full bg-[#faf9f5] border-2 border-[#0a0a0a] shadow-[2px_2px_0px_#0a0a0a] px-4 py-2.5 font-mono text-sm text-[#0a0a0a] focus:bg-white transition-colors"
                />
              </div>

              {/* Dispatch Button */}
              <Button
                variant="lime"
                size="lg"
                type="submit"
                disabled={isTransmitting}
                icon={<Send className="w-4 h-4 stroke-[2.5]" />}
                className="w-full"
              >
                {isTransmitting ? 'ENCRYPTING & DISPATCHING...' : 'DISPATCH TRANSMISSION'}
              </Button>
            </form>
          )}
        </div>

        {/* Right Column: Direct Connections & Network Nodes (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Copy Email Box */}
          <div className="bg-[#faf9f5] border-3 border-[#0a0a0a] shadow-[5px_5px_0px_#0a0a0a] p-5 sm:p-6">
            <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-4">
              <span className="font-mono text-xs font-black uppercase text-[#0a0a0a]">
                PRIMARY DISPATCH ADDRESS
              </span>
              <span className="font-mono text-[10px] text-zinc-500 font-bold">UTC+7</span>
            </div>

            <div className="font-mono text-sm sm:text-base font-bold text-black break-all mb-4 select-all">
              {PROFILE_DATA.email}
            </div>

            <Button
              variant={copiedEmail ? 'dark' : 'white'}
              size="sm"
              onClick={copyEmailToClipboard}
              icon={<Copy className="w-3.5 h-3.5" />}
              className="w-full"
            >
              {copiedEmail ? 'COPIED TO CLIPBOARD!' : 'COPY EMAIL TO CLIPBOARD'}
            </Button>
          </div>

          {/* Social Links List */}
          <div className="bg-white border-3 border-[#0a0a0a] shadow-[5px_5px_0px_#0a0a0a] p-5 sm:p-6 space-y-3">
            <div className="border-b-2 border-black pb-2 mb-3 font-mono text-xs font-black uppercase text-[#0a0a0a]">
              CONNECTED NETWORK NODES
            </div>

            {PROFILE_DATA.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.ariaLabel}
                className="flex items-center justify-between p-3 bg-[#faf9f5] border-2 border-black shadow-[2px_2px_0px_#0a0a0a] hover:bg-[#ccff00] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all select-none group"
              >
                <div>
                  <div className="font-mono text-xs font-black uppercase text-black">
                    {social.platform}
                  </div>
                  <div className="font-mono text-[10px] text-zinc-600 group-hover:text-black">
                    {social.username}
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-black stroke-[2.5]" />
              </a>
            ))}
          </div>

          {/* Node Status Bar */}
          <div className="p-4 bg-[#0a0a0a] text-[#ccff00] border-2 border-black shadow-[4px_4px_0px_#ccff00] flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#ccff00] animate-pulse" />
              <span className="font-bold uppercase">AVAILABILITY:</span>
            </div>
            <span className="text-white font-black">CONTRACT / FULL-TIME</span>
          </div>
        </div>
      </div>
    </section>
  );
};
