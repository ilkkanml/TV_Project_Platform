# 09 - UI UX Bible

This file defines the user interface, user experience, navigation, dashboard structure, page behavior, component rules, copywriting rules, and product boundary rules for TV Project Platform.

The UI must support the licensed player platform model.

The UI must never make the product look like an IPTV provider, content provider, stream provider, playlist provider, channel seller, or broadcast backend.

## Product Boundary

TV Project Platform is a Licensed IPTV Player Platform.

The UI may show:

- Software plans
- Player license status
- Subscription status
- Device activation status
- App download information
- Reseller credit balance
- Reseller transactions
- Payment history
- App version information
- Remote configuration state
- Optional temporary playlist profile transfer

The UI must not show:

- Channel lists
- Stream URLs
- Content catalogs
- Channel packages
- Playlist marketplace
- Public playlist search
- Backend-owned playlists
- Stream source management
- Broadcast schedules
- CDN stream routes

## UI Product Language

The UI must use player-only language.

Approved language:

- Licensed player platform
- Player access
- Software access
- Subscription
- Device activation
- Player license
- App configuration
- Remote config
- App version
- Your own legal playlist or provider information
- Optional secure profile transfer to your own device

Forbidden language:

- Included channels
- Our channels
- IPTV channels included
- Buy channels
- Watch our streams
- Stream package
- Channel package
- Playlist marketplace
- Provided playlist
- Content package
- Broadcast access

## Design Goals

The UI should be:

- Clean
- Fast
- Simple
- Trustworthy
- Responsive
- Accessible
- Role-aware
- Easy to maintain
- Clear about product scope
- Friendly for non-technical users
- Efficient for admins and resellers

## Visual Style Direction

The visual style should feel:

- Modern
- Professional
- Streaming-device friendly
- Technology-focused
- Safe and legitimate
- Clear and minimal

Avoid:

- Illegal IPTV-style marketing
- Channel-heavy visuals
- Fake channel grids
- Piracy-style wording
- Confusing media-provider language
- Overloaded dashboards

## Planned Frontend Stack

The planned web stack is:

- Next.js
- React
- TypeScript
- Tailwind CSS

Web app location:

- apps/web

Shared types should come from:

- packages/shared

## Main UI Areas

The web UI should include:

- Public website
- Authentication pages
- Customer dashboard
- Reseller dashboard
- Admin dashboard
- Checkout or payment pages
- Legal pages
- Support entry points
- App download pages

## Route Groups

Suggested route groups:

- /
- /pricing
- /devices
- /download
- /faq
- /login
- /register
- /dashboard
- /reseller
- /admin
- /terms
- /privacy
- /refund-policy
- /acceptable-use
- /support

## Role-Based Routing

After login:

- Admin users should go to /admin
- Reseller users should go to /reseller
- Customer users should go to /dashboard

Frontend routing improves user experience.

Frontend routing is not security.

Backend authorization is mandatory.

## Public Website Pages

The public website should include:

- Home page
- Pricing page
- Device selector page
- Download page
- FAQ page
- Support page
- Terms of service page
- Privacy policy page
- Refund policy page
- Acceptable use policy page

Public pages must clearly state that the platform does not provide channels, streams, playlists, or content.

## Home Page

The home page should explain:

- What the product is
- Who the product is for
- Supported device types
- How player access works
- How subscriptions work
- How device activation works
- That users use their own legal playlist or provider information

The home page must not imply that TV content is included.

## Home Page Hero

The hero section may include:

- Product headline
- Short product description
- Primary call to action
- Secondary call to action
- Supported device badges
- Product boundary statement

Example product boundary text:

TV Project Platform is a licensed player platform. It does not provide channels, streams, playlists, or content.

## Pricing Page

The pricing page should show software/player access plans.

Pricing cards may include:

- Plan name
- Duration
- Device limit
- Price
- Currency
- Subscription description
- Call to action

Pricing cards must not include:

- Channel count
- Stream count
- VOD count
- Content categories
- Channel packages
- Playlist access
- Included IPTV content

## Device Selector Page

The device selector page should help users choose the correct app download.

Supported device examples:

- Android TV
- Fire TV
- Android Box
- Android Mobile when approved
- Other supported devices later

The page may show:

- Device type
- Installation notes
- Download button
- Version information
- Minimum app version
- Update warning

## Download Page

The download page should include:

- Latest app version
- APK download link when available
- Platform
- Version code
- Version name
- Changelog
- Minimum supported version
- Installation instructions
- Safety warning

