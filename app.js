const tools = [
  {
    name: 'Prompt Refiner',
    description: 'Turn rough instructions into a clear, structured prompt with constraints and output format.',
    status: 'Free',
  },
  {
    name: 'Nano Banana Pro2',
    description: 'Create punchy campaign briefs from one sentence idea prompts.',
    status: 'Free',
  },
  {
    name: 'Motion Control 2.6',
    description: 'Generate reusable camera/motion presets as JSON config blocks.',
    status: 'Free',
  },
  {
    name: 'Model Compare',
    description: 'Side-by-side workspace concept for comparing outputs from different model providers.',
    status: 'Free',
  },
];

const toolGrid = document.getElementById('toolGrid');

for (const tool of tools) {
  const card = document.createElement('article');
  card.className = 'card tool-card';
  card.innerHTML = `
    <h3>${tool.name}</h3>
    <p>${tool.description}</p>
    <span class="tag">${tool.status}</span>
  `;
  toolGrid.appendChild(card);
}

const tabs = Array.from(document.querySelectorAll('.tab'));
const panels = Array.from(document.querySelectorAll('.tab-panel'));

for (const tab of tabs) {
  tab.addEventListener('click', () => {
    const targetId = tab.dataset.tab;

    for (const t of tabs) {
      t.classList.remove('active');
    }
    for (const panel of panels) {
      panel.classList.remove('active');
    }

    tab.classList.add('active');
    document.getElementById(targetId).classList.add('active');
  });
}

const rawPrompt = document.getElementById('rawPrompt');
const refinedPrompt = document.getElementById('refinedPrompt');
const refineBtn = document.getElementById('refineBtn');

refineBtn.addEventListener('click', () => {
  const input = rawPrompt.value.trim();

  if (!input) {
    refinedPrompt.value = 'Please enter your prompt idea first.';
    return;
  }

  refinedPrompt.value = `You are an expert assistant.\n\nTask:\n${input}\n\nRequirements:\n1) Ask clarifying questions if context is missing.\n2) Provide a practical, step-by-step response.\n3) Include one concise checklist.\n4) Keep section headings clear and scannable.\n\nOutput format:\n- Summary\n- Detailed steps\n- Checklist`;
});

const bananaIdea = document.getElementById('bananaIdea');
const bananaOut = document.getElementById('bananaOut');
const bananaBtn = document.getElementById('bananaBtn');

bananaBtn.addEventListener('click', () => {
  const idea = bananaIdea.value.trim();

  if (!idea) {
    bananaOut.value = 'Add an idea first to generate a Nano Banana Pro2 brief.';
    return;
  }

  bananaOut.value = `NANO BANANA PRO2 // FREE BRIEF\n\nConcept: ${idea}\n\nAudience:\n- Primary: curious early adopters\n- Secondary: value-focused general users\n\nMessage Angles:\n1) Clear outcome in under 10 seconds\n2) Friendly onboarding and low effort\n3) Repeatable process with measurable results\n\nDeliverables:\n- 3 headline options\n- 1 social caption\n- 1 short CTA block`;
});

const motionStyle = document.getElementById('motionStyle');
const motionDuration = document.getElementById('motionDuration');
const motionIntensity = document.getElementById('motionIntensity');
const motionOut = document.getElementById('motionOut');
const motionBtn = document.getElementById('motionBtn');

motionBtn.addEventListener('click', () => {
  const preset = {
    engine: 'Motion Control 2.6',
    tier: 'free',
    style: motionStyle.value,
    durationSeconds: Number(motionDuration.value),
    intensity: Number(motionIntensity.value),
    easing: 'ease-in-out',
    keyframes: [
      { t: 0, x: 0, y: 0, z: 0 },
      { t: 0.5, x: 0.08, y: 0.02, z: 0.12 },
      { t: 1, x: 0.15, y: 0.03, z: 0.18 },
    ],
  };

  motionOut.value = JSON.stringify(preset, null, 2);
});
