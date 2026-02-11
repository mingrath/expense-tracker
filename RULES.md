# Rules

## Code Style
- Use TypeScript strict mode
- Prefer functional components with arrow functions
- Use async/await, not raw promises
- Follow existing code style and naming conventions

## Patterns
- Use Zustand for all state management
- Tailwind CSS for all styling — no inline styles, no CSS modules
- Prefer composition over inheritance
- Keep components small and focused on a single responsibility

## Naming
- Components: PascalCase (e.g., `ExpenseForm`)
- Files: PascalCase for components, camelCase for utilities
- Types/interfaces: PascalCase
- Variables and functions: camelCase

## Avoid
- Class components
- Inline styles
- Adding unnecessary libraries — use what is already installed
- Any backend or API calls — this is a client-side only app

## Testing
- Validate forms before submission
- Handle edge cases (empty states, zero amounts)
