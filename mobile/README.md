# ፊደል ጨዋታ · Fidel Game (React Native + Expo)

The same kids' Ge'ez alphabet game as the web version at the repo root, built as a phone and tablet app
with React Native and Expo. Everything is bundled inside the app, so it works with no internet.

What's in it, same as the web game:
- **Letters**: Learn, Find the letter, What sound? and Memory match, 9 levels, stars saved on the device
- **Voices**: Normal, Bird, Cat, Bear, Lion and Surprise character voices made from the same recordings
- **Numbers**: Learn numbers (፩ to ፼ and the tens + ones builder) and the Number quiz
- **Songs**: የፊደል ደስታ and የፊደል ቤተሰብ with line-by-line lyrics over the highlands scene, plus "Fix timing"

## Run it

```bash
cd mobile
npm install
npx expo start        # scan the QR code with Expo Go on a phone or tablet
```

## Build an app to install (Android APK / iOS)

```bash
npx eas-cli@latest build --profile preview --platform android   # an APK you can install directly
npx eas-cli@latest build --platform ios
```

`eas.json` has a `preview` profile that makes an installable Android APK.

## Where things are

| Path | What |
| --- | --- |
| `App.tsx` | Header, voice picker, screen switching, end-of-round stars |
| `src/screens/` | Home, Learn, Quiz (letters and numbers), Memory, NumLearn, Song, Result |
| `src/scene/Scene.tsx` | The animated highlands scene behind the songs |
| `src/data/` | Fidel families and sounds, levels, numbers, song lyrics and timing |
| `src/audio/sound.ts` | Plays letter and number clips (with character voices) and game sounds |
| `src/audio/clips.ts` | Generated list of every recording; run `npm run gen:audio` after changing `../audio` |
| `assets/sfx/` | Game beeps, made by `npm run gen:sfx` |

The recordings are not copied: the app uses `../audio` and `../songs`, the same files as the web version,
so a re-recorded letter only needs swapping once. `metro.config.js` lets the bundler read the parent folder.

Letters use the bundled Noto Sans Ethiopic font so they look the same on every device.
