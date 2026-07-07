---
"landing": patch
---

Enable `noImplicitReturns` in `tsconfig.json`. Every function in the project already returns consistently on all code paths, so this is a no-op today — it guards against a real future bug class where one branch of a function returns a value and another falls off the end returning `undefined` implicitly, which `tsc` otherwise never flags.
