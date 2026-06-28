import { useState, useEffect, useRef } from "react";

const reactions = {
  "Class 11": {
    "Redox Reactions": [
      {
        id: "r1",
        name: "Combination Reaction",
        equation: "2Mg + O₂ → 2MgO",
        type: "Redox / Combination",
        description: "Magnesium burns in oxygen to form magnesium oxide. Mg is oxidized (loses electrons) and O₂ is reduced (gains electrons).",
        conditions: "Heat / Ignition",
        observations: "Bright white flame, white ash (MgO) formed",
        animation: "combustion",
        color: "#f97316",
        youtubeQuery: "magnesium burning oxygen reaction NCERT",
        youtubeId: "OFqiKv3SqNY",
        details: [
          "Oxidation of Mg: Mg → Mg²⁺ + 2e⁻",
          "Reduction of O₂: O₂ + 4e⁻ → 2O²⁻",
          "Oxidizing agent: O₂",
          "Reducing agent: Mg",
          "ΔH = −601 kJ/mol (exothermic)"
        ]
      },
      {
        id: "r2",
        name: "Displacement Reaction",
        equation: "Zn + CuSO₄ → ZnSO₄ + Cu",
        type: "Redox / Single Displacement",
        description: "Zinc displaces copper from copper sulfate solution. Zn is more reactive than Cu in the activity series.",
        conditions: "Room temperature, aqueous solution",
        observations: "Blue solution turns colorless, reddish copper deposits on zinc",
        animation: "displacement",
        color: "#3b82f6",
        youtubeQuery: "zinc copper sulfate displacement reaction NCERT",
        youtubeId: "AGoQFZuJABg",
        details: [
          "Zn → Zn²⁺ + 2e⁻ (oxidation)",
          "Cu²⁺ + 2e⁻ → Cu (reduction)",
          "Zn is higher in electrochemical series",
          "E°cell = +1.10 V (spontaneous)",
          "Cu²⁺ imparts blue color to solution"
        ]
      },
      {
        id: "r3",
        name: "Disproportionation",
        equation: "2H₂O₂ → 2H₂O + O₂",
        type: "Redox / Disproportionation",
        description: "H₂O₂ acts as both oxidizing and reducing agent simultaneously — an element in a single compound undergoes both oxidation and reduction.",
        conditions: "MnO₂ catalyst or light",
        observations: "Effervescence (O₂ gas), solution becomes water",
        animation: "decomposition",
        color: "#8b5cf6",
        youtubeQuery: "hydrogen peroxide decomposition disproportionation NCERT",
        youtubeId: "ug6pjS_OQVU",
        details: [
          "O in H₂O₂ has oxidation state -1",
          "In H₂O: O is -2 (reduced)",
          "In O₂: O is 0 (oxidized)",
          "Same element oxidized and reduced",
          "MnO₂ lowers activation energy"
        ]
      }
    ],
    "Thermodynamics": [
      {
        id: "t1",
        name: "Exothermic Reaction",
        equation: "CH₄ + 2O₂ → CO₂ + 2H₂O  ΔH = −890 kJ",
        type: "Combustion",
        description: "Combustion of methane releases heat energy. Products have lower enthalpy than reactants. Energy is released to surroundings.",
        conditions: "Ignition, sufficient O₂",
        observations: "Blue flame, heat released, CO₂ and water vapor produced",
        animation: "combustion",
        color: "#ef4444",
        youtubeQuery: "methane combustion exothermic thermodynamics NCERT 11",
        youtubeId: "Ldm3ThqN8wQ",
        details: [
          "ΔH = Hproducts − Hreactants < 0",
          "System loses energy to surroundings",
          "ΔS of system increases (more gas molecules)",
          "ΔG = ΔH − TΔS < 0 (spontaneous)",
          "Standard enthalpy of combustion"
        ]
      },
      {
        id: "t2",
        name: "Hess's Law",
        equation: "C + O₂ → CO₂  ΔH = ΔH₁ + ΔH₂",
        type: "Enthalpy / State Function",
        description: "Total enthalpy change is independent of path. C→CO→CO₂ or C→CO₂ directly gives same ΔH.",
        conditions: "State function property",
        observations: "ΔH is path-independent",
        animation: "hess",
        color: "#06b6d4",
        youtubeQuery: "Hess law enthalpy path independent NCERT 11",
        youtubeId: "8bI2i9OdK8E",
        details: [
          "Enthalpy is a state function",
          "ΔH(C→CO₂) = ΔH(C→CO) + ΔH(CO→CO₂)",
          "Used to calculate inaccessible ΔH values",
          "Based on 1st law of thermodynamics",
          "Born-Haber cycle uses Hess's law"
        ]
      }
    ],
    "Equilibrium": [
      {
        id: "e1",
        name: "Haber Process",
        equation: "N₂ + 3H₂ ⇌ 2NH₃  ΔH = −92 kJ/mol",
        type: "Dynamic Equilibrium",
        description: "Industrial synthesis of ammonia. Le Chatelier's principle applied: high pressure, moderate temperature (450°C), Fe catalyst.",
        conditions: "450°C, 200 atm, Fe catalyst",
        observations: "Reversible reaction, equilibrium established",
        animation: "equilibrium",
        color: "#22c55e",
        youtubeQuery: "Haber process nitrogen ammonia equilibrium NCERT",
        youtubeId: "YqJPElhxUEI",
        details: [
          "Kp = P²NH₃ / (PN₂ × P³H₂)",
          "High P favors forward reaction (fewer moles of gas)",
          "Low T favors NH₃ but slows rate",
          "Fe catalyst speeds equilibrium attainment",
          "~15% yield at equilibrium (optimized industrially)"
        ]
      },
      {
        id: "e2",
        name: "Buffer Solution",
        equation: "CH₃COOH ⇌ CH₃COO⁻ + H⁺",
        type: "Acid-Base Equilibrium",
        description: "Acetic acid / acetate buffer resists pH change. Henderson-Hasselbalch equation governs pH.",
        conditions: "Aqueous solution",
        observations: "pH stable on addition of small acid/base",
        animation: "buffer",
        color: "#f59e0b",
        youtubeQuery: "buffer solution acetic acid acetate NCERT 11",
        youtubeId: "0F6Y5fKaL0w",
        details: [
          "pH = pKa + log([A⁻]/[HA])",
          "Ka of CH₃COOH = 1.8 × 10⁻⁵",
          "pKa = 4.74",
          "Buffer capacity depends on concentration",
          "Biological buffers maintain blood pH ~7.4"
        ]
      }
    ],
    "Organic: Hydrocarbons": [
      {
        id: "o1",
        name: "Electrophilic Addition",
        equation: "CH₂=CH₂ + HBr → CH₃CH₂Br",
        type: "Addition Reaction",
        description: "HBr adds across the double bond of ethene. Markovnikov's rule: H adds to carbon with more H atoms.",
        conditions: "Room temperature, anhydrous conditions",
        observations: "Colorless gas (ethene) reacts, bromoethane liquid formed",
        animation: "addition",
        color: "#ec4899",
        youtubeQuery: "electrophilic addition HBr alkene Markovnikov NCERT",
        youtubeId: "8qbPDkPuMkw",
        details: [
          "Step 1: H⁺ attacks π bond (electrophilic)",
          "Carbocation intermediate formed",
          "Step 2: Br⁻ attacks carbocation",
          "Markovnikov: H adds to C with more H",
          "Anti-Markovnikov with peroxides (free radical)"
        ]
      },
      {
        id: "o2",
        name: "Electrophilic Substitution (Benzene)",
        equation: "C₆H₆ + Cl₂ → C₆H₅Cl + HCl",
        type: "Substitution Reaction",
        description: "Chlorination of benzene. AlCl₃ catalyst generates Cl⁺ electrophile. Aromatic ring is preserved.",
        conditions: "AlCl₃ catalyst (Lewis acid)",
        observations: "Benzene reacts slowly, HCl gas evolved",
        animation: "substitution",
        color: "#14b8a6",
        youtubeQuery: "benzene chlorination electrophilic substitution NCERT",
        youtubeId: "ZMeQpkCB_SY",
        details: [
          "AlCl₃ + Cl₂ → AlCl₄⁻ + Cl⁺",
          "Cl⁺ attacks benzene ring (arenium ion)",
          "Loss of H⁺ restores aromaticity",
          "Aromatic stabilization drives proton loss",
          "ortho, meta, para directors"
        ]
      }
    ]
  },
  "Class 12": {
    "Electrochemistry": [
      {
        id: "ec1",
        name: "Daniel Cell",
        equation: "Zn | Zn²⁺ || Cu²⁺ | Cu   E°cell = +1.10V",
        type: "Galvanic Cell",
        description: "Zn oxidizes at anode, Cu²⁺ reduces at cathode. Electrons flow through external circuit, ions through salt bridge.",
        conditions: "Standard conditions, 1M solutions",
        observations: "Current flows, Zn dissolves, Cu deposits",
        animation: "galvanic",
        color: "#f97316",
        youtubeQuery: "Daniel cell galvanic cell electrochemistry NCERT 12",
        youtubeId: "RvVJfBSFBcM",
        details: [
          "Anode (−): Zn → Zn²⁺ + 2e⁻ (oxidation)",
          "Cathode (+): Cu²⁺ + 2e⁻ → Cu (reduction)",
          "E°cell = E°cathode − E°anode = 0.34 − (−0.76) = 1.10V",
          "Salt bridge maintains electrical neutrality",
          "Nernst equation: E = E° − (RT/nF)ln Q"
        ]
      },
      {
        id: "ec2",
        name: "Electrolysis of Water",
        equation: "2H₂O → 2H₂ + O₂",
        type: "Electrolytic Cell",
        description: "Electric current decomposes water. H₂ at cathode (reduction), O₂ at anode (oxidation). Dilute H₂SO₄ used as electrolyte.",
        conditions: "External EMF, Pt electrodes, dilute H₂SO₄",
        observations: "H₂:O₂ = 2:1 by volume",
        animation: "electrolysis",
        color: "#6366f1",
        youtubeQuery: "electrolysis of water NCERT 12 electrochemistry",
        youtubeId: "l1KQl3YBZGE",
        details: [
          "Cathode: 2H⁺ + 2e⁻ → H₂",
          "Anode: 2H₂O → O₂ + 4H⁺ + 4e⁻",
          "Faraday's 1st law: m ∝ Q",
          "Faraday's 2nd law: m ∝ M/n",
          "Overpotential must be overcome"
        ]
      },
      {
        id: "ec3",
        name: "Kohlrausch's Law",
        equation: "Λ°m = Σλ°(cations) + Σλ°(anions)",
        type: "Conductance",
        description: "Limiting molar conductivity of electrolyte = sum of individual ionic conductivities. Used to find Λ°m of weak electrolytes.",
        conditions: "Infinite dilution",
        observations: "Conductance increases with dilution",
        animation: "conductance",
        color: "#10b981",
        youtubeQuery: "Kohlrausch law molar conductivity NCERT 12",
        youtubeId: "O3rG4E3FHWA",
        details: [
          "Λ°m(CH₃COOH) = Λ°m(HCl) + Λ°m(CH₃COONa) − Λ°m(NaCl)",
          "Strong electrolytes: linear graph with √C",
          "Weak electrolytes: can't extrapolate directly",
          "Degree of dissociation: α = Λm/Λ°m",
          "Ka = Cα²/(1−α)"
        ]
      }
    ],
    "Chemical Kinetics": [
      {
        id: "ck1",
        name: "First Order Reaction",
        equation: "N₂O₅ → 2NO₂ + ½O₂",
        type: "First Order Kinetics",
        description: "Rate depends on concentration of one reactant raised to first power. Constant half-life regardless of initial concentration.",
        conditions: "Gas phase, 45°C",
        observations: "Rate = k[N₂O₅]",
        animation: "firstorder",
        color: "#f43f5e",
        youtubeQuery: "first order reaction rate law half life NCERT 12 kinetics",
        youtubeId: "wPETdfb1dUw",
        details: [
          "Rate = k[A]¹",
          "Integrated: ln[A]t = ln[A]₀ − kt",
          "t½ = 0.693/k (independent of [A]₀)",
          "Radioactive decay is first order",
          "Units of k: s⁻¹"
        ]
      },
      {
        id: "ck2",
        name: "Arrhenius Equation",
        equation: "k = A · e^(−Ea/RT)",
        type: "Temperature Dependence",
        description: "Rate constant k increases exponentially with temperature. Ea = activation energy, A = frequency factor.",
        conditions: "Different temperatures",
        observations: "10°C rise ≈ doubles rate",
        animation: "arrhenius",
        color: "#a855f7",
        youtubeQuery: "Arrhenius equation activation energy rate constant NCERT 12",
        youtubeId: "V0ILj_l_4dU",
        details: [
          "ln k = ln A − Ea/RT",
          "Plot of ln k vs 1/T gives slope = −Ea/R",
          "Threshold energy = Ea + average KE",
          "Catalyst lowers Ea",
          "log(k₂/k₁) = Ea/2.303R × (1/T₁ − 1/T₂)"
        ]
      }
    ],
    "Coordination Compounds": [
      {
        id: "cc1",
        name: "Complex Ion Formation",
        equation: "[Fe(H₂O)₆]³⁺ + SCN⁻ → [Fe(SCN)(H₂O)₅]²⁺ + H₂O",
        type: "Ligand Substitution",
        description: "Thiocyanate replaces water ligand in iron(III) complex. Blood-red color is characteristic test for Fe³⁺.",
        conditions: "Aqueous solution, room temperature",
        observations: "Blood-red coloration",
        animation: "complex",
        color: "#dc2626",
        youtubeQuery: "iron thiocyanate complex ion formation coordination NCERT 12",
        youtubeId: "0e3FBP0iBa0",
        details: [
          "Fe³⁺: 3d⁵ configuration",
          "SCN⁻ is ambidentate ligand (S or N donor)",
          "Crystal field splitting explains color",
          "Coordination number = 6 (octahedral)",
          "CFSE determines stability"
        ]
      },
      {
        id: "cc2",
        name: "Werner's Theory",
        equation: "[Co(NH₃)₆]³⁺: Primary valency=3, Secondary=6",
        type: "Coordination Theory",
        description: "Cobalt has primary valency (oxidation state) of +3 and secondary valency (coordination number) of 6. NH₃ ligands occupy coordination sphere.",
        conditions: "Solid complex",
        observations: "Yellow crystals, conductance shows 3 free Cl⁻",
        animation: "werner",
        color: "#0ea5e9",
        youtubeQuery: "Werner theory coordination compounds NCERT 12 chemistry",
        youtubeId: "iHHV_JuxFHU",
        details: [
          "Primary valency = charge on metal ion (+3)",
          "Secondary valency = coordination number (6)",
          "Coordination sphere in square brackets",
          "Counter ions outside coordination sphere",
          "Basis of modern coordination chemistry"
        ]
      }
    ],
    "Organic Chemistry": [
      {
        id: "org1",
        name: "SN2 Reaction",
        equation: "CH₃Br + OH⁻ → CH₃OH + Br⁻",
        type: "Nucleophilic Substitution",
        description: "Backside attack of OH⁻ on CH₃Br. Inversion of configuration (Walden inversion). Bimolecular: rate = k[RX][Nu].",
        conditions: "Polar aprotic solvent, strong nucleophile",
        observations: "Rate depends on both substrate and nucleophile",
        animation: "sn2",
        color: "#16a34a",
        youtubeQuery: "SN2 reaction mechanism nucleophilic substitution NCERT 12",
        youtubeId: "Tib0IbBZexo",
        details: [
          "Rate = k[CH₃Br][OH⁻] (bimolecular)",
          "Backside attack → Walden inversion",
          "Transition state: trigonal bipyramidal",
          "Primary substrates react fastest",
          "Polar aprotic solvents (DMSO, acetone) favor SN2"
        ]
      },
      {
        id: "org2",
        name: "Aldol Condensation",
        equation: "2CH₃CHO → CH₃CH(OH)CH₂CHO",
        type: "Condensation Reaction",
        description: "Acetaldehyde undergoes aldol reaction under dilute base. α-carbon attacks carbonyl of another molecule. Dehydration gives aldol product.",
        conditions: "Dilute NaOH, room temperature",
        observations: "3-hydroxybutanal (aldol) formed",
        animation: "aldol",
        color: "#b45309",
        youtubeQuery: "aldol condensation reaction mechanism NCERT 12 organic",
        youtubeId: "J_n73q8Y4y8",
        details: [
          "Base removes α-H to form enolate",
          "Enolate attacks carbonyl carbon",
          "β-hydroxy aldehyde (aldol) formed",
          "Heating → dehydration → α,β-unsaturated carbonyl",
          "Cross-aldol gives mixed products"
        ]
      },
      {
        id: "org3",
        name: "Cannizzaro Reaction",
        equation: "2HCHO + NaOH → CH₃OH + HCOONa",
        type: "Disproportionation",
        description: "Formaldehyde (no α-H) undergoes disproportionation in conc. NaOH. One molecule oxidized to formate, another reduced to methanol.",
        conditions: "Concentrated NaOH",
        observations: "Methanol and sodium formate formed",
        animation: "cannizzaro",
        color: "#7c3aed",
        youtubeQuery: "Cannizzaro reaction formaldehyde NCERT 12 organic",
        youtubeId: "GDrBz5mD7HU",
        details: [
          "Only aldehydes without α-H undergo this",
          "Hydride transfer from one CHO to another",
          "Intermolecular redox reaction",
          "Benzaldehyde also undergoes Cannizzaro",
          "Cross-Cannizzaro uses formaldehyde + non-enolizable aldehyde"
        ]
      }
    ],
    "p-Block Elements": [
      {
        id: "pb1",
        name: "Contact Process (H₂SO₄)",
        equation: "2SO₂ + O₂ ⇌ 2SO₃  (V₂O₅ catalyst)",
        type: "Industrial / Catalytic",
        description: "Industrial manufacture of sulfuric acid. SO₂ oxidized to SO₃ using V₂O₅ catalyst. SO₃ absorbed in oleum, diluted to give H₂SO₄.",
        conditions: "450°C, V₂O₅ catalyst, 1-2 atm",
        observations: "High yield of SO₃ (98%)",
        animation: "contact",
        color: "#0891b2",
        youtubeQuery: "contact process sulfuric acid manufacture NCERT 12",
        youtubeId: "A4HHTlMcPOA",
        details: [
          "S + O₂ → SO₂ (first step)",
          "2SO₂ + O₂ ⇌ 2SO₃ (key step, ΔH = −196 kJ)",
          "SO₃ + H₂SO₄ → H₂S₂O₇ (oleum)",
          "H₂S₂O₇ + H₂O → 2H₂SO₄",
          "King of chemicals: used in fertilizers, dyes, drugs"
        ]
      },
      {
        id: "pb2",
        name: "Ostwald Process (HNO₃)",
        equation: "4NH₃ + 5O₂ → 4NO + 6H₂O",
        type: "Industrial / Catalytic",
        description: "Catalytic oxidation of ammonia over Pt/Rh catalyst at 800°C gives NO, which is further oxidized to NO₂ and absorbed in water to give HNO₃.",
        conditions: "800°C, Pt-Rh catalyst",
        observations: "Brown fumes of NO₂, fuming nitric acid",
        animation: "ostwald",
        color: "#be185d",
        youtubeQuery: "Ostwald process nitric acid manufacture NCERT 12",
        youtubeId: "BvLlDAbHdxo",
        details: [
          "Step 1: 4NH₃ + 5O₂ → 4NO + 6H₂O",
          "Step 2: 2NO + O₂ → 2NO₂",
          "Step 3: 3NO₂ + H₂O → 2HNO₃ + NO",
          "Pt-Rh catalyst gauze, 800°C",
          "Nitric acid: used in explosives, fertilizers"
        ]
      }
    ]
  }
};

const AnimatedReaction = ({ type, color }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frame = 0;
    let particles = [];

    const W = canvas.width;
    const H = canvas.height;

    const hexToRgb = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    };

    const rgb = hexToRgb(color);

    const initParticles = (n, x, y, spread = 60) => {
      return Array.from({ length: n }, (_, i) => ({
        x: x + (Math.random() - 0.5) * spread,
        y: y + (Math.random() - 0.5) * spread,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        life: 1,
        decay: Math.random() * 0.02 + 0.01,
        size: Math.random() * 8 + 3,
        color: `rgba(${rgb.r},${rgb.g},${rgb.b},`,
      }));
    };

    const drawAtom = (x, y, r, label, col) => {
      const grad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r);
      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(0.4, col);
      grad.addColorStop(1, "#000");
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${r * 0.9}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(label, x, y);
    };

    const drawArrow = (x1, y1, x2, y2, col) => {
      ctx.strokeStyle = col;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
   
