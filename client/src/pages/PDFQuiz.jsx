import { useState } from "react";
import {
  Upload,
  FileText,
  Sparkles,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const PDFQuiz = () => {
  const [file, setFile] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    setError("");
    setQuestions([]);

    if (!selectedFile) {
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      setError("Please select a PDF file.");
      return;
    }

    setFile(selectedFile);
  };

  const handleGenerateQuiz = async () => {
    if (!file) {
      setError("Please select a PDF first.");
      return;
    }

    setLoading(true);
    setError("");
    setQuestions([]);

    try {
      const formData = new FormData();

      formData.append("pdf", file);

      const response = await fetch(
        "http://localhost:5000/api/pdf/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to generate quiz"
        );
      }

      setQuestions(data.questions || []);
    } catch (error) {
      setError(
        error.message ||
          "Something went wrong while generating the quiz."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-2xl bg-indigo-500/10 p-4">
              <Sparkles
                size={32}
                className="text-indigo-400"
              />
            </div>
          </div>

          <h1 className="text-4xl font-bold">
            AI PDF Quiz Generator
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-slate-400">
            Upload any PDF and generate quiz questions
            from its content automatically.
          </p>
        </div>

        {/* Upload Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl">

          <label
            htmlFor="pdf-upload"
            className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950/50 px-6 py-12 transition hover:border-indigo-500 hover:bg-indigo-500/5"
          >
            <div className="mb-4 rounded-2xl bg-indigo-500/10 p-4">
              <Upload
                size={30}
                className="text-indigo-400"
              />
            </div>

            <h2 className="text-xl font-semibold">
              {file
                ? file.name
                : "Upload your PDF"}
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Click here to choose a PDF from
              your computer
            </p>

            <input
              id="pdf-upload"
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {/* Selected File */}
          {file && (
            <div className="mt-5 flex items-center justify-between rounded-xl border border-slate-700 bg-slate-950 p-4">
              <div className="flex items-center gap-3">
                <FileText
                  size={24}
                  className="text-red-400"
                />

                <div>
                  <p className="font-medium">
                    {file.name}
                  </p>

                  <p className="text-xs text-slate-500">
                    {(file.size / 1024 / 1024).toFixed(
                      2
                    )}{" "}
                    MB
                  </p>
                </div>
              </div>

              <CheckCircle
                size={22}
                className="text-green-400"
              />
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-5 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">
              <AlertCircle size={20} />
              <p>{error}</p>
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={handleGenerateQuiz}
            disabled={!file || loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 font-semibold transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2
                  size={20}
                  className="animate-spin"
                />

                Generating Quiz...
              </>
            ) : (
              <>
                <Sparkles size={20} />

                Generate Quiz
              </>
            )}
          </button>
        </div>

        {/* Generated Questions */}
        {questions.length > 0 && (
          <div className="mt-10">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">
                Generated Quiz
              </h2>

              <p className="mt-1 text-slate-400">
                {questions.length} questions generated
                from your PDF.
              </p>
            </div>

            <div className="space-y-5">
              {questions.map(
                (question, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                  >
                    <div className="mb-4 flex items-start gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-sm font-bold text-indigo-400">
                        {index + 1}
                      </span>

                      <h3 className="text-lg font-semibold leading-relaxed">
                        {question.question}
                      </h3>
                    </div>

                    <div className="grid gap-3">
                      {question.options.map(
                        (option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-300"
                          >
                            <span className="mr-3 font-semibold text-indigo-400">
                              {String.fromCharCode(
                                65 + optionIndex
                              )}
                              .
                            </span>

                            {option}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFQuiz;