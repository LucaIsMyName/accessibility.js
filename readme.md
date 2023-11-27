# accessibility.js

## installation

Place this Script Tag in the <head> or under the closing <body> tag

```
<script src="path/to/acessibility.js" defer></script>
```

accssibility.js now scans for the following things and will report:
- any image or svg with a missing or empty alt attribute
- any <button> element without or with an empty title attribute
- any font that has a computed size under 12px