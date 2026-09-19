// Writes cv.tex and resume.tex from src/data/cv.ts, compiles them with
// latexmk, and copies the PDFs into public/files/. Run with: npm run cv
import { execFileSync } from 'node:child_process';
import { copyFileSync, readFileSync, writeFileSync } from 'node:fs';
import * as cv from '../src/data/cv.ts';
import type { Entry, Publication } from '../src/data/cv.ts';

const dir = import.meta.dirname;

const esc = (text: string) => text.replace(/[&%$#_{}]/g, '\\$&');
const bold = (text: string) => `\\textbf{${text}}`;
const link = (href: string, text: string) => `\\href{${href}}{${text}}`;
// A leading tab indents a note to the publication list's text.
const note = (n: string) => esc(n).replace(/^\t/, '\\hspace*{\\listindent}');

// `plain` leaves the title unbolded.
const entry = (e: Entry, plain: boolean) => {
  const title = e.href ? link(e.href, esc(e.title)) : esc(e.title);
  const notes = (e.notes ?? []).map(note);
  const lines = [`${plain ? title : bold(title)}\\hfill ${esc(e.when)}`];
  if (e.where) lines.push(`${notes.shift() || '\\mbox{}'}\\hfill ${esc(e.where)}`);
  return [...lines, ...notes].join('\\\\\n') + '\n\n';
};

const publication = (p: Publication) => `\\item ${cv.cite(p, { text: esc, bold, link })}\n`;

function document(resume: boolean) {
  const keep = <T extends { resume?: boolean }>(items: T[]) => (resume ? items.filter((i) => i.resume) : items);
  const section = (title: string, body: string) => (body ? `\\section*{${title}}\n${body}` : '');
  const entries = (title: string, items: Entry[], plain = false) =>
    section(title, keep(items).map((e) => entry(e, plain)).join(''));
  const pubs = keep(cv.publications);

  return [
    readFileSync(`${dir}/preamble.tex`, 'utf8'),
    '\\begin{document}\n',
    `{\\centering\\LARGE\\bfseries ${esc(cv.name)}\\par}\n`,
    `${link(`mailto:${cv.email}`, cv.email)}\\hfill ${link(`https://${cv.website}`, cv.website)}\n\n`,
    entries('Positions', cv.positions),
    entries('Education', cv.education),
    entries('Other experience', cv.experience),
    entries(resume ? 'Select awards and honours' : 'Awards and honours', cv.awards, true),
    section(resume ? 'Select publications' : 'Publications', pubs.length ? `\\begin{enumerate}\n${pubs.map(publication).join('')}\\end{enumerate}\n\n` : ''),
    entries('Popular writing', cv.writing),
    '\\end{document}\n',
  ].join('');
}

for (const [file, resume] of [['cv', false], ['resume', true]] as const) {
  writeFileSync(`${dir}/${file}.tex`, document(resume));
  execFileSync('latexmk', ['-pdf', '-interaction=nonstopmode', `-outdir=${dir}/out`, `${file}.tex`], {
    cwd: dir,
    stdio: 'ignore',
  });
  copyFileSync(`${dir}/out/${file}.pdf`, `${dir}/../public/files/${file}.pdf`);
  console.log(`public/files/${file}.pdf`);
}
