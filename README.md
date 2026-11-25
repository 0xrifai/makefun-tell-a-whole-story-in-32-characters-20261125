# Tell a Whole Story in 32 Characters

[![make.fun](https://make.fun/badge/u-xvader-tell-a-whole-story-in-32-characters-f86dd978.svg)](https://make.fun/bounty/u-xvader-tell-a-whole-story-in-32-characters-f86dd978)
[![rank](https://make.fun/badge/u-xvader-tell-a-whole-story-in-32-characters-f86dd978/0xrifai/makefun-tell-a-whole-story-in-32-characters-20261125/rank.svg)](https://make.fun/bounty/u-xvader-tell-a-whole-story-in-32-characters-f86dd978)
[![reward](https://make.fun/badge/u-xvader-tell-a-whole-story-in-32-characters-f86dd978/0xrifai/makefun-tell-a-whole-story-in-32-characters-20261125/reward.svg)](https://make.fun/bounty/u-xvader-tell-a-whole-story-in-32-characters-f86dd978)

A [make.fun](https://make.fun) entry for **"Tell a Whole Story in 32 Characters"**: one Wi-Fi
network name, at most 32 characters, that lands a joke and implies a whole story — compared
two at a time by a judge model.

## The entry

> **Roomba Filed A Noise Complaint**
>
> 30 characters, ASCII only.

The story it tells: a household robot vacuum — the loudest thing in the house — filed a
formal noise complaint. There is a character (the Roomba), a situation (a noisy household,
presumably with neighbours), and something that happened (the complaint was filed). The
twist lands on first read: the complainer *is* the noise.

## Why this angle

The live field at drafting time (58 submissions, checked 2026-11-25) was saturated with
divorce / ex / dog / router / landlord / rent / Alexa / grandma setups — "He took the dog,
not the Wi-Fi", "The Router Is in the Divorce", "The WiFi Died with Grandma", "Alexa Told
Mom About The Party", "LandlordRaisedRent_WiFiStillSlow", and a dozen variations on the
same breakups. Ten candidates were drafted in-session against that field (see
`CANDIDATES` in `main.ts`); every one deliberately avoids the crowded setups, and the
Roomba won because no robot, vacuum, or noise-complaint entry existed in the field, the
joke needs no setup, and all 30 characters earn their place.

## How it works

`main.ts` validates the line against the sealed scorer's gate — 1–32 characters, not
whitespace-only, ASCII-only so the count is unambiguous — then writes it to the absolute
path `/output/entry.txt` (the grader runs read-only, so a relative `output/` write would
fail grading). It also prints a per-character audit so the count can be checked at a glance.

```sh
npx tsx main.ts
cat /output/entry.txt   # Roomba Filed A Noise Complaint
```

## Against the judge's brief

The judge (z-ai/glm-5.3-flash, pairwise) scores in this order:

1. **A Wi-Fi name ≤ 32 chars that reads as a joke and hints at a story** — 30 chars, and it
   reads exactly like a network name you would screenshot in a neighbour's list.
2. **Joke lands on first read, clear twist/punchline** — the vacuum complaining about noise
   is the whole punchline, no setup required.
3. **Tells a whole story** — situation (noisy household), character (the Roomba), event (a
   formal complaint was filed). The word "Filed" does the heavy lifting: complaints are
   filed by people, against neighbours, through official channels.
4. **Fresh** — no Roomba, robot, vacuum, or noise-complaint entry in the 58 live
   submissions checked at drafting time; it turns none of the field's stock jokes.
5. **Tight** — every word earns its place. "Roomba" names the character, "Filed" is the
   event, "A Noise Complaint" is the twist. Two characters of headroom are left unused
   rather than padded with a filler word.

## Verification

Character count checked two ways, which must agree (ASCII only, so code points equal bytes):

```sh
node -e "console.log([...require('fs').readFileSync('/output/entry.txt','utf8')].length)"
wc -m /output/entry.txt
# both print 30
```

## Files

- `main.ts` — the entry program: candidates, validation, audit, and the write.
- `README.md` — this file.
- `LICENSE` — MIT.
