/* Gruppenräume – ein Raum, mehrere Geräte. Sammelstelle.
   ----------------------------------------------------------------------------
   Je Jahrgangsstufe gibt es einen Gruppenraum; er steht in einer eigenen Datei
   (`raeume-gruppe-5.js` … `raeume-gruppe-10.js`). Was ein Gruppenraum ist und
   welche Felder er hat, steht oben in `raeume-gruppe-5.js` und in `config.js`
   bei `istGruppenraum`, `schlusscode` und `schlussRaetsel`.

   `config.js` hängt die Räume dieser Liste an die jeweilige Stufe an.          */

import gruppe5 from './raeume-gruppe-5.js';
import gruppe6 from './raeume-gruppe-6.js';
import gruppe7 from './raeume-gruppe-7.js';
import gruppe8 from './raeume-gruppe-8.js';
import gruppe9 from './raeume-gruppe-9.js';
import gruppe10 from './raeume-gruppe-10.js';

export default [gruppe5, gruppe6, gruppe7, gruppe8, gruppe9, gruppe10];
