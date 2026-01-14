⚠️ Firestore rules set to permissive for development

This repository now contains a permissive Firestore rules file (`firestore.rules`) that allows all reads/writes. This is INSECURE and should only be used temporarily during development.

How to publish the rules using the Firebase Console
1. Open Firebase Console → Firestore Database → Rules.
2. Replace current rules with the contents of `firestore.rules` and click **Publish**.

How to publish using Firebase CLI
1. Install and login (if not already):
   - `npm install -g firebase-tools`
   - `firebase login`
2. Deploy rules:
   - `firebase deploy --only firestore:rules`

Recommended follow-up
- Revert to stricter rules before deploying to production (example: `allow read, write: if request.auth != null;`).
- If you want, I can implement more restrictive rules that allow only the event creator to edit their event.
