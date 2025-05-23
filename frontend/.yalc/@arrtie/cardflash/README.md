<!-- @format -->

# Project README

## Getting Started

This template uses Vite, Typescript, Preact, and Vitest.

### Development

> this project is setup to run within a [Devcontainer](https://code.visualstudio.com/docs/devcontainers/tutorial)

To start the development server on port 9000:

```bash
npm run dev
```

Or run in debug mode within VSCode's side bar

- click `Run and Debug`
- from the dropdown select `Debug Session`
- click the play button (green triangle)

This will make the application available at <http://localhost:9000> and accessible on your local network.

### Building

To create a production build:

```bash
npm run build
```

This command runs TypeScript compilation first, then builds the project with Vite.

### Preview

To preview the production build locally:

```bash
npm run preview
```

### Testing

The project uses Vitest for testing. To run tests in watch mode:

```bash
npm run test
```

For CI environments or one-time test runs:

```bash
npm run test:ci
```
