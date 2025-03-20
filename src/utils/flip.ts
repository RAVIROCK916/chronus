export function flip(flipCard: Element, newNumber: number) {
  const topHalf = flipCard.querySelector(".top");
  const bottomHalf = flipCard.querySelector(".bottom");
  if (!topHalf || !bottomHalf) return;

  const startNumber = Number(topHalf.textContent!);

  if (startNumber === newNumber) return;

  const topFlip = document.createElement("div");
  topFlip.classList.add("top-flip");
  const bottomFlip = document.createElement("div");
  bottomFlip.classList.add("bottom-flip");

  if (bottomHalf) {
    bottomHalf.textContent = startNumber.toString();
  }

  topFlip.textContent = startNumber.toString();
  bottomFlip.textContent = newNumber.toString();

  topFlip.addEventListener("animationstart", (e) => {
    if (topHalf) {
      topHalf.textContent = newNumber.toString();
    }
  });
  topFlip.addEventListener("animationend", (e) => {
    topFlip.remove();
  });
  bottomFlip.addEventListener("animationend", (e) => {
    if (bottomHalf) {
      bottomHalf.textContent = newNumber.toString();
    }
    bottomFlip.remove();
  });

  flipCard.append(topFlip, bottomFlip);
}

export function flipAllCards(time: number) {
  const seconds = time % 60;
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600) % 12;

  flip(document.querySelector("[data-hours-tens]")!, Math.floor(hours / 10));
  flip(document.querySelector("[data-hours-ones]")!, hours % 10);
  flip(
    document.querySelector("[data-minutes-tens]")!,
    Math.floor(minutes / 10),
  );
  flip(document.querySelector("[data-minutes-ones]")!, minutes % 10);
  flip(
    document.querySelector("[data-seconds-tens]")!,
    Math.floor(seconds / 10),
  );
  flip(document.querySelector("[data-seconds-ones]")!, seconds % 10);
}
