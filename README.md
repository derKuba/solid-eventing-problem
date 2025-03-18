# solid-eventing-problem

`event.target.value` is `undefined` in recent versions of Solid

## Description

When typing into the input field in this repository, `event.target.value` always logs as `undefined`. However, if I uninstall the current Solid version (`solid-js@1.9.5`) and install an older version (`solid-js@1.8.23`), it works as expected and logs the correct value.

## Steps to Reproduce

1. Clone this repo and run `npm install`.
2. Run `npm run dev` to start the development server.
3. Open the application in your browser and type something into the input field.
4. Check the console log – observe that `event.target.value` is `undefined`.

   **Now, switching versions**:

5. Run `npm uninstall solid-js`.
6. Run `npm install solid-js@1.8.23`.
7. Start the app again and type into the input field.
8. Check the console log – now `event.target.value` correctly shows the typed text.

## Expected Behavior

`event.target.value` should return the value currently typed in the input field, regardless of the Solid version.

## Actual Behavior

`event.target.value` is `undefined` in newer Solid versions (e.g., 1.9.5), but works correctly when using Solid 1.8.23.

## Environment

- **Solid version**: 1.9.5 (broken), 1.8.23 (working)
- **Browser**: [e.g., Chrome, Firefox]
- **Operating System**: [e.g., Windows 11, macOS 13]

## Additional Context

- There might be a regression or a changed approach in how events are handled in newer versions of Solid.
- If there's a recommended alternative (e.g., using `event.currentTarget.value`), that would be helpful to know.

Thank you for your help! Let me know if additional information would be useful.
