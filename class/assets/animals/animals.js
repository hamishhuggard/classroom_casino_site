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

  // ---- Kiwi name set (?random-names=kiwi, the default): te reo Māori, te reo science, kiwiana and science names. ----
  // Te reo names put the noun first, as te reo does ("Kea Kanikani" = dancing kea). Te reo words were checked against
  // Te Aka Māori Dictionary (maoridictionary.co.nz), 12 Nov 2026. gloss = the English meaning, shown on the join
  // screen and as a hover tooltip on every icon. art = the sprite key. The server stores names with '-' turned into
  // a space (its name check allows letters and spaces only); nameEntry() matches either spelling.
  // NZ_ART sprites keep their real colours (no hue tint): a pūkeko should stay blue.
  var NZ_ART = {
    Kea: {
      palette: { k: '#1f2a14', g: '#5c7a2e', l: '#8aa844', o: '#e2742a', b: '#7a7a80', w: '#ffffff' },
      rows: [
        '................',
        '.....kkkkk......',
        '....kgggggk.....',
        '...kgllgggk.....',
        '..kbbkwkggk.....',
        '.kbbbbkgggk.....',
        '.kbbbkkgggk.....',
        '.kbbk.kgggggkk..',
        '..kk.kgggggoogk.',
        '...kgggggooogk..',
        '...kggggoooggk..',
        '...kgggggoogk...',
        '....kgggggggk...',
        '.....kkgggkkk...',
        '......kk.kk.....',
        '................'
      ]
    },
    Kākāpō: {
      palette: { k: '#25301a', g: '#7fa83a', y: '#c9d35a', p: '#e6e2b4', d: '#4f7a2a', o: '#a08050' },
      rows: [
        '................',
        '....kkkkkkkk....',
        '..kkggggggggkk..',
        '.kggpppppppppgk.',
        '.kgppkppppkppgk.',
        '.kgppppooppppgk.',
        '.kgdppppppppdgk.',
        'kggyggdppdggygk.',
        'kgyggdgyyggdggyk',
        'kgdgyggggygdgygk',
        'kggygdggygggdgyk',
        'kgdggygggdgygggk',
        '.kggdgyggggydgk.',
        '..kkggggggggkk..',
        '...kooookkooook.',
        '................'
      ]
    },
    Kererū: {
      palette: { k: '#1a2a2a', g: '#2f8a5a', p: '#7a50a0', w: '#ffffff', r: '#d8302a', h: '#c4d0d8' },
      rows: [
        '................',
        '....kkkk........',
        '...kggppk.......',
        '..kgggrgk.......',
        'krrkggggkkkk....',
        '.kkkggpgggggkk..',
        '...kgggpgggggpk.',
        '..kwgggggppppgk.',
        '..kwwwkggggpgk..',
        '..kwwwwkgggggk..',
        '..kwwwwwkkggkk..',
        '..kwwhwwwwkk....',
        '...kwwwwwwk.....',
        '....kkwwkk......',
        '.....rk.rk......',
        '................'
      ]
    },
    Pūkeko: {
      palette: { k: '#141a3a', b: '#2a3fa0', d: '#4a5ad0', r: '#e02a2a', w: '#ffffff', e: '#ffffff' },
      rows: [
        '................',
        '...kkk..........',
        '..krrk..........',
        '.krrrkkkk.......',
        'krrkbbebbk......',
        '.kkkbbbbbbk.....',
        '....kbbbbbbkk...',
        '...kbbdbbbbbbk..',
        '..kbbbdbbbbbbbk.',
        '..kbbbbbbbbbbbk.',
        '..kbbbbbbbbbwwk.',
        '...kkbbbbbbwwwk.',
        '.....kkkkkkkkk..',
        '......kr..kr....',
        '......kr..kr....',
        '.....krr.krr....'
      ]
    },
    Tūī: {
      palette: { k: '#0d1a1f', b: '#1f5f6a', d: '#12303a', w: '#ffffff', s: '#4aa8a0', n: '#6a5a48' },
      rows: [
        '................',
        '....kkkk........',
        '...kbbbbk.......',
        '..kbbsbbbk......',
        '.nkbkbbbbbk.....',
        'nnkbbbbbbbbk....',
        '.kkwwbbbbbbbk...',
        '..kwwwbbbbbbbk..',
        '..kkwwbsbbbbbk..',
        '...kbbbbbbbbk...',
        '...kdbbbbbbk....',
        '....kdbbbbk.....',
        '.....kdddkk.....',
        '......kkkdk.....',
        '.......k.k.kk...',
        '................'
      ]
    },
    Ruru: {
      palette: { k: '#2a1a10', b: '#7a5030', d: '#4a2e1a', y: '#f2c820', w: '#f0e4c8', n: '#d8a030' },
      rows: [
        '................',
        '..kk........kk..',
        '.kbbkkkkkkkkbbk.',
        '.kbbbbbbbbbbbbk.',
        'kbbkkkkbbkkkkbbk',
        'kbkyyyykbkyyyykb',
        'kbkyykykbkyykykb',
        'kbkyyyykbkyyyykb',
        'kbbkkkkbnnbkkkbk',
        '.kbbbbbbnbbbbbk.',
        '.kbdbwwbbbwwbdk.',
        '.kbwbdbwwbdbwbk.',
        '.kbdbwbdbdwbdbk.',
        '..kbbdbbbbdbbk..',
        '...kkbbbbbbkk...',
        '....nn.kk.nn....'
      ]
    },
    Hoiho: {
      palette: { k: '#1a2230', s: '#5a6a82', w: '#ffffff', y: '#f4d24a', p: '#f08aa0', e: '#2a2a2a', o: '#e8902a', c: '#fff3b0' },
      rows: [
        '................',
        '.....kkkkkk.....',
        '....kssssssk....',
        '...kssssssssk...',
        '..kyycyyyycyyk..',
        '..kyyeyyyyeyyk..',
        '..kwwwwooowwwk..',
        '.ksswwwwwwwwssk.',
        '.ksswwwwwwwwssk.',
        '.ksswwwwwwwwssk.',
        '.ksswwwwwwwwssk.',
        '..kswwwwwwwwsk..',
        '..kswwwwwwwwsk..',
        '...kkwwwwwwkk...',
        '...kppk..kppk...',
        '..kppk....kppk..'
      ]
    },
    Moa: {
      palette: { k: '#24170c', b: '#7a5532', d: '#4f3520', w: '#f2e6c8', y: '#c9b07a', g: '#8a8270' },
      rows: [
        '...kkk..........',
        '..kbbbk.........',
        'kkbwbbk.........',
        'kyybbk..........',
        'kk.kbk..........',
        '...kbk..........',
        '...kbbkkkkk.....',
        '..kbbdbbbbbkk...',
        '.kbdbbbdbbdbbk..',
        '.kbbbdbbbdbbbdk.',
        '.kdbdbdbdbdbdk..',
        '..kdkdkgkkgkk...',
        '.......kgkkgk...',
        '......kgk..kgk..',
        '.....kgk....kgk.',
        '....kgggk..kgggk'
      ]
    },
    Pīwakawaka: {
      palette: { k: '#2a2a30', b: '#8a7a68', g: '#b8aea0', w: '#ffffff', d: '#3a3a44', o: '#d8a060' },
      rows: [
        '............kk..',
        '..........kkddk.',
        '.....kkk.kwdddwk',
        '....kbbbkwdddddk',
        '...kbkbbkkdddddk',
        '..kkbbbbbbkdddwk',
        '.kkoobbbbbbkddwk',
        '.kkkgggbbbbbkwk.',
        '...kgggbbbbbkk..',
        '...kgggggbbk....',
        '....kgggggk.....',
        '.....kkkkk......',
        '......k.k.......',
        '................',
        '................',
        '................'
      ]
    },
    Takahē: {
      palette: { k: '#12303a', t: '#2a8a9a', g: '#6a8a3a', d: '#1a5a6a', r: '#e02a2a', w: '#ffffff', y: '#c8503a' },
      rows: [
        '................',
        '..kkkk..........',
        '.krrrrk.........',
        'krrrrrkkkk......',
        'krrrrrkwttk.....',
        '.krrrkttttkk....',
        '..kkkttttttkk...',
        '..kttttdgggggk..',
        '.kttttdgggggggk.',
        '.kttttgggggggdk.',
        '.kttttgggggggdk.',
        '..kttdddddddkwk.',
        '...kkkkkkkkkwk..',
        '.....kr..kr.....',
        '.....kr..kr.....',
        '....krr.krr.....'
      ]
    },
    Tuatara: {
      palette: { k: '#1c2410', g: '#6b7a3a', l: '#9aa85a', w: '#f2efdc', y: '#f2c230' },
      rows: [
        '................',
        '................',
        '................',
        '....w.w.w.w.....',
        '...kwkwkwkwk....',
        '..kkgggggggkkk..',
        '.kgggggggggggkk.',
        'kgllllllllggggyk',
        'kgggggggggggggkk',
        '.kkgggggggggkk..',
        '..kgkkgkkgkgk...',
        '..kgk.kgk.kgk...',
        '.kgk..kgk.kk....',
        '.kk...kk........',
        '................',
        '................'
      ]
    },
    Wētā: {
      palette: { k: '#1e1208', h: '#6b3f1c', b: '#8a5524', a: '#e0a040', d: '#9a5a1e', t: '#c88a3c', n: '#b07838', w: '#ffffff' },
      rows: [
        '.....nnnnn......',
        '....n...nn..kk..',
        '...n..nn...kttk.',
        '..n..n....kttttk',
        '..n.n....ktttkkt',
        '.n.n....ktttk.kt',
        '.n.nkkkktttkkkkt',
        '..kkbbbadadadakt',
        '.khhbbbadadadadt',
        'khwhbbbadadadadt',
        'khhhbbbadadadadt',
        'khhhbbbadadadakt',
        '.kkkkkkkkkkkkkkt',
        '..k..k..k...k.kt',
        '..k.k...k.....kt',
        '...............k'
      ]
    },
    Tohorā: {
      palette: { k: '#101a2a', b: '#3b4f6e', p: '#e4ecf2', s: '#7fc4ee', e: '#ffffff' },
      rows: [
        '................',
        '................',
        '..........s.s...',
        '...........s....',
        'kk....kk...s....',
        'kbk..kbk...s....',
        '.kbkkbk..kkkkk..',
        '..kbbbk.kbbbbbkk',
        '...kbbkkbbbbbbbk',
        '....kbbbbbbbebbk',
        '....kbbbbbbbbbbk',
        '....kkpppppppppk',
        '.....kkpppppppk.',
        '......kkkkkkkk..',
        '................',
        '................'
      ]
    },
    Mokomoko: {
      palette: { k: '#0f2a12', g: '#4fc23a', w: '#d8f5a8', y: '#f5e050' },
      rows: [
        '......kkkk......',
        '.....kggggk.....',
        '....kgyggygk....',
        '..kk.kggggk.kk..',
        '.kggkkgwggkkggk.',
        '.kgk.kggggk.kgk.',
        '..k..kgwggk..k..',
        '.....kggggk.....',
        '.....kgggwk.....',
        '..k..kggggk..k..',
        '.kgk.kgwggk.kgk.',
        '.kggkkggggkkggk.',
        '..kk..kggk..kk..',
        '......kgk.......',
        '.......kgk......',
        '........kk......'
      ]
    },
    Kōura: {
      palette: { k: '#3a0e08', r: '#d8481f', o: '#f08a3c', d: '#8a2a12' },
      rows: [
        '.k............k.',
        '..k....kk....k..',
        '...k..krrk..k...',
        'kk..kkkrrkkk..kk',
        'krrk.kroork.krrk',
        'krrrkkroorkkrrrk',
        '.kkrrkrrrrkrrkk.',
        '..kkkkrddrkkkk..',
        '..k.kkrrrrkk.k..',
        '.k...kroork...k.',
        '.....krrrrk.....',
        '.....kddddk.....',
        '....kkrddrkk....',
        '...krrkrrkrrk...',
        '...kkkkkkkkkk...',
        '................'
      ]
    },
    Sheep: {
      palette: { k: '#2a2630', w: '#f7f7f2', s: '#c5cdd6', d: '#4a3c3c', e: '#ffffff' },
      rows: [
        '................',
        '.....kkkkkkk....',
        '....kwwwwwwwkk..',
        '..kkwwswwwwwwwk.',
        '.kddkwwwwswwwwwk',
        'kdddkwswwwwwwwwk',
        'kdedkwwwwwwwswwk',
        'kdddkkwwwwwwwwwk',
        '.kddkswwwwwwwwsk',
        '..kk.kkkkkkkkkk.',
        '....kdk.kdk.kdk.',
        '....kdk.kdk.kdk.',
        '....kdk.kdk.kdk.',
        '....kkk.kkk.kkk.',
        '................',
        '................'
      ]
    },
    Possum: {
      palette: { k: '#242428', g: '#8d939c', l: '#cfd3d8', p: '#f0909e', d: '#3a3a44', w: '#ffffff' },
      rows: [
        '................',
        '.kkk......kkk...',
        'kpppkkkkkkpppk..',
        'kppggggggggppk..',
        '.kgggggggggggk..',
        '.kggkkgggkkggkkk',
        '.kggkwgggwkggkdk',
        '.kgggggggggggkdk',
        '..kglllppllgkddk',
        '..kglllpplllkddk',
        '...kklllllkkddk.',
        '.....kkkkk.kddk.',
        '............kkk.',
        '................',
        '................',
        '................'
      ]
    },
    'Chilly Bin': {
      palette: { k: '#101a3a', b: '#2f6fd6', h: '#6aa0f0', w: '#f4f4f4', s: '#c4c8d0', g: '#8a909c' },
      rows: [
        '................',
        '....kkkkkkkk....',
        '....kggggggk....',
        '..kkkkkkkkkkkk..',
        '.kwwwwwwwwwwwwk.',
        '.kwwwwwwwwwwssk.',
        '.kkkkkkkkkkkkkk.',
        '.kbhhbbbbbbbbbk.',
        '.kbhbbbbbbbbbbk.',
        '.kbbbbbbbbkkbbk.',
        '.kbbbbbbbbkgbbk.',
        '.kbbbbbbbbbbbbk.',
        '.kbbbbbbbbbbbbk.',
        '.kkkkkkkkkkkkkk.',
        '................',
        '................'
      ]
    },
    Feijoa: {
      palette: { k: '#1c3a12', g: '#6fae2c', d: '#4a8a1e', h: '#9ad04a', c: '#f3efc0', j: '#b8d878', n: '#5a3a14', s: '#3a2a12' },
      rows: [
        '................',
        '.....knknk......',
        '....kknnkkk.....',
        '...kkggggggkk...',
        '..kgghgggggdgk..',
        '..kghhggggggdk..',
        '.kgggggggdgggk..',
        '.kgdgggggggggdk.',
        '.kgggggkkkkkkkk.',
        '.kggggkccccjjck.',
        '.kgdggkcjjjjjck.',
        '..kgggkcjsjjjk..',
        '..kdgggkccccck..',
        '...kkgggkkkkk...',
        '.....kkkk.......',
        '................'
      ]
    },
    Gumboot: {
      palette: { k: '#0c0c10', b: '#2e2e3a', h: '#7a7a8c', l: '#4a4a5c', w: '#d8d0b0' },
      rows: [
        '................',
        '.....kkkkkkk....',
        '.....kllllllk...',
        '.....kbhbbbbk...',
        '.....kbhbbbbk...',
        '.....kbhbbbbk...',
        '.....kbbbbbbk...',
        '.....kbbbbbbk...',
        '.....kbbbbbbk...',
        '...kkkbbbbbbk...',
        '..kbbbbbbbbbk...',
        '.kbbhbbbbbbbbk..',
        '.kbbbbbbbbbbbk..',
        '.kwwwwwwwwwwwk..',
        '.kkkkkkkkkkkkk..',
        '................'
      ]
    },
    Jandal: {
      palette: { k: '#0d2a4a', y: '#2ea8ff', s: '#1b7ad0', r: '#ff3b30' },
      rows: [
        '..kkk...........',
        '.kyyyk....kkk...',
        'kyyyyyk..kyyyk..',
        'kyyryyk.kyyyyyk.',
        'kyyryyk.kyyryyk.',
        'kyryryk.kyyryyk.',
        'rryyyrr.kyryryk.',
        'kyyyyyk.rryyyrr.',
        'kyyyyk..kyyyyyk.',
        'kyyyyk...kyyyyk.',
        'kyyyyyk..kyyyyk.',
        'kyyyyyk.kyyyyyk.',
        'kyyyyyk.kyyyyyk.',
        '.ksyysk.kyyyyyk.',
        '..kkk...ksyysk..',
        '..........kkk...'
      ]
    },
    Sausage: {
      palette: { k: '#2a1208', b: '#b5582c', h: '#e08a4a', d: '#7a3414', r: '#e8202a', w: '#fbf4e4', t: '#d9a05a' },
      rows: [
        '................',
        '.kkkkkkkkkkkkkk.',
        '.kwwwwwwwwwwwwk.',
        '.kwwwwwwwwwwwwk.',
        '..kkkkkkkkkkkk..',
        '.kbhhbbbbbbbbbk.',
        'kbbrrrrrrrrrrbbk',
        'kbdbbbbdbbbbbdbk',
        '.kbbbbbbbbbbbbk.',
        '..kkkkkkkkkkkk..',
        '.kwwwwwwwwwwwwk.',
        '.kwwwwwwwwwwwwk.',
        '.kwwwwwwwwwwwwk.',
        '.kttttttttttttk.',
        '.kkkkkkkkkkkkkk.',
        '................'
      ]
    },
    'Meat Pie': {
      palette: { k: '#3a1c08', y: '#e0a040', h: '#f8d070', d: '#a8601c', o: '#c47a24', g: '#c8ccd4', s: '#8a909c' },
      rows: [
        '................',
        '................',
        '....kkkkkkkk....',
        '..kkyyhhhyyykk..',
        '.kyyyyyhhyyyyyk.',
        'kyydyyyyyyyydyyk',
        'kyyyyyydyyyyyyyk',
        'kooooooooooooook',
        'kkkkkkkkkkkkkkkk',
        'kgsgsgsgsgsgsgsk',
        '.kgggggggggggsk.',
        '..kgggggggggsk..',
        '...kgggggggsk...',
        '....kkkkkkkk....',
        '................',
        '................'
      ]
    },
    Pavlova: {
      palette: { k: '#4a2030', w: '#ffffff', c: '#f0dcc0', s: '#d0b090', r: '#e0243c', g: '#7ac830', e: '#2a2a10' },
      rows: [
        '................',
        '................',
        '..kkkk..kkkk.kk.',
        '.krrrrkkgggkkrrk',
        '.krerrkgwwgkkrrk',
        '.kkrrkkkgggkkkk.',
        '.kwwkkwwkkwwwwk.',
        '.kwwwwwwwwwwwwk.',
        'kcwwwwwwwwwwwcsk',
        'kccccccccccccssk',
        'kcccccccccccsssk',
        '.kcccccccccsssk.',
        '..kkkkkkkkkkkk..',
        '................',
        '................',
        '................'
      ]
    },
    Kūmara: {
      palette: { k: '#2a0c20', p: '#a02858', d: '#6a1a40', h: '#d06090', c: '#f0d8a0' },
      rows: [
        '................',
        '..........kkk...',
        '........kkpppk..',
        '......kkpphppdk.',
        '.....kpphpppppk.',
        '....kpppppppdk..',
        '...kpphppppppk..',
        '..kkpppppdppk...',
        '.kpppdpppppk....',
        '.kpppppppppk....',
        'kpphpppdpppk....',
        'kppppppppkk.....',
        'kcpppppkk.......',
        '.kkcckk.........',
        '..kkkk..........',
        '................'
      ]
    },
    Ute: {
      palette: { k: '#0c1830', b: '#2a6ad0', h: '#6aa0f0', w: '#bfe6ff', t: '#1a2a50', y: '#ffe060', g: '#9aa0ac' },
      rows: [
        '................',
        '................',
        '........kkkkk...',
        '.......kbwwwwk..',
        'kkkkkkkbbwwkwwk.',
        'kttttttkbwwkwwwk',
        'kbbbbbbbbbbbbbbk',
        'kbhhbbbbbbbbbbyk',
        'kbbbbbbbbbbbbbbk',
        'kkkkkkkkkkkkkkkk',
        '.kttttk..kttttk.',
        '.ktggtk..ktggtk.',
        '.kttttk..kttttk.',
        '..kkkk....kkkk..',
        '................',
        '................'
      ]
    },
    Kiwifruit: {
      palette: { k: '#2a1a08', t: '#8a5a2a', g: '#7bd024', G: '#4ea01a', c: '#f2f0c0', s: '#101010' },
      rows: [
        '.......kk.......',
        '....kkkttkkk....',
        '...ktttGGtttk...',
        '..kttGggggGttk..',
        '.kttGgsggsgGttk.',
        '.ktGgsggggsgGtk.',
        '.ktgggccccgggtk.',
        'ktGgggccccgggGtk',
        'ktGgsgccccgsgGtk',
        '.ktgggccccgggtk.',
        '.ktGgsggggsgGtk.',
        '.kttGgsggsgGttk.',
        '..kttGggggGttk..',
        '...ktttGGtttk...',
        '....kkkttkkk....',
        '.......kk.......'
      ]
    },
    Irahiko: {
      palette: { k: '#0d1b3a', b: '#2f6fe0', d: '#1b43a8', h: '#9cc2ff', w: '#ffffff', t: '#7fb0ff' },
      rows: [
        '................',
        '................',
        '........kkk.....',
        '...t..kkbbbkk...',
        '..t..khhbbbbbk..',
        '.t..kbhbbbbbddk.',
        't...kbbbbbbbbdk.',
        '....kbwwwwwwbdk.',
        '....kbwwwwwwbdk.',
        't...kbbbbbbbbdk.',
        '.t..kbbbbbbbddk.',
        '..t..kdddbdddk..',
        '...t..kkdddkk...',
        '........kkk.....',
        '................',
        '................'
      ]
    },
    Iraoho: {
      palette: { k: '#4a0a0a', b: '#e03030', d: '#a31818', h: '#ff9a8a', w: '#ffffff' },
      rows: [
        '................',
        '......kkkk......',
        '....kkbbbbkk....',
        '...kbbbbbbbbk...',
        '..kbbhhbbbbbdk..',
        '..kbbhbwwbbbdk..',
        '.kbbbbbwwbbbddk.',
        '.kbbbwwwwwwbbdk.',
        '.kbbbwwwwwwbbdk.',
        '.kbbbbbwwbbbddk.',
        '..kbbbbwwbbbdk..',
        '..kbbbbbbbbddk..',
        '...kdddbbdddk...',
        '....kkddddkk....',
        '......kkkk......',
        '................'
      ]
    },
    Iramoe: {
      palette: { k: '#2b2b33', b: '#b4b6bf', d: '#80828e', h: '#e4e5ea' },
      rows: [
        '................',
        '......kkkk......',
        '....kkbbbbkk....',
        '...kbbbbbbbbk...',
        '..kbbhhbbbbbdk..',
        '..kbbhbbbbbbdk..',
        '.kbbbbbbbbbbddk.',
        '.kbbbkkbbkkbbdk.',
        '.kbbbbbbbbbbbdk.',
        '.kbbbbbbbbbbddk.',
        '..kbbbbkkbbbdk..',
        '..kbbbbbbbbddk..',
        '...kdddbbdddk...',
        '....kkddddkk....',
        '......kkkk......',
        '................'
      ]
    },
    Ngota: {
      palette: { k: '#3a1a1a', o: '#8a9db5', r: '#e03030', g: '#9a9aa6', e: '#2f6fe0' },
      rows: [
        '................',
        '....oo....oo....',
        '...oeeooooooo...',
        '...oee.oo..oo...',
        '....o..oo..o....',
        '....okkkkkoo....',
        '.ooookrgrkkoooo.',
        '.ee.okgrgrko..o.',
        '.ee.okrgrrko..oo',
        '.ooookkrrkkooee.',
        '....ookkkkoo.ee.',
        '....o..oo..o....',
        '...oo..oo..oo...',
        '...oooooooeeo...',
        '....oo....ee....',
        '................'
      ]
    },
    Autō: {
      palette: { k: '#3a0a0a', r: '#d82a2a', h: '#ff7a6a', d: '#8f1414', s: '#c8ccd4', w: '#ffffff' },
      rows: [
        '....kkkkkkkk....',
        '..kkrrrrrrrrkk..',
        '.khrrrrrrrrrrdk.',
        'khhrrrrrrrrrrddk',
        'khrrrrrkkrrrrrdk',
        'khrrrrk..krrrrdk',
        'khrrrk....krrrdk',
        'khrrrk....krrrdk',
        'khrrrk....krrrdk',
        'khrrrk....krrrdk',
        'khrrrk....krrrdk',
        'kwsssk....ksssdk',
        'kwsssk....ksssdk',
        'kwsssk....ksssdk',
        '.kkkk......kkkk.',
        '................'
      ]
    },
    Pūhiko: {
      palette: { k: '#0a0a0a', s: '#e8ecf2', w: '#9aa0ac', c: '#e8863a', h: '#ffc080', d: '#a85418', b: '#2b2b33', g: '#7a7f8c' },
      rows: [
        '......kkkk......',
        '.....kssssk.....',
        '....kkssswkk....',
        '...kchcccccdk...',
        '...kchcccccdk...',
        '...kchcccccdk...',
        '...kchcccccdk...',
        '...kgbbbbbbbbk..',
        '...kgbbbbbbbbk..',
        '...kgbbbbbbbbk..',
        '...kgbbbbbbbbk..',
        '...kgbbbbbbbbk..',
        '...kgbbbbbbbbk..',
        '...kgbbbbbbbbk..',
        '...kgbbbbbbbbk..',
        '....kkkkkkkkk...'
      ]
    },
    Puia: {
      palette: { k: '#2a1410', g: '#aeb2ba', o: '#ff5a1a', y: '#ffc830', b: '#7a4a2c', d: '#52301a' },
      rows: [
        '......kkk.......',
        '.....kgggk.kk...',
        '....kgggggkggk..',
        '.....kggggggggk.',
        '.....kkgggggkk..',
        '....kokyoykok...',
        '.....koyyook....',
        '....kkkoyook....',
        '...kbbooobbkk...',
        '...kbbbooobbbk..',
        '..kbbbbbobbbbbk.',
        '..kbbbboobbbbbdk',
        '.kbbbbbbobbbbbbd',
        'kbbbbbbbbbbbbbbd',
        'kbbbbbbbbbbbbbbd',
        '.kkkkkkkkkkkkkkk'
      ]
    },
    Uira: {
      palette: { k: '#2a2a30', g: '#c4c8d2', d: '#8e94a4', y: '#ffe020', o: '#f0a010' },
      rows: [
        '....kkkk........',
        '..kkggggkkk.....',
        '.kgggggggggk....',
        'kgggggggggggk...',
        'kgggdddddddggk..',
        '.kggggyyyyykk...',
        '..kkkkyyyyyk....',
        '....kyyyyyk.....',
        '...kyyyyykkk....',
        '..kyyyyyyyyyk...',
        '...kkkyyyyok....',
        '....kyyyyok.....',
        '...kyyyyok......',
        '..kyyyook.......',
        '.kyyookk........',
        '..kkkk..........'
      ]
    },
    'Āniwaniwa': {
      palette: { k: '#2a2a50', r: '#e82828', o: '#ff8a1a', y: '#ffe030', g: '#38b838', b: '#2a6ae0', v: '#8a3ad0', w: '#ffffff', x: '#b8d0ec' },
      rows: [
        '................',
        '................',
        '................',
        '................',
        '....kkkkkkkk....',
        '...krrroorrrk...',
        '..krooyyyyoork..',
        '.kroyyggggyyork.',
        'kroygbbbbbbgyork',
        'krygbvvkkvvbgyrk',
        'rokkkkk..kvkkkkr',
        'rkwwwwk...kwwwwk',
        'rkwwwwk...kwwwwk',
        'kkwwwwk...kwwwwk',
        '.kxxxxk...kxxxxk',
        '..kkkk.....kkkk.'
      ]
    },
    Aorangi: {
      palette: { k: '#3a2410', b: '#e8a050', d: '#b8742c', h: '#ffd8a0', r: '#f6e0a8' },
      rows: [
        '................',
        '................',
        '................',
        '.......kkkkkkkk.',
        '.....kkbbbrrrrrk',
        '....kbhhbbbbrrrk',
        '....kbhbbbbbrrk.',
        '..kkbbbbbbbdrrk.',
        '.krrbbbbbbbrdk..',
        '.krrbbbbbrrddk..',
        'krrrkbbrrdddk...',
        'krrrrrrdddddk...',
        '.kkkkkkdddkk....',
        '.......kkk......',
        '................',
        '................'
      ]
    },
    Whetūrere: {
      palette: { k: '#7a4a10', w: '#ffffff', y: '#ffe27a', o: '#f0a030', c: '#8fd8ff', l: '#4a90e8', s: '#ffc820' },
      rows: [
        '.............yy.',
        '............yy..',
        '...........sy.cc',
        '........s.yy.ccl',
        '.........y..ccsl',
        '.........y.ccll.',
        '..........c..l..',
        '....kk..yc.ll...',
        '...kookkcl....s.',
        '..koyyyok.......',
        '.koywwwyk.......',
        '.koywwwyok......',
        '.koyywwyok......',
        '..koyyyok.......',
        '...koook........',
        '....kkk.........'
      ]
    },
    Marama: {
      palette: { k: '#3a3418', y: '#fff0a8', d: '#e6c968', p: '#f0a890' },
      rows: [
        '................',
        '.....kkk........',
        '....kyyyk.......',
        '...kyyyk........',
        '..kyyyk.........',
        '.kyyyyk.........',
        '.kyyyyk.........',
        '.kyyyyk.........',
        '.kyykkyk........',
        '.kyyyyyk........',
        '.kyppyyykkkkk...',
        '..kydyyyyyyddk..',
        '...kddyyyyddk...',
        '....kddddddk....',
        '.....kkkkkk.....',
        '................'
      ]
    },
    Whetū: {
      palette: { k: '#5a2a08', y: '#ffd820', o: '#ff9a14', h: '#fff6a0' },
      rows: [
        '................',
        '................',
        '.......kk.......',
        '......kyok......',
        '......kyok......',
        '.kkkkkyhookkkkk.',
        'kyyyyyhhoooooook',
        '.kyyyyyyooooook.',
        '..kkyyyyooookk..',
        '....kykyokok....',
        '....kyyyoook....',
        '....kyyyoook....',
        '...kyyykkoook...',
        '...kykk..kkok...',
        '....k......k....',
        '................'
      ]
    },
    Rocket: {
      palette: { k: '#2a1a30', r: '#e83030', w: '#f4f6fa', g: '#a8b0c0', b: '#3a8ae8', o: '#ff8a1a', y: '#ffe040' },
      rows: [
        '.......kk.......',
        '......krrk......',
        '.....krrrrk.....',
        '....krrrrrrk....',
        '....kwwwwwgk....',
        '....kwbbwwgk....',
        '....kwbbwwgk....',
        '....kwwwwwgk....',
        '....kwwwwwgkk...',
        '...krrwwwwgrrk..',
        '..krrrwwwwgrrrkk',
        '.krrrkkwwwgkkrrr',
        '.krrkkggggggkkrr',
        '..kk.kooyyook.kk',
        '......koyyok....',
        '.......kkkk.....'
      ]
    },
    Bulb: {
      palette: { k: '#3a2a10', y: '#ffe84a', o: '#f5b820', h: '#ffffff', f: '#c86a10', g: '#b4b8c4', d: '#6a6e7c' },
      rows: [
        '................',
        '......kkkkk.....',
        '.....kyyoook....',
        '....kyyyyyook...',
        '...kyyhyyyyook..',
        '...kyhhyyyyyok..',
        '...kyhyfyfyyok..',
        '...kyyyffyyook..',
        '...kyyfyffyook..',
        '...kyyfyyfoook..',
        '....kyfyyfyok...',
        '....kggggggk....',
        '....kddddddk....',
        '....kggggggk....',
        '.....kkggkk.....',
        '.......kk.......'
      ]
    },
    Prism: {
      palette: { k: '#1a3a5a', c: '#bfe8f8', w: '#ffffff', r: '#e82828', o: '#ff8a1a', y: '#ffd820', g: '#38b838', b: '#2a6ae0', v: '#8a3ad0' },
      rows: [
        '................',
        '................',
        '......kk........',
        '.....kcck.......',
        '.....kcwk......r',
        '....kcccck....r.',
        '....kcwcck..rroo',
        'kkkkkccccckr.o..',
        'wwwwwwccccooyyyy',
        'kkkkkwcccvgg....',
        '..kcccccccvbbggg',
        '..kcwccccccvkb..',
        '.kccwcccccccvvbb',
        '..kkkkkkkkkk..v.',
        '...............v',
        '................'
      ]
    },
    Pendulum: {
      palette: { k: '#2a2418', g: '#9aa0ac', a: '#b4bccc', s: '#4a4a52', o: '#f0902a', h: '#ffd090', d: '#b0540e' },
      rows: [
        '....kkkkkkkk....',
        '...kggggggggk...',
        '...kggggggggk...',
        '....kkkkskkk....',
        '........s.......',
        '.........s......',
        '..........s.....',
        '..........s.....',
        '..........kkkk..',
        '.........kooook.',
        '.a......kohhoook',
        '...aa...kohooook',
        '......a.koooodok',
        '........koooddok',
        '.........kooook.',
        '..........kkkk..'
      ]
    },
    Satellite: {
      palette: { k: '#10203a', b: '#2a6ae0', h: '#8fc0ff', g: '#b4b8c4', y: '#f0c040', w: '#fff0b0', d: '#b08818', r: '#e83030' },
      rows: [
        '................',
        '.......kkk......',
        '......krrrk.....',
        '.......kgk......',
        '.kkkk..kgk.kkkk.',
        'khhhhkkkgkkhhhhk',
        'kbhbbkwwyykbhbbk',
        'kbhbbgyyyygbhbbk',
        'khhhhgyyydghhhhk',
        'kbhbbkyyddkbhbbk',
        'kbhbbkkkkkkbhbbk',
        '.kkkk......kkkk.',
        '................',
        '................',
        '................',
        '................'
      ]
    },
    Asteroid: {
      palette: { k: '#2a2018', b: '#8a7a68', d: '#625648', h: '#b4a690', c: '#4a4038' },
      rows: [
        '................',
        '................',
        '........kkkkk...',
        '...kkkkkhbbbbk..',
        '..khhhhhbbbbbbk.',
        '.khhhhhbbbbdbbk.',
        '.khhhhbbbbbccdk.',
        '.khhhbbddbbbdk..',
        '.khhbbcccbbdddk.',
        '..kbbbcccbdddddk',
        '.kbbccbcbddddddk',
        '..kbcbbbdddddddk',
        '..kbbbbdddccddk.',
        '...kkbkkdkdddk..',
        '.....k..k.kkk...',
        '................'
      ]
    }
  };
  for (var nz in NZ_ART) { NZ_ART[nz].real = true; ART[nz] = NZ_ART[nz]; }
  var ALIAS = { Electron: 'Irahiko', Proton: 'Iraoho', Neutron: 'Iramoe', Atom: 'Ngota', Magnet: 'Autō',
    Battery: 'Pūhiko', Volcano: 'Puia', Comet: 'Whetūrere' };
  var KIWI_NAMES = [
    // Te reo Māori: native species
    ['Kiwi Koa', 'Kiwi', 'happy kiwi', 'reo'],
    ['Kea Kanikani', 'Kea', 'dancing kea', 'reo'],
    ['Kākāpō Moe', 'Kākāpō', 'sleeping kākāpō', 'reo'],
    ['Kererū Kata', 'Kererū', 'laughing kererū (wood pigeon)', 'reo'],
    ['Pūkeko Pākiki', 'Pūkeko', 'curious pūkeko', 'reo'],
    ['Tūī Tere', 'Tūī', 'fast tūī', 'reo'],
    ['Ruru Rawe', 'Ruru', 'awesome ruru (morepork)', 'reo'],
    ['Hoiho Hōhā', 'Hoiho', 'fed-up hoiho (yellow-eyed penguin)', 'reo'],
    ['Moa Mataku', 'Moa', 'scared moa', 'reo'],
    ['Pīwakawaka Pukumahi', 'Pīwakawaka', 'busy pīwakawaka (fantail)', 'reo'],
    ['Takahē Tūpato', 'Takahē', 'careful takahē', 'reo'],
    ['Tuatara Toa', 'Tuatara', 'brave tuatara', 'reo'],
    ['Wētā Waiata', 'Wētā', 'singing wētā', 'reo'],
    ['Tohorā Tākaro', 'Tohorā', 'playful whale', 'reo'],
    ['Mokomoko Makariri', 'Mokomoko', 'cold lizard', 'reo'],
    ['Kōura Kōrero', 'Kōura', 'talking crayfish', 'reo'],
    // Te reo Māori: science
    ['Irahiko Hihiko', 'Irahiko', 'energetic electron', 'reo-science'],
    ['Iraoho Koa', 'Iraoho', 'happy proton', 'reo-science'],
    ['Iramoe Mārie', 'Iramoe', 'calm neutron', 'reo-science'],
    ['Ngota Iti', 'Ngota', 'tiny atom', 'reo-science'],
    ['Autō Kaha', 'Autō', 'strong magnet', 'reo-science'],
    ['Pūhiko Pai', 'Pūhiko', 'good battery', 'reo-science'],
    ['Puia Pukuriri', 'Puia', 'angry volcano', 'reo-science'],
    ['Uira Tere', 'Uira', 'fast lightning', 'reo-science'],
    ['Āniwaniwa Ātaahua', 'Āniwaniwa', 'beautiful rainbow', 'reo-science'],
    ['Aorangi Āmiomio', 'Aorangi', 'spinning planet', 'reo-science'],
    ['Whetūrere Rawe', 'Whetūrere', 'awesome comet', 'reo-science'],
    ['Marama Moe', 'Marama', 'sleeping moon', 'reo-science'],
    ['Whetū Wera', 'Whetū', 'hot star', 'reo-science'],
    // Kiwiana (NZ English slang)
    ['Chur Chilly Bin', 'Chilly Bin', 'chur: thanks, cheers · chilly bin: cooler box', 'kiwiana'],
    ['Stoked Sheep', 'Sheep', 'stoked: thrilled', 'kiwiana'],
    ['Fizzing Feijoa', 'Feijoa', 'fizzing: very excited', 'kiwiana'],
    ['Gnarly Gumboot', 'Gumboot', 'gnarly: rough, intense', 'kiwiana'],
    ['Jiggling Jandal', 'Jandal', 'jandal: flip-flop', 'kiwiana'],
    ['Sweet-as Sausage', 'Sausage', 'sweet as: all good', 'kiwiana'],
    ['Mean Meat Pie', 'Meat Pie', 'mean: excellent', 'kiwiana'],
    ['Primo Pavlova', 'Pavlova', 'primo: top quality', 'kiwiana'],
    ['Knackered Kūmara', 'Kūmara', 'knackered: worn out · kūmara: sweet potato', 'kiwiana'],
    ['Unreal Ute', 'Ute', 'unreal: amazing · ute: pickup truck', 'kiwiana'],
    ['Piker Possum', 'Possum', 'piker: someone who bails on plans', 'kiwiana'],
    ['Keen Kiwifruit', 'Kiwifruit', 'keen: eager', 'kiwiana'],
    // Science (English); the gloss gives the te reo word where there is one
    ['Excited Electron', 'Irahiko', 'electron = irahiko', 'science'],
    ['Positive Proton', 'Iraoho', 'proton = iraoho', 'science'],
    ['Neutral Neutron', 'Iramoe', 'neutron = iramoe', 'science'],
    ['Awesome Atom', 'Ngota', 'atom = ngota', 'science'],
    ['Mighty Magnet', 'Autō', 'magnet = autō', 'science'],
    ['Cosmic Comet', 'Whetūrere', 'comet = whetūrere', 'science'],
    ['Buzzing Battery', 'Pūhiko', 'battery = pūhiko', 'science'],
    ['Volatile Volcano', 'Puia', 'volcano = puia', 'science'],
    ['Rapid Rocket', 'Rocket', '', 'science'],
    ['Bright Bulb', 'Bulb', '', 'science'],
    ['Prancing Prism', 'Prism', '', 'science'],
    ['Periodic Pendulum', 'Pendulum', '', 'science'],
    ['Spinning Satellite', 'Satellite', '', 'science'],
    ['Awkward Asteroid', 'Asteroid', '', 'science']
  ].map(function (r) { return { name: r[0], art: r[1], gloss: r[2], group: r[3] }; });
  function nameKey(n) {
    var t = String(n == null ? '' : n);
    if (t.normalize) t = t.normalize('NFC');
    return t.toLowerCase().replace(/-/g, ' ').replace(/\s+\d+$/, '').replace(/\s+/g, ' ').trim();
  }
  var NAME_INDEX = {};
  KIWI_NAMES.forEach(function (e) { NAME_INDEX[nameKey(e.name)] = e; });
  function nameEntry(n) { return NAME_INDEX[nameKey(n)] || null; }
  // Server names come back without hyphens ("Sweet as Sausage"); show the proper spelling.
  function displayName(n) { var e = nameEntry(n); if (!e) return String(n == null ? '' : n); var m = String(n).match(/\s+\d+$/); return e.name + (m ? m[0] : ''); }
  function nameGloss(n) { var e = nameEntry(n); return e ? e.gloss : ''; }
  function escAttr(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

  function animalHue(name) {
    var h = 0, t = String(name == null ? '' : name);
    for (var i = 0; i < t.length; i++) h = (h * 31 + t.charCodeAt(i)) >>> 0;
    return (h * 47) % 360;
  }

  function animalIcon(name, scale, tint) {
    if (scale == null) scale = 4;
    var entry = nameEntry(name);
    var key = entry ? entry.art : String(name == null ? '' : name).trim().split(/\s+/).pop();
    if (!ART[key] && ALIAS[key]) key = ALIAS[key];
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
    var label = entry ? entry.name + (entry.gloss ? ' (' + entry.gloss + ')' : '') : key;
    return '<svg xmlns="http://www.w3.org/2000/svg" class="animal-icon" width="' + size +
      '" height="' + size + '" viewBox="0 0 16 16" shape-rendering="crispEdges"' +
      (tint && !art.real ? ' style="filter:hue-rotate(' + animalHue(name) + 'deg) saturate(1.8)"' : '') + ' role="img" aria-label="' +
      escAttr(label) + '">' + (entry && entry.gloss ? '<title>' + escAttr(label) + '</title>' : '') + rects + '</svg>';
  }

  window.CASINO_ANIMAL_ART = ART;
  window.CASINO_KIWI_NAMES = KIWI_NAMES;
  window.casinoNameEntry = nameEntry;
  window.casinoDisplayName = displayName;
  window.casinoNameGloss = nameGloss;
  window.animalIcon = animalIcon;
  window.animalHue = animalHue;
})();
