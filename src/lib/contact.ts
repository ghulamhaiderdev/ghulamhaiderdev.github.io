import type { Profile } from '../data/profile';

/**
 * Unscrambles the email address from the profile data
 * Email is stored reversed for basic spam protection
 */
export function unscrambleEmail(profile: Profile): string {
  const user = profile.contact.email.user.split('').reverse().join('');
  const domain = profile.contact.email.website.split('').reverse().join('');
  return `${user}@${domain}`;
}

/**
 * Unscrambles the phone number from the profile data
 */
export function unscramblePhone(profile: Profile): string {
  const area = profile.contact.phone.area.split('').reverse().join('');
  const number = profile.contact.phone.number.split('').reverse().join('');
  return `${area} ${number}`;
}

/**
 * Unscrambles the WhatsApp number from the profile data
 */
export function unscrambleWhatsapp(profile: Profile): string {
  const area = profile.contact.whatsapp.area.split('').reverse().join('');
  const number = profile.contact.whatsapp.number.split('').reverse().join('');
  return `${area} ${number}`;
}

/**
 * Returns mailto: link with unscrambled email
 */
export function getMailtoLink(profile: Profile): string {
  return `mailto:${unscrambleEmail(profile)}`;
}

/**
 * Returns tel: link with unscrambled phone
 */
export function getTelLink(profile: Profile): string {
  const phone = unscramblePhone(profile);
  return `tel:${phone.replace(/\s/g, '')}`;
}

/**
 * Returns WhatsApp link
 */
export function getWhatsappLink(profile: Profile): string {
  const whatsapp = unscrambleWhatsapp(profile);
  const cleanNumber = whatsapp.replace(/\s/g, '').replace('+', '');
  return `https://wa.me/${cleanNumber}`;
}
