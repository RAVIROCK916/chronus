/**
 * Generates a random avatar URL using DiceBear's identicon API
 * @param seed Optional seed for consistent avatar generation
 * @returns A URL to a random DiceBear identicon avatar
 */

export function getRandomAvatar(seed?: string): string {
  // Generate a random seed if none provided
  const avatarSeed = seed || Math.random().toString(36).substring(2, 10);

  // Use DiceBear's identicon API
  return `https://api.dicebear.com/9.x/identicon/svg?seed=${avatarSeed}`;
}

/**
 * Get a random avatar from DiceBear with different styles
 * @param style The style of avatar to generate (default: 'identicon')
 * @returns A URL to a random DiceBear avatar
 */

export function getRandomStyledAvatar(style: string = "identicon"): string {
  // Available styles: 'identicon', 'avataaars', 'bottts', 'initials', 'pixel-art', etc.
  const validStyles = [
    "avataaars",
    "bottts",
    "identicon",
    "initials",
    "notionists",
    "pixel-art",
    "personas",
  ];

  // Validate style or default to identicon
  const avatarStyle = validStyles.includes(style) ? style : "identicon";

  // Generate a random seed
  const seed = Math.random().toString(36).substring(2, 10);

  // Return the DiceBear URL with the specified style
  return `https://api.dicebear.com/9.x/${avatarStyle}/svg?seed=${seed}`;
}
