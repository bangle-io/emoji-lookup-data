"use strict";
const fs = require("fs/promises");
const fetch = require("node-fetch");
const path = require("path");
const version = "v4.0.0.rc2";
const url = `https://raw.githubusercontent.com/github/gemoji/${version}/db/emoji.json`;

main();

function charAndDescription(emojiObj) {
  return [emojiObj.emoji, emojiObj.description];
}

function categories(emojiObj) {
  return emojiObj.categories;
}

// it appears aliases are unique
function aliases(emojiObj) {
  return emojiObj.aliases;
}

function tags(emojiObj) {
  return emojiObj.tags;
}

function writeData(obj, fileName) {
  return fs.writeFile(
    path.join(".", "data", fileName + ".json"),
    JSON.stringify(obj),
    "utf-8"
  );
}

function main() {
  return fetch(url)
    .then((res) => res.json())
    .then((json) => {
      const aliasLookup = json.flatMap((r, i) =>
        r.aliases.map((a) => [a, r.emoji, i])
      );
      return writeData(aliasLookup, "alias-lookup").then(() => json);
    })
    .then((json) => {
      const keys = [
        "emoji",
        "description",
        "category",
        "aliases",
        "tags",
        "unicode_version",
        "ios_version",
        "skin_tones",
      ];
      let indices = {};
      return Promise.all(
        keys.map((key) => {
          const data = json.map((r) => r[key]);
          return writeData(data, key);
        })
      );
    });
}
