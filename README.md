## Digested Gemoji data

This library provides gemoji data broken into multiple JSON files. The idea here is to save bandwidth and only consume the field you need.

We use the following terminology in the schema:

- `Alias`: The unique text representation of the emoji. example: `cowboy_hat_face`
- `EmojiChar`: The emoji character, example:"🙎","🙎‍♂️","🙎‍♀️","🙅","🙅‍♂️"
- `EmojiIndex`: The number representing the index of the emoji in the `emoji.json` array.

### data/alias_lookup.json

Schema: `Array<[Alias, EmojiChar, EmojiIndex]>`

Unlike every other file, this array's indices _donot_ correspond to an emoji in `emoji.json`. To help with this lack of information, the third item of the nested array will always be the `EmojiIndex`.

### data/category_lookup.json

Schema: `Object<Category, Array<EmojiIndex>>`

An object with each key as the category and the value being the array of all emoji indices that fall in that category.

### data/emoji.json

Schema: `Array<EmojiChar>`

The emoji char. The index of item `EmojiIndex` is used in other files to do a reverse lookup.

### data/description.json

Schema: `Array<string>`

Description of the emoji. Each item in this file corresponds 1:1 to the emoji in `emoji.json`.

### data/category.json

Schema: `Array<string>`

The category of emoji. Each item in this file corresponds 1:1 to the emoji in `emoji.json`.

### data/aliases.json

Schema: `Array<Array<Alias>>`

The alias of emoji. Each item in this file corresponds 1:1 to the emoji in `emoji.json`.

### data/tags.json

Schema: `Array<Array<string>>`
The tags of emoji. Each item in this file corresponds 1:1 to the emoji in `emoji.json`.

### data/unicode_version.json

### data/ios_version.json

### data/skin_tones.json
