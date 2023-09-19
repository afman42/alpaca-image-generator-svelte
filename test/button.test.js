import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/svelte";
import Buttons from "../src/lib/Buttons.svelte";
import { expect, describe, it, afterEach } from "vitest";

describe("Buttons.svelte", () => {
  afterEach(() => cleanup());

  it("mounts", () => {
    const { container } = render(Buttons);
    expect(container).toBeTruthy();
  });

  it("add props text", () => {
    render(Buttons, { props: { text: "submit" } });
    const text = screen.getByText("submit");
    expect(text.innerHTML).toBe("submit");
  });

  it("hover button", async () => {
    render(Buttons, { text: "submit", activeStyle: true });
    const txt = screen.getByText("submit");
    fireEvent.mouseOver(txt);

    await waitFor(() => screen.getByTestId("button"));
    expect(getComputedStyle(txt).color).toEqual("rgb(255, 255, 255)");
    expect(getComputedStyle(txt).backgroundColor).toBe("rgb(0, 0, 255)");
    expect(txt.innerHTML).toBe("submit");
  });
});
