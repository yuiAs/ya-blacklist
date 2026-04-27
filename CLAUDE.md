# Project Guidelines

## Coding Style

### General Rules

- Always use TypeScript with strict mode
- Prefer `const` over `let`; avoid `var`
- Use async/await over Promise chains
- Use meaningful variable and function names

## Commit Strategy

### Commit Conventions

- Keep commits focused and atomic
- Write clear commit messages using Conventional Commits (https://www.conventionalcommits.org/en/v1.0.0/) style
- Use clear language, primarily English
- The subject SHOULD BE written in English whenever possible
- In the description, briefly explain the motivation for the change, not a line-by-line summary
- If you ask a user for a JIRA ticket or GitHub Issue number and receive a meaningful response, include `Refs: <Ticket>` in the footer (e.g., if no string is returned, there is no need to include it)

## Branch Strategy

- main: For Production. DO NOT PUSH DIRECTORY.
- feature/<short-description>: Feature Developments
- fix/<short-description>: Bug Fixes
- bugfix/<short-description>: Bug Fixes (same as fix)
- release/<version>: Release Candidates. MUST BE REQURIED PR.

Create these branches from the main branch unless otherwise instructed.  
For example, fix branches for specific feature branches do not need to be create from develop.

## PR (Pull Request) Strategy

- Write subjects using Conventional Commits (https://www.conventionalcommits.org/en/v1.0.0/) style.
- All descriptions should be written in Japanese by default
