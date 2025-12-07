import Link from "next/link";
import { Download, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function ResumePage() {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-handwriting text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Resume
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              My qualifications and career history.
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="/resume.pdf"
              download="Pratik_Gupta_Resume.pdf"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-6 py-2"
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
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
