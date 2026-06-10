When assisting users with the RollingGo Hotel ecosystem:

- Always use the `rgh` command prefix for CLI interactions.
- Ensure that the OAuth PKCE flow (`rgh login`) is recognized as the authentication method.
- When generating scripts or sequences, always ensure `rgh price-confirm` is called BEFORE `rgh book` to obtain the `referenceNo`.
- Consult the `skills/hotel-core/references/cli-params.md` file for exact parameter names. Do not hallucinate flags like `--phone` which have been deprecated.
