
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

export function getStatusColor(status) {
  const colorMap = {
    'Baby Unicorn': 'bg-yellow-100 text-yellow-700',
    'Mature Unicorn': 'bg-green-100 text-green-800',
    'Old Unicorn': 'bg-purple-100 text-purple-800'
  }
  return colorMap[status] || 'bg-gray-100 text-gray-800'
}

export function getStatusEmoji(status) {
  const emojiMap = {
    'Baby Unicorn': '👶',
    'Mature Unicorn': '🦄',
    'Old Unicorn': '👴'
  }
  return emojiMap[status] || '❓'
}


