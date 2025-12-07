export default function ResumePage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col">
      <iframe
        src="/resume.pdf"
        className="h-full w-full border-0"
        title="Resume"
      />
    </div>
  );
}
