import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import App from "./App";

// Mock AppHeader
jest.mock("./components/Header", () => () => <header>Mock AppHeader</header>);

describe("App Component", () => {
  test("renders AppHeader", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Verify that the header renders
    expect(screen.getByText("Mock AppHeader")).toBeInTheDocument();
  });

  test("renders child route content in the Outlet", () => {
    render(
      <MemoryRouter initialEntries={["/child-route"]}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="child-route" element={<div>Child Route Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    // Verify that the header renders
    expect(screen.getByText("Mock AppHeader")).toBeInTheDocument();

    // Verify that the child route content renders in the Outlet
    expect(screen.getByText("Child Route Content")).toBeInTheDocument();
  });
});
