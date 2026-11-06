# ፊደል ጨዋታ · Fidel Game

A kids' game for learning the Ge'ez (Ethiopic) alphabet. It works offline on PCs and Android tablets.

- **Learn**: each letter family with its 7 forms and their sounds
- **Find the letter**, **What sound?**, **Memory match**: practice games with stars and unlockable levels
- **Voices**: a voice picker (🔊 at the top) with Normal, Bird, Cat, Bear, Lion and Surprise character voices made from the same recordings
- **Numbers**: Ge'ez numbers ፩ to ፼ with spoken Amharic words, plus a number quiz
- **Songs**: two sing-along songs (የፊደል ደስታ and የፊደል ቤተሰብ) with lyrics shown one line at a time over an Ethiopian highlands scene, with things labelled by their Amharic word and balloons carrying the letters being sung. "Fix timing" lets a grown-up tap along once to make the lyric timing exact.

Letter and number voices were recorded with Narakeet.

## Play
- **Online / install on a tablet:** open the GitHub Pages link in Chrome, then use the menu and tap "Add to Home screen". After the first visit it works with no internet.
- **PC without internet:** download this repo and open `index.html` in Chrome or Edge.

Progress is saved on each device.

## Family app (`/app`)

A second version of the game at `/app/` with family accounts:

- **Parent account** with email and password (Firebase), password reset, and a 4-digit PIN for the parent page. Or "this device only" with no email.
- **Child profiles**, each with their own stars, stickers and letter progress, synced across tablets when online.
- **Parent page**: a progress grid of all 238 letters, tricky letters, which games each child can play, voice lock, sound effects, daily time limit, open all levels.
- **New games**: journey map across Ethiopia with stickers, trace the letter, balloon pop, build a word, picture words in Learn, smart review.

Firestore security rules (Firebase console → Firestore → Rules):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /families/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```