The page must not show channel packages or content promises.

## FAQ Page

FAQ should answer:

- What is TV Project Platform?
- Does the platform provide channels?
- Does the platform provide playlists?
- How do I activate a device?
- How do subscriptions work?
- How do resellers work?
- How do payments work?
- What devices are supported?
- How is playlist information handled?
- How do I contact support?

The answer to channel, stream, playlist, and content questions must be clear:

The platform does not provide channels, streams, playlists, or content.

## Legal Pages

Required legal pages:

- Terms of service
- Privacy policy
- Refund policy
- Acceptable use policy

Legal pages should be easy to find in the footer.

Legal pages must clearly explain:

- Product is software
- Product is a player platform
- Product does not provide media content
- Users are responsible for their own legal playlist or provider information
- Payments are for software/player access only

## Authentication Pages

Authentication pages should include:

- Login page
- Register page
- Forgot password page later
- Reset password page later
- Email verification page later

MVP should include:

- Login
- Register
- Logout flow
- Current user loading state

## Login Page

Login page should include:

- Email field
- Password field
- Submit button
- Loading state
- Error state
- Register link
- Forgot password link later

Login errors should be safe.

Do not reveal whether an email exists unless intentionally designed.

## Register Page

Register page should include:

- Name field
- Email field
- Password field
- Confirm password field
- Terms acceptance checkbox
- Submit button
- Login link

Registration copy must not promise included content.

## Dashboard Shell

Authenticated dashboard pages should use a consistent shell.

Dashboard shell should include:

- Sidebar navigation
- Top bar
- User menu
- Role badge
- Logout action
- Main content area
- Breadcrumbs when useful
- Responsive mobile menu

## Customer Dashboard

Customer dashboard should show:

- Current subscription status
- License status
- Active device count
- Device limit
- Payment summary
- App download shortcut
- Optional playlist transfer shortcut
- Important announcements
- Expiration warnings

Customer dashboard must only show the customer's own data.

## Customer Navigation

Customer navigation may include:

- Overview
- Subscription
- Devices
- Payments
- Playlist Transfer
- Download App
- Settings
- Support
- Logout

Playlist Transfer should only appear when the feature flag is enabled.

## Customer Subscription Page

Customer subscription page should show:

- Current plan
- Subscription status
- Start date
- End date
- Remaining time
- Device limit
- Renewal options when available
- Expiration warning
- Payment link when available

This page must not describe channel access or stream access.

## Customer Devices Page

Customer devices page should show:

- Device name
- Platform
- Device status
- License status
- App version
- Activation date
- Last seen date
- Blocked status when relevant

Actions may include:

- Rename device
- View details
- Activate device flow
- Remove device later when approved

Device identity shown to users should be friendly.

Do not expose unnecessary internal identifiers unless needed for support.

## Customer Payments Page

Customer payments page should show:

- Payment date
- Amount
- Currency
- Plan name
- Status
- Provider
- Payment reference
- Subscription result

Do not show:

- Card number
- CVV
- Provider secret
- Raw provider payload
- Internal webhook data

## Customer Playlist Transfer Page

The optional playlist transfer page should allow users to send a playlist profile to their own device.

This page must clearly explain:

- The transfer is optional.
- The app stores playlist data locally by default.
- The backend does not provide playlists.
- The backend does not become permanent playlist storage.
- The transfer payload is temporary.
- The transfer payload expires.

Form fields may include:

- Target device
- Profile name
- Playlist URL or provider URL
- Username when applicable
- Password when applicable
- Expiration notice

The UI must not show shared playlist libraries or public playlist search.

## Playlist Transfer Warning Copy

The UI should include clear warning copy:

Use only playlist or provider information that you are legally allowed to access. TV Project Platform does not provide channels, streams, playlists, or content.

## Reseller Dashboard

Reseller dashboard should show:

- Current credit balance
- Total own customers
- Active own subscriptions
- Expired own subscriptions
- Recent credit transactions
- Recent sales
- Recent customer activity
- Low credit warning later

All data must be scoped to the logged-in reseller.

## Reseller Navigation

Reseller navigation may include:

- Overview
- Customers
- Create Customer
- Subscriptions
- Credit Balance
- Credit Transactions
- Sales History
- Settings
- Support
- Logout

Reseller navigation must not include:

- Channels
- Streams
- Channel Packages
- Playlists Marketplace
- Content Catalog
- Broadcast Tools

## Reseller Customers Page

Reseller customers page should show:

