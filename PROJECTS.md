# Jade N. Paver — Portfolio & Résumé Data

Plain-text extract of every project and profile fact currently in the portfolio
codebase. Source files noted per section so this stays checkable against code.

---

## 1. Profile

**Source:** `src/components/design/site.js`

| Field | Value |
| --- | --- |
| Name | Jade N. Paver |
| Title | Software Developer |
| Email | paver.jade09@gmail.com |
| CV | `/paver_cv.pdf` |
| Status | Open to work |

**Links**

- GitHub — https://github.com/JadePaver
- LinkedIn — https://www.linkedin.com/in/jade-paver-a6073a280/
- X — https://x.com/Zakkur29
- Facebook — https://www.facebook.com/jade.paver.5
- Instagram — https://www.instagram.com/lincolns729

**Headline stats** (`src/pages/Home.js`)

- 6+ years building
- 20+ projects delivered
- 3 platforms shipped
- <24h reply time

**Daily stack (header strip):** Flutter · Dart · Laravel · PHP · React · TypeScript · MySQL

---

## 2. Timeline / Milestones

**Source:** `src/pages/Home.js` — `MILESTONES`

### 2020 — First line of code, age 16
A high school computer lab, a borrowed book, and a habit that never wore off.

> Every tool I use I taught myself first and got graded on later. Hand me an
> unfamiliar stack or a half-written spec and you won't be managing me through it.

- Building since: 2020
- Learned by: Self-taught
- Shipping: 6+ years

### 2024 — BS Computer Technology
Graduated while already shipping paid client work on the side.

> Graduated in 2024, already shipping paid client work on the side. The degree
> confirmed what the side projects had been teaching for years.

- Degree: BS Computer Technology (Class of 2024)
- Finished: 2024
- Alongside: Client work

### Today — Six years of shipping
Full delivery path: schema and API design, front end, mobile releases, handover.

> Working the full delivery path: schema and API design, front-end architecture,
> mobile releases, and the handover documentation that outlives the project.

- Years: 6+
- Projects: 20+
- Reply time: <24h

---

## 3. Skills & Stack

**Source:** `src/pages/Home.js` — `STACK` (tier 3 = daily driver, 2 = shipped with it, 1 = still learning)

### Tier 3 — Daily driver

| Skill | Note |
| --- | --- |
| TypeScript | Typed front to back, no loose ends |
| React | Dashboards and client-facing interfaces |
| Laravel | APIs, auth, admin panels, queues |
| PHP | Server side of every project I have shipped |
| Flutter | Android and iOS from one codebase |
| Dart | App logic, state, and platform channels |
| MySQL | Schema design, migrations, query tuning |
| Git | Small commits, readable history, no force pushes |

### Tier 2 — Shipped with it

| Skill | Note |
| --- | --- |
| Node.js | Small services, scripts, build tooling |
| Supabase | Auth, storage, and realtime data on mobile |
| MUI | Component system behind the React dashboards |
| Tailwind CSS | Design tokens straight in the markup |
| REST APIs | Contracts other developers build against |
| Figma | Design review and developer handoff |

### Tier 1 — Still learning

| Skill | Note |
| --- | --- |
| PostgreSQL | Moving my MySQL habits across |
| Docker | Local environments that match production |
| CI/CD | Automating the release steps I still do by hand |
| GraphQL | Schema-first queries for client apps |
| AWS | Past shared hosting, one service at a time |

---

## 4. Services

**Source:** `src/pages/Home.js` — `SERVICES`

**01 · Web Development** — React · TypeScript · Laravel · Node.js
> Six years of production web apps, from marketing sites to internal dashboards.
> Typed, reviewed, and documented so the next developer isn't guessing.

**02 · Mobile Apps** — Flutter · Dart · Supabase · Android Studio
> Cross-platform apps in Flutter and Dart: one codebase, native feel,
> offline-first data, and store releases handled end to end.

**03 · UI/UX Design** — Figma · Prototypes · Design systems
> Interfaces designed in Figma by the same person who codes them, so what gets
> designed is what actually ships.

**04 · Project Management** — Jira · Trello · Bitbucket
> Clear, structured coordination from planning to delivery: transparent
> communication, smooth workflows, and on-time execution at every stage.

---

## 5. Process & Principles

**Process** (`PROCESS`)

1. **Discover** — One call to define the outcome, the constraints, and what success looks like in numbers.
2. **Architect** — Data model, API contracts, and screen flows agreed before a line of feature code exists.
3. **Build** — Two-week increments, each ending in something you can click, with a written changelog.
4. **Ship & support** — Release, monitor, hand over documentation, and stay reachable after launch.

**Principles** (`PRINCIPLES`)

1. **Architecture before features** — Clear boundaries and a normalized data model, so the tenth feature costs about what the first one did.
2. **Ship small, ship often** — Working increments over big reveals. You see progress every week, not a surprise at the deadline.
3. **Plain language, always** — Trade-offs explained without jargon, so non-technical stakeholders can make the call with real information.

