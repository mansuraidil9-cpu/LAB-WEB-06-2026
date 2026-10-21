function Skills() {
  const keahlian = [
    "Java",
    "JavaFX",
    "SQLite",
    "JavaScript",
    "React",
    "Tailwind CSS",
  ];

  return (
    <section id="keahlian" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
        Keahlian
      </h2>
      <p className="mt-4 max-w-prose text-lg text-ink/75">
        Teknologi yang saya pakai di proyek kuliah dan latihan mandiri.
      </p>
      <ul className="mt-10 flex flex-wrap gap-3">
        {keahlian.map((skill, index) => (
          <li
            key={index}
            className="rounded-full border-2 border-ink px-6 py-3 text-lg font-semibold transition-colors hover:bg-ink hover:text-paper"
          >
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Skills;
