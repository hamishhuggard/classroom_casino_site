/* Revision Roulette: original 16x16 pixel-art animal icons.
   Each entry: { palette: {char: '#hex'}, rows: [16 strings x 16 chars] }.
   '.' is transparent. Plain script: sets window.CASINO_ANIMAL_ART and window.animalIcon. */
(function () {
  var ART = {
    Alpaca: {
      palette: { k: '#3b2a20', w: '#f6ecd6', s: '#d9c39a', p: '#f0a0a8' },
      rows: [
        '...kk......kk...',
        '...kwk....kwk...',
        '...kwkkkkkkwk...',
        '..kwwwswwswwwk..',
        '..kwswwwwwwswk..',
        '...kwwwwwwwwk...',
        '...kwkwwwwkwk...',
        '...kpwwwwwwpk...',
        '....kwwkkwwk....',
        '....kwwwwwwk....',
        '.....kwwwwk.....',
        '...kkwwwwwwkk...',
        '..kwwswwwwswwk..',
        '..kwwwwwwwwwwk..',
        '..kswwwwwwwwsk..',
        '..kkk.kkkk.kkk..'
      ]
    },
    Axolotl: {
      palette: { k: '#3a1d3a', p: '#f7a8c8', g: '#e0457b', d: '#c2668e' },
      rows: [
        '................',
        '.g............g.',
        '..g..kkkkkk..g..',
        'gg.gkppppppkg.gg',
        '..gkppppppppkg..',
        'gg.kppppppppk.gg',
        '..gkpkkppkkpkg..',
        'gg.kpkkppkkpk.gg',
        '...kpdppppdpk...',
        '...kppddddppk...',
        '....kppppppk....',
        '...kppppppppk...',
        '..kpkppppppkpk..',
        '..kk.kppppk.kk..',
        '.....kpkkpk.....',
        '.....kk..kk.....'
      ]
    },
    Badger: {
      palette: { k: '#111111', w: '#ffffff', g: '#8a8a8a', d: '#4a4a4a' },
      rows: [
        '................',
        '..kkk......kkk..',
        '.kgwgkkkkkkgwgk.',
        '.kwwkkkwwkkkwwk.',
        '.kwwkkkwwkkkwwk.',
        '.kwwkwkwwkwkwwk.',
        '.kwwkkkwwkkkwwk.',
        '..kwwkkwwkkwwk..',
        '...kwwwkkwwwk...',
        '....kwwwwwwk....',
        '....kkwwwwkk....',
        '...kggkkkkggk...',
        '..kggggggggggk..',
        '..kggggggggggk..',
        '..kdkggggggkdk..',
        '..kkk.kkkk.kkk..'
      ]
    },
    Beaver: {
      palette: { k: '#2a1608', b: '#8b5a2b', l: '#c48a52', w: '#ffffff', t: '#4e3018' },
      rows: [
        '................',
        '...kk......kk...',
        '..kbbkkkkkkbbk..',
        '..kbbbbbbbbbbk..',
        '.kbbbbbbbbbbbbk.',
        '.kbbkbbbbbbkbbk.',
        '.kbbbbbbbbbbbbk.',
        '.kbbbllllllbbbk.',
        '.kbblllkklllbbk.',
        '..kbllllllllbk..',
        '...kbllwwllbk...',
        '....kkkwwkkk....',
        '...kbbbkkbbbk...',
        '..kbbllllllbbkkk',
        '..kbbllllllbbttk',
        '...kkkkkkkkkkkk.'
      ]
    },
    Capybara: {
      palette: { k: '#2b1a0e', b: '#a0703e', d: '#7a5230', y: '#f39a1e', g: '#4caf50' },
      rows: [
        '.......kgk......',
        '......kyyyk.....',
        '..kk.kyyyyyk.kk.',
        '.kdbkkkkkkkkbdk.',
        '.kbbbbbbbbbbbbk.',
        '.kbbkbbbbbbkbbk.',
        '.kbbbbbbbbbbbbk.',
        '.kbbbbbbbbbbbbk.',
        '.kbbddddddddbbk.',
        '.kbddkddddkddbk.',
        '.kbddddddddddbk.',
        '..kkddddddddkk..',
        '...kkkkkkkkkk...',
        '..kbbbbbbbbbbk..',
        '..kbbbbbbbbbbk..',
        '..kkk.kkkk.kkk..'
      ]
    },
    Cheetah: {
      palette: { k: '#2a1a0a', y: '#f0b43c', w: '#fbe7b8' },
      rows: [
        '................',
        '..kk........kk..',
        '.kyyk......kyyk.',
        '.kyykkkkkkkkyyk.',
        '.kyyyykyykyyyyk.',
        '.kykyyyyyyyykyk.',
        '.kyyykyyyykyyyk.',
        '.kyyykyyyykyyyk.',
        '.kyykwwwwwwkyyk.',
        '..kykwwkkwwkyk..',
        '..kykwwwwwwkyk..',
        '...kkwwkkwwkk...',
        '....kkkkkkkk....',
        '...kyykyykyyk...',
        '..kykyyyyyykyk..',
        '..kkkk.kk.kkkk..'
      ]
    },
    Dolphin: {
      palette: { k: '#0f2a3f', b: '#6fb3e6', w: '#eef8ff', a: '#2e6fb5' },
      rows: [
        '................',
        '................',
        '................',
        '........kk......',
        '.......kbk......',
        '...kkkkbbkk.....',
        '..kbbbbbbbbkk..k',
        '..kbkbbbbbbbbkkk',
        'kkkbbbbbbbbbbbbk',
        'kbbbbbwwwwwbbkkk',
        'kkkkwwwwwwwbbk.k',
        '...kwwwwwwkkk...',
        '....kkkkkkk.....',
        '......kbk.......',
        '......kk........',
        '.aaa..aaaa..aaa.'
      ]
    },
    Duck: {
      palette: { k: '#1a1a1a', g: '#2e8b57', w: '#ffffff', b: '#8b4a2b', s: '#b8b8b8', y: '#f2c230' },
      rows: [
        '................',
        '....kkkk........',
        '...kggggk.......',
        '..kggkgggk......',
        'kkkggggggk......',
        'kyyyyggggk......',
        'kkkkkgggk.......',
        '....kwwwk.......',
        '...kbbbbbkkkkk..',
        '..kbbbbbbssssskk',
        '..kbbbbbssssssk.',
        '..kbbbbssssssk..',
        '...kbbssssssk...',
        '....kkkkkkkk....',
        '......ky..ky....',
        '.....kyyk.kyyk..'
      ]
    },
    Flamingo: {
      palette: { k: '#2a0f1a', p: '#f47aa8', d: '#d04a80', y: '#f5e0e8' },
      rows: [
        '....kkkk........',
        '...kppppk.......',
        '...kpkppk.......',
        '.kkyypppk.......',
        'kkkk.kpk........',
        '....kpk.........',
        '....kpk.........',
        '.....kpk........',
        '......kpkkkkk...',
        '.....kppppdddkk.',
        '.....kpppppdddpk',
        '......kppppppkk.',
        '........kkdkk...',
        '.........kdk....',
        '.........kdk....',
        '........kkdkk...'
      ]
    },
    Frog: {
      palette: { k: '#0e2a10', g: '#4caf50', l: '#9be27a', w: '#ffffff' },
      rows: [
        '................',
        '..kkkk....kkkk..',
        '.kwwwwk..kwwwwk.',
        '.kwkkwkggkwkkwk.',
        'kgkwwkggggkwwkgk',
        'kggkkggggggkkggk',
        'kggggggggggggggk',
        'kggggggggggggggk',
        'kggkkkkkkkkkkggk',
        'kgggllllllllgggk',
        '.kgllllllllllgk.',
        '..kkllllllllkk..',
        '.kggkkkkkkkkggk.',
        'kgggk......kgggk',
        'kgkgk......kgkgk',
        'kkkkk......kkkkk'
      ]
    },
    Gorilla: {
      palette: { k: '#111111', d: '#4a4a55', f: '#8a7a70' },
      rows: [
        '.....kkkkkk.....',
        '....kddddddk....',
        '...kddddddddk...',
        '..kddddddddddk..',
        '..kdkkkkkkkkdk..',
        '..kdfkffffkfdk..',
        '.kddffffffffddk.',
        '.kdfffkffkfffdk.',
        '.kdffffffffffdk.',
        '..kdfkkkkkkfdk..',
        '..kddffffffddk..',
        '.kkdddkkkkdddkk.',
        'kddddddddddddddk',
        'kdddffddddffdddk',
        'kddddddddddddddk',
        'kkkkkkkkkkkkkkkk'
      ]
    },
    Giraffe: {
      palette: { k: '#2a1a08', y: '#f2c14e', b: '#9c5a1e' },
      rows: [
        '....k..k........',
        '...kbkkbk.......',
        '.kkyyyyyyk......',
        '.kyyyykyyykk....',
        '..kyyyyyyyyyk...',
        '..kyyyyyykkk....',
        '..kyybyk........',
        '..kyyybk........',
        '..kybyyk........',
        '..kyyyykkkkkkkk.',
        '..kyybyyybyyybk.',
        '..kybyyybyyybyk.',
        '..kyyybyyyybyyk.',
        '..kyykkkkkkkyyk.',
        '..kyk......kyk..',
        '..kkk......kkk..'
      ]
    },
    Hedgehog: {
      palette: { k: '#1a120a', b: '#6b4a2e', d: '#3d2a1a', f: '#f0d6b0', c: '#f3a0a0' },
      rows: [
        '...k..k..k..k...',
        '..kbkkbkkbkkbk..',
        '.kbdbbdbbdbbdbk.',
        'kbbdbbdbbdbbdbbk',
        'kbdbbffffffbbdbk',
        'kbbbffffffffbbbk',
        'kbdbfkffffkfbdbk',
        'kbbfcffffffcfbbk',
        'kbdbfffkkfffbdbk',
        'kbbbbffffffbbbbk',
        '.kbdbbffffbbdbk.',
        '.kbbbbbbbbbbbbk.',
        '..kkbbbbbbbbkk..',
        '...kffk..kffk...',
        '...kkkk..kkkk...',
        '................'
      ]
    },
    Hippo: {
      palette: { k: '#1e1a2a', p: '#9a8fb5', l: '#c3b8d8', n: '#e8a0b0', w: '#ffffff' },
      rows: [
        '................',
        '..kk........kk..',
        '.kpk.kkkkkk.kpk.',
        '..kkppppppppkk..',
        '..kppkppppkppk..',
        '..kppppppppppk..',
        '.kppppppppppppk.',
        'kpllllllllllllpk',
        'klllkllllllklllk',
        'kllllllllllllllk',
        'kllwnnnnnnnnwllk',
        '.kllwnnnnnnwllk.',
        '..kkllllllllkk..',
        '...kkkkkkkkkk...',
        '..kppppppppppk..',
        '..kkkkkkkkkkkk..'
      ]
    },
    Jellyfish: {
      palette: { k: '#2a0f3a', p: '#c77dff', l: '#e7c6ff', m: '#e0409a' },
      rows: [
        '................',
        '.....kkkkkk.....',
        '...kkllllppkk...',
        '..kllllppppppk..',
        '.kllllppppppppk.',
        '.klllpppppppppk.',
        '.kpppkppppkpppk.',
        '.kppppppppppppk.',
        '.kkpkkpkkpkkpkk.',
        '...m..m..m..m...',
        '....m..m..m..m..',
        '...m..m..m..m...',
        '....m..m..m..m..',
        '...m..m..m..m...',
        '....m.....m.....',
        '................'
      ]
    },
    Kangaroo: {
      palette: { k: '#2a1608', b: '#c0763a', l: '#f0c08a' },
      rows: [
        '.....k.k........',
        '....kbkbk.......',
        '...kbbbbk.......',
        '..kbkbbbk.......',
        'kkbbbbbbk.......',
        'kkkkbbbbk.......',
        '....kbbbbk......',
        '...kbllbbbk.....',
        '..kkkllbbbbk....',
        '....kllbbbbk....',
        '....kllbbbbbk...',
        '....kbbbbbbbk...',
        '...kbbbkkbbbbk..',
        '..kbbbk..kbbbbk.',
        'kkbbbk....kbbbbk',
        'kkkkkk.....kkkkk'
      ]
    },
    Kiwi: {
      palette: { k: '#1a120a', b: '#7a5530', d: '#4e3520', y: '#d4a85a' },
      rows: [
        '................',
        '....kkkk........',
        '...kbbbbk.......',
        '..kbkbbbbkkk....',
        '..ykbbbdbbbbkk..',
        '.yy.kbbbbdbbbbk.',
        '.y..kbdbbbbbdbbk',
        'y...kbbbbdbbbbbk',
        'y...kbdbbbbdbbbk',
        'y....kbbbdbbbbk.',
        '.....kbbbbbbbk..',
        '......kkkkkkk...',
        '.......kyk.kyk..',
        '.......kyk.kyk..',
        '......kyyk.kyyk.',
        '................'
      ]
    },
    Llama: {
      palette: { k: '#2a1a10', b: '#a8744a', w: '#f4f1ea', r: '#d8433b', y: '#f2c230' },
      rows: [
        '...kk.....kk....',
        '...kbk....kbk...',
        '...kbk....kbk...',
        '...kbkkkkkkbk...',
        '...kbbbbbbbbk...',
        '...kbkbbbbkbk...',
        '...kbbbbbbbbk...',
        '....kwwwwwwk....',
        '....kwkwwkwk....',
        '....kwwwwwwk....',
        '.....kkbbkk.....',
        '....kbbbbbbk....',
        '..kkrryyyyrrkk..',
        '..krryrrrryrrk..',
        '..kbkbk..kbkbk..',
        '..kkkkk..kkkkk..'
      ]
    },
    Lion: {
      palette: { k: '#2a1406', m: '#b8621b', d: '#8a4210', y: '#f2b84a', l: '#fbe0a0' },
      rows: [
        '....kkkkkkkk....',
        '..kkmmdmmdmmkk..',
        '.kmmdmmmmmmdmmk.',
        'kmmdyyyyyyyydmmk',
        'kmdyyyyyyyyyydmk',
        'kmdykyyyyyykydmk',
        'kmmyyyyyyyyyymmk',
        'kmdyyyllllyyydmk',
        'kmmyyllkkllyymmk',
        'kmdyyyllllyyydmk',
        '.kmmdyyyyyydmmk.',
        '.kmdmmyyyymmdmk.',
        '..kmmdmmmmdmmk..',
        '...kkmmmmmmkk...',
        '.....kkkkkk.....',
        '................'
      ]
    },
    Meerkat: {
      palette: { k: '#2a1a0e', b: '#c8a070', l: '#ecd6ae', d: '#5a3a1e' },
      rows: [
        '......kkkk......',
        '.....kbbbbk.....',
        '....kbbbbbbk....',
        '...kbdkbbkdbk...',
        '...kbddbbddbk...',
        '....kblkklbk....',
        '.....kllllk.....',
        '.....kbllbk.....',
        '....kbllllbk....',
        '...kkkllllkkk...',
        '...kbkllllkbk...',
        '....kbllllbk....',
        '....kbllllbk....',
        '....kbbllbbk....',
        '...kkbbkkbbkk...',
        '...kkkk..kkkk...'
      ]
    },
    Octopus: {
      palette: { k: '#3a0a1a', r: '#e8505b', o: '#ff9a8a', w: '#ffffff', d: '#b8303b' },
      rows: [
        '.....kkkkkk.....',
        '...kkrrrrrrkk...',
        '..krrorrrrrrrk..',
        '.krooorrrrrrrrk.',
        '.krorrrrrrrrrrk.',
        '.krrrrrrrrrrrrk.',
        '.krrwkrrrrwkrrk.',
        '.krrwkrrrrwkrrk.',
        '.krrrrrddrrrrrk.',
        '..krrrrrrrrrrk..',
        'krrkrrkrrkrrkrrk',
        'krrkrrkrrkrrkrrk',
        'krk.krk..krk.krk',
        'kr..kr....rk..rk',
        '.kk..kk..kk..kk.',
        '................'
      ]
    },
    Otter: {
      palette: { k: '#1e1208', b: '#6e4424', l: '#e2c29c', s: '#a8d0e6' },
      rows: [
        '................',
        '...kk......kk...',
        '..kbbkkkkkkbbk..',
        '..kbbbbbbbbbbk..',
        '.kbbkbbbbbbkbbk.',
        '.kbbbllllllbbbk.',
        'kkbllllkkllllbkk',
        '.kblkllllllklbk.',
        'kkbllllllllllbkk',
        '..kbllkllkllbk..',
        '..kbbbbbbbbbbk..',
        '..kbllkkkkllbk..',
        '..kbllssssllbk..',
        '..kbbbkkkkbbbk..',
        '..kbbbbbbbbbbk..',
        '...kkkkkkkkkk...'
      ]
    },
    Penguin: {
      palette: { k: '#0f0f1a', b: '#2f3a55', w: '#ffffff', o: '#f59a23' },
      rows: [
        '.....kkkkkk.....',
        '....kbbbbbbk....',
        '...kbbbbbbbbk...',
        '...kbwwbbwwbk...',
        '...kbwkbbkwbk...',
        '...kbwwoowwbk...',
        '..kbbwwwwwwbbk..',
        '.kbbwwwwwwwwbbk.',
        '.kbbwwwwwwwwbbk.',
        'kbbbwwwwwwwwbbbk',
        'kbkbwwwwwwwwbkbk',
        '...kbwwwwwwbk...',
        '...kbwwwwwwbk...',
        '....kbwwwwbk....',
        '...koookkoook...',
        '...kkkk..kkkk...'
      ]
    },
    Panda: {
      palette: { k: '#111111', w: '#ffffff', p: '#f5b0c0' },
      rows: [
        '................',
        '..kkk......kkk..',
        '.kkkkwwwwwwkkkk.',
        '.kkwwwwwwwwwwkk.',
        '.kwwwwwwwwwwwwk.',
        '.kwwkkwwwwkkwwk.',
        '.kwkkwkwwkwkkwk.',
        '.kwkkkwwwwkkkwk.',
        '.kpwwwwkkwwwwpk.',
        '.kwwwwkwwkwwwwk.',
        '..kwwwwwwwwwwk..',
        '..kkkkwwwwkkkk..',
        '.kkkkwwwwwwkkkk.',
        '.kkkkwwwwwwkkkk.',
        '..kkkwwwwwwkkk..',
        '..kkkkk..kkkkk..'
      ]
    },
    Quokka: {
      palette: { k: '#2a1a0e', b: '#9a7048', l: '#d8b890', p: '#f0a0a0' },
      rows: [
        '................',
        '..kkk......kkk..',
        '.kbpbk....kbpbk.',
        '.kbbbkkkkkkbbbk.',
        '..kbbbbbbbbbbk..',
        '.kbbkbbbbbbkbbk.',
        '.kbbbbbbbbbbbbk.',
        '.kbplllkklllpbk.',
        '.kbllkllllkllbk.',
        '..kbllkkkkllbk..',
        '...kbllllllbk...',
        '....kkkkkkkk....',
        '...kbbllllbbk...',
        '..kbbbllllbbbk..',
        '..kbbbllllbbbk..',
        '..kkkkkkkkkkkk..'
      ]
    },
    Rabbit: {
      palette: { k: '#2a2a2a', w: '#f7f7f7', p: '#f5a0b5', g: '#c8c8d0' },
      rows: [
        '...kk......kk...',
        '..kwwk....kwwk..',
        '..kwpk....kpwk..',
        '..kwpk....kpwk..',
        '..kwpk....kpwk..',
        '..kwwkkkkkkwwk..',
        '.kwwwwwwwwwwwwk.',
        '.kwwkwwwwwwkwwk.',
        '.kwpwwwppwwwpwk.',
        '.kwwwwkwwkwwwwk.',
        '..kwwwwwwwwwwk..',
        '...kkwwwwwwkk...',
        '..kgwwwwwwwwgk..',
        '..kwwwwwwwwwwk..',
        '..kgwwwwwwwwgk..',
        '..kkkkkkkkkkkk..'
      ]
    },
    Seagull: {
      palette: { k: '#1a1a1a', w: '#ffffff', g: '#9aa4ad', r: '#d83a2a' },
      rows: [
        '................',
        '....kkkk........',
        '...kwwwwk.......',
        '..kwwkwwwk......',
        'krrrwwwwwk......',
        '.kkkwwwwwwk.....',
        '...kwwwwwwkkkk..',
        '...kwwwwgggggggk',
        '..kwwwwwggkgggkk',
        '..kwwwwwwggggkk.',
        '...kwwwwwwwkk...',
        '....kkkkkkkk....',
        '......kr.kr.....',
        '......kr.kr.....',
        '.....krr.krr....',
        '................'
      ]
    },
    Sloth: {
      palette: { k: '#2a1e14', b: '#9a8068', l: '#e0d0b8', d: '#5a3e28', g: '#7a5230' },
      rows: [
        'kkkkkkkkkkkkkkkk',
        'ggkbkggggggkbkgg',
        'kkkbkkkkkkkkbkkk',
        '..kbk......kbk..',
        '..kbbkkkkkkbbk..',
        '..kbbllllllbbk..',
        '..kldddlldddlk..',
        '..kldkdlldkdlk..',
        '..kldlllllldlk..',
        '..kllllkkllllk..',
        '..kbllkllkllbk..',
        '..kbbllllllbbk..',
        '...kbbbbbbbbk...',
        '...kbbbbbbbbk...',
        '....kbbbbbbk....',
        '.....kkkkkk.....'
      ]
    },
    Tiger: {
      palette: { k: '#1a0e04', o: '#f08a1c', w: '#ffffff' },
      rows: [
        '................',
        '..kk........kk..',
        '.kwok......kowk.',
        '.kookkkkkkkkook.',
        'kooookkookkooook',
        'kkoooookkoooookk',
        'koowkookkookwook',
        'kkooowwwwwwoookk',
        'kooowwwkkwwwoook',
        'kkoowwwwwwwwookk',
        '.koowwkwwkwwook.',
        '..kkowwwwwwokk..',
        '...kkkkkkkkkk...',
        '...kookookook...',
        '..kooookkooook..',
        '..kkkkkkkkkkkk..'
      ]
    },
    Walrus: {
      palette: { k: '#2a1a14', b: '#a87858', l: '#d8a888', w: '#fffbea' },
      rows: [
        '................',
        '....kkkkkkkk....',
        '...kbbbbbbbbk...',
        '..kbbbbbbbbbbk..',
        '..kbkbbbbbbkbk..',
        '..kbbbbbbbbbbk..',
        '.kbllllkkllllbk.',
        'kbllllllllllllbk',
        'kblkllllllllklbk',
        '.kbllllkkllllbk.',
        '..kkwwkkkkwwkk..',
        '...kwwkbbkwwk...',
        '..kbwwbbbbwwbk..',
        '.kbbwkbbbbkwbbk.',
        '.kbbbbbbbbbbbbk.',
        '.kkkkkkkkkkkkkk.'
      ]
    }
  };

  function animalHue(name) {
    var h = 0, t = String(name == null ? '' : name);
    for (var i = 0; i < t.length; i++) h = (h * 31 + t.charCodeAt(i)) >>> 0;
    return (h * 47) % 360;
  }

  function animalIcon(name, scale, tint) {
    if (scale == null) scale = 4;
    var key = String(name == null ? '' : name).trim().split(/\s+/).pop();
    var art = ART[key];
    if (!art) {
      // tolerate case differences ("grumpy gorilla")
      for (var k in ART) if (k.toLowerCase() === key.toLowerCase()) { art = ART[k]; key = k; break; }
    }
    if (!art) return '';
    var rects = '';
    for (var y = 0; y < art.rows.length; y++) {
      var row = art.rows[y];
      var x = 0;
      while (x < row.length) {
        var c = row[x];
        var start = x;
        while (x < row.length && row[x] === c) x++;
        if (c !== '.' && art.palette[c]) {
          rects += '<rect x="' + start + '" y="' + y + '" width="' + (x - start) +
            '" height="1" style="fill:' + art.palette[c] + '"/>';
        }
      }
    }
    var size = 16 * scale;
    return '<svg xmlns="http://www.w3.org/2000/svg" class="animal-icon" width="' + size +
      '" height="' + size + '" viewBox="0 0 16 16" shape-rendering="crispEdges"' +
      (tint ? ' style="filter:hue-rotate(' + animalHue(name) + 'deg) saturate(1.8)"' : '') + ' role="img" aria-label="' +
      key + '">' + rects + '</svg>';
  }

  window.CASINO_ANIMAL_ART = ART;
  window.animalIcon = animalIcon;
  window.animalHue = animalHue;
})();