---

## 6. Projects — Summary Table

| # | Project | Case № | Year | Type | Role | Platform | Stack | Route |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Ledger App | 01 | 2025 | Mobile App | Solo designer & developer | Android | Flutter · Dart · Firebase/Supabase · Riverpod | `/ledger` |
| 2 | PasaBay | 02 | 2024–2025 | Mobile App | Designer & full-stack developer | Android · Maps API | Flutter · Dart · Maps API | `/pasabay` |
| 3 | Aspentech | 03 | 2025–2026 | Web Development | Designer & front-end developer | Responsive web | React · TypeScript · Laravel · MUI | `/aspentech` |
| 4 | ICTD App | 04 | 2025–2026 | Web & Mobile | Designer & developer | Android app + web console | Flutter · Dart · React · TypeScript · Supabase | `/ictd` |
| 5 | LMS | 05 | 2025–2026 | Web Development | Solo designer & developer | Web · desktop-first | React · Node · Express · MySQL | `/lms` |

Categories used by the filter: UI/UX · Web Development · Mobile App · Project Management

---

## 7. Ledger App — Case Study N°01

**Sources:** `src/pages/Home.js` (card), `src/pages/Projects/ledger/content.js` (case study)

- **Tagline:** Every peso, accounted for.
- **Discipline:** Mobile app · Personal finance
- **Role:** Solo designer & developer
- **Timeline:** 10 weeks, 2025
- **Platform:** Android · Flutter
- **Stack (case study):** Flutter · Dart · Firebase · Hive · Riverpod · Figma
- **Stack (card):** Dart · Android Studio · Supabase
- **Categories:** UI/UX, Mobile App, Project Management
- **Brand color:** `#12B48F`

### Lead
A personal finance app for the way money actually moves — cash, bank, credit, and
the money between people — with an assistant that answers in plain language.
Designed and built solo, from first sketch to signed build, in ten weeks.

### Card summary
A multi-wallet personal finance app for Android, with an AI assistant wired into
real transaction data and offline-first sync for bills, debts, and savings goals.

### The brief — "Why budgeting apps get deleted"
The pattern is always the same: logging costs too much effort, and the charts
never explain anything. Ledger was scoped against those two failures — nothing
else made the cut.

- **Problem:** People abandoned budgeting apps because logging one expense took too many taps, and the charts never explained where the money went.
- **Approach:** An offline-first Flutter app with a two-tap entry flow, a local cache that syncs to Firestore when the connection returns, and insights built from pre-aggregated queries instead of client-side loops.
- **Outcome:** Entry flow cut from nine taps to two; cold start under 1.4 seconds on a mid-range Android device — fast enough to log before the receipt is folded.

**Extended problem (card):** Most budgeting apps assume one account and one
balance, so anyone juggling cash, several bank accounts, and a shared fund forces
everything into a single number. Recurring bills sit outside that balance as
reminders, so the app can show ₱10,000 available while ignoring rent due next week.

**Extended outcome (card):** The balance on screen is the one that is actually
spendable, and the assistant can answer "how much did I spend on groceries last
month" from the user's own data instead of generic advice.

### Metrics
- **9 → 2** taps per entry
- **1.4s** cold start, mid-range device
- **6** wallets, one running balance
- **4** surfaces — wallets · insights · goals · AI

### Chapters
**01 · Wallets — "One glance, one number"**
The home screen answers the only question that matters first — *how much is there
right now?* — then lets each wallet tell its own story.
- 1.1 Live total, always on top — ₱142,161 across six wallets, with income and expenses split out on the same card.
- 1.2 Cards that show the trend — every wallet carries its own sparkline, transaction count, and money in / money out.
- 1.3 Make each one yours — 24 icons and 16 colors, previewed live on the card while you edit the wallet.
- 1.4 Log it in two taps — a floating button opens a new transaction from anywhere in the app.

**02 · Insights — "Numbers that explain themselves"**
Filter by day, week, month, year, or a custom range — every figure on the screen
recalculates, including the month-over-month deltas.
- 2.1 Any range, recomputed — all-time to custom; the whole screen re-aggregates in place, no loading spinner.
- 2.2 Deltas, not just totals — income −31%, spending +36%; every number is read against the period before it.
- 2.3 Nudges before problems — overdue debts and spending spikes surface as smart-insight cards at the top of the feed.
- 2.4 Savings rate, graded — one honest percentage with a plain-language label; 61% reads "Excellent."

**03 · Goals & debts — "The two missing ledgers"**
Most budgeting apps stop at spending. Ledger also tracks the money you're putting
aside — and the money moving between people.
- 3.1 Progress you can feel — a ring, a deadline, and a one-tap top-up on every savings goal.
- 3.2 Goals follow you home — active goals surface as progress pills at the top of the wallets screen.
- 3.3 Both directions, netted — they-owe-me and I-owe sit side by side, resolved into one net line.
- 3.4 Real-world detail — interest rates, categories, overdue flags, and a settled state on every debt.

