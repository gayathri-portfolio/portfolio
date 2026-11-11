/** Contact details, links and availability, defined once for the hero,
 * contact section, footer and About page. Keep in step with the resume. */
export const profile = {
  name: 'Gayathri V',
  roles: 'Product Designer · UI/UX Designer',
  email: 'gayathrivellaiyan@gmail.com',
  /** opens the visitor's own mail app with a new message to me, subject filled in */
  emailHref: `mailto:gayathrivellaiyan@gmail.com?subject=${encodeURIComponent('Hello Gayathri')}`,
  phone: '+91-6381652569',
  phoneHref: 'tel:+916381652569',
  linkedin: 'https://www.linkedin.com/in/gayathri-vellaiyan',
  behance: 'https://www.behance.net/gayathri_v',
  location: 'Hyderabad, India',
  availability: 'Available immediately',
  workModes: 'remote, hybrid or relocation',
  resume: `${import.meta.env.BASE_URL}resume.pdf`,
}
