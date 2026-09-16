import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import PostCard from "../PostCard";

describe("PostCard", () => {
  it("renders post information and read more link", () => {
    const post = {
      id: "123",
      title: "Test Post",
      description: "This is a test description",
    };

    render(
      <BrowserRouter>
        <PostCard post={post} />
      </BrowserRouter>
    );

    expect(screen.getByText("Test Post")).toBeInTheDocument();

    expect(
      screen.getByText("This is a test description")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Read More")
    ).toBeInTheDocument();
  });
});