- Customer name
- Customer email
- Subscription status
- Subscription end date
- Device count
- License status
- Created date
- Quick actions

Quick actions may include:

- View customer
- Extend subscription
- View devices
- View subscription

Resellers must only see own customers.

## Reseller Customer Detail Page

Customer detail page may show:

- Customer profile
- Subscription summary
- Device list
- License status
- Recent credit usage
- Recent subscription changes

Actions may include:

- Edit customer basic info
- Create subscription
- Extend subscription
- View devices

This page must not include content or channel management.

## Reseller Credit Page

Reseller credit page should show:

- Current credit balance
- Recent transactions
- Transaction type
- Amount
- Balance before
- Balance after
- Related customer
- Related subscription
- Created date

Resellers must not be able to directly edit their balance.

## Reseller Sales History Page

Sales history should show software subscription operations only.

Columns may include:

- Customer
- Plan
- Credit used
- Subscription start
- Subscription end
- Created date
- Created by

Sales history must not imply content or channel sales.

## Admin Dashboard

Admin dashboard should show:

- Total users
- Total customers
- Total resellers
- Active subscriptions
- Expired subscriptions
- Recent payments
- Recent reseller credit activity
- Recent device activations
- System status
- Important warnings

Admin dashboard should be information-dense but readable.

## Admin Navigation

Admin navigation may include:

- Overview
- Users
- Customers
- Resellers
- Plans
- Subscriptions
- Payments
- Devices
- App Versions
- Remote Config
- Audit Logs
- Settings
- Support
- Logout

Admin navigation must not include:

- Channels
- Streams
- Stream Sources
- Channel Packages
- Playlist Marketplace
- Content Catalog
- Broadcast Schedule
- CDN Routes

## Admin Users Page

Admin users page should show:

- Name
- Email
- Role
- Status
- Created date
- Last updated date
- Actions

Actions may include:

- View
- Edit
- Disable
- Suspend
- Change role when allowed

The UI must never show password hashes.

## Admin Resellers Page

Admin resellers page should show:

- Reseller name
- Email
- Status
- Credit balance
- Customer count
- Active subscriptions
- Created date
- Actions

Actions may include:

- View reseller
- Add credit
- Adjust credit
- Disable reseller
- Suspend reseller
- View transactions

Credit actions should have confirmation modals.

## Admin Reseller Credit Modal

Credit add or adjustment modal should include:

- Amount
- Transaction type
- Note
- Confirmation checkbox when needed
- Submit button
- Cancel button

The modal should display:

- Current balance
- Resulting balance preview

The backend is still authoritative.

Frontend preview is only informational.

## Admin Plans Page

Admin plans page should show:

- Plan name
- Duration
- Price
- Currency
- Device limit
- Reseller credit cost
- Public status
- Active status
- Actions

Plans must represent software/player access only.

Do not create channel package plan UI.

## Admin Subscriptions Page

Admin subscriptions page should show:

- Customer
- Plan
- Status
- Start date
- End date
- Source
- Reseller when applicable
- Payment when applicable
- Actions

Actions may include:

- View
- Extend
- Cancel
- Suspend

Subscription actions should be audit logged.

## Admin Payments Page

Admin payments page should show:

- Customer
- Plan
- Amount
- Currency
- Provider
- Status
- Provider reference
- Created date
- Paid date
- Actions

Actions may include:

- View
- Approve manual payment
- Reject manual payment
- Refund later when supported

Payment UI must never show card data.

## Admin Devices Page

Admin devices page should show:

- Device name
- Owner
- Platform
- App version
- Device status
- License status
- Activation date
- Last seen date
- Actions

Actions may include:

- View
- Block
- Unblock

Device block actions should require confirmation.

## Admin App Versions Page

Admin app versions page should show:

- Platform
- Version code
- Version name
- Minimum version code
- Force update
- APK URL
- Active status
- Changelog
- Actions

The UI should make force update status clear.

App version changes should be audit logged.

## Admin Remote Config Page

Remote config page should include:

- Maintenance mode toggle
- Maintenance message
- Announcement message
- Minimum version code
- Feature flags
- Save button
- Last updated info

Feature flags may include:

- vod_enabled
- series_enabled
- epg_enabled
- favorites_enabled
- multi_profile_enabled
- web_playlist_push_enabled
- manual_payment_enabled
- reseller_enabled

Remote config must not include secrets.

Remote config must not include playlist credentials.

## Admin Audit Logs Page

Audit logs page should show:

