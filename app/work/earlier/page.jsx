export const metadata = {
  title: 'Earlier work — Abdirahman Hassan Abdi',
  description: 'Python, data and small tools from 2024 — where I learned to finish things.',
};

const PROJECTS = [
  {
    title: 'Machine learning model for diabetes prediction',
    repo: 'https://github.com/saturnthehustler/Machine-Model-for-Diabetes-Prediction',
    body:
      'Predicts diabetes from health indicators — age, BMI, blood glucose and the rest. The interesting part was not the model but the preparation: filling missing values without inventing patients, encoding the categorical columns, and normalising the numeric ones. Logistic regression tuned by grid-search cross-validation, judged on ROC AUC and a full classification report rather than raw accuracy, which flatters any classifier on an unbalanced set.',
  },
  {
    title: 'ChapterVerse — scraping to EPUB',
    repo: 'https://github.com/saturnthehustler/chapterverse-scraper',
    body:
      'Scrapes serialised novels chapter by chapter and assembles them into EPUB files with a cover. Concurrent fetching to make a few hundred chapters bearable, and automatic retries for the transient network errors that are guaranteed at that volume. The lesson that stuck: anything touching a network needs a retry policy decided up front, not bolted on after the first failed run.',
  },
  {
    title: 'ExcelConvertGUI',
    repo: 'https://github.com/saturnthehustler/ExcelConvertGUI',
    body:
      'A Tkinter desktop tool that merges many Excel workbooks into one file, each source on its own sheet. Written for people who are not going to open a terminal, which made validation and plain-language error messages the whole job rather than an afterthought.',
  },
  {
    title: 'Dynamic GPA calculator',
    repo: 'https://github.com/saturnthehustler/GPA-Calculator',
    body:
      'A PyQt5 application for adding semesters, entering grades and credit units per module, and getting both semester and cumulative GPA. Small, but the first thing I built where the interface had to survive someone using it wrong.',
  },
  {
    title: 'The previous version of this site',
    repo: 'https://github.com/saturnthehustler/saturnthehustler.github.io',
    body:
      'A single HTML file with a particle background, a typewriter heading and fifteen logo images standing in for a skills section. It is here deliberately: it is the thing this redesign replaced, and keeping it visible is more useful than pretending the earlier version never existed.',
  },
];

export default function Page() {
  return (
    <article className="wrap study">
      <p className="kicker">2024</p>
      <h1>Earlier work</h1>
      <p className="lede">
        Python, data and small tools. None of it is production software and none of it carries a
        business &mdash; but this is where I learned to finish things, which turned out to be the
        part that transferred.
      </p>

      {PROJECTS.map((p) => (
        <section className="earlier-item" key={p.title}>
          <h2>{p.title}</h2>
          <p>{p.body}</p>
          <p>
            <a className="link-block" href={p.repo} target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </p>
        </section>
      ))}
    </article>
  );
}
