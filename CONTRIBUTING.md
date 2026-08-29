# Contributing to Aegis

Thank you for your interest in contributing to Aegis! This document provides guidelines and information for contributors.

## Getting Started

1. **Fork the repository** — Click the Fork button on GitHub
2. **Clone your fork** — `git clone https://github.com/your-username/aegis.git`
3. **Install dependencies** — See [README.md](README.md) for setup instructions
4. **Create a branch** — `git checkout -b feature/your-feature-name`
5. **Make your changes** — Follow the code style guidelines below
6. **Test your changes** — Run `forge test` for contracts and `npm run build` for the web app
7. **Commit your changes** — Use descriptive commit messages
8. **Push to your fork** — `git push origin feature/your-feature-name`
9. **Open a Pull Request** — Describe your changes and link any related issues

## Development Setup

### Prerequisites

- Node.js 18+
- Foundry (for smart contracts)
- npm or yarn

### Smart Contracts

```bash
cd apps/contracts
forge install
forge build
forge test
```

### Web Application

```bash
cd apps/web
npm install
npm run dev
```

## Code Style

### TypeScript/React

- Use TypeScript for all new files
- Follow existing patterns in the codebase
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### Solidity

- Follow the [Solidity Style Guide](https://docs.soliditylang.org/en/latest/style-guide.html)
- Use NatSpec comments for all public functions
- Keep functions focused and small
- Write tests for all new functionality

## Pull Request Guidelines

- **One feature per PR** — Keep pull requests focused
- **Write clear descriptions** — Explain what changed and why
- **Include tests** — Add or update tests for your changes
- **Update documentation** — Update README if needed
- **No breaking changes** — Discuss in an issue first

## Reporting Bugs

1. Check existing issues to avoid duplicates
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

## Feature Requests

1. Check existing issues and discussions
2. Create a new issue with:
   - Clear description of the feature
   - Use case / why it's needed
   - Any implementation ideas

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

## Contact

For questions, reach out to sithunyein.mailto@gmail.com
