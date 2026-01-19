import { describe, it, expect } from "vitest";
import Login from "../pages/Login";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("Login component", () => {
  it("Should render de component succesfully", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const emailInput = screen.getByPlaceholderText(/Email/i);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText(/Password/i);
    expect(passwordInput).toBeInTheDocument();

    const sendButton = screen.getByRole("button", { name: /send/i });
    expect(sendButton).toBeInTheDocument();
  });
});
