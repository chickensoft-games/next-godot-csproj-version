# 🖨 Next Godot C# Project Version

[![Chickensoft Badge][chickensoft-badge]][chickensoft-website] [![Discord][discord-badge]][discord] [![Read the docs][read-the-docs-badge]][docs]

Compute the next version of a C# project based on its current version, the version of Godot it is using, and a version bump method (major, minor, or patch).

The version returned by this action will be bumped according to the version bump strategy. If the supplied Godot version is a prerelease version, this version will receive a corresponding prerelease label suffix showing which Godot prerelease version it uses. Stable versions do not have a Godot prerelease label suffix, as nuget would not recognize them as a stable version if they did.

The Godot version can be inferred from the project's `global.json` file by specifying `global` or `global.json` as the `godot-version` input. If the `global.json` file is not found, the action will fail.

The next computed version will be set as an output for the step as `version`.

This is used by [GodotPackage] to help automate releases for C# nuget package projects using Godot.

## Inputs

See [action.yml][action] for the complete guide to all of the action's inputs.

[chickensoft-badge]: https://raw.githubusercontent.com/chickensoft-games/chickensoft_site/main/static/img/badges/chickensoft_badge.svg
[chickensoft-website]: https://chickensoft.games
[discord-badge]: https://raw.githubusercontent.com/chickensoft-games/chickensoft_site/main/static/img/badges/discord_badge.svg
[discord]: https://discord.gg/gSjaPgMmYW
[read-the-docs-badge]: https://raw.githubusercontent.com/chickensoft-games/chickensoft_site/main/static/img/badges/read_the_docs_badge.svg
[docs]: https://chickensoft.games/docs

[action]: ./action.yml
[GodotPackage]: https://github.com/chickensoft-games/GodotPackage
