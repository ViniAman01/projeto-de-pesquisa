const wiki = document.querySelector("#mw-content-text");
const article = document.querySelector("article");


if (article || wiki) {
  if (article) {
    text = article.textContent;
  }
  if (wiki) {
    text = wiki.textContent;
  }
  const wordMatchRegExp = /[^\s]+/g; // Regular expression
  const words = text.matchAll(wordMatchRegExp);
  const wordCount = [...words].length;
  const readingTime = Math.round(wordCount / 200);
  const badge = document.createElement("p");

  badge.classList.add("color-secondary-text", "type--caption");
  badge.textContent = `⏱️ ${readingTime} min read`;
  console.log(readingTime);

  if (article) {
    const date = article.querySelector("time")?.parentNode;
    const heading = article.querySelector("h1");
    (date ?? heading).insertAdjacentElement("afterend", badge);
  }
  if (wiki) {
    wiki.insertAdjacentElement("beforebegin", badge);
  }
}
