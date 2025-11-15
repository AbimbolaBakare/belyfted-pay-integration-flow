import "@testing-library/jest-dom";

// Extend Jest matchers with @testing-library/jest-dom
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
    }
  }
}