**04 · AI assistant — "Answers, not dashboards"**
The assistant reads real wallets and transactions — the same aggregates that power
Insights — then answers in a sentence. It explains; it never invents a number.
- 4.1 "How much did I spend?" — plain-language questions over your actual data, with suggested prompts to start.
- 4.2 Grounded replies — every answer is computed first and phrased second, never the other way around.
- 4.3 Always a next step — replies end with an offer; "Want a category breakdown?" keeps the thread useful.
- 4.4 Three ways in — Google, Facebook, or phone sign-in; secure & private from the first screen.

### Engineering notes
- **N.01 Offline-first, not offline-tolerant** — The local cache is the source of truth. Entries commit instantly and a sync job reconciles with Firestore when the connection returns; nothing in the UI ever waits on the network.
- **N.02 Two taps, by design** — The entry sheet opens pre-filled with the last wallet and most-used category. The nine-tap flow this replaced is exactly where every previous tracker lost its users.
- **N.03 Pre-aggregated insights** — Charts and digests read from running aggregates written at log time, not client-side loops over transaction history. That is what keeps cold start under 1.4 seconds.
- **N.04 An assistant that can't lie** — The AI layer only phrases numbers computed by the same query layer as Insights. If the data can't answer a question, neither will the assistant.

### Screens (9)
Get started · My Wallets · Edit wallet · Insights · Financial summary ·
Wallet breakdown · Savings goals · Debts · AI assistant

### Outcome — "Nine taps became two"
The result is a tracker that opens in under a second and a half, works with no
signal, and explains itself in plain language — *a ledger people actually keep.*

---

## 8. PasaBay — Case Study N°02

**Sources:** `src/pages/Home.js` (card), `src/pages/Projects/pasabay/content.js` (case study)

- **Tagline:** Home-cooked Filipino food, sent your way.
- **Discipline:** Mobile app · Food delivery
- **Role:** Designer & full-stack developer
- **Timeline:** 4 months, 2024 (card lists 2025)
- **Platform:** Android · Maps API
- **Scope:** 10 screens, end to end
- **Stack (card):** Dart · Android Studio
- **Categories:** Mobile App, UI/UX, Project Management
- **Brand color:** `#F5A814`

### Lead
A food-delivery app for neighborhood home kitchens. Browse what's cooking today,
reserve tomorrow's menu before the servings run out, and follow the order all the
way to your door.

### Card summary
A food ordering app built around home kitchens. Every cook gets a menu that resets
daily, a live serving count, and delivery that starts on a map pin instead of a
street address.

### The brief — "A home kitchen is not a restaurant"
Neighborhood cooks sell a fixed batch each day and take orders in Facebook comment
threads. PasaBay was scoped around that reality instead of copying a restaurant
marketplace.

- **Problem:** Orders lived in comment threads: no one knew how many servings were left, tomorrow's menu was posted and lost, and riders were given landmarks over the phone.
- **Approach:** Put the batch first. Every dish carries a live serving count, the menu only ever shows today and tomorrow, and delivery starts from a dropped pin instead of a typed street number.
- **Outcome:** One flow from browse to doorstep: sign-in without a password, two ways to buy, and a saved address label the rider can actually follow.

**Extended problem (card):** Home cooks already sell lutong bahay through Facebook
posts and group chats. The cook posts a menu, then spends the afternoon reading
comments to work out who ordered what and who has paid, while buyers comment
"available pa?" and wait. Almost nobody gives directions by street number here —
an address sounds like "near LBC, across the public market".

**Extended outcome (card):** An order can never be placed for food that was never
cooked, so no cook has to message a buyer back to cancel — and riders get a pin
instead of a landmark description.

### Metrics
- **2 days** menu horizon — today & tomorrow
- **0** passwords — OTP plus a 4-digit PIN
- **₱30** delivery fee, shown before you pay
- **4** surfaces — home · messages · calendar · alerts

### Chapters
**01 · First run — "Three screens, then you're in"**
Onboarding explains the whole model in one sweep — *order, schedule, eat*.
Sign-in never asks for a password.
- 1.1 Order — browse home kitchens near you and see what's cooking today.
- 1.2 Schedule — reserve from tomorrow's menu before the servings run out.
- 1.3 Eat — delivery or pick-up the moment it comes off the stove.
- 1.4 Sign in — mobile number, Facebook or Google, verified by OTP, then a 4-digit PIN.

**02 · Discover — "What the neighborhood is cooking"**
The home feed is built around a single gold header, a kitchen carousel and a
two-day menu. No filters to learn before the first order.
- 2.1 Featured Kitchen — a swipeable grid of nearby home cooks, each with its barangay and rating.
- 2.2 Today's / Tomorrow's Menu — one tap switches between what's ready now and what to pre-order.
- 2.3 Available Serving — live stock per dish, because home kitchens cook a fixed batch each day.
- 2.4 Search, then narrow — Price, Available Now, Nearby and Free delivery sit as chips above the results.

