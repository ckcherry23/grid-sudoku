import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import CellBox from "@/components/sudoku/cellBox";
import type {
  BorderType,
  CellState,
  FillType,
  HighlightType,
} from "@/types/types";
import type { PossibleValue } from "@/types/types";

describe("CellBox", () => {
  const defaultProps = {
    value: 5 as PossibleValue,
    onClick: vi.fn(),
    cellState: {
      fillType: "initial",
      highlightType: "none",
      borderTypes: ["default"],
    } as CellState,
  };

  it("renders correctly with default props", () => {
    render(<CellBox {...defaultProps} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("5");
    expect(button).toHaveClass(
      "text-black",
      "border-[0.5px]",
      "border-gray-300",
    );
  });

  it("calls onClick when clicked", () => {
    render(<CellBox {...defaultProps} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it("applies the correct fill variant class", () => {
    const props = {
      ...defaultProps,
      cellState: {
        ...defaultProps.cellState,
        fillType: "valid" as FillType,
      },
    };
    render(<CellBox {...props} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("text-sky-700");
  });

  it("applies the correct highlight variant class", () => {
    const props = {
      ...defaultProps,
      cellState: {
        ...defaultProps.cellState,
        highlightType: "selected" as HighlightType,
      },
    };
    render(<CellBox {...props} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-sky-200");
  });

  it("applies multiple border styles", () => {
    const props = {
      ...defaultProps,
      cellState: {
        ...defaultProps.cellState,
        borderTypes: [
          "topLeftCorner",
          "topEdge",
          "leftEdge",
        ] as Array<BorderType>,
      },
    };
    render(<CellBox {...props} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "rounded-tl-2xl",
      "border-t",
      "border-l",
      "border-t-gray-400",
      "border-l-gray-400",
    );
  });

  it("renders correctly with an invalid fill variant", () => {
    const props = {
      ...defaultProps,
      cellState: {
        ...defaultProps.cellState,
        fillType: "invalid" as FillType,
      },
    };
    render(<CellBox {...props} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("text-red-500");
  });

  it("renders correctly with sameValue highlight variant", () => {
    const props = {
      ...defaultProps,
      cellState: {
        ...defaultProps.cellState,
        highlightType: "sameValue" as HighlightType,
      },
    };
    render(<CellBox {...props} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-sky-100");
  });
});
