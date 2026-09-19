// Single source for the CV webpage (/cv/) and the PDFs (npm run cv).
// Items marked `resume: true` also appear in the short resume.pdf.

export interface Entry {
  title: string;
  href?: string;
  where?: string;
  when: string;
  notes?: string[]; // the first shares a line with `where`; a leading tab indents
  resume?: boolean;
}

export interface Publication {
  authors: string[];
  title: string; // may contain [text](url) links
  journal?: string;
  volume?: string;
  page?: string;
  year: number;
  doi?: string;
  arxiv?: string;
  resume?: boolean;
}

// How to mark up text; supplied by the webpage (HTML) and the PDFs (LaTeX).
export interface Markup {
  text: (s: string) => string;
  bold: (s: string) => string;
  link: (href: string, s: string) => string;
}

export const name = 'Evan Hockings';
export const email = 'evanhockings@gmail.com';
export const website = 'evanhockings.com';

// The author name matching `highlight` is bolded in publication lists.
export const highlight = 'E. T. Hockings';

// Formats a publication in the style of my papers' reference lists:
// A. Author, B. Author, and C. Author, Title, Journal VOLUME, page (year), arXiv:ID.
export function cite(p: Publication, m: Markup): string {
  const names = p.authors.map((a) => (a === highlight ? m.bold(m.text(a)) : m.text(a)));
  const authors = names.length > 2 ? `${names.slice(0, -1).join(', ')}, and ${names.at(-1)}` : names.join(' and ');
  const title = p.title
    .split(/(\[[^\]]+\]\([^)]+\))/)
    .map((s) => {
      const l = s.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      return l ? m.link(l[2], m.text(l[1])) : m.text(s);
    })
    .join('');
  const journal = p.journal && `${m.text(p.journal)} ${m.bold(p.volume!)}, ${p.page} (${p.year})`;
  return (
    [
      authors,
      title,
      journal && (p.doi ? m.link(`https://doi.org/${p.doi}`, journal) : journal),
      p.arxiv && m.link(`https://arxiv.org/abs/${p.arxiv}`, `arXiv:${p.arxiv}`),
    ]
      .filter(Boolean)
      .join(', ') + '.'
  );
}

export const positions: Entry[] = [
  {
    title: 'Member of Technical Staff',
    where: 'Iceberg Quantum',
    when: 'July 2025–present',
    resume: true,
  },
];

export const education: Entry[] = [
  {
    title: 'Doctor of Philosophy (Physics)',
    where: 'University of Sydney',
    when: '2021–2025',
    notes: [
      '',
      'Thesis: Noise characterisation of fault-tolerant quantum computers',
      'Advisors: Andrew Doherty, Robin Harper',
    ],
    resume: true,
  },
  {
    title: 'Bachelor of Science (Advanced Mathematics) (Honours) in Physics',
    where: 'University of Sydney',
    when: '2017–2020',
    notes: [
      '\tHonours Class I and the University Medal',
      '\tWeighted average mark: 90',
      'Thesis: Scalable estimation of quantum noise',
      'Advisor: Steven Flammia',
    ],
    resume: true,
  },
];

export const experience: Entry[] = [
  {
    title: 'Physics Research Assistant',
    where: 'School of Physics, University of Sydney',
    when: 'September 2024–July 2025',
    notes: ['Advisor: Stephen Bartlett'],
  },
  {
    title: 'Machine Learning for Alignment Bootcamp',
    where: 'Redwood Research',
    when: 'August–September 2022',
  },
  {
    title: 'Chemistry Research Assistant',
    where: 'School of Chemistry, University of Sydney',
    when: 'February–June 2019',
    notes: ['Advisor: Girish Lakhwani'],
  },
  {
    title: 'Physics Summer Research Internship',
    where: 'Research School of Physics, Australian National University',
    when: 'November 2018–January 2019',
    notes: ['Advisor: Daniel Cocks'],
  },
  {
    title: 'Chemistry Summer Research Internship',
    where: 'School of Chemistry, University of Sydney',
    when: 'January–March 2018',
    notes: ['Advisor: Girish Lakhwani'],
  },
];

