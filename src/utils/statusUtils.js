/**
 * Determines the status of a unicorn based on its age
 * @param {number} age - The age of the unicorn
 * @returns {string} Status label
 */
export function getUnicornStatus(age) {
  if (age >= 0 && age <= 8) {
    return 'Baby Unicorn'
  } else if (age >= 9 && age <= 25) {
    return 'Mature Unicorn'
  } else if (age >= 26) {
    return 'Old Unicorn'
  }
  return 'Unknown'
}

/**
 * Gets the color class for status badge (matching Figma design)
 * @param {string} status - The status string
 * @returns {string} Tailwind color class
 */
export function getStatusColor(status) {
  const colorMap = {
    'Baby Unicorn': 'bg-yellow-100 text-yellow-700', // Light yellow with dark yellow/orange text
    'Mature Unicorn': 'bg-green-100 text-green-800',
    'Old Unicorn': 'bg-purple-100 text-purple-800'
  }
  return colorMap[status] || 'bg-gray-100 text-gray-800'
}

/**
 * Gets the emoji for status badge
 * @param {string} status - The status string
 * @returns {string} Emoji
 */
export function getStatusEmoji(status) {
  const emojiMap = {
    'Baby Unicorn': '👶',
    'Mature Unicorn': '🦄',
    'Old Unicorn': '👴'
  }
  return emojiMap[status] || '❓'
}


