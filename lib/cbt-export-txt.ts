import { Question, UserSession } from "@/types/utbk-ukppu";

/**
 * Generates and downloads a clean formatted TXT file containing questions only,
 * with answer keys and ethical explanations listed at the very end.
 */
export function exportQuestionsOnlyTXT(questions: Question[]): void {
  if (typeof window === "undefined") return;

  let txt = "";
  txt += "================================================================================\n";
  txt += "   SOAL UJIAN TULIS BERBASIS KOMPUTER (UTBK) PROFESI PSIKOLOG UMUM (UKPPU)     \n";
  txt += "================================================================================\n\n";

  questions.forEach((q, idx) => {
    txt += `SOAL #${idx + 1}\n`;
    txt += `Domain    : Domain ${q.domainId} - ${q.domainTitle}\n`;
    txt += `Indikator : Indikator ${q.indicatorId} - ${q.indicatorTitle} (${q.indicatorFullId || `D${q.domainId}-${q.indicatorId}`})\n\n`;

    txt += `[STUDI KASUS]\n`;
    txt += `Judul: ${q.caseStudy.title}\n\n`;
    txt += `${q.caseStudy.scenario.trim()}\n\n`;

    txt += `[PERTANYAAN]\n`;
    txt += `${q.question.trim()}\n\n`;

    txt += `[PILIHAN JAWABAN]\n`;
    q.options.forEach((opt) => {
      txt += `${opt.id}. ${opt.text}\n`;
    });

    txt += "\n--------------------------------------------------------------------------------\n\n";
  });

  // Appendix: Answer Keys and Explanations at the very end
  txt += "\n================================================================================\n";
  txt += "            KUNCI JAWABAN & PEMBAHASAN KODE ETIK PSIKOLOGI (HIMPSI)             \n";
  txt += "================================================================================\n\n";

  questions.forEach((q, idx) => {
    txt += `${idx + 1}. Kunci Jawaban: Opsi ${q.key}\n`;
    txt += `   Indikator    : ${q.indicatorTitle} (${q.indicatorFullId || `D${q.domainId}-${q.indicatorId}`})\n`;
    txt += `   Pembahasan   : ${q.explanation.trim()}\n\n`;
  });

  // Download blob
  const filename = `soal_utbk_ukppu_${Date.now()}.txt`;
  downloadTXTFile(txt, filename);
}

/**
 * Generates and downloads a clean formatted TXT file containing questions,
 * participant selected answers, and full keys/explanations at the end.
 */
export function exportQuestionsAndResultsTXT(session: UserSession, questions: Question[]): void {
  if (typeof window === "undefined") return;

  let correctCount = 0;
  questions.forEach((q) => {
    if (session.selectedAnswers[q.id] === q.key) {
      correctCount++;
    }
  });

  const totalQuestions = questions.length;
  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins} menit ${rem} detik`;
  };

  let txt = "";
  txt += "================================================================================\n";
  txt += "      HASIL & LEMBAR SOAL UTBK UJI KOMPETENSI PROFESI PSIKOLOG UMUM (UKPPU)     \n";
  txt += "================================================================================\n";
  txt += `Nama Peserta     : ${session.userName}\n`;
  txt += `Nilai Akhir      : ${scorePercentage}% (Benar: ${correctCount} dari ${totalQuestions} soal)\n`;
  txt += `Waktu Pengerjaan : ${formatTime(session.timeElapsed)}\n`;
  txt += `Tanggal Selesai  : ${new Date(session.lastUpdated || Date.now()).toLocaleString("id-ID")}\n`;
  txt += "================================================================================\n\n";

  questions.forEach((q, idx) => {
    const userAnswer = session.selectedAnswers[q.id] || "TIDAK DIJAWAB";
    const isCorrect = userAnswer === q.key;

    txt += `SOAL #${idx + 1}\n`;
    txt += `Domain    : Domain ${q.domainId} - ${q.domainTitle}\n`;
    txt += `Indikator : Indikator ${q.indicatorId} - ${q.indicatorTitle} (${q.indicatorFullId || `D${q.domainId}-${q.indicatorId}`})\n\n`;

    txt += `[STUDI KASUS]\n`;
    txt += `Judul: ${q.caseStudy.title}\n\n`;
    txt += `${q.caseStudy.scenario.trim()}\n\n`;

    txt += `[PERTANYAAN]\n`;
    txt += `${q.question.trim()}\n\n`;

    txt += `[PILIHAN JAWABAN]\n`;
    q.options.forEach((opt) => {
      const isChosen = userAnswer === opt.id;
      txt += `${opt.id}. ${opt.text}${isChosen ? "  <-- (Pilihan Anda)" : ""}\n`;
    });

    txt += `\nSTATUS JAWABAN ANDA : Opsi ${userAnswer} [${isCorrect ? "BENAR ✓" : "SALAH ✗"}]\n`;
    txt += "\n--------------------------------------------------------------------------------\n\n";
  });

  // Appendix: Answer Keys, Participant Results & Explanations at the very end
  txt += "\n================================================================================\n";
  txt += "        KUNCI JAWABAN, EVALUASI HASIL & PEMBAHASAN KODE ETIK (HIMPSI)           \n";
  txt += "================================================================================\n\n";

  questions.forEach((q, idx) => {
    const userAnswer = session.selectedAnswers[q.id] || "TIDAK DIJAWAB";
    const isCorrect = userAnswer === q.key;

    txt += `${idx + 1}. Jawaban Anda: ${userAnswer} | Kunci Jawaban: ${q.key} | Status: ${isCorrect ? "BENAR ✓" : "SALAH ✗"}\n`;
    txt += `   Indikator   : ${q.indicatorTitle} (${q.indicatorFullId || `D${q.domainId}-${q.indicatorId}`})\n`;
    txt += `   Pembahasan  : ${q.explanation.trim()}\n\n`;
  });

  const sanitizedName = session.userName.toLowerCase().replace(/[^a-z0-9]/g, "_");
  const filename = `hasil_utbk_ukppu_${sanitizedName}_${Date.now()}.txt`;
  downloadTXTFile(txt, filename);
}

function downloadTXTFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
