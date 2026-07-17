export type ProcessStep = {
  title: string;
  description: string;
};

/** Pasos numerados del proceso (híbrido online + jornada en Arica). */
export function ProcessSteps({
  steps,
  gridClassName = "sm:grid-cols-3",
}: {
  steps: ProcessStep[];
  gridClassName?: string;
}) {
  return (
    <ol className={`grid gap-6 ${gridClassName}`}>
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="rounded-2xl border border-arena bg-white p-6"
        >
          <span
            aria-hidden="true"
            className="mb-4 flex size-10 items-center justify-center rounded-full bg-pacifico font-sans text-lg font-bold text-white"
          >
            {index + 1}
          </span>
          <h3 className="font-sans text-base font-bold text-quebrada">
            {step.title}
          </h3>
          <p className="mt-2 text-base text-quebrada/90">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