**03 · Order — "From dish sheet to confirmed"**
Every dish opens as a photo-led sheet with the kitchen, the serving count and the
two ways to buy sitting on one row.
- 3.1 Serving stepper — grey minus, gold plus, capped at what the kitchen has left.
- 3.2 Add to cart, or Order Now — keep building an order across the kitchen, or skip straight to checkout.
- 3.3 Checked lines only — the cart totals what you tick, so a saved dish can wait for the next order.
- 3.4 Confirmed, then repeat — a quiet receipt screen whose only action is Order Again.

**04 · Deliver — "Addresses that riders can actually find"**
Neighborhoods here run on landmarks, not street numbers, so the pin comes first
and the written detail follows.
- 4.1 Drop the pin — search or auto-locate, with nearby landmarks kept on the map.
- 4.2 Address details — floor and unit, plus a free-text note to the driver.
- 4.3 Save a label — Home, Work, Office or your own, reusable at every checkout.
- 4.4 Pay how they already pay — GCash or cash on delivery, chosen on the same screen as the address.

### Design notes
- **N.01 The batch is the product** — A home cook makes ten servings, not a stocked menu. Available Serving appears on every card, sheet and cart line, and it caps the stepper: the interface never lets you order food that doesn't exist.
- **N.02 Two days, never a calendar** — Kitchens plan one day ahead, so the menu is a two-tab toggle instead of a date picker. Scheduling stays a decision about dinner, not an appointment to book.
- **N.03 Two ways to buy, one row** — Add to cart and Order Now sit side by side on the dish sheet. A single dish for tonight and a full family order are the same product, one tap apart.
- **N.04 Landmarks over street numbers** — Addresses here are given as "beside the public market." The pin is captured first, the written detail and a note to the driver come after, and the whole thing is saved behind one reusable label.

### Screens (10)
Sign in · Sign up · OTP · Create PIN · Home · Kitchens · Search · Cart ·
Checkout · Confirmed

### Outcome — "The comment thread became a checkout"
Ten screens carry a neighborhood order from a photo of today's ulam to a rider at
the gate, with the serving count, the price and the pin agreed before anyone
starts cooking. *Same kitchens, same food, one honest flow.*

**Stack chips:** Home kitchens · Today & tomorrow · OTP sign-in · Maps API · GCash · COD · Figma

---

## 9. Aspentech — Case Study N°03

**Sources:** `src/pages/Home.js` (card), `src/pages/Projects/aspentech/content.js` (case study)

- **Tagline:** See it before you build it.
- **Discipline:** Web platform · Enterprise software sales
- **Role:** Designer & front-end developer
- **Client:** Aspentech Solutions
- **Year:** 2026 (card lists 2025)
- **Platform:** Responsive web
- **Scope:** Marketing site + live customizer
- **Stack (card):** React · TypeScript · Laravel · MUI
- **Categories:** UI/UX, Web Development, Project Management
- **Brand color:** `#2F6FED`

### Lead
Enterprise software is sold on slide decks and hope. Aspentech Solutions sells it
with a live product instead: six production-ready systems a buyer can browse,
re-skin, and re-scope in the browser, then send back as the proposal request.

### Card summary
A showcase site for an enterprise software agency. Buyers browse twelve shipped
systems, repaint one with their own colors and modules live, then send a proposal
carrying that exact setup.

### The brief — "Nobody buys a system they can't picture"
Procurement committees sign six-figure builds off screenshots of somebody else's
product. The site was scoped against one failure: the gap between what a buyer
imagines and what the vendor will actually ship.

- **Problem:** Enterprise and government buyers were asked to approve a system from a feature list. Every scoping call restarted from zero, and the design conversation only began after the contract was signed.
- **Approach:** Treat the sales site as the product. Six real systems as browsable templates, a customizer that re-skins them live (colors, layout, density, modules), and a detail page per system that states its stack, modules, and fit before anyone talks price.
- **Outcome:** The proposal request now arrives with a configuration attached: chosen template, design style, layout, module set, and an indicative scope band — a shared picture on day one instead of week six.

**Extended problem (card):** The agency was pitching with slide decks and old
screenshots, so a client had to picture their own branding on a system built for
somebody else — and that gap is where most deals stalled. A plain contact form
threw the context away, so the first call always started from zero.

**Extended outcome (card):** Buyers reach the first call having already seen the
system in their own colors, and the proposal states which modules they picked.

### Metrics
- **6** system templates, all shippable
- **7** design styles, one click apart
- **2** live previews — desktop & mobile
- **0** mockups drawn per enquiry

