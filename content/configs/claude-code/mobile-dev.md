---
title: "Mobile Developer"
description: "CLAUDE.md for React Native and Expo mobile development with TypeScript."
author: "uumax"
authorGithub: "lalawgwg99"
framework: "claude-code"
useCases: ["mobile", "frontend"]
tags: ["react-native", "expo", "typescript", "mobile", "ios", "android"]
pricing: "free"
configType: "claude-md"
includes: ["CLAUDE.md"]
version: "1.0.0"
lastUpdated: "2026-03-22"
featured: false
---

## Overview

This config optimizes Claude Code for React Native and Expo mobile development. It enforces platform-aware patterns, proper navigation structure, and performance practices critical for mobile apps.

## The Config

```markdown
# CLAUDE.md — Mobile Developer (React Native)

## Tech Stack
- Framework: React Native 0.76+ with New Architecture enabled
- Tooling: Expo SDK 52, Expo Router v4 (file-based routing)
- Language: TypeScript strict mode
- Styling: NativeWind v4 (Tailwind for React Native)
- State: Zustand for global state, React Query for server state
- Storage: expo-secure-store (sensitive), MMKV (general persistence)
- Navigation: Expo Router with typed routes

## Architecture
- Feature-based folder structure under `src/features/`
- Shared UI components in `src/components/`
- API layer in `src/api/` with React Query hooks
- Platform-specific files: `*.ios.ts` / `*.android.ts` only when necessary

## Component Patterns
- Functional components only, no class components
- Use `StyleSheet.create()` when NativeWind is insufficient
- Pressable over TouchableOpacity (better accessibility + feedback)
- Always set `accessibilityLabel` and `accessibilityRole` on interactive elements
- Keep FlatList renderItem as a memoized component to prevent re-renders
- Use `FlashList` from Shopify for lists over 100 items

## Navigation
- Use Expo Router file-based routing in `app/` directory
- Layouts: `_layout.tsx` for stack/tab configuration
- Type-safe navigation with `useLocalSearchParams<T>()`
- Deep linking: define scheme in app.json, test on both platforms
- Modals: use `presentation: "modal"` in route options

## Performance
- Avoid anonymous functions in JSX props (causes re-renders)
- Use `React.memo` for list items and expensive components
- Lazy-load screens with React.lazy + Suspense
- Images: use expo-image (not Image from RN), specify width/height
- Animations: use Reanimated 3 with shared values, run on UI thread
- Never block the JS thread with synchronous operations

## Platform Considerations
- Test on both iOS and Android before marking tasks complete
- Use `Platform.select()` for small differences
- Safe area: always wrap screens with `SafeAreaView` or use `useSafeAreaInsets()`
- Keyboard: use `KeyboardAvoidingView` with `behavior="padding"` on iOS
- Handle notch, dynamic island, and bottom bar insets

## Testing
- Unit tests: Vitest + @testing-library/react-native
- E2E: Maestro for critical flows (login, onboarding, purchase)
- Test on real devices before release, not just simulators

## Build & Release
- Use EAS Build for CI/CD
- Environment configs via `app.config.ts` (not hardcoded)
- OTA updates with expo-updates for JS-only changes
- Version bump: follow semver in app.json
```

## Usage

1. Save as `CLAUDE.md` in your Expo / React Native project root
2. Claude Code will generate platform-aware mobile code following these patterns
3. Combine with the Test Engineer config for comprehensive mobile testing
