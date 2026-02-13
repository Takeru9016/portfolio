# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into your Next.js 16.1.6 App Router project. The integration includes client-side analytics initialization via the recommended `instrumentation-client.ts` approach, a reverse proxy configuration for improved tracking reliability, and custom event tracking across your component showcase.

## Files Created/Modified

| File | Change |
|------|--------|
| `instrumentation-client.ts` | Created - PostHog client-side initialization |
| `next.config.ts` | Modified - Added rewrites for PostHog reverse proxy |
| `src/components/component-example.tsx` | Modified - Added custom event tracking |
| `.env.local` | Modified - Added PostHog environment variables |

## Events Instrumented

| Event Name | Description | File |
|------------|-------------|------|
| `form_submitted` | User submits the user information form with name, role, framework, and comments | `src/components/component-example.tsx` |
| `dialog_opened` | User opens the alert dialog by clicking 'Show Dialog' button | `src/components/component-example.tsx` |
| `dialog_action_clicked` | User clicks 'Allow' action in the alert dialog (positive conversion action) | `src/components/component-example.tsx` |
| `dialog_cancelled` | User clicks 'Don't allow' in the alert dialog (rejection/churn indicator) | `src/components/component-example.tsx` |
| `theme_changed` | User changes the theme preference (light/dark/system) via dropdown menu | `src/components/component-example.tsx` |
| `role_selected` | User selects a role in the form (developer, designer, manager, other) | `src/components/component-example.tsx` |
| `framework_selected` | User selects a framework from the combobox options | `src/components/component-example.tsx` |
| `dropdown_menu_opened` | User opens the main dropdown menu (engagement indicator) | `src/components/component-example.tsx` |
| `sign_out_clicked` | User clicks Sign Out in the dropdown menu (important churn event) | `src/components/component-example.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

### Dashboard
- [Analytics basics](https://us.posthog.com/project/313131/dashboard/1277137)

### Insights
- [Form Submissions Trend](https://us.posthog.com/project/313131/insights/ccaB570C) - Daily form submission activity over time
- [Dialog Conversion Funnel](https://us.posthog.com/project/313131/insights/hQujK2Wj) - Conversion rate from dialog open to action completion
- [Dialog Rejections (Churn Indicator)](https://us.posthog.com/project/313131/insights/5bDyPjVP) - Track users who cancelled/rejected dialogs
- [Theme Preference Changes](https://us.posthog.com/project/313131/insights/0QVku7cr) - User theme preference activity breakdown
- [Sign Out Events](https://us.posthog.com/project/313131/insights/bUjYRypA) - Track sign out clicks for understanding session endings

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/posthog-integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
