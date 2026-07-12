// The "perfecting loop" hero diagram: a GOALS repo and a ROUTINES repo joined
// by a rectangular circuit. An agent square rides the rails — it reads the
// goals, creates a routine (a new row slides into the routines repo), the
// routine fires against external satellites (a commit lands in a repo card, a
// task gets checked), and a goal's progress bar ticks forward when the agent
// returns. All motion is CSS keyframes defined in globals.css (one shared 7s
// cycle, class names prefixed `loop-anim-`), so the site-wide
// prefers-reduced-motion rule collapses it into a static diagram: every
// animated element's base styles ARE its resting frame.
//
// Seamless-loop trick: the routine rows are visually identical and spaced one
// ROW_H apart, so when the row group's translateY(-ROW_H) snaps back to 0 at
// the cycle boundary, the frame is pixel-identical — the "created" row simply
// becomes one of the standing rows (its accent fill fades back to foreground
// before the boundary).

const ROW_H = 28;

// Centers of the five routine rows. The clip window (y 62–178) shows four;
// the fifth starts hidden below it and slides in as the "created" routine.
const ROUTINE_ROWS = Array.from({ length: 5 }, (_, i) => 78 + i * ROW_H);

const GOAL_ROWS: Array<{ cy: number; width: number }> = [
  { cy: 76, width: 88 }, // animated: ticks forward when the agent returns
  { cy: 106, width: 128 },
  { cy: 136, width: 48 },
];

