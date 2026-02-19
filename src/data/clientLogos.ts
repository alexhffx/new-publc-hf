export interface ClientLogo {
  name: string;
  logo: string;
  industries?: string[];
}

export const staticClientLogos: ClientLogo[] = [
  { name: 'Asap', logo: '/assets/logos/clients/Asap.png', industries: ['logistics'] },
  { name: 'AscendX', logo: '/assets/logos/clients/Ascendx.png', industries: ['professional-services'] },
  { name: 'Atlantic Pacific', logo: '/assets/logos/clients/AtlanticPacific.png', industries: ['logistics'] },
  { name: 'BeloFX', logo: '/assets/logos/clients/BeloFX.png', industries: ['professional-services'] },
  { name: 'Champo', logo: '/assets/logos/clients/Champo.png', industries: ['e-commerce'] },
  { name: 'Firstpoint', logo: '/assets/logos/clients/Firstpoint.png', industries: ['logistics'] },
  { name: 'Gravity9', logo: '/assets/logos/clients/Gravity9.png', industries: ['professional-services'] },
  { name: 'Journey', logo: '/assets/logos/clients/Journey.png', industries: ['professional-services'] },
  { name: 'Killick Martin', logo: '/assets/logos/clients/KillickMartin.png', industries: ['logistics'] },
  { name: 'KTL', logo: '/assets/logos/clients/KTL.png', industries: ['logistics'] },
  { name: 'Maltby & Greek', logo: '/assets/logos/clients/Maltby&Greek.png', industries: ['e-commerce'] },
  { name: 'Mirada', logo: '/assets/logos/clients/Mirada.png', industries: ['professional-services'] },
  { name: 'Pact Coffee', logo: '/assets/logos/clients/PactCoffee.png', industries: ['e-commerce'] },
  { name: 'Pangea', logo: '/assets/logos/clients/Pangea.png', industries: ['staffing'] },
  { name: 'SeaAvia', logo: '/assets/logos/clients/SeaAvia.png', industries: ['logistics'] },
  { name: 'Signify', logo: '/assets/logos/clients/Signify.png', industries: ['staffing'] },
  { name: 'Squint Opera', logo: '/assets/logos/clients/SquintOpera.png', industries: ['professional-services'] },
  { name: 'TransferRoom', logo: '/assets/logos/clients/TransferRoom.png', industries: ['staffing'] },
  { name: 'VogaCloset', logo: '/assets/logos/clients/Vogacloset.png', industries: ['e-commerce'] },
];

/** Filter logos by industry slug */
export function getLogosByIndustry(industry: string): ClientLogo[] {
  return staticClientLogos.filter((l) => l.industries?.includes(industry));
}
