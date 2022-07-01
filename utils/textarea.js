export function fitHeight(element, borderWidth = 1) {
  element.style.height = "1px";
  element.style.height = borderWidth * 2 + element.scrollHeight + "px";
}