export function LoopAnimation() {
  return (
    <div className="overflow-x-auto p-4 sm:p-6">
      <svg
        role="img"
        aria-label="Animated diagram: an agent reads goals from a goals repository, travels to a routines repository where it creates, edits, and removes routines, the routines act on external repositories and tasks, and the resulting progress flows back into the goals."
        viewBox="0 0 800 220"
        className="block h-auto w-full min-w-140"
      >
        <defs>
          <clipPath id="loop-routines-clip">
            <rect x={464} y={62} width={188} height={116} />
          </clipPath>
        </defs>

        {/* ---- GOALS repo card ---- */}
        <g>
          <rect x={42} y={30} width={192} height={172} className="fill-foreground" />
          <rect x={36} y={24} width={192} height={172} className="fill-white" />
          <rect x={36} y={24} width={192} height={34} className="fill-foreground" />
          <text
            x={52}
            y={47}
            fontSize={13}
            fontWeight={800}
            letterSpacing={2}
            className="fill-accent font-mono"
          >
            GOALS
          </text>
          {/* accent flash behind the first goal while the agent "reads" it */}
          <rect
            x={48}
            y={64}
            width={168}
            height={24}
            className="fill-accent loop-anim-goal-flash"
          />
          {GOAL_ROWS.map(({ cy, width }, i) => (
            <g key={cy}>
              <rect
                x={56}
                y={cy - 6}
                width={152}
                height={12}
                className="fill-foreground/10"
              />
              <rect
                x={56}
                y={cy - 6}
                width={width}
                height={12}
                strokeWidth={2}
                className={`fill-accent stroke-foreground ${
                  i === 0 ? "loop-anim-goal-tick" : ""
                }`}
              />
            </g>
          ))}
          <rect
            x={36}
            y={24}
            width={192}
            height={172}
            strokeWidth={4}
            className="fill-none stroke-foreground"
          />
        </g>

        {/* ---- loop rails ---- */}
        <text
          x={340}
          y={58}
          textAnchor="middle"
          fontSize={10}
          fontWeight={700}
          letterSpacing={3}
          className="fill-foreground/60 font-mono"
        >
          REFINE
        </text>
        <line
          x1={234}
          y1={72}
          x2={440}
          y2={72}
          strokeWidth={4}
          className="stroke-foreground"
        />
        <polygon points="440,64 454,72 440,80" className="fill-foreground" />
        <text
          x={340}
          y={170}
          textAnchor="middle"
          fontSize={10}
          fontWeight={700}
          letterSpacing={3}
          className="fill-foreground/60 font-mono"
        >
          PROGRESS
        </text>
        <line
          x1={244}
          y1={148}
          x2={456}
          y2={148}
          strokeWidth={4}
          className="stroke-foreground"
        />
        <polygon points="244,140 230,148 244,156" className="fill-foreground" />

        {/* ---- ROUTINES repo card ---- */}
        <g>
          <rect x={466} y={30} width={196} height={172} className="fill-foreground" />
          <rect x={460} y={24} width={196} height={172} className="fill-white" />
          <rect x={460} y={24} width={196} height={34} className="fill-foreground" />
          <text
            x={476}
            y={47}
            fontSize={13}
            fontWeight={800}
            letterSpacing={2}
            className="fill-accent font-mono"
          >
            ROUTINES
          </text>
          <g clipPath="url(#loop-routines-clip)">
            <g className="loop-anim-routines-shift">
              {ROUTINE_ROWS.map((cy, i) => (
                <g key={cy}>
                  <circle
                    cx={484}
                    cy={cy}
                    r={7}
                    strokeWidth={2.5}
                    className="fill-white stroke-foreground"
                  />
                  <path
                    d={`M484 ${cy - 4} L484 ${cy} L488 ${cy}`}
                    strokeWidth={2}
                    className="fill-none stroke-foreground"
                  />
                  <rect
                    x={500}
                    y={cy - 5}
                    width={118}
                    height={10}
                    className={`fill-foreground ${
                      i === ROUTINE_ROWS.length - 1 ? "loop-anim-new-row" : ""
                    }`}
                  />
                </g>
              ))}
            </g>
          </g>
          <rect
            x={460}
            y={24}
            width={196}
            height={172}
            strokeWidth={4}
            className="fill-none stroke-foreground"
          />
        </g>

        {/* ---- external satellites (dashed = outside the system) ---- */}
        <text
          x={738}
          y={30}
          textAnchor="middle"
          fontSize={9}
          fontWeight={700}
          letterSpacing={3}
          className="fill-foreground/60 font-mono"
        >
          EXTERNAL
        </text>
        <line
          x1={658}
          y1={84}
          x2={698}
          y2={84}
          strokeWidth={2.5}
          strokeDasharray="6 6"
          className="stroke-foreground"
        />
        <line
          x1={658}
          y1={164}
          x2={698}
          y2={164}
          strokeWidth={2.5}
          strokeDasharray="6 6"
          className="stroke-foreground"
        />
        <g transform="translate(656 84)">
          <circle
            r={5}
            strokeWidth={2}
            className="fill-accent stroke-foreground loop-anim-pulse"
          />
        </g>
        <g transform="translate(656 164)">
          <circle
            r={5}
            strokeWidth={2}
            className="fill-accent stroke-foreground loop-anim-pulse"
          />
        </g>

        {/* external repo: a commit history that gains a commit */}
        <g>
          <rect x={704} y={44} width={76} height={72} className="fill-foreground" />
          <rect x={700} y={40} width={76} height={72} className="fill-white" />
          <rect x={700} y={40} width={76} height={20} className="fill-foreground" />
          <text
            x={708}
            y={54}
            fontSize={10}
            fontWeight={800}
            letterSpacing={1.5}
            className="fill-accent font-mono"
          >
            REPO
          </text>
          <line
            x1={712}
            y1={86}
            x2={766}
            y2={86}
            strokeWidth={2}
            className="stroke-foreground"
          />
          <circle cx={720} cy={86} r={4} className="fill-foreground" />
          <circle cx={736} cy={86} r={4} className="fill-foreground" />
          <circle
            cx={754}
            cy={86}
            r={5.5}
            strokeWidth={2}
            className="fill-accent stroke-foreground loop-anim-pop"
          />
          <rect
            x={700}
            y={40}
            width={76}
            height={72}
            strokeWidth={4}
            className="fill-none stroke-foreground"
          />
        </g>

        {/* external tasks: a checklist that gains a check */}
        <g>
          <rect x={704} y={140} width={76} height={60} className="fill-foreground" />
          <rect x={700} y={136} width={76} height={60} className="fill-white" />
          <rect x={700} y={136} width={76} height={20} className="fill-foreground" />
          <text
            x={708}
            y={150}
            fontSize={10}
            fontWeight={800}
            letterSpacing={1.5}
            className="fill-accent font-mono"
          >
            TASKS
          </text>
          <rect
            x={710}
            y={162}
            width={12}
            height={12}
            strokeWidth={2.5}
            className="fill-white stroke-foreground"
          />
          <path
            d="M712.5 168 l3 3.5 5 -6"
            strokeWidth={2.5}
            className="fill-none stroke-foreground"
          />
          <rect x={730} y={165} width={36} height={7} className="fill-foreground/70" />
          <rect
            x={710}
            y={180}
            width={12}
            height={12}
            strokeWidth={2.5}
            className="fill-white stroke-foreground"
          />
          <path
            d="M712.5 186 l3 3.5 5 -6"
            strokeWidth={2.5}
            className="fill-none stroke-foreground loop-anim-pop"
          />
          <rect x={730} y={183} width={36} height={7} className="fill-foreground/70" />
          <rect
            x={700}
            y={136}
            width={76}
            height={60}
            strokeWidth={4}
            className="fill-none stroke-foreground"
          />
        </g>

        {/* ---- the agent: a black unit-of-work square riding the rails ---- */}
        <g className="loop-anim-agent">
          <rect x={-9} y={-9} width={18} height={18} className="fill-foreground" />
          <rect x={-3} y={-3} width={6} height={6} className="fill-accent" />
        </g>
      </svg>
    </div>
  );
}
