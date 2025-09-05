import { toggleCustomCSS } from "./helpers.js";

export function colorizePersistentPF2eHUD(active = true) {
    toggleCustomCSS(css, styleID, active)
}

const styleID = 'pf2e-hud-persistent-colorized';

const css = `
[data-section="hero-points"] i:not(.carret) {
	--icon-color: #E4BE37;
}


#pf2e-hud-persistent [data-panel=owned-actors] .owned-actor .heroPoints i {
	--icon-color: #E4BE37;
}

[data-section="fortitude"] {
	--icon-color: #43A047;
}

#pf2e-hud-persistent [data-panel=owned-actors] .owned-actor .statistic i.fa-chess-rook {
	--icon-color: #43A047;
}

[data-section="reflex"] {
	--icon-color: #F5A623;
}

#pf2e-hud-persistent [data-panel=owned-actors] .owned-actor .statistic i.fa-person-running {
	--icon-color: #F5A623;
}

[data-section="will"] {
	--icon-color: #5C6BC0;
}

#pf2e-hud-persistent [data-panel=owned-actors] .owned-actor .statistic i.fa-brain {
	--icon-color: #5C6BC0;
}

[data-section="dying"] i:not(.carret) {
	--icon-color: #b01717;
}

[data-section="wounded"] i:not(.carret) {
	--icon-color: #ff595e;
}

[data-section="hp"] {
	--icon-color: #1fb222;
}

#pf2e-hud-persistent [data-panel=owned-actors] .owned-actor .value.hp i {
	--icon-color: #1fb222;
}

[data-section="temp-hp"] {
	--icon-color: #45b6fe;
}

[data-section="ac"] {
	--icon-color: #aab0b3;
}

#pf2e-hud-persistent [data-panel=owned-actors] .owned-actor .ac i {
	color: #aab0b3;
}

[data-sidebar="actions"] i {
	--icon-color:  #53c341;
}

[data-sidebar="items"] i {
	--icon-color: #B87C3D;
}

[data-sidebar="spells"] i {
	--icon-color: #921DF2;
}

[data-sidebar="skills"] i {
	--icon-color: #47A8A9;
}

/*
[data-sidebar="extras"] i {
	--icon-color: #EF1C55;
}
*/

[data-section="effects"] i {
	--icon-color: #FF5B00;
}

[data-section="perception"] {
	--icon-color: #4680CC;
}

#pf2e-hud-persistent [data-panel=owned-actors] .owned-actor .statistic i.fa-eye {
	--icon-color: #4680CC;
}

[data-section="stealth"] {
	--icon-color: #a280cc;
}

#pf2e-hud-persistent [data-panel=owned-actors] .owned-actor .statistic i.fa-mask {
	--icon-color: #a280cc;
}

[data-section="athletics"] {
	--icon-color: #CD5537;
}

#pf2e-hud-persistent [data-panel=owned-actors] .owned-actor .statistic i.fa-hand-fist {
	--icon-color: #CD5537;
}

/**[data-section="ac"] i {
	--icon-color: #FFFFFF;
}*/

[data-section="shield"] {
	i.fa-shield.fa-regular {
		--icon-color: #0C71FE;
	}
	i.fa-shield.fa-solid {
		--icon-color: #DBA143;
	}
}
`