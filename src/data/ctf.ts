/**
 * Capture the flag. Three flags hide in the page source, the browser console
 * and the path robots.txt asks crawlers to skip. This file is only read at
 * build time: the browser gets SHA-256 hashes of the flags, never the flags.
 */
export const flags = [
  { where: 'page source', flag: 'flag{v1ew_s0urce_is_rec0n}', hint: 'Recon starts before anything runs. Read what the server sent you.' },
  { where: 'browser console', flag: 'flag{d3vt00ls_are_in_sc0pe}', hint: 'Developers leave notes where developers look. Open the tools.' },
  { where: 'robots.txt', flag: 'flag{r0b0ts_txt_is_n0t_access_c0ntr0l}', hint: 'Asking crawlers to stay out of a path is not the same as locking it.' },
];
