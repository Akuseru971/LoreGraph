/**
 * Strict proposition allowlists — the final authority for what a claim may prove.
 * Regex in support.ts is a guardrail only; these patterns define exact support.
 */
export const CLAIM_PROPOSITION_PATTERNS: Record<string, RegExp[]> = {
  "claim:aatrox-was-ascended": [
    /\baatrox\b/i,
    /\b(raised|among the first|among shurima'?s).*\bascended\b/i,
    /\bascended god-warrior\b/i,
    /\bsun disc\b/i,
    /\bchosen as one of shurima'?s god-warriors\b/i,
  ],
  "claim:aatrox-participated-void-war": [
    /\bfought\b.*\bvoid\b/i,
    /\bdefenders against the void\b/i,
    /\bwar against the void\b/i,
    /\bvoid incursion\b/i,
    /\bfought the void\b/i,
    /\bicathia'?s breach\b/i,
  ],
  "claim:aatrox-participated-darkin-war": [
    /\bdarkin war\b/i,
    /\bdefeated darkin\b/i,
    /\bsealed after the war\b/i,
    /\bcorrupted ascended\b/i,
    /\bwarred among themselves\b/i,
    /\bfought among the corrupted ascended\b/i,
  ],
  "claim:aatrox-became-darkin": [
    /\bbecame darkin\b/i,
    /\bcurdled\b/i,
    /\bcorrupt/i,
    /\bdarkin turn\b/i,
    /\bsurviving corrupted ascended\b/i,
  ],
  "claim:aatrox-fought-pantheon": [
    /\bdestroyed\b.*\baspect\b/i,
    /\bdestroys\b.*\baspect\b/i,
    /\bhunts\b/i,
    /\bduel\b/i,
    /\bmortal host survives\b/i,
    /\batreus survived\b/i,
    /\batreus survives\b/i,
    /\bcelestial power within atreus\b/i,
  ],
  "claim:aatrox-sealed-in-blade": [
    /\bsealed inside\b/i,
    /\bimprisoned\b/i,
    /\bbound into the (sword|blade|weapon)\b/i,
    /\bsealed inside the weapons\b/i,
    /\binto his blade\b/i,
  ],
  "claim:aatrox-possesses-host": [
    /\btakes the body\b/i,
    /\blifts the blade\b/i,
    /\bpicks up\b/i,
    /\bwielder\b/i,
  ],
  "claim:aatrox-aspect-war-destroyed": [
    /\bdestroyed\b.*\baspect of war\b/i,
    /\bdestroys the celestial aspect of war\b/i,
    /\bcelestial aspect of war within atreus\b/i,
    /\baspect of war within atreus\b/i,
  ],
  "claim:varus-was-ascended": [
    /\bvarus\b.*\bascended\b/i,
    /\bascended through shurima'?s sun disc\b/i,
    /\bshurima'?s ascended\b/i,
    /\belevate mortals into ascended\b/i,
  ],
  "claim:varus-became-darkin": [
    /\bvarus\b.*\bdarkin\b/i,
    /\bbecame darkin\b/i,
    /\bcorrupted\b/i,
    /\boutlives his purpose\b/i,
  ],
  "claim:varus-sealed-in-bow": [
    /\bsealed into the bow\b/i,
    /\bvarus into his bow\b/i,
    /\bimprisoned inside his (own )?bow\b/i,
    /\bimprisoned inside his own weapon\b/i,
    /\bdefeated darkin were sealed\b/i,
    /\bafter the darkin war\b/i,
  ],
  "claim:varus-possesses-valmar-kai": [
    /\bvalmar\b/i,
    /\bkai\b/i,
    /\btwo (young )?lovers\b/i,
    /\bthree sets of memories\b/i,
    /\bsharing one body\b/i,
    /\blift the bow\b/i,
    /\btakes the offer\b/i,
    /\bboth of them with it\b/i,
  ],
  "claim:nasus-was-ascended": [
    /\bnasus\b.*\bascended\b/i,
    /\balready ascended\b/i,
    /\bgod-warriors\b/i,
    /\bAscension\b/i,
    /\bgod-warrior\b/i,
  ],
  "claim:nasus-opposed-xerath": [
    /\bimprison xerath\b/i,
    /\bopposed xerath\b/i,
    /\bhelped imprison\b/i,
  ],
  "claim:nasus-scholar-archivist": [
    /\bscholar\b/i,
    /\barchivist\b/i,
    /\bstrategist\b/i,
  ],
  "claim:pantheon-hosted-aspect-of-war": [
    /\batreus\b.*\bclimbed\b/i,
    /\bhost(ed|ing)\b.*\baspect of war\b/i,
    /\bchosen by the aspect of war\b/i,
    /\bmortal vessel for the aspect of war\b/i,
  ],
  "claim:pantheon-aspect-destroyed": [
    /\baspect\b.*\b(destroyed|kills?)\b/i,
    /\bdestroys the celestial aspect of war\b/i,
    /\batreus\b.*\bsurvived\b/i,
    /\batreus survives\b/i,
    /\bthe mortal host survives\b/i,
    /\bmortal host\b.*\balive\b/i,
    /\bwielded the fallen aspect'?s weapons\b/i,
    /\bwields the fallen aspect'?s weapons\b/i,
    /\btakes up the fallen aspect'?s weapons\b/i,
    /\bthrough his own will\b/i,
  ],
  "claim:pantheon-participated-aatrox-duel": [
    /\baatrox\b.*\baspect\b/i,
    /\bduel\b/i,
    /\batreus\b.*\bsurvived\b/i,
    /\bthe mortal host survives\b/i,
  ],
  "claim:pantheon-climbed-targon": [
    /\bclimbs mount targon\b/i,
    /\bclimbed mount targon\b/i,
    /\bchosen by the aspect of war\b/i,
    /\brakkor boy climbs\b/i,
  ],
  "claim:pantheon-rakkor-origin": [
    /\brakkor\b/i,
    /\bclimbs mount targon\b/i,
  ],
  "claim:aspect-of-war-sealed-darkin": [
    /\baspect of war\b.*\b(sealed|campaign|darkin war|intervened)\b/i,
    /\bcelestial aspect of war fought\b/i,
    /\btargon intervened\b/i,
  ],
  "claim:shurima-sun-disc-ascension": [
    /\bsun disc\b.*\belevat/i,
    /\belevate mortals into ascended\b/i,
    /\bsun disc could elevate\b/i,
  ],
  "claim:rite-elevates-ascended": [
    /\brite of ascension\b/i,
    /\bused the rite of ascension\b/i,
    /\brite\b.*\belevat/i,
  ],
  "claim:shurima-rite-of-ascension": [
    /\brite of ascension\b/i,
    /\bsun disc\b/i,
  ],
  "claim:kaisa-survived-void": [
    /\bkaisa\b.*\bvoid\b/i,
    /\bsurvived\b.*\bvoid\b/i,
  ],
  "claim:kaisa-bonded-carapace": [
    /\bvoidborn carapace\b/i,
    /\bcarapace\b.*\bfused\b/i,
    /\bsecond skin\b/i,
    /\bbonded\b.*\bcarapace\b/i,
  ],
  "claim:ahri-vastaya-essence-magic": [
    /\bvastaya\b/i,
    /\blife essence\b/i,
    /\bmemories\b/i,
    /\bspirit magic\b/i,
  ],
  "claim:ahri-struggles-consuming-essence": [
    /\bdrain\b.*\bessence\b/i,
    /\bconsuming\b/i,
    /\bmemories\b/i,
    /\binherits\b/i,
  ],
  "claim:ahri-seeks-origins": [
    /\bseeks\b.*\borigin/i,
    /\bvastaya\b/i,
    /\bunderstanding\b/i,
    /\bwhere she came from\b/i,
  ],
  "claim:ahri-spirit-identity-search": [
    /\bspirit identity\b/i,
    /\bdefining herself\b/i,
    /\bendless consumption\b/i,
  ],
  "claim:akali-former-kinkou-fist": [
    /\bfist of shadow\b/i,
    /\binherited\b.*\btitle\b/i,
    /\bkinkou order\b/i,
  ],
  "claim:akali-left-kinkou-independence": [
    /\bleft the kinkou\b/i,
    /\bact independently\b/i,
    /\babandons the kinkou\b/i,
  ],
  "claim:akali-kinkou-shen-history": [
    /\bhistory with shen\b/i,
    /\bkennen\b/i,
    /\bkinkou\b/i,
  ],
  "claim:akali-shadow-assassin-method": [
    /\bhunts\b.*\bthreats\b/i,
    /\bown authority\b/i,
    /\bworking alone\b/i,
  ],
  "claim:irelia-blade-dancer-resistance": [
    /\bblade dancer\b/i,
    /\bbladesmiths\b/i,
    /\bdancer\b/i,
  ],
  "claim:irelia-noxian-invasion-loss": [
    /\bnoxus invaded\b/i,
    /\bnoxian invasion\b/i,
    /\bfamily scattered\b/i,
  ],
  "claim:irelia-resistance-leader": [
    /\bresistance leader\b/i,
    /\bblade dancer\b/i,
    /\bresistance can follow\b/i,
  ],
  "claim:irelia-severed-swain-arm": [
    /\bsevered swain'?s arm\b/i,
    /\bswain'?s arm\b/i,
    /\bconfrontation with noxian\b/i,
  ],
  "claim:jhin-khada-jhin-identity": [
    /\bkhada jhin\b/i,
    /\bstagehand\b/i,
    /\bgolden demon\b/i,
  ],
  "claim:jhin-serial-killer-artist": [
    /\bcrimes were designed\b/i,
    /\bstaged\b/i,
    /\barranged\b/i,
    /\bperformance\b/i,
  ],
  "claim:jhin-kinkou-capture": [
    /\bimprisoned\b/i,
    /\bkusho\b/i,
    /\bshen\b/i,
    /\bzed\b/i,
  ],
  "claim:jhin-released-weaponized": [
    /\breleased\b/i,
    /\bpointed at noxus\b/i,
    /\bfreed\b/i,
  ],
  "claim:karma-spiritual-mantle-incarnation": [
    /\bincarnation\b/i,
    /\bspiritual mantle\b/i,
    /\bspiritual leader\b/i,
  ],
  "claim:karma-darha-identity": [
    /\bdarha\b/i,
    /\bknown in this life\b/i,
  ],
  "claim:karma-noxian-invasion-violence": [
    /\bnoxian invasion\b/i,
    /\bfull power\b/i,
    /\bweapon\b/i,
    /\bfleet\b/i,
  ],
  "claim:karma-pacifism-challenged": [
    /\bpacifist tradition\b/i,
    /\bchallenged\b/i,
    /\brestraint\b/i,
  ],
  "claim:shen-eye-of-twilight": [
    /\beye of twilight\b/i,
    /\binherited\b/i,
  ],
  "claim:shen-kinkou-leader": [
    /\bleads the kinkou\b/i,
    /\bkinkou order\b/i,
    /\beye of twilight\b/i,
  ],
  "claim:shen-son-of-kusho": [
    /\bfather kusho\b/i,
    /\bkusho was killed\b/i,
    /\bson of kusho\b/i,
  ],
  "claim:shen-zed-kinkou-history": [
    /\bhistory with zed\b/i,
    /\bzed\b.*\bkinkou\b/i,
    /\bfellow student\b/i,
  ],
  "claim:shen-spirit-balance-guardian": [
    /\bspirit balance\b/i,
    /\bmaterial and spirit\b/i,
    /\bspirit realms\b/i,
  ],
  "claim:zed-order-of-shadow-leader": [
    /\border of shadow\b/i,
    /\bleads\b/i,
    /\bfounded\b/i,
  ],
  "claim:zed-former-kinkou-student": [
    /\bkinkou student\b/i,
    /\balongside shen\b/i,
    /\btrained under kusho\b/i,
  ],
  "claim:zed-forbidden-shadow-magic": [
    /\bforbidden shadow magic\b/i,
    /\bshadow magic\b/i,
    /\bunlock\b/i,
  ],
  "claim:zed-kusho-jhin-capture": [
    /\bimprison khada jhin\b/i,
    /\bhelped kusho\b/i,
    /\bcapture\b/i,
  ],
  "claim:yasuo-wind-prodigy": [
    /\bwind technique\b/i,
    /\bprodigy\b/i,
    /\bmaster\b/i,
  ],
  "claim:yasuo-elder-souma-guard": [
    /\belder souma\b/i,
    /\bguard\b/i,
    /\bassigned\b/i,
  ],
  "claim:yasuo-blamed-elder-death": [
    /\bblamed\b/i,
    /\bsouma'?s death\b/i,
    /\belder is dead\b/i,
  ],
  "claim:yasuo-killed-yone-duel": [
    /\byasuo killed\b/i,
    /\bkilled him\b/i,
    /\bduel\b/i,
    /\byone\b/i,
  ],
  "claim:yone-yasuo-brother": [
    /\byasuo'?s older brother\b/i,
    /\bold brother\b/i,
    /\bbrother\b/i,
  ],
  "claim:yone-killed-by-yasuo": [
    /\bkilled by yasuo\b/i,
    /\bdies on yasuo'?s blade\b/i,
    /\blost the duel\b/i,
  ],
  "claim:yone-azakana-mask": [
    /\bazakana\b/i,
    /\btook its mask\b/i,
    /\bmask\b/i,
  ],
  "claim:yone-hunts-azakana": [
    /\bhunts azakana\b/i,
    /\bhunting demons\b/i,
    /\bspirit worlds\b/i,
  ],
  "claim:yunara-kinkou-devotee": [
    /\bionian devotee\b/i,
    /\bkinkou\b/i,
    /\bbalance\b/i,
  ],
  "claim:yunara-centuries-spirit-realm": [
    /\bcenturies\b/i,
    /\bspirit realm\b/i,
    /\bspent\b/i,
  ],
  "claim:yunara-wields-aion-erna": [
    /\baion er'?na\b/i,
    /\brelic\b/i,
    /\bartifact\b/i,
  ],
  "claim:yunara-returned-changed-ionia": [
    /\breturns to\b/i,
    /\bchanged\b/i,
    /\bnot the one she left\b/i,
  ],
  "claim:xayah-vastayan-revolutionary": [
    /\bvastayan revolutionary\b/i,
    /\brevolutionary\b/i,
    /\brebel\b/i,
  ],
  "claim:xayah-partner-rakan": [
    /\bpartner rakan\b/i,
    /\brakan\b/i,
    /\bpartner\b/i,
  ],
  "claim:xayah-fights-vastayan-freedom": [
    /\bvastayan freedom\b/i,
    /\bfights for\b/i,
    /\bvastayan magic\b/i,
  ],
  "claim:xayah-lhotlan-vastaya": [
    /\blhotlan vastaya\b/i,
    /\blhotlan\b/i,
  ],
  "claim:kayn-zed-student": [
    /\bzed took him in\b/i,
    /\bzed\b/i,
    /\bchild soldier\b/i,
  ],
  "claim:kayn-order-of-shadow": [
    /\border of shadow\b/i,
    /\bmember\b/i,
    /\btrained\b/i,
  ],
  "claim:kayn-wields-rhaast": [
    /\bwields\b.*\brhaast\b/i,
    /\bdarkin\b/i,
    /\bscythe\b/i,
  ],
  "claim:kayn-rhaast-control-struggle": [
    /\bstruggle\b.*\brhaast\b/i,
    /\bcontrol\b/i,
    /\bcorruption\b/i,
  ],
  "claim:master-yi-wuju-master": [
    /\bwuju\b/i,
    /\blast master\b/i,
    /\bmaster of wuju\b/i,
  ],
  "claim:master-yi-noxian-devastation": [
    /\bnoxian attack\b/i,
    /\bdevastated\b/i,
    /\bwuju order\b/i,
  ],
  "claim:master-yi-wuju-survivor": [
    /\bsurvivors\b/i,
    /\bpreserving\b/i,
    /\blast guardians\b/i,
  ],
  "claim:master-yi-trained-wukong": [
    /\btrained wukong\b/i,
    /\bwukong\b/i,
    /\bwuju arts\b/i,
  ],
  "claim:hwei-ionian-painter-mage": [
    /\bionian painter\b/i,
    /\bpainter and mage\b/i,
    /\bmage\b/i,
  ],
  "claim:hwei-art-emotional-magic": [
    /\bemotional\b/i,
    /\bmagical expression\b/i,
    /\bart\b/i,
  ],
  "claim:hwei-jhin-attack-trauma": [
    /\bjhin'?s attack\b/i,
    /\btrauma\b/i,
    /\bgolden demon\b/i,
  ],
  "claim:hwei-master-death": [
    /\bmaster'?s death\b/i,
    /\bmaster\b.*\bdeath\b/i,
    /\bjhin\b/i,
  ],
  "claim:kennen-yordle-kinkou": [
    /\byordle\b/i,
    /\bkinkou\b/i,
    /\bonly yordle\b/i,
  ],
  "claim:kennen-heart-of-tempest": [
    /\bheart of the tempest\b/i,
    /\btempest\b/i,
  ],
  "claim:kennen-kinkou-enforcer": [
    /\benforcer\b/i,
    /\blightning\b/i,
    /\bbalance\b/i,
  ],
  "claim:kennen-shen-akali-mentor": [
    /\btrained akali\b/i,
    /\bshen\b/i,
    /\bmentor\b/i,
  ],
  "claim:skarner-yun-tal-founder": [
    /\bfounding member\b/i,
    /\byun tal\b/i,
    /\bruling caste\b/i,
    /\bfounding members\b/i,
  ],
  "claim:skarner-guardian-ixaocan": [
    /\bbeneath ixaocan\b/i,
    /\bchamber beneath\b/i,
    /\bhear\b.*\bearth\b/i,
    /\bsensing\b.*\bearth\b/i,
  ],
  "claim:skarner-isolationist-protector": [
    /\bkeeping\b.*\bnation safe\b/i,
    /\bisolationist\b/i,
    /\bsafe from the rest of the world\b/i,
    /\bprotector\b/i,
  ],
  "claim:viego-caused-ruination": [
    /\bforced the waters of life\b/i,
    /\bdrowned the isles in black mist\b/i,
    /\bmagic did not resurrect isolde\b/i,
    /\binverted\b.*\bblack mist\b/i,
    /\bruination\b/i,
  ],
  "claim:thresh-blessed-isles-warden": [
    /\bkeeper on the blessed isles\b/i,
    /\bwarden of the archives\b/i,
    /\btrusted with the archives\b/i,
    /\bblessed isles\b/i,
  ],
  "claim:thresh-ruination-consequence": [
    /\bwhen viego shattered the isles\b/i,
    /\bshattered the isles\b/i,
    /\bblack mist\b/i,
    /\bcollects souls\b/i,
    /\bcollecting souls\b/i,
  ],
  "claim:kalista-ruination-present": [
    /\bpresent for the ruination\b/i,
    /\bruination\b/i,
    /\bspear of vengeance\b/i,
    /\breturned from the isles\b/i,
    /\boath-bound revenant\b/i,
  ],
  "claim:nasus-brother-renekton": [
    /\bbrother\b/i,
    /\brenekton\b/i,
    /\bloses his brother\b/i,
    /\blost his brother\b/i,
  ],
  "claim:nasus-participated-fall": [
    /\bseals\b.*\b(catastrophe|xerath)\b/i,
    /\bchaos of the fall\b/i,
    /\bfall of shurima\b/i,
    /\bsealed xerath\b/i,
  ],
  "claim:nasus-participated-void-war": [
    /\bascended when shurima\b/i,
    /\bdeployed god-warriors against the void\b/i,
    /\bagainst the void\b/i,
  ],
  "claim:nasus-guards-shuriman-knowledge": [
    /\bguards\b.*\bknowledge\b/i,
    /\bcurator\b/i,
    /\bshuriman knowledge\b/i,
    /\bwhat remains of shuriman knowledge\b/i,
  ],
  "claim:azir-emperor-shurima": [
    /\bheir to an empire\b/i,
    /\brule\b.*\bempire\b/i,
    /\bempire runeterra has produced\b/i,
    /\blast emperor of shurima\b/i,
  ],
  "claim:azir-betrayed-by-xerath": [
    /\bbetrayed\b/i,
    /\bsabotaged\b/i,
    /\bman he trusted\b/i,
    /\bxerath\b/i,
  ],
  "claim:azir-participated-fall": [
    /\britual kills him\b/i,
    /\bdrowns the capital\b/i,
    /\bascension is sabotaged\b/i,
    /\bfall of shurima\b/i,
  ],
  "claim:azir-returned-ascended": [
    /\breturns ascended\b/i,
    /\breturned ascended\b/i,
    /\bhe returns ascended\b/i,
    /\bshurima rises\b/i,
    /\bshurima rose again\b/i,
    /\brisen city\b/i,
  ],
  "claim:xerath-freed-shurima-risen": [
    /\bfreed from the tomb\b/i,
    /\bfreed when shurima rises\b/i,
    /\bshurima rises again\b/i,
    /\brise of shurima\b/i,
    /\bwalks runeterra again\b/i,
    /\bbreaks his ancient prison\b/i,
  ],
  "claim:renekton-was-ascended": [
    /\bascended\b/i,
    /\bAscension\b/i,
    /\bgod-warriors\b/i,
    /\bgod-warrior\b/i,
    /\braised alongside nasus\b/i,
  ],
  "claim:renekton-brother-nasus": [
    /\bbrothers\b/i,
    /\bbrother\b/i,
    /\bnasus\b/i,
  ],
  "claim:renekton-returned-shurima-risen": [
    /\bfreed when shurima rises\b/i,
    /\bfreed when shurima rose\b/i,
    /\bwas freed when shurima rose again\b/i,
    /\bshurima rises again\b/i,
    /\bshurima risen\b/i,
    /\bshurima rises\b/i,
    /\bbutcher returns\b/i,
    /\bstill consumed by rage\b/i,
  ],
  "claim:renekton-imprisoned-with-xerath": [
    /\bimprison xerath\b/i,
    /\binto the tomb\b/i,
    /\bentombed\b/i,
    /\bfollows nasus\b/i,
    /\bbeneath the ruins\b/i,
  ],
  "claim:xerath-served-azir": [
    /\btrusted confidant\b/i,
    /\bclosest advisor\b/i,
    /\bslave-born magus\b/i,
    /\bserved azir\b/i,
  ],
  "claim:xerath-betrayed-azir": [
    /\bsabotages\b.*\bascension\b/i,
    /\bsabotaged\b/i,
    /\bbetrayal\b/i,
    /\bcaused shurima\b/i,
    /\btriggers the collapse\b/i,
    /\bcollapse of shurima\b/i,
  ],
  "claim:kaisa-survived-void-breach": [
    /\bvoid incursion\b/i,
    /\bvillage is taken\b/i,
    /\bground open(ed)?\b/i,
    /\btook her village\b/i,
    /\bdoes not stop moving\b/i,
  ],
  "claim:kaisa-void-symbiote": [
    /\bvoid symbiote\b/i,
    /\bsecond skin\b/i,
    /\bfuses to her\b/i,
    /\bkeeping her alive\b/i,
  ],
  "claim:kaisa-hunts-void": [
    /\bkills void creatures\b/i,
    /\bhunts void\b/i,
    /\bhunting her own reflection\b/i,
  ],
  "claim:kassadin-lost-daughter-kaisa": [
    /\bdaughter\b/i,
    /\bkaisa\b/i,
    /\bvoid breach\b/i,
    /\bswallowed by the incursion\b/i,
  ],
  "claim:kassadin-void-altered": [
    /\breturns from the void\b/i,
    /\bvoid walker\b/i,
    /\baltered\b/i,
    /\bvoid-touched\b/i,
  ],
  "claim:malzahar-void-prophet": [
    /\bprophet of the void\b/i,
    /\bmortal prophet\b/i,
    /\bvoices in the desert\b/i,
    /\bwhispers to ancient icathia\b/i,
    /\bzealous seer\b/i,
    /\bvoid is runeterra'?s salvation\b/i,
    /\bbelieves the void\b/i,
    /\bvoid began speaking\b/i,
  ],
  "claim:malzahar-spreads-void-doctrine": [
    /\bspreads void doctrine\b/i,
    /\bherald of the end\b/i,
    /\bopening paths for incursions\b/i,
    /\bpreaches\b/i,
  ],
  "claim:belveth-void-empress": [
    /\bbel'?veth\b/i,
    /\bdevoured city\b/i,
    /\bvoid consumes\b/i,
    /\bhive mind\b/i,
    /\bempress\b/i,
  ],
  "claim:belveth-confronted-kaisa": [
    /\bconfronts\b.*\bkai'?sa\b/i,
    /\bconfrontation with survivors\b/i,
    /\bresist the void\b/i,
  ],
  "claim:aurelion-sol-star-forger": [
    /\bshapes stars\b/i,
    /\bshaped stars\b/i,
    /\bforging stars\b/i,
    /\bstar forger\b/i,
    /\bacross the void\b/i,
    /\bacross the cosmos\b/i,
  ],
  "claim:kaisa-daughter-of-kassadin": [
    /\bdaughter\b/i,
    /\bkassadin\b/i,
    /\bparent\b/i,
  ],
  "claim:aurelion-sol-bound-by-targon": [
    /\baspects of targon\b/i,
    /\bbind his power\b/i,
    /\bcrown\b/i,
    /\bthe bargain\b/i,
    /\bflatter him\b/i,
  ],
  "claim:aurelion-sol-still-bound": [
    /\bstill bound\b/i,
    /\bremains bound\b/i,
    /\bworking the leash\b/i,
    /\btesting\b.*\bcage\b/i,
  ],
  "claim:leona-hosted-aspect-of-sun": [
    /\baspect of the sun\b/i,
    /\bchosen by the sun\b/i,
    /\bbearing the aspect of the sun\b/i,
    /\bhost to the aspect of the sun\b/i,
  ],
  "claim:leona-childhood-friend-diana": [
    /\bchildhood friend\b/i,
    /\boldest friend\b/i,
    /\bgrew up together\b/i,
    /\bgrew up with\b/i,
    /\bgrew up in the solari\b/i,
    /\braised solari\b/i,
    /\bwarrior of the sun faith\b/i,
    /\bwrong questions\b/i,
    /\bsolari initiate\b/i,
    /\bburied records\b/i,
    /\bsun against moon\b/i,
    /\bheresy with a sword\b/i,
    /\bcollides with leona\b/i,
    /\bfaith the solari erased\b/i,
  ],
  "claim:diana-hosted-aspect-of-moon": [
    /\baspect of the moon\b/i,
    /\bchosen by the moon\b/i,
    /\bclimbs targon\b/i,
    /\bcarrying the aspect\b/i,
  ],
  "claim:zoe-aspect-of-twilight": [
    /\baspect of twilight\b/i,
    /\btwilight messenger\b/i,
    /\bcosmic events\b/i,
    /\bmessenger role\b/i,
  ],
  "claim:zoe-knows-aurelion-sol": [
    /\baurelion sol\b/i,
    /\bcelestial figures\b/i,
    /\bcosmic errands\b/i,
    /\bintersecting with\b/i,
  ],
};

/** Sentence fragments that cannot be FACT from transformation/participation claims alone. */
export const EDITORIAL_PROPOSITION_MARKERS: RegExp[] = [
  /\bneeded the war to continue\b/i,
  /\bvictory arrives and changes nothing\b/i,
  /\bcenturies at the front line\b/i,
  /\bcenturies of war had hollowed\b/i,
  /\bpublic ceremony\b/i,
  /\bdefenders of the empire\b/i,
  /\bformal shuriman institution\b/i,
  /\bsomething in the ascended broke\b/i,
  /\bcurdled into appetite\b/i,
  /\bheroes who had saved shurima became the reason\b/i,
  /\bmortals who had built them fought back\b/i,
  /\btargon intervened\b/i,
  /\bcould not be killed\b/i,
  /\bmost reliable exit\b/i,
  /\bworld ending\b/i,
  /\bseals are failing\b/i,
  /\btargon built the cages\b/i,
  /\binteresting is what happened next\b/i,
  /\bneither of them is owed\b/i,
  /\bwinning a war like that requires\b/i,
  /\bnobody in the empire asked\b/i,
];

export function splitPropositions(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function claimSupportsPropositionStrict(claimId: string, text: string): boolean {
  const patterns = CLAIM_PROPOSITION_PATTERNS[claimId];
  if (!patterns?.length) return false;
  return patterns.some((p) => p.test(text));
}

export function propositionFullySupported(text: string, claimIds: string[]): boolean {
  if (EDITORIAL_PROPOSITION_MARKERS.some((p) => p.test(text))) {
    return false;
  }

  const sentences = splitPropositions(text);
  if (!sentences.length) return false;

  return sentences.every((sentence) =>
    claimIds.some((id) => claimSupportsPropositionStrict(id, sentence)),
  );
}

export function claimsForBlockKey(blockKey: string): string[] | undefined {
  return BLOCK_PROPOSITION_CLAIMS[blockKey];
}

/** Required claims per story-path block — each must strictly support the block text. */
export const BLOCK_PROPOSITION_CLAIMS: Record<string, string[]> = {
  "the-darkin:0:0": ["claim:shurima-sun-disc-ascension"],
  "the-darkin:0:1": ["claim:rite-elevates-ascended"],
  "the-darkin:0:2": ["claim:aatrox-was-ascended"],
  "the-darkin:1:0": ["claim:aatrox-participated-void-war"],
  "the-darkin:3:0": ["claim:aatrox-became-darkin"],
  "the-darkin:3:1": ["claim:aspect-of-war-sealed-darkin"],
  "the-darkin:3:2": ["claim:aatrox-fought-pantheon"],
  "the-darkin:4:0": ["claim:aatrox-sealed-in-blade", "claim:varus-sealed-in-bow"],
  "the-darkin:6:0": ["claim:varus-possesses-valmar-kai"],
  "the-darkin:6:1": ["claim:varus-possesses-valmar-kai"],
  "targon-and-the-aspects:3:0": ["claim:pantheon-hosted-aspect-of-war"],
  "targon-and-the-aspects:3:1": ["claim:aspect-of-war-sealed-darkin"],
  "targon-and-the-aspects:4:0": ["claim:pantheon-aspect-destroyed", "claim:aatrox-fought-pantheon"],
  "targon-and-the-aspects:4:1": ["claim:pantheon-aspect-destroyed"],
  "targon-and-the-aspects:5:0": ["claim:pantheon-aspect-destroyed"],
};
