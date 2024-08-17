// Hash the string to get a numeric value
function hashCode(s: string) {
  return s
    .toLowerCase()
    .split('')
    .reduce((acc, char) => {
      acc = (acc << 5) - acc + char.charCodeAt(0);
      return acc & acc;
    }, 0);
}

// Convert the hash to a valid hex color
function intToRGB(i: number) {
  const c = (i & 0x00ffffff).toString(16).toUpperCase();
  return '#' + '00000'.substring(0, 6 - c.length) + c;
}

// Calculate contrast between background and text colors
function getContrastYIQ(hexColor: string) {
  const r = parseInt(hexColor.substring(1, 3), 16);
  const g = parseInt(hexColor.substring(3, 5), 16);
  const b = parseInt(hexColor.substring(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? '#000000' : '#FFFFFF';
}

export function stringToColorPair(str: string) {
  // Generate background color from string hash
  const hash = hashCode(str);
  const backgroundColor = intToRGB(hash);

  // Determine appropriate text color
  const textColor = getContrastYIQ(backgroundColor);

  return { backgroundColor, textColor };
}
