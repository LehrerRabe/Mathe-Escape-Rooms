/* Minimaler PDF-Erzeuger: eine Seite, ein eingebettetes JPEG.
   Bewusst ohne externe Bibliothek, damit die Seite klein und offlinefähig bleibt. */

function textBytes(s) {
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i) & 0xff;
  return out;
}

/** PDF-Textliteral: Klammern und Backslash maskieren, Umlaute als PDFDocEncoding/Latin-1. */
function pdfText(s) {
  const roh = String(s).replace(/[\\()]/g, m => '\\' + m);
  let out = '';
  for (const z of roh) {
    const c = z.codePointAt(0);
    out += c < 256 ? z : '?';
  }
  return out;
}

/**
 * Baut ein einseitiges PDF mit einem Bild, das die ganze Seite füllt.
 * @param {Uint8Array} jpeg  JPEG-Daten (DeviceRGB)
 * @param {number} bildBreite  Pixelbreite des Bildes
 * @param {number} bildHoehe   Pixelhöhe des Bildes
 * @param {{breitePt:number, hoehePt:number, titel?:string, autor?:string}} seite
 * @returns {Blob}
 */
export function pdfMitBild(jpeg, bildBreite, bildHoehe, seite) {
  const B = seite.breitePt, H = seite.hoehePt;
  const teile = [];
  let laenge = 0;
  const offsets = [];

  const schreibe = (x) => {
    const bytes = typeof x === 'string' ? textBytes(x) : x;
    teile.push(bytes);
    laenge += bytes.length;
  };
  const objekt = (nr, kopf, strom) => {
    offsets[nr] = laenge;
    schreibe(`${nr} 0 obj\n${kopf}\n`);
    if (strom) {
      schreibe('stream\n');
      schreibe(strom);
      schreibe('\nendstream\n');
    }
    schreibe('endobj\n');
  };

  schreibe('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');

  objekt(1, '<< /Type /Catalog /Pages 2 0 R >>');
  objekt(2, '<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  objekt(3, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${B} ${H}] ` +
            `/Resources << /XObject << /Im0 5 0 R >> /ProcSet [/PDF /ImageC] >> /Contents 4 0 R >>`);

  const inhalt = `q\n${B} 0 0 ${H} 0 0 cm\n/Im0 Do\nQ\n`;
  objekt(4, `<< /Length ${inhalt.length} >>`, textBytes(inhalt));

  objekt(5, `<< /Type /XObject /Subtype /Image /Width ${bildBreite} /Height ${bildHoehe} ` +
            `/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>`, jpeg);

  const jetzt = new Date();
  const z = (n) => String(n).padStart(2, '0');
  const datum = `D:${jetzt.getFullYear()}${z(jetzt.getMonth() + 1)}${z(jetzt.getDate())}` +
                `${z(jetzt.getHours())}${z(jetzt.getMinutes())}${z(jetzt.getSeconds())}`;
  objekt(6, `<< /Title (${pdfText(seite.titel || 'Urkunde')}) ` +
            `/Author (${pdfText(seite.autor || 'Mathe-Escape-Rooms')}) ` +
            `/Producer (Mathe-Escape-Rooms) /CreationDate (${datum}) >>`);

  const xrefStart = laenge;
  let xref = 'xref\n0 7\n0000000000 65535 f \n';
  for (let i = 1; i <= 6; i++) xref += String(offsets[i]).padStart(10, '0') + ' 00000 n \n';
  schreibe(xref);
  schreibe(`trailer\n<< /Size 7 /Root 1 0 R /Info 6 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`);

  return new Blob(teile, { type: 'application/pdf' });
}

/** Wandelt eine Data-URL (z. B. canvas.toDataURL) in Bytes um. */
export function datenUrlZuBytes(datenUrl) {
  const b64 = datenUrl.slice(datenUrl.indexOf(',') + 1);
  const roh = atob(b64);
  const out = new Uint8Array(roh.length);
  for (let i = 0; i < roh.length; i++) out[i] = roh.charCodeAt(i);
  return out;
}

/** Startet den Download eines Blobs. */
export function herunterladen(blob, dateiname) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = dateiname;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}
