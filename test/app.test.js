import { render, fireEvent, cleanup } from "@testing-library/svelte";
import { describe, it, expect, afterEach, vi } from "vitest";

vi.mock("html2canvas", () => ({
  default: vi.fn(() =>
    Promise.resolve({
      toDataURL: () => "data:image/png;base64,alpaca",
    })
  ),
}));

import App from "../src/App.svelte";

describe("App.svelte", () => {
  afterEach(() => cleanup());

  it("keeps style selected after repeated clicks", async () => {
    const { getByText } = render(App);
    const styleButton = getByText("Default");

    await fireEvent.click(styleButton);
    await fireEvent.click(styleButton);

    expect(styleButton.style.backgroundColor).toBe("blue");
  });

  it("updates the rendered hair image when selecting a new style", async () => {
    const { container, getByText } = render(App);
    const hairImage = container.querySelector('img[alt="hair"]');
    expect(hairImage?.getAttribute("src")).toContain("/alpaca/hair/default.png");

    const curlsButton = getByText("Curls");
    await fireEvent.click(curlsButton);

    expect(container.querySelector('img[alt="hair"]').getAttribute("src")).toContain(
      "/alpaca/hair/curls.png"
    );

    await fireEvent.click(curlsButton);

    expect(container.querySelector('img[alt="hair"]').getAttribute("src")).toContain(
      "/alpaca/hair/curls.png"
    );
  });
});
