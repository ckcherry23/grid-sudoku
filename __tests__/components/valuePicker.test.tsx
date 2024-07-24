import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import ValuePicker from "@/components/sudoku/valuePicker";

describe("ValuePicker", () => {
  const mockSetValue = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all value buttons and erase button", () => {
    render(
      <ValuePicker value={null} setValue={mockSetValue} isDisabled={false} />,
    );

    // Check if all value buttons are rendered
    for (let i = 1; i <= 9; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }

    // Check if erase button is rendered
    expect(screen.getByRole("button", { name: /Erase/i })).toBeInTheDocument();
  });

  it("disables all buttons when isDisabled is true", () => {
    render(<ValuePicker value={1} setValue={mockSetValue} isDisabled={true} />);

    // Check if all value buttons are disabled
    for (let i = 1; i <= 9; i++) {
      expect(screen.getByText(i.toString())).toHaveClass(
        "bg-gray-300 text-gray-400",
      );
    }

    // Check if erase button is disabled
    expect(screen.getByRole("button", { name: /Erase/i })).toHaveClass(
      "bg-gray-300 text-gray-400",
    );
  });

  it("calls setValue with correct value when a value button is clicked", () => {
    render(
      <ValuePicker value={null} setValue={mockSetValue} isDisabled={false} />,
    );

    const button = screen.getByText("5");
    fireEvent.click(button);

    expect(mockSetValue).toHaveBeenCalledWith(5);
  });

  it("calls setValue with null when erase button is clicked and is not disabled", () => {
    render(
      <ValuePicker value={5} setValue={mockSetValue} isDisabled={false} />,
    );

    const eraseButton = screen.getByRole("button", { name: /Erase/i });
    fireEvent.click(eraseButton);

    expect(mockSetValue).toHaveBeenCalledWith(null);
  });

  it("does not call setValue when value button is clicked and isDisabled is true", () => {
    render(
      <ValuePicker value={null} setValue={mockSetValue} isDisabled={true} />,
    );

    const button = screen.getByText("5");
    fireEvent.click(button);

    expect(mockSetValue).not.toHaveBeenCalled();
  });

  it("does not call setValue when erase button is clicked and isDisabled is true", () => {
    render(<ValuePicker value={5} setValue={mockSetValue} isDisabled={true} />);

    const eraseButton = screen.getByRole("button", { name: /Erase/i });
    fireEvent.click(eraseButton);

    expect(mockSetValue).not.toHaveBeenCalled();
  });

  it("renders the selected value button with the default variant", () => {
    render(
      <ValuePicker value={5} setValue={mockSetValue} isDisabled={false} />,
    );

    // Check if the button for value 5 has the 'default' variant class
    expect(screen.getByText("5")).toHaveClass(
      "bg-primary text-primary-foreground",
    );
  });

  it("renders other value buttons with the 'secondary' variant", () => {
    render(
      <ValuePicker value={5} setValue={mockSetValue} isDisabled={false} />,
    );

    for (let i = 1; i <= 9; i++) {
      if (i !== 5) {
        expect(screen.getByText(i.toString())).toHaveClass(
          "bg-secondary text-secondary-foreground",
        );
      }
    }
  });

  it("renders the value buttons with the 'secondary' variant when value is null", () => {
    render(
      <ValuePicker value={null} setValue={mockSetValue} isDisabled={false} />,
    );

    for (let i = 1; i <= 9; i++) {
      expect(screen.getByText(i.toString())).toHaveClass(
        "bg-secondary text-secondary-foreground",
      );
    }
  });

  it("renders the erase button with the 'secondary' variant", () => {
    render(
      <ValuePicker value={5} setValue={mockSetValue} isDisabled={false} />,
    );

    expect(screen.getByRole("button", { name: /Erase/i })).toHaveClass(
      "bg-secondary text-secondary-foreground",
    );
  });

  it("renders the erase button as disabled when value is null", () => {
    render(
      <ValuePicker value={null} setValue={mockSetValue} isDisabled={false} />,
    );

    expect(screen.getByRole("button", { name: /Erase/i })).toHaveClass(
      "bg-gray-300 text-gray-400",
    );
  });
});