### Chapters
**01 · Templates — "Start from something that already runs"**
Each card is a system in production somewhere: budget, requests, inventory,
governance, people. Photography and a domain badge do the sorting, so a buyer
finds their own department before reading a word of copy.
- 1.1 Sorted by department, not feature — Finance & Government, Operations, Supply Chain, Governance, People: the badge a buyer already identifies with.
- 1.2 Modules on the card — three named modules and a "+3 more" chip give the shape of the system without opening it.
- 1.3 Two exits, always — Explore for the detail page, Customize to skip straight into the live preview, so readers and tinkerers are both served.
- 1.4 Real work, real photos — warehouses, drawings, ledgers: imagery from the job the system does, never abstract tech stock.

**02 · Live customizer — "The demo *is* the spec"**
One preset (Government Portal, Corporate Enterprise, Modern SaaS) transforms every
surface at once. From there the controls get finer: theme mode, primary and accent
color, navigation pattern, corner radius, module set.
- 2.1 Presets first, dials second — six one-click starting points mean nobody faces an empty control panel, and swatches preview the palette before you commit.
- 2.2 Seven re-skins, one layout — Standard through Neobrutalism, Glassmorphism, Claymorphism, Y2K: surface treatment changes, information architecture doesn't.
- 2.3 Showcase or single screen — review every key screen of one system, or every system at once: the same config, two ways of reading it.
- 2.4 Scope in the footer — a sticky bar keeps template, tier, module count and an indicative timeline in view, and turns it into "Request this build".

**03 · System detail — "Every system makes its own case"**
The detail page answers the evaluation checklist in order: what it does, what it
includes, what it's built on, who it suits, while a sticky panel holds the two
actions that matter.
- 3.1 Two numbers in the hero — "70% reporting time saved", "3× faster approval cycle": the outcome sits beside the title, not three sections down.
- 3.2 Modules, listed plainly — six named modules ready to configure, the same list the customizer toggles, so the pages can't contradict each other.
- 3.3 Stack and fit, in the rail — technology chips and an "Ideal for" list answer the IT reviewer while the decision-maker reads the left column.
- 3.4 Impact, labelled illustrative — the post-rollout curve is captioned as representative, because credibility costs one line of honest copy.

**04 · On device — "The same config, in the hand"**
Field teams are the reason half these systems get bought, so mobile isn't a tab
you have to look for: dashboard and record detail render side by side in the same
preview, under the same controls.
- 4.1 Two screens, one story — dashboard next to record detail shows the whole loop: scan the numbers, open the line, read its history.
- 4.2 Data that reads as real — reference numbers, owners, fiscal year, deltas: plausible records, because empty states never sell a system.
- 4.3 Live badges, not screenshots — a "Live" tag on each frame says out loud what the buyer suspects: this is the real thing responding to your choices.
- 4.4 Tap targets that survive gloves — bottom navigation and a persistent add button, because the mobile-first preset exists for warehouse and field crews.

### Design notes
- **N.01 One theme layer, seven skins** — Every design style is a token set (surface, border, radius, shadow, type weight) applied over one component library. Neobrutalism and Neumorphism are the same screens with different variables, which is why the preview can switch instantly and why the build estimate doesn't move.
- **N.02 Configuration is a shareable object** — Template, style, palette, layout, radius and module set serialize into a link. A buyer sends it to their committee; the proposal request arrives carrying the same object, so no "which version did you mean?"
- **N.03 Honest numbers, labelled** — Impact curves say "representative", scope bands say "indicative, refined in your tailored proposal". Enterprise buyers punish overclaiming harder than they punish caution, so the caveat is part of the design, not a footnote.
- **N.04 The process is a section, not a PDF** — Seven phases, each naming its deliverables: requirements brief, clickable prototype, UAT sign-off, go-live runbook. Procurement teams look for exactly these words; putting them on the page answers the RFP before it's written.

### Screens (11)
Home · Proof band · Templates · Why Aspentech · System hero · Overview · Impact ·
Customizer · Controls · Mobile preview · Process

### Outcome — "The pitch became a product"
Aspentech stopped describing systems and started handing them over to be played
with. Every enquiry now arrives with a template, a design style, a module list and
a scope band already agreed, so *the first meeting starts at the second question.*

**Stack chips:** Homepage · Template catalog · System detail · Live customizer · Process & proposal

---

## 10. ICTD App — Case Study N°04

**Sources:** `src/pages/Home.js` (card), `src/pages/Projects/ictd/content.js` (case study)

- **Tagline:** Asset & custody management.
- **Discipline:** Mobile app + web console · Government ICT
- **Role:** Designer & developer
- **Client:** ICTD — Office of the Governor (Information and Communications Technology Division)
- **Year:** 2026 (card lists 2025)
- **Platform:** Android app + web console
- **Scope:** Product design + build
- **Stack (case study):** Flutter · Dart · Web console · REST API · Figma
- **Stack (card):** Dart · React · TypeScript · Supabase
- **Categories:** UI/UX, Mobile App, Web Development, Project Management
- **Brand color:** `#1E8050`

### Lead
The service desk of the Information and Communications Technology Division, Office
of the Governor — technical requests, the repair bench, and equipment custody kept
on one record. Staff open it from a phone in the field; the division works it from
a console at the desk.

