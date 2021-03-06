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
      const data = json.map((r) => {
        const { unicode_version, ios_version, ...rest } = r;
        return rest;
      });
      return writeData(data, "gemoji").then(() => json);
    })
    .then((json) => {
      const aliasLookup = json.flatMap((r, i) =>
        r.aliases.map((a) => [a, r.emoji, i])
      );
      return writeData(aliasLookup, "alias_lookup").then(() => json);
    })
    .then((json) => {
      const categoryLookup = json.reduce((prev, cur, index) => {
        const category = cur.category;
        if (!prev[category]) {
          prev[category] = [];
        }
        prev[category].push(index);

        return prev;
      }, {});

      return writeData(categoryLookup, "category_lookup").then(() => json);
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
