import { writeFileSync, mkdirSync } from "node:fs";

// One-line office joke for make.fun's "Make the AI Judge Laugh: Office Jokes".
// The setup is a relatable office sin (reply-all); the turn is that the
// attempt to stop it becomes the reason a policy now carries the joker's name.
const LINE =
  "I hit reply-all to ask everyone to stop hitting reply-all, and now there is a company policy named after me.";

// The gate only accepts UTF-8 text of 1 to 199 Unicode code points that is
// not whitespace-only, and the entry must be a single line with no em dash,
// so verify the line meets the gate before writing it.
const codePoints = [...LINE].length;
if (codePoints < 1 || codePoints > 199 || LINE.trim().length === 0) {
  throw new Error(`entry line is ${codePoints} code points, outside the 1-199 gate`);
}
if (LINE.includes("\u2014")) {
  throw new Error("entry line must not contain an em dash");
}
if (/[\r\n]/.test(LINE)) {
  throw new Error("entry line must be a single line with no line breaks");
}
const terminators = LINE.match(/[.!?](?=\s|$)/g) ?? [];
if (terminators.length !== 1) {
  throw new Error(`entry line has ${terminators.length} sentence ends, must be exactly one`);
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