### Card summary
A service-desk platform in two halves: a Flutter app for field operators and a
React admin dashboard for staff, both reading and writing the same live Supabase
data.

### The brief — "Where the logbook kept failing"
A division that fixes everyone else's equipment was running its own queue on phone
calls, group chats, and a paper logbook. The brief was to make one record
everybody can read.

- **Problem:** Requests arrived by call and chat, repairs were tracked on paper, and custody of a unit was whatever the last person remembered. Nobody could answer "where is it, and who touched it last?"
- **Approach:** One record per request and per unit, with an append-only activity log instead of an editable status field — surfaced twice: a field app for staff and technicians, and a triage console for the division.
- **Outcome:** Every ticket and every unit on the bench carries its own timeline, its owner, and the technician who answered — readable from either front door, with no second copy to reconcile.

**Extended problem (card):** Requests made over chat, email, or a walk-up desk
leave no record of who asked, who is handling it, or whether it was ever resolved.
A laptop left for repair is just as easy to lose track of once it leaves the
owner's hands, and a paper log shows neither status nor who last touched it.

**Extended outcome (card):** Field work and desk work each get the posture that
suits them without forking the implementation, so a fix lands once instead of
three times.

### Metrics
- **2 → 1** clients, one shared record
- **9** modules in the console
- **4** triage states, oldest first
- **100%** of actions written to the log

### Chapters
**01 · Technical requests — "Every request keeps its own thread"**
A staff member files the problem in their own words. What comes back is not a
status — it's a *record of who did what, and when.*
- 1.1 Three tabs, no inbox — Open, Taken and Done split the queue so nothing waits behind something already handled.
- 1.2 Filed to a department — type, office, ticket number and timestamp sit on the card before you expand anything.
- 1.3 An activity log, not a status — Created, Processing, Done: each step keeps its author, its note, and the time it happened.
- 1.4 Responded by a person — the technician's name is on the ticket, so follow-up always has somewhere to go.

**02 · Repair bench — "Book it in, track it out"**
Custody is the whole job. Each unit on the bench carries its serial number, the
condition it arrived in, the condition it left in, and every hand it passed through.
- 2.1 Status is an event — Received → Repairing → Ready for release, each with a note attached; never a field somebody overwrote.
- 2.2 Condition, both ways — what came in and what went back out, recorded in the owner's own words at both ends.
- 2.3 System user or walk-in — link the item to an account, or type a custom owner for someone without one.
- 2.4 The form explains itself — a guide sheet defines every field, so intake reads the same from any technician.

**03 · Admin console — "Triage from one board"**
The same records, arranged for the people who clear them. Oldest first, decision
buttons on the card, and the bench grouped by whose desk it's sitting on.
- 3.1 Oldest first, on purpose — each column states the age of the oldest ticket in it, so the queue can't quietly rot.
- 3.2 Decide from the card — accept, deny or complete without opening a detail page or losing your place.
- 3.3 Grouped by technician — the repair list stacks by whose bench it's on, with days-in-shop flagged in red.
- 3.4 Nine modules, one shell — operations, inventory and directory sit in one sidebar, requests through custodians.

**04 · Messages — "Ask the person holding your unit"**
Follow-up used to live in a group chat nobody could search. Now it sits inside the
app that already knows which ticket you're asking about.
- 4.1 One thread per technician — unread counts sit on the conversation and on the tab, colour-coded per person.
- 4.2 Searchable by name — conversations are filtered from the top of the list instead of scrolled through.
- 4.3 Delivery you can see — sent and read states, day separators, and a timestamp on every bubble.
- 4.4 Three ways in — mobile number, Google, or Facebook: the same account the record is signed against.

### Engineering notes
- **N.01 Append-only, never overwritten** — Status changes are rows in a log, not a column on the record. Custody disputes are settled by reading the timeline instead of trusting the last edit.
- **N.02 Two clients, one contract** — The field app and the console read the same records through the same API. Nothing in the office view is a second copy that has to be reconciled later.
- **N.03 Queues sorted by age, not by priority** — Self-declared urgency always inflates. The board sorts oldest-first and prints the age of the oldest item in each column, so neglect is visible instead of arguable.
- **N.04 Written for the person at the counter** — Intake fields carry an in-app guide with examples, because the form is filled in front of an owner who is already annoyed that their unit broke.

### Screens (9)
Splash · Sign in · Requests · Request activity · Repairs · Repair record ·
Form guide · Messages · Chat

### Outcome — "The logbook became a record"
Requests, repairs and custody now share one timeline that both the field and the
office can read — *so "where is it, and who touched it last?" has an answer on the
screen.*

**Stack chips:** Flutter · Dart · Web console · REST API · Figma

---

## 11. LMS — Case Study N°05

**Sources:** `src/pages/Home.js` (card), `src/pages/Projects/lms/content.js` (case study)

