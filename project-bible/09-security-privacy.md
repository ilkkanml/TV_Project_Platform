# 09 - UI UX Bible

This file defines the UI and UX direction for TV Project Platform.

The interface must support the licensed player platform model.

The UI must not present the product as an IPTV provider, channel seller, stream provider, or playlist marketplace.

## Product Boundary In UI

TV Project Platform is a Licensed IPTV Player Platform.

The UI must clearly communicate that the platform is for:

- Player license management
- Subscription management
- Device activation
- Reseller management
- Payment management
- App configuration
- Optional secure profile transfer

The UI must not imply that the platform provides:

- Channels
- Streams
- Channel packages
- Content catalogs
- Playlist marketplace access
- Broadcast services

## UI Stack

The planned web UI stack is:

- Next.js
- React
- TypeScript
- Tailwind CSS

The web app location is:

- apps/web

## Design Principles

The UI should be:

- Clean
- Fast
- Responsive
- Role-aware
- Simple to navigate
- Professional
- Trustworthy
- Accessible
- Mobile-friendly
- Dashboard-focused

The UI should avoid unnecessary complexity.

The UI should make critical account, subscription, device, and payment states easy to understand.

## Visual Style

The visual style should feel:

- Modern
- Dark-friendly
- TV-tech oriented
- Minimal
- Clear
- Reliable

Suggested style direction:

- Dark navy or charcoal background
- Clean white cards
- Blue or cyan accent color
- Green for success
- Amber for warnings
- Red for danger
- Neutral gray for secondary text

## Typography

Typography should be readable and consistent.

Recommended approach:

- Use one primary sans-serif font.
- Use clear heading hierarchy.
- Avoid tiny text.
- Use readable line height.
- Keep dashboard numbers large and clear.

## Layout System

The web app should use consistent layouts.

Main layout types:

- Public marketing layout
- Auth layout
- Customer dashboard layout
- Reseller dashboard layout
- Admin dashboard layout
- Legal page layout

Each dashboard layout should include:

- Sidebar navigation
- Top bar
- Main content area
- Account menu
- Logout action

## Responsive Design

The UI must work on:

- Desktop
- Tablet
- Mobile

Dashboard pages should collapse navigation on small screens.

Tables should become scrollable or card-based on mobile.

Important actions should remain visible and usable on mobile.

## Accessibility

The UI should follow accessibility basics:

- Clear contrast
- Keyboard navigation
- Visible focus states
- Labelled form inputs
- Semantic HTML
- Descriptive button text
- Clear error messages
- No color-only status indicators

## Public Website Pages

The public website should include:

- Home
- Pricing
- Device selector
- Download
- FAQ
- Terms of service
- Privacy policy
- Refund policy
- Contact or support entry

The public website must explain that users use their own legal playlist or provider information.

## Public Website Messaging

Approved public messaging:

- Licensed IPTV player platform
- Manage your player license
- Activate your device
- Manage your subscription
- Use your own legal playlist or provider information
- Secure player access for supported devices

Forbidden public messaging:

- Watch included channels
- Buy IPTV channels
- Get channel packages
- Stream our content
- Access our playlist
- We provide streams
- We provide TV content

## Home Page

The home page should include:

- Hero section
- Product explanation
- Supported devices
- Main benefits
- How it works
- Pricing preview
- FAQ preview
- Legal boundary notice
- Call to action

Hero message should focus on licensed player access.

The hero must not imply that content is included.

## Pricing Page

The pricing page should show software access plans.

Plan cards may include:

- Plan name
- Duration
- Device limit
- Price
- Features
- Call to action

Pricing language must avoid content promises.

Pricing should not mention channel counts.

Pricing should not mention included streams.

## Device Selector Page

The device selector page should help users choose supported devices.

Supported device categories may include:

- Android TV
- Fire TV
- Android box
- Compatible Android devices

The page may explain:

- How activation works
- App version requirements
- Device limits
- License check behavior

## Download Page

The download page should include:

- Latest app version
- APK download link when available
- Version name
- Version code
- Changelog
- Minimum supported version
- Force update notice when needed

Download page content should come from app version settings when possible.

## Auth Pages

Auth pages should include:

- Login
- Register
- Forgot password later
- Reset password later

Login page should include:

- Email field
- Password field
- Submit button
- Error message area
- Link to register

Register page should include:

- Name field
- Email field
- Password field
- Confirm password field
- Terms acceptance when needed

## Dashboard Routing

After login, users should be routed by role.

Suggested routing:

- Admin: /admin
- Reseller: /reseller
- Customer: /dashboard

Users must not access dashboards for other roles.

Frontend route protection improves UX, but backend authorization is mandatory.

## Customer Dashboard

Customer dashboard should show:

