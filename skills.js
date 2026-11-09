/* Skill filter for a unit, from the URL: ?skills=lo3,lo4 (or LO3, 3, or a full id such as genetics-lo3).
   Pure functions, no DOM. Loaded before app.js (window.CasinoSkills); tests/skills.cjs loads it with require.
   Matching: a short form (lo3, LO3, 3) matches the skill whose id ends in -lo3; a full id must match exactly.
   Unknown entries are ignored. If nothing matches, selectSkills returns null and the caller keeps every skill. */
(function(root){
  const norm=value=>String(value).trim().toLowerCase();
  function parseSkillTokens(text){
    return String(text||'').split(',').map(norm).filter(Boolean);
  }
  function matchesToken(token,skill){
    const id=norm(skill.id);
    if(token===id)return true;
    const short=/^(?:lo)?(\d+)$/.exec(token);
    return !!short&&new RegExp('(^|-)lo'+Number(short[1])+'$').test(id);
  }
  // Keeps the unit's own order (not the order typed), so the chooser and the mixed deck stay in curriculum order.
  function selectSkills(skills,text){
    const tokens=parseSkillTokens(text);
    if(!tokens.length)return null;
    const kept=skills.filter(skill=>tokens.some(token=>matchesToken(token,skill)));
    if(!kept.length)return null;
    const ignored=tokens.filter(token=>!skills.some(skill=>matchesToken(token,skill)));
    return {skills:kept,ignored};
  }
  const api={parseSkillTokens,matchesToken,selectSkills};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  else root.CasinoSkills=api;
})(typeof window!=='undefined'?window:globalThis);
