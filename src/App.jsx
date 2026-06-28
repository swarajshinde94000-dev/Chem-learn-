import { useState } from "react";

const reactions = [
  { id:1, class:"11", chapter:"Redox Reactions", name:"Combination Reaction", equation:"2Mg + O₂ → 2MgO", type:"Redox", color:"#f97316", desc:"Magnesium burns in oxygen forming magnesium oxide. Bright white flame produced.", conditions:"Heat/Ignition", observations:"Bright white flame, white ash", details:["Mg loses electrons (oxidized)","O₂ gains electrons (reduced)","Oxidizing agent: O₂","Reducing agent: Mg","ΔH = −601 kJ/mol"], youtubeId:"OFqiKv3SqNY" },
  { id:2, class:"11", chapter:"Redox Reactions", name:"Displacement Reaction", equation:"Zn + CuSO₄ → ZnSO₄ + Cu", type:"Redox", color:"#3b82f6", desc:"Zinc displaces copper from copper sulfate. Blue solution turns colorless.", conditions:"Room temperature, aqueous", observations:"Blue→colorless, copper deposits", details:["Zn→Zn²⁺+2e⁻ (oxidation)","Cu²⁺+2e⁻→Cu (reduction)","E°cell = +1.10V","Zn higher in activity series","Spontaneous reaction"], youtubeId:"AGoQFZuJABg" },
  { id:3, class:"11", chapter:"Redox Reactions", name:"Disproportionation", equation:"2H₂O₂ → 2H₂O + O₂", type:"Redox", color:"#8b5cf6", desc:"H₂O₂ acts as both oxidizing and reducing agent simultaneously.", conditions:"MnO₂ catalyst", observations:"Effervescence of O₂", details:["O in H₂O₂ is -1","In H₂O: O is -2 (reduced)","In O₂: O is 0 (oxidized)","Same element oxidized & reduced","MnO₂ lowers activation energy"], youtubeId:"ug6pjS_OQVU" },
  { id:4, class:"11", chapter:"Thermodynamics", name:"Exothermic Reaction", equation:"CH₄ + 2O₂ → CO₂ + 2H₂O ΔH=−890kJ", type:"Combustion", color:"#ef4444", desc:"Combustion of methane releases heat. Products have lower enthalpy than reactants.", conditions:"Ignition, sufficient O₂", observations:"Blue flame, heat released", details:["ΔH = Hproducts − Hreactants < 0","System loses energy to surroundings","ΔG < 0 (spontaneous)","Standard enthalpy of combustion","Exothermic: heat flows out"], youtubeId:"Ldm3ThqN8wQ" },
  { id:5, class:"11", chapter:"Equilibrium", name:"Haber Process", equation:"N₂ + 3H₂ ⇌ 2NH₃ ΔH=−92kJ/mol", type:"Dynamic Equilibrium", color:"#22c55e", desc:"Industrial synthesis of ammonia. Le Chatelier's principle applied.", conditions:"450°C, 200 atm, Fe catalyst", observations:"Reversible reaction, equilibrium established", details:["High P favors forward reaction","Low T favors NH₃ but slows rate","Fe catalyst speeds equilibrium","~15% yield at equilibrium","Kp = P²NH₃/(PN₂×P³H₂)"], youtubeId:"YqJPElhxUEI" },
  { id:6, class:"11", chapter:"Organic: Hydrocarbons", name:"Electrophilic Addition", equation:"CH₂=CH₂ + HBr → CH₃CH₂Br", type:"Addition", color:"#ec4899", desc:"HBr adds across double bond of ethene. Markovnikov's rule applies.", conditions:"Room temperature, anhydrous", observations:"Bromoethane liquid formed", details:["H⁺ attacks π bond","Carbocation intermediate","Br⁻ attacks carbocation","Markovnikov: H adds to C with more H","Anti-Markovnikov with peroxides"], youtubeId:"8qbPDkPuMkw" },
  { id:7, class:"12", chapter:"Electrochemistry", name:"Daniel Cell", equation:"Zn|Zn²⁺||Cu²⁺|Cu E°=+1.10V", type:"Galvanic Cell", color:"#f97316", desc:"Zn oxidizes at anode, Cu²⁺ reduces at cathode. Classic galvanic cell.", conditions:"Standard conditions, 1M solutions", observations:"Current flows, Zn dissolves, Cu deposits", details:["Anode: Zn→Zn²⁺+2e⁻","Cathode: Cu²⁺+2e⁻→Cu","E°cell = 0.34−(−0.76) = 1.10V","Salt bridge maintains neutrality","Nernst equation applies"], youtubeId:"RvVJfBSFBcM" },
  { id:8, class:"12", chapter:"Electrochemistry", name:"Electrolysis of Water", equation:"2H₂O → 2H₂ + O₂", type:"Electrolytic", color:"#6366f1", desc:"Electric current decomposes water. H₂ at cathode, O₂ at anode.", conditions:"External EMF, Pt electrodes, H₂SO₄", observations:"H₂:O₂ = 2:1 by volume", details:["Cathode: 2H⁺+2e⁻→H₂","Anode: 2H₂O→O₂+4H⁺+4e⁻","Faraday's 1st law: m∝Q","Faraday's 2nd law: m∝M/n","Overpotential required"], youtubeId:"l1KQl3YBZGE" },
  { id:9, class:"12", chapter:"Chemical Kinetics", name:"First Order Reaction", equation:"N₂O₅ → 2NO₂ + ½O₂", type:"First Order", color:"#f43f5e", desc:"Rate depends on concentration of one reactant. Constant half-life.", conditions:"Gas phase, 45°C", observations:"Rate = k[N₂O₅]", details:["Rate = k[A]¹","ln[A]t = ln[A]₀ − kt","t½ = 0.693/k (constant)","Radioactive decay is first order","Units of k: s⁻¹"], youtubeId:"wPETdfb1dUw" },
  { id:10, class:"12", chapter:"Chemical Kinetics", name:"Arrhenius Equation", equation:"k = A·e^(−Ea/RT)", type:"Temperature Dependence", color:"#a855f7", desc:"Rate constant increases exponentially with temperature. Ea = activation energy.", conditions:"Different temperatures", observations:"10°C rise doubles rate", details:["ln k = ln A − Ea/RT","Plot ln k vs 1/T → slope = −Ea/R","Catalyst lowers Ea","Threshold energy = Ea + avg KE","log(k₂/k₁) = Ea/2.303R×(1/T₁−1/T₂)"], youtubeId:"V0ILj_l_4dU" },
  { id:11, class:"12", chapter:"Coordination Compounds", name:"Complex Ion Formation", equation:"[Fe(H₂O)₆]³⁺ + SCN⁻ → [Fe(SCN)(H₂O)₅]²⁺", type:"Ligand Substitution", color:"#dc2626", desc:"Thiocyanate replaces water ligand. Blood-red color is test for Fe³⁺.", conditions:"Aqueous solution", observations:"Blood-red coloration", details:["Fe³⁺: 3d⁵ configuration","SCN⁻ is ambidentate ligand","Crystal field splitting explains color","Coordination number = 6","CFSE determines stability"], youtubeId:"0e3FBP0iBa0" },
  { id:12, class:"12", chapter:"Organic Chemistry", name:"SN2 Reaction", equation:"CH₃Br + OH⁻ → CH₃OH + Br⁻", type:"Nucleophilic Substitution", color:"#16a34a", desc:"Backside attack of OH⁻ on CH₃Br. Inversion of configuration.", conditions:"Polar aprotic solvent", observations:"Rate depends on both reactants", details:["Rate = k[CH₃Br][OH⁻]","Backside attack → Walden inversion","Transition state: trigonal bipyramidal","Primary substrates fastest","DMSO/acetone favor SN2"], youtubeId:"Tib0IbBZexo" },
  { id:13, class:"12", chapter:"Organic Chemistry", name:"Aldol Condensation", equation:"2CH₃CHO → CH₃CH(OH)CH₂CHO", type:"Condensation", color:"#b45309", desc:"Acetaldehyde undergoes aldol reaction under dilute base.", conditions:"Dilute NaOH, room temperature", observations:"3-hydroxybutanal formed", details:["Base removes α-H → enolate","Enolate attacks carbonyl carbon","β-hydroxy aldehyde formed","Heating → dehydration","Cross-aldol gives mixed products"], youtubeId:"J_n73q8Y4y8" },
  { id:14, class:"12", chapter:"p-Block Elements", name:"Contact Process", equation:"2SO₂ + O₂ ⇌ 2SO₃ (V₂O₅)", type:"Industrial/Catalytic", color:"#0891b2", desc:"Industrial manufacture of H₂SO₄. SO₂ oxidized to SO₃ using V₂O₅.", conditions:"450°C, V₂O₅ catalyst", observations:"98% yield of SO₃", details:["S+O₂→SO₂ (first step)","2SO₂+O₂⇌2SO₃ (key step)","SO₃+H₂SO₄→H₂S₂O₇ (oleum)","H₂S₂O₇+H₂O→2H₂SO₄","King of chemicals"], youtubeId:"A4HHTlMcPOA" },
  { id:15, class:"12", chapter:"p-Block Elements", name:"Ostwald Process", equation:"4NH₃ + 5O₂ → 4NO + 6H₂O", type:"Industrial/Catalytic", color:"#be185d", desc:"Catalytic oxidation of ammonia over Pt/Rh catalyst gives HNO₃.", conditions:"800°C, Pt-Rh catalyst", observations:"Brown fumes of NO₂", details:["4NH₃+5O₂→4NO+6H₂O","2NO+O₂→2NO₂","3NO₂+H₂O→2HNO₃+NO","Pt-Rh catalyst gauze","Used in explosives, fertilizers"], youtubeId:"BvLlDAbHdxo" },
];
export default function App() {
  const [activeClass, setActiveClass] = useState("11");
  const [activeChapter, setActiveChapter] = useState("Redox Reactions");
  const [selected, setSelected] = useState(reactions[0]);
  const [tab, setTab] = useState("info");
  const [search, setSearch] = useState("");

  const classes = ["11", "12"];
  const chapters = [...new Set(reactions.filter(r => r.class === activeClass).map(r => r.chapter))];
  const filtered = search
    ? reactions.filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || r.equation.toLowerCase().includes(search.toLowerCase()))
    : reactions.filter(r => r.class === activeClass && r.chapter === activeChapter);

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#0f0c29,#302b63,#24243e)",color:"#e2e8f0",fontFamily:"Inter,sans-serif"}}>
      <div style={{background:"rgba(0,0,0,0.5)",padding:"14px 16px",position:"sticky",top:0,zIndex:100,borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
        <div style={{fontSize:"22px",fontWeight:"900",background:"linear-gradient(135deg,#a78bfa,#60a5fa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>⚗️ ChemLearn NCERT</div>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search reactions..." style={{marginTop:"10px",width:"100%",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(255,255,255,0.15)",background:"rgba(255,255,255,0.08)",color:"#e2e8f0",fontSize:"13px",boxSizing:"border-box",outline:"none"}}/>
        <div style={{display:"flex",gap:"8px",marginTop:"10px"}}>
          {classes.map(c=>(
            <button key={c} onClick={()=>{setActiveClass(c);setActiveChapter([...new Set(reactions.filter(r=>r.class===c).map(r=>r.chapter))][0]);setSelected(reactions.find(r=>r.class===c));setSearch("");}} style={{padding:"6px 16px",borderRadius:"20px",border:"none",cursor:"pointer",fontWeight:"700",fontSize:"13px",background:activeClass===c?"linear-gradient(135deg,#7c3aed,#2563eb)":"rgba(255,255,255,0.07)",color:activeClass===c?"#fff":"#94a3b8"}}>Class {c}</button>
          ))}
        </div>
      </div>

      {search && (
        <div style={{padding:"12px 16px"}}>
          <div style={{fontSize:"12px",color:"#94a3b8",marginBottom:"10px"}}>{filtered.length} result(s)</div>
          {filtered.map(r=>(
            <div key={r.id} onClick={()=>{setSearch("");setActiveClass(r.class);setActiveChapter(r.chapter);setSelected(r);}} style={{background:"rgba(255,255,255,0.05)",border:`1px solid ${r.color}44`,borderRadius:"10px",padding:"12px",marginBottom:"8px",cursor:"pointer"}}>
              <div style={{color:r.color,fontWeight:"700",fontSize:"13px"}}>{r.name}</div>
              <div style={{fontSize:"11px",color:"#94a3b8"}}>Class {r.class} › {r.chapter}</div>
              <div style={{fontFamily:"monospace",fontSize:"11px",marginTop:"4px"}}>{r.equation}</div>
            </div>
          ))}
        </div>
      )}

      {!search && (
        <div style={{display:"flex",gap:"0",minHeight:"calc(100vh - 120px)"}}>
          <div style={{width:"140px",background:"rgba(0,0,0,0.3)",padding:"10px",flexShrink:0}}>
            <div style={{fontSize:"10px",color:"#64748b",fontWeight:"700",textTransform:"uppercase",letterSpacing:"1px",marginBottom:"8px"}}>Chapters</div>
            {chapters.map(ch=>(
              <div key={ch} onClick={()=>{setActiveChapter(ch);setSelected(reactions.find(r=>r.class===activeClass&&r.chapter===ch));}} style={{padding:"8px",borderRadius:"6px",cursor:"pointer",marginBottom:"4px",fontSize:"11px",fontWeight:activeChapter===ch?"700":"400",background:activeChapter===ch?"rgba(124,58,237,0.3)":"transparent",color:activeChapter===ch?"#a78bfa":"#94a3b8",border:activeChapter===ch?"1px solid rgba(124,58,237,0.4)":"1px solid transparent"}}>
                {ch}
              </div>
            ))}
          </div>

          <div style={{flex:1,padding:"12px",overflowY:"auto"}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:"10px",marginBottom:"16px"}}>
              {filtered.map(r=>(
                <div key={r.id} onClick={()=>setSelected(r)} style={{background:selected?.id===r.id?`${r.color}22`:"rgba(255,255,255,0.04)",border:`1px solid ${selected?.id===r.id?r.color:r.color+"33"}`,borderRadius:"10px",padding:"12px",cursor:"pointer",transition:"all 0.2s"}}>
                  <div style={{color:r.color,fontWeight:"700",fontSize:"12px"}}>{r.name}</div>
                  <div style={{fontFamily:"monospace",fontSize:"10px",marginTop:"6px",color:"#e2e8f0"}}>{r.equation.slice(0,30)}...</div>
                  <div style={{marginTop:"6px",fontSize:"10px",padding:"2px 6px",borderRadius:"10px",background:r.color+"22",color:r.color,display:"inline-block"}}>{r.type}</div>
                </div>
              ))}
            </div>

            {selected && (
              <div style={{background:"rgba(0,0,0,0.3)",border:`1px solid ${selected.color}33`,borderRadius:"14px",padding:"16px"}}>
                <div style={{color:selected.color,fontWeight:"800",fontSize:"16px",marginBottom:"4px"}}>{selected.name}</div>
                <div style={{fontFamily:"monospace",fontSize:"12px",background:"rgba(0,0,0,0.4)",padding:"10px",borderRadius:"8px",marginBottom:"12px",color:"#e2e8f0"}}>{selected.equation}</div>

                <div style={{display:"flex",gap:"6px",marginBottom:"12px"}}>
                  {["info","conditions","mechanism"].map(t=>(
                    <button key={t} onClick={()=>setTab(t)} style={{padding:"5px 12px",borderRadius:"6px",border:"none",cursor:"pointer",fontSize:"11px",fontWeight:"600",textTransform:"uppercase",background:tab===t?selected.color:"rgba(255,255,255,0.07)",color:tab===t?"#fff":"#64748b"}}>{t}</button>
                  ))}
                </div>

                {tab==="info" && (
                  <div>
                    <p style={{fontSize:"13px",color:"#cbd5e1",lineHeight:1.7,marginBottom:"12px"}}>{selected.desc}</p>
                    {selected.details.map((d,i)=>(
                      <div key={i} style={{display:"flex",gap:"8px",marginBottom:"6px",fontSize:"12px",fontFamily:"monospace"}}>
                        <span style={{color:selected.color}}>◆</span>{d}
                      </div>
                    ))}
                  </div>
                )}
                {tab==="conditions" && (
                  <div>
                    <div style={{background:"rgba(255,255,255,0.04)",borderRadius:"8px",padding:"12px",marginBottom:"8px"}}>
                      <div style={{fontSize:"10px",color:"#64748b",fontWeight:"700",marginBottom:"4px"}}>CONDITIONS</div>
                      <div style={{fontSize:"13px"}}>{selected.conditions}</div>
                    </div>
                    <div style={{background:"rgba(255,255,255,0.04)",borderRadius:"8px",padding:"12px"}}>
                      <div style={{fontSize:"10px",color:"#64748b",fontWeight:"700",marginBottom:"4px"}}>OBSERVATIONS</div>
                      <div style={{fontSize:"13px"}}>{selected.observations}</div>
                    </div>
                  </div>
                )}
                {tab==="mechanism" && (
                  <div>
                    {selected.details.map((d,i)=>(
                      <div key={i} style={{display:"flex",gap:"10px",marginBottom:"10px",alignItems:"flex-start"}}>
                        <div style={{width:"20px",height:"20px",borderRadius:"50%",background:selected.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px",fontWeight:"700",flexShrink:0,color:"#fff"}}>{i+1}</div>
                        <div style={{fontSize:"12px",fontFamily:"monospace",lineHeight:1.6}}>{d}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{marginTop:"16px",padding:"12px",background:"rgba(0,0,0,0.3)",border:"1px solid rgba(220,38,38,0.3)",borderRadius:"10px"}}>
                  <div style={{fontSize:"11px",color:"#dc2626",fontWeight:"700",marginBottom:"8px"}}>📺 VIDEO RESOURCES</div>
                  <a href={`https://www.youtube.com/watch?v=${selected.youtubeId}`} target="_blank" rel="noopener noreferrer" style={{display:"inline-block",background:"#dc2626",color:"#fff",padding:"7px 14px",borderRadius:"6px",textDecoration:"none",fontSize:"12px",fontWeight:"600",marginRight:"8px"}}>▶ Watch on YouTube</a>
                  <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(selected.name+" NCERT chemistry")}`} target="_blank" rel="noopener noreferrer" style={{display:"inline-block",background:"rgba(255,255,255,0.1)",color:"#cbd5e1",padding:"7px 14px",borderRadius:"6px",textDecoration:"none",fontSize:"12px",border:"1px solid rgba(255,255,255,0.15)"}}>🔍 Search More</a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