- Current subscription status
- License status
- Active devices
- Payment history summary
- App download shortcut
- Optional playlist transfer shortcut
- Important notices

Customer dashboard should be simple and focused.

## Customer Subscription Page

Customer subscription page should show:

- Current plan
- Subscription status
- Start date
- End date
- Remaining time
- Renewal options
- Expired state
- Payment call to action

Subscription language must explain software access only.

## Customer Devices Page

Customer devices page should show:

- Device name
- Platform
- App version
- Activation date
- Last seen date
- Status
- License state

Device statuses may include:

- Active
- Blocked
- Inactive
- Pending
- Expired

Customer must only see own devices.

## Customer Payments Page

Customer payments page should show:

- Payment date
- Plan
- Amount
- Currency
- Status
- Provider
- Reference
- Result

Payment page must not show card data.

Payment page must not show provider secrets.

## Optional Playlist Transfer UI

The optional playlist transfer page should clearly explain:

- Playlist credentials are normally stored on the device.
- The backend is not playlist source of truth.
- This feature sends a temporary encrypted profile to the user's own device.
- The transfer expires automatically.
- The transfer is deleted or marked consumed after pickup when possible.

UI fields may include:

- Target device
- Profile name
- Playlist URL or provider input
- Username if needed
- Password if needed
- Expiration information
- Send button

The UI must not present this as cloud playlist storage.

## Reseller Dashboard

Reseller dashboard should show:

- Credit balance
- Own customer count
- Active subscriptions
- Expired subscriptions
- Recent credit transactions
- Recent sales
- Quick customer creation action

All data must be scoped to the logged-in reseller.

## Reseller Customers Page

Reseller customer page should show:

- Customer name
- Email
- Subscription status
- Subscription end date
- Device count
- Created date
- Actions

Actions may include:

- View customer
- Create subscription
- Extend subscription
- View devices

Resellers must only see own customers.

## Reseller Credit Page

Reseller credit page should show:

- Current credit balance
- Credit transaction table
- Transaction type
- Amount
- Balance before
- Balance after
- Related customer
- Related subscription
- Created date
- Note

Credit values must come from backend.

Frontend must not calculate final trusted credit values.

## Reseller Sales Page

Reseller sales page should show software subscription sales only.

Fields may include:

- Customer
- Plan
- Credit used
- Subscription start
- Subscription end
- Created date

Sales page must not represent channel or stream sales.

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

Admin dashboard should prioritize operational clarity.

## Admin Users Page

Admin users page should show:

- Name
- Email
- Role
- Status
- Created date
- Last activity when available
- Actions

Actions may include:

- View
- Edit
- Disable
- Change role when allowed

Passwords must never be visible.

## Admin Resellers Page

Admin resellers page should show:

- Reseller name
- Email
- Status
- Credit balance
- Customer count
- Sales count
- Created date
- Actions

Actions may include:

- View reseller
- Add credit
- Adjust credit
- Disable reseller
- View transactions

Credit changes should require confirmation.

## Admin Plans Page

Admin plans page should show:

- Plan name
- Duration
- Price
- Currency
- Device limit
- Reseller credit cost
- Status
- Actions

Plan editing should clearly separate:

- Public price
- Duration
- Device limit
- Reseller credit cost

## Admin Subscriptions Page

Admin subscriptions page should show:

- Customer
- Plan
- Status
- Start date
- End date
- Source
- Reseller when applicable
- Actions

Actions may include:

- View
- Extend
- Cancel
- Suspend

Subscription changes should show confirmation dialogs.

## Admin Payments Page

Admin payments page should show:

- Customer
- Plan
- Amount
- Currency
- Provider
- Status
- Created date
- Paid date
- Actions

Manual payment approval should require confirmation.

Payment UI must not show card data.

## Admin Devices Page

Admin devices page should show:

- Device name
- Owner
- Platform
- App version
- Status
- Last seen
- Activation date
- Actions

Actions may include:

- View
- Block
- Unblock

Device blocking should show a warning confirmation.

## Admin App Versions Page

Admin app versions page should show:

- Platform
- Version name
- Version code
- Minimum version code
- Force update
- Active status
- APK URL
- Changelog
- Actions

Force update changes should require confirmation.

## Admin Remote Config Page

Admin remote config page should show:

- Maintenance mode
- Maintenance message
- Announcement
- Minimum version code
- Feature flags

Feature flags may include:

- vod_enabled
- series_enabled
- epg_enabled
- favorites_enabled
- multi_profile_enabled
- web_playlist_push_enabled

Remote config changes should be audit logged.

## Admin Audit Logs Page

Admin audit logs page should show:

- Date
- Actor
- Actor role
- Action
- Target type
- Target ID
- IP address
- User agent
- Metadata summary