- **Tagline:** Learn to code, one line at a time.
- **Discipline:** Web app · Code learning platform
- **Role:** Solo designer & developer
- **Year:** 2026 (card lists 2025)
- **Platform:** Web · desktop-first
- **Stack (case study):** React · Node · Express · MySQL · Figma
- **Stack (card):** React · TypeScript · Node.js
- **Categories:** UI/UX, Web Development, Project Management
- **Brand color:** `#C0553B`

### Lead
A learning platform for people who are learning to write code — modules to read,
challenges to build, and a browser editor that runs the module's own tests before
anything is submitted. Instructors get the other half: one console for publishing
and one queue for review.

### Card summary
A coding education platform where instructors publish modules and grade real
submissions, and students write, run, and ship code against module tests in an
in-browser workspace.

### The brief — "Reading about code isn't writing it"
Lessons live on one site, the exercise on another, and the grade in a spreadsheet.
LMS was scoped to close that loop — read, build, run, submit, review — without
leaving the tab.

- **Problem:** Learners bounce between a lesson page, a local editor and a submission form — and instructors chase files in chat threads to find out who actually finished.
- **Approach:** One shell for two roles. Every module is a syllabus of lessons plus difficulty-tiered assessments, and every assessment opens as a workspace: spec on the left, editor and test runner on the right.
- **Outcome:** Students practise where they read, and instructors open the day on a review queue with counts already attached — pending, passed and failed, per module.

**Extended problem (card):** On most course sites the lesson and the practice live
in different places: a student reads about a concept, then opens a separate tool
to write and test the code. Instructors need more than somewhere to post videos —
they need to publish an assessment with a starter file and a brief, then see who
passed without grading every attempt by hand.

**Extended outcome (card):** Reading and coding happen without leaving the page,
and an instructor can filter by outcome, narrow to one assessment, and open any
attempt inline.

### Metrics
- **18** modules across six tracks
- **3** difficulty tiers — easy · medium · hard
- **1×** submission per assessment, locked
- **5** surfaces, two roles, one shell

**Tracks:** React (4) · Node.js (4) · JavaScript (4) · Database (2) · ORM (2) · BMS (2)

### Chapters
**01 · Module catalog — "Eighteen modules, six tracks, one grid"**
The front door for both roles. Track filters carry their own counts, and every
card states its scope — *how long, how hard, who wrote it* — before a student commits.
- 1.1 Filters that count — React (4), Node.js (4), JavaScript (4), Database (2), ORM (2), BMS (2): the number is part of the filter.
- 1.2 Scope on the card — lesson and assessment counts sit under the description, so effort is visible from the grid.
- 1.3 Authored, not anonymous — every module credits its instructor, the same name a student will meet in the review queue.
- 1.4 One icon per track — a fixed glyph and tag per track makes the grid scannable long before the titles are read.

**02 · Module detail — "Lessons and assessments, side by side"**
A module opens as a syllabus: a numbered reading track on the left, graded
challenges on the right, tagged easy through hard so students choose their next
step instead of guessing it.
- 2.1 An ordered track — lessons are numbered, not a list; the sequence is the teaching, from intro to common mistakes.
- 2.2 Difficulty as a promise — easy, medium and hard are colour-coded once and used everywhere the assessment appears.
- 2.3 The brief up front — what the module covers and who wrote it, above the fold: the pitch before the commitment.
- 2.4 Rules before the attempt — one submission per assessment is stated on the syllabus, not discovered after submitting.

**03 · Assessment workspace — "Write, run and submit in the browser"**
The brief, the API contract and a starter file sit beside a live editor. Students
run their component against the module's tests, read the terminal, and only then
lock in the one submission they get.
- 3.1 A spec, not a hint — endpoint, response shape and numbered requirements: the same contract the tests assert.
- 3.2 Starter scaffold — the file opens with structure and TODOs, so the work is the logic, never the boilerplate.
- 3.3 Run before you submit — Terminal and Tests share the bottom pane; the pass/fail line appears where the code was written.
- 3.4 One attempt, made obvious — once submitted, the header, the banner and the button all say the same thing.

**04 · Instructor console — "Everything an instructor ships, in one list"**
The review backlog is the first thing on the page. Publish state, track tag and
every row action — manage, grade, edit, unpublish, delete — stay one click away.
- 4.1 Backlog first — "53 submissions waiting for review" sits under the title: the one number that sets the day.
- 4.2 Live or not, at a glance — publish state and track tag ride next to the title; unpublishing never means deleting.
- 4.3 Pending in the button — Submissions carries both totals and an amber pending count, so triage happens on the list.
- 4.4 Destructive, and dressed as it — Delete is the only filled red control on the page; every other action is quiet by default.

