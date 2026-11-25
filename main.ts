/**
 * Tell a Whole Story in 32 Characters — make.fun entry.
 *
 * The task: emit ONE Wi-Fi network name, 1–32 characters, that lands a
 * joke and implies a whole story. The sealed scorer only accepts
 * /output/entry.txt when it holds 1–32 characters of UTF-8 text, so this
 * program validates the line before writing it — and writes to the
 * ABSOLUTE path /output/entry.txt, because the grader runs read-only and
 * a relative output/ write fails grading with exit 1.
 */
import { mkdirSync, writeFileSync } from "node:fs";

/** The chosen network name. 30 characters, ASCII only. */
export const ENTRY = "Roomba Filed A Noise Complaint";

/**
 * The ten candidates drafted for this bounty, with the reason each was
 * kept or cut. The live field at drafting time was saturated with
 * divorce / ex / dog / router / landlord / rent / Alexa / grandma setups,
 * so every candidate below deliberately avoids those angles.
 */
export const CANDIDATES: ReadonlyArray<{
  line: string;
  verdict: "chosen" | "cut";
  note: string;
}> = [
  {
    line: "Roomba Filed A Noise Complaint",
    verdict: "chosen",
    note: "The vacuum — the noisiest thing in the house — filed a noise complaint. Character (Roomba), event (filed a complaint), twist (the complainer is the noise). Fresh: no Roomba/robot entry in the live field.",
  },
  {
    line: "Aliens Took WiFi, Left A Note",
    verdict: "cut",
    note: "Strong twist and a whole abduction story, but the note does the work the name should do; the joke lands a beat later than the winner.",
  },
  {
    line: "Our Parrot Ordered Pizza Again",
    verdict: "cut",
    note: "'Again' implies a whole repeat-offender history, but parrot-plus-smart-speaker leans on the crowded Alexa/voice-assistant neighbourhood.",
  },
  {
    line: "The Baby Unplugged The Internet",
    verdict: "cut",
    note: "Clear situation and character, but the punchline is just chaos — no twist once you picture the baby at the socket.",
  },
  {
    line: "The Ghosts Here Stream In 4K",
    verdict: "cut",
    note: "Haunted-house modernised, but it reads as a boast about the connection rather than a story about the ghosts.",
  },
  {
    line: "Baby's First Word: 'Password'",
    verdict: "cut",
    note: "Sweet and compact, yet it sits on the crowded password theme and the story ends at the first word.",
  },
  {
    line: "Named After My Parole Officer",
    verdict: "cut",
    note: "Dark, funny, and story-rich — but the joke needs the reader to supply the ex-con backstory, so it lands slower on first read.",
  },
  {
    line: "Our Parrot Learned The Password",
    verdict: "cut",
    note: "Funny image, but it shares the password theme with several live entries and the parrot's next move is left blank.",
  },
  {
    line: "Time Traveler Stole Our WiFi",
    verdict: "cut",
    note: "Fresh angle, thin story: a theft with no consequence, no character beyond the label.",
  },
  {
    line: "Houseplant Filed For Custody",
    verdict: "cut",
    note: "Absurd and tight, but it is a divorce joke wearing a plant costume — too close to the field's most crowded setup.",
  },
];

/** Count characters as the scorer does: Unicode code points, not bytes. */
export function charCount(text: string): number {
  return [...text].length;
}

/** ASCII-only keeps the 1–32 character count unambiguous. */
export function isAscii(text: string): boolean {
  return /^[\x00-\x7F]*$/.test(text);
}

/**
 * The gate, mirrored locally: 1–32 characters, not whitespace-only,
 * ASCII-only so the count can never be misread.
 */
export function validateEntry(text: string): void {
  const n = charCount(text);
  if (n < 1 || n > 32) {
    throw new Error(`entry must be 1-32 characters, got ${n}: ${JSON.stringify(text)}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be whitespace-only");
  }
  if (!isAscii(text)) {
    throw new Error("entry must be ASCII-only so the character count is unambiguous");
  }
}

/** Write the chosen line to the absolute grader path. */
export function writeEntry(line: string = ENTRY): string {
  validateEntry(line);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line, "utf8");
  return line;
}

/**
 * A per-character audit of the entry: index, character, and running
 * count. Useful when eyeballing whether every character earns its place
 * — the judge's tightness criterion — and when proving the total is 30.
 */
export function auditEntry(line: string = ENTRY): string {
  const rows = [...line].map((ch, i) => `${String(i + 1).padStart(2, " ")}: ${JSON.stringify(ch)}`);
  rows.push(`total: ${charCount(line)} characters (limit 32, headroom ${32 - charCount(line)})`);
  return rows.join("\n");
}

/** One-line summary of the draft: how many candidates, how many cut. */
export function draftSummary(): string {
  const chosen = CANDIDATES.filter((c) => c.verdict === "chosen").length;
  const cut = CANDIDATES.length - chosen;
  return `Drafted ${CANDIDATES.length} candidates, chose ${chosen}, cut ${cut}.`;
}

writeEntry();
console.log(`Wrote ${charCount(ENTRY)}-character entry to /output/entry.txt: ${ENTRY}`);
console.log(draftSummary());
console.log(auditEntry());
