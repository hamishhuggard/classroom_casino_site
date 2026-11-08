/* Locked class link. Loaded first (before the draft loader in index.html), so everything after can read window.CASINO_LOCK.
   Link:   index.html?code=ABC123&unit=genetics&lock=1        (add &draft=genetics while genetics is draft-only)
   Effect: the browser remembers {unit, code, draft} in localStorage ('casino-lock'); the game starts that unit's mixed practice
           under that class code, with no skill menu, class picker, unit chooser or other units (see app.js and results.js).
   Unlock (teacher only): open any page of the game with ?unlock=1 (clears the lock and the saved class code). */
(function(){
  const KEY='casino-lock',params=new URLSearchParams(location.search);
  const tidy=v=>String(v||'').toUpperCase().replace(/[^A-Z0-9]/g,'');
  let lock=null;
  // Preview pages (results tooltip, genetics design sheet) are teacher tools: a saved lock must not hijack them.
  if(params.has('preview')){window.CASINO_LOCK=null;return;}
  try{
    if(params.get('unlock')==='1'){localStorage.removeItem(KEY);localStorage.removeItem('casino-class-code');}
    else{
      const unit=String(params.get('unit')||'').replace(/[^a-z0-9_-]/gi,'');
      if(params.get('lock')==='1'&&unit){
        const code=tidy(params.get('code'));
        localStorage.setItem(KEY,JSON.stringify({unit,code:/^[A-Z0-9]{2,12}$/.test(code)?code:'',draft:params.get('draft')||''}));
      }
      const saved=JSON.parse(localStorage.getItem(KEY)||'null');
      if(saved&&typeof saved.unit==='string'&&saved.unit)lock={unit:saved.unit,code:saved.code||'',draft:saved.draft||''};
    }
  }catch{}
  window.CASINO_LOCK=lock;
  if(lock)document.documentElement.dataset.locked='1';
})();
