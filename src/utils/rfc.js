// ================== FUNCIONES PARA GENERAR EL RFC ==================

const PARTICULAS = ['DE', 'DEL', 'LA', 'LAS', 'LOS', 'Y', 'MC', 'MAC', 'VON', 'VAN']

const INCONVENIENTES = [
  'BUEI', 'BUEY', 'CACA', 'CACO', 'CAGA', 'CAGO', 'CAKA', 'COGE', 'COJA', 'COJE', 'COJI', 'COJO',
  'CULO', 'FETO', 'GUEY', 'JOTO', 'KACA', 'KACO', 'KAGA', 'KAGO', 'KOGE', 'KOJO', 'KAKA', 'KULO',
  'MAME', 'MAMO', 'MEAR', 'MEON', 'MION', 'MOCO', 'MULA', 'PEDA', 'PEDO', 'PENE', 'PUTA', 'PUTO',
  'QULO', 'RATA', 'RUIN'
]

// Mayúsculas, sin acentos y solo letras
function limpiar(texto = '') {
  return texto
    .trim()
    .toUpperCase()
    .replace(/Ñ/g, 'X')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^A-Z ]/g, '')
}

// Separa en palabras y quita partículas (DE, LA, DEL...)
function palabras(texto) {
  return limpiar(texto).split(' ').filter((p) => p && !PARTICULAS.includes(p))
}

function primeraVocalInterna(texto) {
  for (let i = 1; i < texto.length; i++) {
    if ('AEIOU'.includes(texto[i])) return texto[i]
  }
  return 'X'
}

function digitoVerificador(rfc12) {
  const tabla = '0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ '
  let suma = 0
  for (let i = 0; i < 12; i++) {
    suma += tabla.indexOf(rfc12[i]) * (13 - i)
  }
  const r = suma % 11
  if (r === 0) return '0'
  const d = 11 - r
  return d === 10 ? 'A' : String(d)
}

// Hash sencillo para la homoclave
function hash(texto) {
  let h = 0
  for (const c of texto) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return h
}

/**
 * Genera el RFC de una persona física.
 * @param {string} nombre
 * @param {string} paterno
 * @param {string} materno
 * @param {Date} fecha
 */
export function generarRFC(nombre, paterno, materno, fecha) {
  let n = palabras(nombre)
  if (n.length > 1 && ['JOSE', 'J', 'MARIA', 'MA'].includes(n[0])) n.shift()
  const nom = n[0] || ''
  const pat = palabras(paterno)[0] || ''
  const mat = palabras(materno)[0] || ''

  let ini
  if (!mat) {
    ini = pat.slice(0, 2) + nom.slice(0, 2)
  } else {
    ini = pat[0] + primeraVocalInterna(pat) + mat[0] + nom[0]
  }

  // Palabras inconvenientes: la última letra se cambia por X
  if (INCONVENIENTES.includes(ini)) ini = ini.slice(0, 3) + 'X'

  const aa = String(fecha.getFullYear()).slice(-2)
  const mm = String(fecha.getMonth() + 1).padStart(2, '0')
  const dd = String(fecha.getDate()).padStart(2, '0')

  // Homoclave simplificada (el SAT usa un algoritmo oficial con el nombre completo)
  const chars = '123456789ABCDEFGHIJKLMNPQRSTUVWXYZ'
  const h = hash(limpiar(`${paterno} ${materno} ${nombre}`))
  const homo = chars[h % 34] + chars[Math.floor(h / 34) % 34]

  const rfc12 = ini + aa + mm + dd + homo
  return rfc12 + digitoVerificador(rfc12)
}
