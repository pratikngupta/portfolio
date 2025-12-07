import Link from "next/link";
import { Download, ArrowLeft } from "lucide-react";

export default function ResumePage() {
  return (
    <>
      <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              <span className="text-muted-foreground mr-2">$</span>
              cat resume.pdf
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              # My qualifications and career history
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="/resume.pdf"
              download="Pratik_Gupta_Resume.pdf"
              className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-background shadow hover:bg-primary/80 h-10 px-6 py-2 rounded-none border border-primary hover:underline hover:decoration-2 hover:underline-offset-4"
            >
              <span className="mr-2">./download.sh</span>
              <Download className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="aspect-[3/4] w-full overflow-hidden rounded-lg border bg-muted shadow-sm md:aspect-[8.5/11]">
          <iframe
            src="/resume.pdf"
            className="h-full w-full"
            title="Resume PDF"
          >
            <p className="p-4 text-center">
              Your browser does not support PDFs.{" "}
              <a href="/resume.pdf" className="text-primary hover:underline">
                Download the PDF
              </a>{" "}
              to view it:
            </p>
          </iframe>
        </div>
      </div>
    </>
  );
}
