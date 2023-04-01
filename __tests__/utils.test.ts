import {describe, expect, test} from '@jest/globals'

import {nextVersion, parseVersion} from '../src/utils'

describe('parseVersion', () => {
  test('parses valid godot versions', () => {
    expect(parseVersion('3.5.2')).toEqual({
      major: 3,
      minor: 5,
      patch: 2,
      label: ''
    })

    expect(parseVersion('4.0.0-beta1')).toEqual({
      major: 4,
      minor: 0,
      patch: 0,
      label: 'beta1'
    })

    expect(parseVersion('4.0.0-beta.16')).toEqual({
      major: 4,
      minor: 0,
      patch: 0,
      label: 'beta.16'
    })
  })
})

describe('nextVersion', () => {
  test('bumps major', () => {
    expect(
      nextVersion(parseVersion('1.0.0'), parseVersion('4.0.0-rc.1'), 'major')
    ).toEqual('2.0.0-godot4.0.0-rc.1')

    expect(
      nextVersion(parseVersion('1.0.0'), parseVersion('4.0.0'), 'major')
    ).toEqual('2.0.0')

    expect(
      nextVersion(
        parseVersion('1.0.0-label'),
        parseVersion('4.0.0-beta.16'),
        'major'
      )
    ).toEqual('2.0.0-godot4.0.0-beta.16')
  })

  test('bumps minor', () => {
    expect(
      nextVersion(parseVersion('1.0.0'), parseVersion('4.0.0-rc.1'), 'minor')
    ).toEqual('1.1.0-godot4.0.0-rc.1')

    expect(
      nextVersion(parseVersion('1.0.0'), parseVersion('4.0.0'), 'minor')
    ).toEqual('1.1.0')

    expect(
      nextVersion(
        parseVersion('1.0.0-label'),
        parseVersion('4.0.0-beta.16'),
        'minor'
      )
    ).toEqual('1.1.0-godot4.0.0-beta.16')
  })

  test('bumps patch', () => {
    expect(
      nextVersion(parseVersion('1.0.0'), parseVersion('4.0.0-rc.1'), 'patch')
    ).toEqual('1.0.1-godot4.0.0-rc.1')

    expect(
      nextVersion(parseVersion('1.0.0'), parseVersion('4.0.0'), 'patch')
    ).toEqual('1.0.1')

    expect(
      nextVersion(
        parseVersion('1.0.0-label'),
        parseVersion('4.0.0-beta.16'),
        'patch'
      )
    ).toEqual('1.0.1-godot4.0.0-beta.16')
  })
})