- Date
- Actor
- Actor role
- Action
- Target type
- Target ID
- IP address
- User agent summary
- Metadata preview

Audit logs should support filters:

- Actor
- Action
- Target type
- Date range
- Role

Audit logs must not expose sensitive data.

## Tables

Tables should support:

- Loading state
- Empty state
- Error state
- Pagination
- Sorting where useful
- Filtering where useful
- Responsive behavior
- Row actions
- Bulk actions later when approved

Do not overload tables with too many columns on mobile.

## Forms

Forms should include:

- Clear labels
- Helpful descriptions
- Required field indicators
- Inline validation
- Submit loading state
- Success message
- Error message
- Cancel action when useful

Sensitive forms should include confirmation.

Examples:

- Reseller credit adjustment
- Subscription cancellation
- Device blocking
- Role change
- Remote config maintenance mode

## Buttons

Button styles should be consistent.

Recommended button types:

- Primary
- Secondary
- Destructive
- Ghost
- Link
- Icon

Destructive actions should use destructive styling and confirmation when needed.

## Status Badges

Status badges should be used consistently.

Examples:

- ACTIVE
- EXPIRED
- CANCELLED
- SUSPENDED
- DISABLED
- BLOCKED
- PENDING
- SUCCEEDED
- FAILED
- CONSUMED
- EXPIRED

Badge colors should be consistent:

- Success for active/succeeded
- Warning for pending/expiring
- Danger for failed/blocked/cancelled
- Neutral for inactive/disabled where appropriate

## Cards

Cards may be used for:

- Dashboard metrics
- Plan pricing
- Subscription summaries
- Device summaries
- Payment summaries
- Reseller credit summaries
- App version summaries

Cards should not contain misleading media/content promises.

## Empty States

Empty states should be helpful.

Examples:

No devices:

- No devices activated yet.
- Download the app and activate your device to start using your licensed player access.

No payments:

- No payment records yet.

No reseller customers:

- No customers yet.
- Create your first customer to assign a software subscription.

Empty states must not mention included channels or content.

## Loading States

Loading states should be clear.

Use:

- Skeletons for dashboards and tables
- Button spinners for form submissions
- Page-level loading for route transitions
- Small inline loaders for actions

Avoid layout jumps when possible.

## Error States

Error states should include:

- Clear message
- Error code when useful
- Retry action when possible
- Support instruction when needed

Do not expose:

- Stack traces
- Database errors
- Secrets
- Tokens
- Payment provider internals
- Playlist credentials

## Confirmation Modals

Use confirmation modals for:

- Delete actions
- Disable user
- Suspend reseller
- Add credit
- Adjust credit
- Cancel subscription
- Suspend subscription
- Block device
- Force update enablement
- Maintenance mode enablement

Modals should clearly explain the result of the action.

## Notifications

UI notifications may include:

- Success toast
- Error toast
- Warning banner
- Info banner
- System maintenance banner
- Subscription expiration banner
- Force update banner

Notifications should be concise and actionable.

## Accessibility

The UI should follow accessibility basics:

- Semantic HTML
- Proper labels
- Keyboard navigation
- Visible focus states
- Sufficient color contrast
- Descriptive button text
- Accessible form errors
- ARIA only when needed
- No color-only meaning

## Responsive Design

The UI should work on:

- Desktop
- Laptop
- Tablet
- Mobile

Dashboard tables may become cards on small screens.

Sidebars may collapse into mobile menus.

Forms should remain easy to use on mobile.

## Internationalization

Initial UI language may be English.

Turkish support may be added later if approved.

Text should be organized so future translation is possible.

Avoid hardcoding large repeated strings across many components when avoidable.

## Date And Time Display

Dates should be displayed clearly.

Examples:

- Subscription ends on 2026-05-16
- Last seen 2 hours ago
- Payment created on 2026-05-16

Use consistent timezone rules.

Admin screens may show exact timestamps.

Customer screens may use simpler date formatting.

## Currency Display

Currency display should be clear.

Examples:

- TRY 999.00
- USD 29.99
- EUR 24.99

Frontend display is not backend authority.

Backend calculates final amount.

## Plan Card UX

Plan cards should show:

- Name
- Duration
- Device limit
- Price
- Currency
- Software/player access description
- Call to action

Plan cards must not show:

- Channel count
- VOD count
- Content category
- Stream quality promises tied to provided content
- Included IPTV wording

## Checkout UX

Checkout page should show:

- Selected plan
- Duration
- Price
- Currency
- Device limit
- Payment method
- Terms acceptance
- Product boundary statement