Audit logs must not expose sensitive data.

Audit logs must not expose playlist credentials.

## Navigation

Customer navigation may include:

- Overview
- Subscription
- Devices
- Payments
- Playlist transfer
- Settings

Reseller navigation may include:

- Overview
- Customers
- Credits
- Sales
- Settings

Admin navigation may include:

- Overview
- Users
- Customers
- Resellers
- Plans
- Subscriptions
- Payments
- Devices
- App versions
- Remote config
- Audit logs
- Settings

## Status Badges

Use consistent status badges.

Recommended colors:

- Active: green
- Pending: amber
- Expired: gray
- Cancelled: gray
- Suspended: red
- Blocked: red
- Failed: red
- Succeeded: green
- Maintenance: amber

Status badges should include text, not only color.

## Forms

Forms should be:

- Clear
- Short where possible
- Validated
- Accessible
- Error-aware
- Loading-aware

Form inputs should include labels.

Required fields should be obvious.

Errors should appear near the relevant field.

## Tables

Tables should support:

- Search
- Filtering
- Sorting
- Pagination
- Empty state
- Loading state
- Error state

Tables should not expose sensitive fields.

Tables should respect role permissions.

## Empty States

Every major page should have useful empty states.

Examples:

- No devices yet
- No payments yet
- No customers yet
- No credit transactions yet
- No audit logs yet

Empty states should explain the next action.

## Loading States

Use loading states for:

- Dashboard cards
- Tables
- Forms
- Payment actions
- Device activation actions
- Playlist transfer actions

Avoid blank screens.

## Error States

Error messages should be clear and safe.

Do not show:

- Stack traces
- Database errors
- Secret values
- Raw provider errors
- Token values

Use friendly messages with standard error codes where useful.

## Confirmation Dialogs

Use confirmation dialogs for critical actions:

- Delete or disable user
- Disable reseller
- Add reseller credit
- Adjust reseller credit
- Cancel subscription
- Block device
- Force app update
- Enable maintenance mode
- Approve manual payment
- Reject manual payment

Confirmation dialogs should explain the consequence.

## Notifications

UI notifications may include:

- Success toast
- Error toast
- Warning toast
- Info toast

Notifications should not expose sensitive data.

## Role-Based UI

The UI should show features based on role.

However, hidden UI is not security.

Backend authorization remains mandatory.

Role-based UI should improve usability only.

## Legal Notices In UI

Important pages should include legal boundary reminders.

Examples:

- Pricing page
- Playlist transfer page
- Download page
- Terms page
- FAQ page

Suggested message:

TV Project Platform is a licensed player platform. It does not provide channels, streams, playlists, or content. Users are responsible for using their own legal playlist or provider information.

## UI Copy Rules

Use clear software-focused copy.

Approved words:

- License
- Subscription
- Device
- Activation
- Player
- Account
- Reseller credit
- App version
- Remote config
- Temporary transfer

Avoid words that imply content supply:

- Included channels
- Stream package
- Channel package
- IPTV content
- Playlist store
- Content library

## Design Components

Shared UI components should include:

- Button
- Input
- Textarea
- Select
- Checkbox
- Modal
- Card
- Badge
- Table
- Pagination
- Tabs
- Toast
- Alert
- Sidebar
- Topbar
- Empty state
- Loading state
- Error state

Components should be reusable across dashboards.

## API Error Display

The frontend should handle standard API error codes.

Examples:

- UNAUTHORIZED
- FORBIDDEN
- VALIDATION_ERROR
- RATE_LIMITED
- DEVICE_BLOCKED
- SUBSCRIPTION_EXPIRED
- LICENSE_INVALID
- PAYMENT_FAILED
- SERVER_ERROR

Display messages should be user-friendly.

## MVP UI Scope

MVP UI should include:

- Public landing page
- Login page
- Register page
- Customer dashboard
- Customer subscription page
- Customer devices page
- Customer payments page
- Reseller dashboard
- Reseller customers page
- Reseller credits page
- Admin dashboard
- Admin users page
- Admin resellers page
- Admin plans page
- Admin subscriptions page
- Admin payments page
- Admin devices page
- Admin app versions page
- Admin remote config page

## Post-MVP UI Ideas

Post-MVP UI may include:

- Support ticket UI
- Email notification settings
- SMS notification settings
- Invoice/PDF receipt view
- Advanced reports
- Reseller branding
- Admin 2FA setup
- Affiliate dashboard
- Advanced analytics

Each post-MVP UI feature requires approval.

## Final Rule

The UI must keep the product clearly positioned as a licensed player platform.

Do not design UI that makes the platform look like a channel provider, stream provider, IPTV provider, playlist provider, or content marketplace.
