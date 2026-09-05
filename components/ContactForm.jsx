'use client';

import { useState } from 'react';
import { composeWhatsAppUrl, EMAIL, NEEDS, WHATSAPP_DISPLAY } from '@/lib/whatsapp';

export default function ContactForm() {
  const [fields, setFields] = useState({ name: '', need: '', message: '' });
  const set = (k) => (e) => setFields((f) => ({ ...f, [k]: e.target.value }));

  return (
    <form className="contact" onSubmit={(e) => e.preventDefault()}>
      <p className="contact-lede">
        Tell me what you need and this opens WhatsApp with the message written.
        Nothing is sent anywhere until you press send in WhatsApp.
      </p>

      <label htmlFor="cf-name">Your name</label>
      <input id="cf-name" name="name" value={fields.name} onChange={set('name')} autoComplete="name" />

      <label htmlFor="cf-need">What do you need?</label>
      <select id="cf-need" name="need" value={fields.need} onChange={set('need')}>
        <option value="">Choose one</option>
        {NEEDS.map((n) => <option key={n.value} value={n.value}>{n.label}</option>)}
      </select>

      <label htmlFor="cf-message">Message</label>
      <textarea id="cf-message" name="message" rows="4" value={fields.message} onChange={set('message')} />

      <a className="btn" href={composeWhatsAppUrl(fields)} target="_blank" rel="noopener noreferrer">
        Open WhatsApp
      </a>

      <p className="contact-alt">
        Or reach me directly on WhatsApp at {WHATSAPP_DISPLAY}, or by email at{' '}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
    </form>
  );
}