export const awards: Entry[] = [
  { title: 'Unitary Foundation Microgrant (QuantumACES.jl)', when: '2024', resume: true },
  { title: 'Australian Government Research Training Program Scholarship', when: '2021–2024' },
  { title: 'University of Sydney Honours Scholarship', when: '2020' },
  { title: 'Dean’s List of Excellence in Academic Performance', when: '2017, 2018, 2019, 2020', resume: true },
  { title: 'Faculty of Science Olympiad Scholarship', when: '2017–2020' },
  { title: 'Sydney Scholars Award', when: '2017–2019' },
  { title: 'School of Physics Julius Sumner Miller Scholarships for Academic Excellence No. 3', when: '2019', resume: true },
  { title: 'Walter Burfitt Scholarship No. 2 for Physics', when: '2019', resume: true },
  { title: 'University of Sydney Academic Merit Prize', when: '2017, 2018', resume: true },
  { title: 'Science Foundation for Physics Scholarship No. 2', when: '2018', resume: true },
  { title: 'School of Physics Julius Sumner Miller Scholarships for Academic Excellence No. 1', when: '2017', resume: true },
  { title: 'International Chemistry Olympiad Bronze Medal', when: '2016', resume: true },
];

export const publications: Publication[] = [
  {
    authors: ['S.-H. Lee', 'X. C. Kolesnikow', 'J. Zen', 'E. T. Hockings', 'C. K. McLauchlan', 'G. M. Nixon', 'T. R. Scruby', 'S. D. Bartlett', 'R. Harper', 'B. J. Brown'],
    title: 'Scalable quantum error correction tailored for a heavy-hex qubit array',
    year: 2026,
    arxiv: '2604.14296',
  },
  {
    authors: ['P. Webster', 'L. Berent', 'O. Chandra', 'E. T. Hockings', 'N. Baspin', 'F. Thomsen', 'S. C. Smith', 'L. Z. Cohen'],
    title: 'The Pinnacle architecture: reducing the cost of breaking RSA-2048 to 100 000 physical qubits using quantum LDPC codes',
    year: 2026,
    arxiv: '2602.11457',
    resume: true,
  },
  {
    authors: ['R. Harper', 'C. Lainé', 'E. T. Hockings', 'C. McLauchlan', 'G. M. Nixon', 'B. J. Brown', 'S. D. Bartlett'],
    title: 'Characterising the failure mechanisms of error-corrected quantum logic gates',
    journal: 'Nature Communications',
    volume: '17',
    page: '5039',
    year: 2026,
    doi: '10.1038/s41467-026-71773-6',
    arxiv: '2504.07258',
  },
  {
    authors: ['E. T. Hockings', 'A. C. Doherty', 'R. Harper'],
    title: 'Improving error suppression with noise-aware decoding',
    year: 2025,
    arxiv: '2502.21044',
    resume: true,
  },
  {
    authors: ['E. T. Hockings'],
    title: '[QuantumACES.jl](https://github.com/evanhockings/QuantumACES.jl): design noise characterisation experiments for quantum computers',
    journal: 'Journal of Open Source Software',
    volume: '10',
    page: '7707',
    year: 2025,
    doi: '10.21105/joss.07707',
    resume: true,
  },
  {
    authors: ['E. T. Hockings', 'A. C. Doherty', 'R. Harper'],
    title: 'Scalable noise characterisation of syndrome extraction circuits with averaged circuit eigenvalue sampling',
    journal: 'PRX Quantum',
    volume: '6',
    page: '010334',
    year: 2025,
    doi: '10.1103/PRXQuantum.6.010334',
    arxiv: '2404.06545',
    resume: true,
  },
  {
    authors: ['Y. Li', 'R. P. Sabatini', 'S. K. K. Prasad', 'E. T. Hockings', 'T. W. Schmidt', 'G. Lakhwani'],
    title: 'Improved optical confinement in ambipolar field-effect transistors toward electrical injection organic lasers',
    journal: 'Applied Physics Letters',
    volume: '119',
    page: '163303',
    year: 2021,
    doi: '10.1063/5.0063336',
  },
];

export const writing: Entry[] = [
  {
    title: 'The risks posed by artificial intelligence demand serious consideration',
    href: 'https://honisoit.com/2022/10/the-risks-posed-by-artificial-intelligence-demand-serious-consideration/',
    where: 'Honi Soit',
    when: 'October 2022',
  },
];

