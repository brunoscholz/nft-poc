export const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000'

export const GREEN = 'success'
export const RED = 'danger'

export const DECIMALS = 10 ** 18

export const ether = wei => {
  if (wei) return wei / DECIMALS
}

export const tokens = ether

export const formatBalance = balance => {
  const precision = 100
  balance = ether(balance)
  balance = Math.round(balance * precision) / precision
  return balance
}

/**
 * Returns a string of form "abc...xyz"
 * @param {string} str string to string
 * @param {number} n number of chars to keep at front/end
 * @returns {string}
 */
export const getEllipsisTxt = (str, n = 6) => {
  if (str) {
    return `${str.substring(0, n)}...${str.substring(str.length - n, str.length)}`
  }
  return ''
}