Checkout must clearly state:

Payment is for software/player access only. TV Project Platform does not provide channels, streams, playlists, or content.

## Manual Payment UX

Manual payment page may include:

- Payment instructions
- Amount
- Currency
- Reference code
- Upload proof later when approved
- Customer note
- Submit button

Admin manual payment review should show:

- Customer
- Plan
- Amount
- Currency
- Status
- Customer note
- Admin note
- Approve button
- Reject button

## App Download UX

App download experience should include:

- Device selection
- Latest version
- APK download
- Installation steps
- Update notes
- Troubleshooting link
- License activation instructions

Do not combine download UX with content or channel marketing.

## Device Activation UX

Device activation UX should be simple.

Customer-facing flow may include:

1. Install app.
2. Open app.
3. Sign in or enter activation code.
4. Device appears in dashboard.
5. License status becomes active if subscription is valid.

The UI should clearly show why activation fails.

Possible failure reasons:

- Subscription expired
- Device limit reached
- Device blocked
- App version unsupported
- Maintenance mode

## Maintenance Mode UX

When maintenance mode is active:

- Public website may remain available.
- Dashboards may show maintenance banner.
- App may show maintenance message.
- Admin should still be able to access required controls if allowed.

Maintenance message should be clear and not technical.

## Force Update UX

When force update is active:

- App should show update required screen.
- Web download page should show latest version.
- Admin app version page should clearly show force update status.

Force update copy should explain the user action:

A new app version is required. Please update your app to continue using licensed player access.

## Feature Flag UX

Feature flags should hide or show features.

Examples:

- web_playlist_push_enabled controls playlist transfer UI.
- reseller_enabled controls reseller-specific UI where needed.
- manual_payment_enabled controls manual payment UI.

Hidden UI is not security.

Backend must still enforce permissions.

## Design System Direction

The project should use reusable UI components.

Suggested component groups:

- Layout
- Navigation
- Button
- Input
- Select
- Checkbox
- Modal
- Table
- Badge
- Card
- Alert
- Toast
- Tabs
- Pagination
- EmptyState
- LoadingSkeleton
- ConfirmDialog
- StatCard

## Component Rules

Components should be:

- Typed with TypeScript
- Reusable
- Accessible
- Consistent
- Simple
- Easy to test
- Not over-engineered

Avoid copying the same layout logic across many pages.

## API Error Display

API errors should map to user-friendly messages.

Examples:

- UNAUTHORIZED: Please log in again.
- FORBIDDEN: You do not have permission to perform this action.
- SUBSCRIPTION_EXPIRED: Your subscription has expired.
- DEVICE_BLOCKED: This device is blocked.
- RESELLER_INSUFFICIENT_CREDIT: Not enough reseller credit.
- PAYMENT_NOT_VERIFIED: Payment has not been verified yet.
- MAINTENANCE_MODE: The service is temporarily under maintenance.

## Copywriting Rules

Use clear and direct copy.

Good copy:

- Manage your licensed player access.
- Activate your device.
- View your subscription.
- Renew your software access.
- Send a temporary profile to your own device.
- Use your own legal playlist or provider information.

Bad copy:

- Get premium channels.
- Watch all IPTV channels.
- Buy channel packages.
- Stream our content.
- Access our playlist.
- Unlimited channels included.

## Footer

Footer should include:

- Product name
- Short product boundary statement
- Terms link
- Privacy link
- Refund policy link
- Acceptable use link
- Support link
- Copyright notice

Footer should not include channel or content promises.

## Navigation Product Boundary Statement

Important pages should include a small product boundary statement.

Suggested text:

TV Project Platform is a licensed player platform. It does not provide channels, streams, playlists, or content.

Important pages include:

- Home
- Pricing
- Checkout
- FAQ
- Download
- Playlist transfer
- Legal pages

## Admin UX Safety

Admin pages should prevent accidental damage.

Use confirmation for:

- Credit changes
- Subscription cancellation
- User disabling
- Reseller suspension
- Device blocking
- Force update enablement
- Maintenance mode enablement

Show previews where useful.

Backend remains authoritative.

## Reseller UX Safety

Reseller pages should make credit usage clear.

Before using credit, show:

- Customer
- Selected plan
- Credit cost
- Current balance
- Balance after operation
- Subscription result

This preview is informational.

Backend must calculate final cost and result.

## Customer UX Safety

Customer pages should make status clear.

Customers should easily understand:

- Whether subscription is active
- When subscription expires
- Whether device is activated
- Whether license is allowed
- What action is needed next

Avoid technical jargon where possible.

## Data Privacy UX

Do not display sensitive data unnecessarily.

Avoid showing:

- Internal IDs unless needed
- Password hashes
- Token data
- Payment secrets
- Full raw provider references
- Playlist credentials after submission
- Encryption keys

## Search And Filters

Admin pages may include search and filters.

Useful filters:

- Role
- Status
- Date range
- Payment status
- Subscription status
- Device status
- Reseller
- Customer

Reseller pages should only filter within reseller-owned data.

Customer pages usually need minimal filtering.

## Pagination UX

Paginated pages should show:

- Current page
- Total pages when available
- Previous button
- Next button
- Page size when useful

Large admin lists should use pagination.

## Audit Log UX

Audit logs should be searchable and filterable.

Audit log rows should be readable.

Metadata should be collapsible or shown in a safe preview.

Sensitive values must not be displayed.

## Support UX

Support entry points may include:

- Support page
- Contact form later
- Support email link
- FAQ links
- Troubleshooting links

Support UI must not ask users for:

- Password
- Full card number
- CVV
- Payment provider secrets
- Playlist credentials in plain support messages

## Security UX

Security-related UI should include:

- Password change page
- Session logout
- Clear error messages
- Safe login messages
- Optional two-factor setup later
- Account status messages

Do not expose internal security logic.

## Dark Mode

Dark mode may be added later.

If added, it should preserve:

- Readability
- Contrast
- Badge clarity
- Chart visibility
- Form usability
- Accessibility

Dark mode is not required for MVP unless approved.

## Charts

Charts may be added later for admin and reseller analytics.

Possible charts:

- Subscription trends
- Payment totals
- Credit usage
- Customer growth
- Device activations

Charts must not show channel, stream, playlist, or content analytics.

## MVP UI Scope

MVP UI should include:

- Home page
- Pricing page
- Download page
- FAQ page
- Legal pages
- Login page
- Register page
- Customer dashboard
- Customer subscription page
- Customer devices page
- Customer payments page
- Reseller dashboard
- Reseller customers page
- Reseller credit transactions page
- Admin dashboard
- Admin users page
- Admin resellers page
- Admin plans page
- Admin subscriptions page
- Admin payments page
- Admin devices page
- Admin app versions page
- Admin remote config page
- Admin audit logs page

## Post-MVP UI Scope

Post-MVP UI may include:

- Support ticket UI
- Notification center
- Email preferences
- SMS preferences
- Invoice download page
- PDF receipt page
- Advanced reports
- Admin two-factor setup
- Reseller branding
- Affiliate dashboard
- Referral dashboard
- Encrypted cloud playlist sync UI with explicit approval

Each post-MVP UI feature requires approval.

## Forbidden UI Areas

Do not create UI pages for:

- Channel list management
- Stream source management
- Channel package builder
- Content catalog management
- Playlist marketplace
- Public playlist search
- Shared playlist library
- CDN route management
- Broadcast schedule management
- Transcoding job management

These pages violate the product boundary.

## UI Testing Requirements

UI tests should verify:

- Admin routes require admin role.
- Reseller routes require reseller role.
- Customer routes require customer ownership.
- Reseller cannot see other reseller customers.
- Customer cannot see other customer data.
- Pricing copy does not imply included content.
- Checkout copy states software/player access only.
- Forbidden channel/stream UI pages do not exist.
- Sensitive data is not displayed.
- Reseller credit preview does not replace backend calculation.
- Playlist transfer page is hidden when feature flag is disabled.

## Stable Project Bible Link

This file is part of the stable project-bible tree:

- 00-project-rules.md
- 01-product-bible.md
- 02-user-roles.md
- 03-feature-list.md
- 04-database-bible.md
- 05-api-bible.md
- 06-security-bible.md
- 07-payment-bible.md
- 08-reseller-bible.md
- 09-ui-ux-bible.md
- 10-app-integration.md
- 11-marketing-bible.md
- 12-devops-bible.md
- 13-decision-log.md
- 14-testing-bible.md
- 15-support-bible.md
- 16-release-bible.md

Do not rename this file without approval.

Do not create conflicting alternative UI or UX files.

## Final Rule

The UI must make the product feel like a legitimate licensed player platform.

Do not design the UI like an IPTV content provider.

Do not add channel-selling pages.

Do not add stream-management pages.

Do not add playlist marketplace pages.

Do not imply that channels, streams, playlists, or content are included.
