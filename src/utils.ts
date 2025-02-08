/** Semantic version representation */
export interface SemanticVersion {
  /** Version major number */
  major: number
  /** Version minor number */
  minor: number
  /** Version patch number */
  patch: number
  /** Pre-release label (e.g., `beta.16`) */
  label: string
}

/** Ways in which a version can be bumped. */
export type Bump = 'major' | 'minor' | 'patch'

/** Version label/ */
export type ReleaseType = 'dev' | 'alpha' | 'beta' | 'rc' | 'stable'

/**
 * Official semantic version regex, but permitting a leading "v" in accordance
 * with common Github conventions.
 * See https://semver.org
 */
const SEMANTIC_VERSION_REGEX =
  /^v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/

export function parseVersion(version: string): SemanticVersion {
  const match = version.match(SEMANTIC_VERSION_REGEX)
  if (match === null) {
    throw new Error(`⛔️ Invalid version: ${version}`)
  }

  const major = parseInt(match[1] || '')
  const minor = parseInt(match[2] || '')
  const patch = parseInt(match[3] || '')
  const label = match[4] || ''
  return {major, minor, patch, label}
}

/**
 * Computes the next version based on the current version, the Godot version,
 * and the version bump method. If the Godot version is a prerelease, the
 * version will be a prerelease as well. Otherwise, the version will be stable.
 *
 * While this approach limits custom prerelease tags, this is a useful
 * convention to follow when making packages designed to work with Godot and C#.
 *
 * @param projectVersion C# project version.
 * @param godotVersion Godot version.
 * @param bump How to bump the version.
 * @param releaseType What type of release this is.
 * @returns version The next version for the project.
 */
export function nextVersion(
  projectVersion: SemanticVersion,
  godotVersion: SemanticVersion,
  bump: Bump
): string {
  const isPrerelease = godotVersion.label && godotVersion.label !== ''

  let nextMajor = projectVersion.major
  let nextMinor = projectVersion.minor
  let nextPatch = projectVersion.patch

  switch (bump) {
    case 'major':
      nextMajor += 1
      nextMinor = 0
      nextPatch = 0
      break
    case 'minor':
      nextMinor += 1
      nextPatch = 0
      break
    case 'patch':
      nextPatch += 1
      break
  }

  let nextLabel = ''
  if (isPrerelease) {
    nextLabel =
      `-godot${godotVersion.major}.` +
      `${godotVersion.minor}.` +
      `${godotVersion.patch}-${godotVersion.label}`
  }

  return `${nextMajor}.${nextMinor}.${nextPatch}${nextLabel}`
}