**05 · Grading & review — "Grade with the whole picture in view"**
Per-module submissions roll up to total, pending, passed and failed — then filter
by outcome, search a student, and open any attempt inline to read the code that
was actually submitted.
- 5.1 Four numbers, one row — total, pending, passed, failed, each card borrowing the colour it means everywhere else.
- 5.2 Filter, then find — outcome tabs, an assessment picker and a name-or-email search stack in that order.
- 5.3 Review without leaving — each row expands to the submitted code and a pass / fail decision, feedback optional.
- 5.4 Attempts keep their time — student, email, assessment and "16h ago": enough context to grade in order.

### Design notes
- **N.01 One submission, said three times** — The lock appears on the syllabus, in the workspace banner and on the submit button itself. A rule that costs a student their only attempt should never be a surprise.
- **N.02 The scaffold is the lesson** — Every assessment opens with a structured file and TODO comments in the order the requirements are written, so the exercise is the logic, not remembering how to start a component.
- **N.03 Two roles, one shell** — Students and instructors share the same navigation, cards and status colours. The only difference is a badge and a Manage entry, so nothing has to be learned twice.
- **N.04 Counts before clicks** — Track filters, module rows and submission tabs all carry their own totals. Triage happens while reading the list, which is why the console needs no separate dashboard.

### Screens (6)
Sign in · Module catalog · Module detail · Assessment workspace ·
Instructor console · Submissions

### Outcome — "Read it, build it, submit it — one tab"
Eighteen modules, three difficulty tiers and a single locked attempt per
assessment, with the instructor's review queue attached to the same rows students
submit into — *a course that grades itself into shape.*

**Stack chips:** React · Node.js · Express · MySQL · Figma

---

## 12. Résumé-ready bullet points

Condensed one-liners with numbers, for a CV or LinkedIn.

**Ledger — Personal finance app (Flutter, Android)**
- Designed and shipped a multi-wallet Android finance app solo in 10 weeks, cutting expense entry from 9 taps to 2 and holding cold start under 1.4s on mid-range hardware.
- Built an offline-first sync layer where the local cache is the source of truth, so entries commit instantly and reconcile with the cloud on reconnect.
- Wired an AI assistant to pre-aggregated query results so every answer is computed before it is phrased — it explains data, never invents it.

**PasaBay — Home-kitchen food delivery (Flutter, Android + Maps API)**
- Designed and built a 10-screen food-delivery app end to end in 4 months for neighborhood home kitchens, replacing Facebook comment-thread ordering.
- Modelled the product around a fixed daily batch: a live serving count caps the order stepper, so an order can never be placed for food that was never cooked.
- Replaced typed street addresses with a map-pin-first flow plus reusable labels, matching how deliveries are actually navigated locally.

**Aspentech — Enterprise software showcase (React, TypeScript, Laravel, MUI)**
- Built a marketing site whose live customizer lets buyers re-skin production systems with their own colors, layout, radius and module set, then send that exact configuration as the proposal request.
- Implemented 7 design skins as token sets over one component library, so previews switch instantly without changing information architecture or build estimates.
- Made configuration a shareable serialized object, removing version ambiguity between buyer, committee and vendor.

**ICTD App — Government service desk (Flutter + React/TypeScript, Supabase)**
- Delivered a two-client service-desk platform — Android field app and a 9-module web console — reading and writing one shared record set through the same API.
- Replaced editable status fields with an append-only activity log so 100% of actions retain author, note and timestamp, settling custody disputes by timeline.
- Sorted triage queues oldest-first with per-column age labels, making neglected tickets visible instead of arguable.

**LMS — Code learning platform (React, Node, Express, MySQL)**
- Built a learning platform covering 18 modules across 6 tracks with 3 difficulty tiers, closing the read → build → run → submit → review loop in one tab.
- Shipped an in-browser assessment workspace with spec, starter scaffold, editor and test runner, so students run module tests before locking their single submission.
- Built the instructor console around the review backlog, rolling submissions into total/pending/passed/failed with inline code review — no separate dashboard needed.

---

## 13. Data inconsistencies to reconcile

These are conflicts between the project card data in `src/pages/Home.js` and the
case-study `content.js` files. They matter if this text is going onto a résumé.

| Project | Card (`Home.js`) | Case study (`content.js`) |
| --- | --- | --- |
| Ledger | year 2025 · Supabase | 2025 · Firebase, Hive, Riverpod |
| PasaBay | year 2025 | 2024 · "4 months, 2024" |
| Aspentech | year 2025 · "twelve shipped systems" · Laravel | 2026 · "six system templates" |
| ICTD | year 2025 · Supabase, React, TypeScript | 2026 · REST API, web console (no Supabase named) |
| LMS | year 2025 · TypeScript | 2026 · Express, MySQL (no TypeScript named) |

Additional notes:
- Ledger metric "6 wallets, one running balance" (case study) vs "₱142,161 across six wallets" — the six is sample data, not a product limit.
- Aspentech's "70% reporting time saved" and "3× faster approval cycle" are labelled *illustrative* in the design itself; do not use as real client outcomes on a résumé.
- Portfolio-level claims "20+ projects delivered" and "3 platforms shipped" exceed the 5 projects documented here — the rest are undocumented in this repo.
