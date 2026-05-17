# 15 - Support Bible

This file defines the support rules, support boundaries, customer support scope, reseller support scope, admin support scope, escalation rules, communication rules, privacy rules, troubleshooting flows, and forbidden support behavior for TV Project Platform.

Support must protect the licensed player platform model.

Support must not turn the platform into an IPTV provider, content provider, stream provider, channel seller, playlist provider, or broadcast support service.

## Product Boundary

TV Project Platform is a Licensed IPTV Player Platform.

Support may help with:

- Account access
- Login issues
- Subscription status
- Player license status
- Device activation
- Device status
- App download
- App version updates
- Remote config issues
- Maintenance mode messages
- Payment status
- Manual payment review
- Reseller credit questions
- Reseller customer management issues
- Temporary playlist profile transfer issues
- General platform usage

Support must not provide:

- TV channels
- Live streams
- VOD streams
- Stream URLs
- IPTV playlists
- Provider credentials
- Channel packages
- Content recommendations
- Playlist marketplace links
- Broadcast access
- Illegal content access help

## Support Mission

Support exists to help users use the software platform safely and correctly.

Support should help users understand:

- Their account status
- Their subscription status
- Their license status
- Their device activation status
- Their payment status
- Their app version status
- Their reseller credit status when applicable
- Their temporary playlist transfer status when enabled

Support must reinforce that the product is software/player access only.

## Support Is Allowed To Help With

Support may help customers with:

- Creating an account
- Logging in
- Resetting access when approved
- Viewing subscription status
- Understanding subscription expiration
- Device activation
- Device limit questions
- Blocked device questions
- App download and update instructions
- Payment history questions
- Manual payment review status
- Optional playlist transfer troubleshooting
- General dashboard navigation

Support may help resellers with:

- Reseller login
- Reseller dashboard navigation
- Own customer management
- Creating own customers
- Viewing own customers
- Assigning software subscriptions
- Extending own customer subscriptions
- Understanding credit balance
- Understanding credit transaction history
- Understanding own sales history
- Customer device/license visibility

Support may help admins with:

- User management workflow questions
- Reseller management workflow questions
- Plan management workflow questions
- Manual payment review workflow
- Device management workflow
- App version workflow
- Remote config workflow
- Audit log review workflow
- Deployment support handoff when needed

## Support Is Forbidden To Help With

Support must not help users obtain, find, buy, sell, share, or access:

- TV channel lists
- Live stream URLs
- VOD stream URLs
- IPTV playlist files
- M3U playlists
- Xtream provider credentials
- Portal URLs from third parties
- Channel packages
- Sports packages
- Movie packages
- Premium content
- Unauthorized content
- Pirated content
- Provider bypass methods
- Stream scraping methods
- Stream relay setup
- Transcoding setup
- Broadcast infrastructure

Support must not recommend IPTV providers.

Support must not verify whether a third-party provider is legal.

Support must not troubleshoot third-party stream availability as if the platform provides the content.

## Support Language Rules

Support must use player-only language.

Approved phrases:

- Licensed player platform
- Software access
- Player access
- Subscription status
- Device activation
- License status
- App update
- Use your own legal playlist or provider information
- The platform does not provide channels, streams, playlists, or content

Forbidden phrases:

- Our channels
- Included channels
- Your IPTV package
- Premium stream package
- We provide streams
- We provide playlists
- Channel package included
- Content included
- Sports channels included
- Movie channels included

## Mandatory Support Boundary Statement

When users ask about channels, playlists, streams, or content, support should use a clear boundary statement.

Approved statement:

TV Project Platform is a licensed player platform. It does not provide channels, streams, playlists, or content. Users are responsible for using their own legal playlist or provider information.

Short version:

The platform provides software/player access only. Channels, streams, playlists, and content are not provided.

## Customer Support Scope

Customer support may cover:

- Login help
- Account status
- Subscription status
- Payment status
- Device activation
- Device status
- License status
- App download
- App update
- Dashboard navigation
- Temporary playlist transfer status when enabled
- General troubleshooting

Customer support must only discuss the customer's own account and records.

Support must not disclose another user's data.

## Customer Account Support

Support may help customers with:

- Email login issues
- Password reset flow when available
- Account status explanation
- Disabled account explanation when visible
- Suspended account explanation when visible
- Dashboard access issue
- Profile information issue
- Session/logout issue

Support must not ask for the user's password.

Support must not request full authentication tokens.

Support must not expose password hashes.

## Customer Subscription Support

Support may help customers understand:

- Current plan
- Subscription status
- Start date
- End date
- Remaining time
- Expired status
- Renewal options when available
- Payment relationship when visible

Support must explain that subscriptions represent software/player access only.

Support must not say subscriptions include channels, streams, playlists, or content.

## Customer Device Support

Support may help customers with:

- Device activation steps
- Device status
- Device limit reached messages
- Device blocked messages
- App version warnings
- Last seen status
- Device rename issues when supported
- License denied reason explanation

Device support must use app_generated_device_id as the primary technical identity where needed.

MAC address must not be treated as the primary identity.

## Customer License Support

Support may help explain license denial reasons.

Possible reasons:

- Device not activated
- Device blocked
- Subscription expired
- Account disabled
- App update required
- Maintenance mode active
- Unsupported app version
- License invalid

Support must not override license status manually unless the proper admin workflow exists.

Support must not instruct users to bypass license checks.

## Customer Payment Support

Support may help with:

- Payment status
- Manual payment review status
- Payment history
- Payment reference
- Payment failed explanation
- Payment pending explanation
- Subscription extension after approved payment
- Refund policy explanation

Support must not ask for:

- Full card number
- CVV
- Card PIN
- Payment provider secret
- Bank login details
- Raw sensitive payment payloads

The platform must not store card data.

## Manual Payment Support

During MVP, manual payments may be supported.

Support may explain:

- Payment is pending review.
- Payment was approved.
- Payment was rejected.
- Subscription extension occurs after approval.
- Manual payment approval is admin-only.
- Payment records are for software/player access only.

Support must not approve payments unless the support user is also an authorized admin using the proper admin workflow.

## Reseller Support Scope

Reseller support may cover:

- Reseller login
- Reseller dashboard usage
- Own customer list
- Own customer creation
- Own customer subscription assignment
- Own customer subscription extension
- Own customer device visibility
- Own credit balance
- Own credit transaction history
- Own sales history

Support must not disclose another reseller's data.

Support must not manually change reseller credit outside the approved admin workflow.

## Reseller Credit Support

Support may explain:

- Current credit balance
- Credit transaction history
- Credit use for software subscription assignment
- Credit use for software subscription extension
- Credit add by admin
- Manual adjustment by admin
- Reversal or refund when approved

Support must reinforce that reseller credit is transaction-based.

Support must not directly edit credit records in the database.

Support must not delete credit transactions.

Support must not tell resellers that credit buys channels, streams, playlists, or content.

## Reseller Customer Support

Support may help resellers with their own customers only.

Allowed help:

- Customer creation issue
- Customer subscription assignment issue
- Customer subscription extension issue
- Customer device visibility issue
- Customer license status explanation
- Customer ownership clarification

Forbidden help:

- Accessing another reseller's customers
- Moving customers between resellers without admin approval
- Creating admin users through reseller flow
- Creating reseller users through reseller flow
- Selling channel packages through customer records
- Selling stream access through customer records

## Admin Support Scope

Admin support may cover platform operation workflows.

Support may help admins understand:

- User management
- Customer management
- Reseller management
- Plan management
- Subscription management
- Manual payment review
- Device blocking and unblocking
- App version management
- Remote config management
- Audit logs
- System settings when implemented

Admin support should be careful with sensitive actions.

Admin actions should use the admin panel and audit logs.

## Admin Action Safety

Support should remind admins to use confirmation and audit-safe flows for:

- Disabling users
- Suspending users
- Changing roles
- Adding reseller credit
- Adjusting reseller credit
- Extending subscriptions
- Cancelling subscriptions
- Approving payments
- Rejecting payments
- Blocking devices
- Enabling force update
- Enabling maintenance mode
- Changing remote config

Support must not suggest direct database edits for normal admin actions.

## App Support Scope

App support may help with:

- App download
- App installation
- App version update
- Device activation
- Login or activation flow
- License status
- Subscription status
- Maintenance mode message
- Force update message
- Local playlist profile management guidance
- Multi-profile usage
- Optional transferred profile import when enabled

App support must not provide channels, streams, playlists, or content.

## App Download Support

Support may provide:

- Download page link
- Supported device information
- Latest version information
- Installation steps
- Update instructions
- Changelog explanation
- Minimum version explanation

Support must not describe the app as including channels or content.

## App Version Support

Support may explain:

- Current app version
- Latest app version
- Minimum supported version
- Force update requirement
- Update required screen
- Download instructions

Support must not bypass force update rules.

Support must not tell users to use unsupported app versions.

## Remote Config Support

Support may explain user-facing remote config effects.

Examples:

- Maintenance mode is active.
- A feature is temporarily disabled.
- An announcement is visible.
- A minimum app version is required.

Support must not expose internal remote config secrets.

Remote config must not contain secrets.

## Maintenance Mode Support

When maintenance mode is active, support should say:

The platform is temporarily under maintenance. Please try again later. Your account and subscription records remain managed by the platform.

Support should not blame channels, streams, playlists, or content because the platform does not provide those.

## Playlist Support Boundary

The platform does not provide playlists.

Support may help with platform-side temporary transfer issues only when the feature is enabled.

Support may explain:

- Playlist information is entered inside the app by default.
- Playlist profiles are local-first.
- Playlist credentials are stored locally on the device by default.
- Optional web-to-device transfer is temporary.
- Transfer payload expires.
- Transfer payload is for the user's own device only.

Support must not provide actual playlist values.

## Local Playlist Profile Support

Support may help users understand app-local profile management.

Allowed guidance:

- How to add a profile in the app
- How to edit a local profile
- How to delete a local profile
- How to switch profiles
- How to use multiple profiles
- Why credentials are stored locally
- Why the backend is not playlist source of truth

Forbidden guidance:

- Where to find IPTV playlists
- Which playlist provider to use
- How to get paid channels
- How to bypass provider restrictions
- How to share playlist credentials
- How to scrape streams

## Temporary Playlist Transfer Support

When optional playlist transfer is enabled, support may help with:

- Transfer not appearing on device
- Transfer expired
- Wrong device selected
- Feature disabled
- Device ownership issue
- Transfer already consumed
- App version unsupported
- Maintenance mode blocking transfer

Support must not view or request playlist credentials.

Support must not ask users to send playlist passwords in support messages.

## Playlist Transfer Troubleshooting

Suggested troubleshooting steps:

1. Confirm the user is logged in.
2. Confirm the target device belongs to the user.
3. Confirm the device is active.
4. Confirm the feature flag is enabled.
5. Confirm the transfer has not expired.
6. Confirm the app version supports transfer.
7. Ask the user to refresh the app transfer screen.
8. Ask the user to create a new transfer if the old one expired.

Do not ask the user to paste playlist credentials into support chat.

## Privacy Rules

Support must protect user privacy.

Support must not disclose:

- Another user's account data
- Another reseller's customers
- Another customer's payments
- Password hashes
- Tokens
- Payment card data
- Payment provider secrets
- Playlist credentials
- Encryption keys
- Internal environment variables
- Database credentials

Support should verify account ownership before discussing sensitive account details.

## Identity Verification

Before sharing account-specific information, support should verify identity through approved methods.

Possible verification signals:

- Logged-in dashboard context
- Account email
- Payment reference
- Device name
- Support code when implemented
- Admin-visible account metadata

Support must not ask for passwords.

Support must not ask for full card numbers.

Support must not ask for playlist credentials.

## Sensitive Information Users May Accidentally Send

Users may accidentally send:

- Passwords
- Playlist URLs
- Playlist usernames
- Playlist passwords
- Provider credentials
- Payment card details
- Tokens
- Screenshots containing sensitive data

Support should tell users not to share sensitive data.

Support should avoid copying sensitive data into tickets, logs, or notes.

If sensitive data is sent, support should redact it where possible.

## Support Notes Rules

Support notes may include:

- Issue summary
- User ID or account reference
- Device status
- Subscription status
- Payment status
- Error code
- Troubleshooting steps
- Resolution
- Escalation details

Support notes must not include:

- Passwords
- Card numbers
- CVV
- Full tokens
- Playlist credentials
- Provider credentials
- Encryption keys
- Payment provider secrets
- Raw sensitive payloads

## Support Ticket System

A support ticket system may be added later.

Ticket fields may include:

- Ticket ID
- User ID
- Role
- Subject
- Category
- Priority
- Status
- Assigned agent
- Description
- Safe metadata
- Created date
- Updated date
- Closed date

Ticket system is post-MVP unless explicitly approved.

## Support Ticket Categories

Possible categories:

- Account
- Login
- Subscription
- Payment
- Device
- License
- App update
- Remote config
- Reseller credit
- Reseller customer
- Playlist transfer
- Bug report
- Feature request
- Security concern

Do not create categories for channel requests, stream requests, playlist provider requests, or content requests.

## Support Ticket Statuses

Possible statuses:

- OPEN
- PENDING_USER
- PENDING_INTERNAL
- ESCALATED
- RESOLVED
- CLOSED
- CANCELLED

Statuses should be clear and consistent.

## Support Priority Levels

Possible priorities:

- LOW
- NORMAL
- HIGH
- URGENT

Priority examples:

LOW:

- General question
- Documentation request
- Non-blocking UI issue

NORMAL:

- Payment question
- Device activation issue
- Subscription status confusion

HIGH:

- Payment approved but subscription not extended
- Reseller credit issue
- Multiple users affected

URGENT:

- Platform outage
- Login outage
- Payment webhook failure
- Security incident
- Data exposure concern

## Support Escalation

Support should escalate when:

- Security incident is suspected.
- Payment verification failed unexpectedly.
- Subscription did not extend after verified payment.
- Reseller credit balance is inconsistent.
- Device activation fails for many users.
- App version endpoint is failing.
- Remote config is incorrect.
- Audit logs show suspicious activity.
- User data exposure is suspected.
- Production outage is suspected.

## Engineering Escalation

Escalate to engineering when:

- API returns unexpected errors.
- Database state appears inconsistent.
- License status is incorrect.
- Device activation flow fails.
- Reseller credit transaction is inconsistent.
- Payment webhook is failing.
- App version response is wrong.
- Remote config response is wrong.
- Temporary playlist transfer fails due to backend logic.
- Security bug is suspected.

Engineering escalation should include safe metadata only.

## Payment Escalation

Escalate payment issues when:

- Payment is verified but subscription did not extend.
- Payment status is inconsistent.
- Manual payment approval failed.
- Duplicate payment processing is suspected.
- Refund issue requires admin review.
- Payment provider webhook failed.
- Provider reference cannot be matched.
- Amount mismatch occurs.
- Currency mismatch occurs.

Do not include card data in escalation notes.

## Reseller Credit Escalation

Escalate reseller credit issues when:

- Credit balance does not match transaction history.
- Credit use failed after subscription extension.
- Subscription extension failed after credit use.
- Negative balance appears.
- Duplicate credit transaction is suspected.
- Transaction history is missing expected record.
- Reseller reports cross-customer access issue.
- Reseller reports cross-reseller data visibility.

Credit issues should be handled carefully because they affect account value.

## Security Escalation

Escalate immediately when:

- Account takeover is suspected.
- Admin account compromise is suspected.
- Reseller sees another reseller's data.
- Customer sees another customer's data.
- Payment data exposure is suspected.
- Tokens are exposed.
- Secrets are exposed.
- Playlist credentials are exposed in logs.
- Production secrets are committed.
- Unauthorized role access occurs.

Security escalations should preserve logs and avoid deleting evidence.

## Incident Response Support Role

During incidents, support should:

- Use approved incident messaging.
- Avoid speculation.
- Collect safe user reports.
- Share known impact.
- Share expected next update when available.
- Avoid exposing internal details.
- Escalate affected user examples safely.
- Document user-facing impact.

Support should not make promises about exact resolution time unless approved.

## User Communication During Incidents

Approved incident communication style:

We are aware of an issue affecting platform access. Our team is investigating. TV Project Platform provides software/player access only and does not provide channels, streams, playlists, or content.

For payment incidents:

We are reviewing a payment processing issue. Subscription updates will only be applied after payment verification is confirmed.

For maintenance:

The platform is currently under maintenance. Please try again later.

## Support Response Tone

Support responses should be:

- Clear
- Calm
- Professional
- Helpful
- Direct
- Respectful
- Product-boundary safe

Avoid:

- Blaming users
- Overpromising
- Technical jargon
- Legal conclusions
- Content-provider language
- Unsupported guarantees

## Support Macros

Support may use approved response templates.

Macros should exist for:

- Product boundary explanation
- Account login issue
- Subscription expired
- Device activation issue
- Device limit reached
- Device blocked
- Payment pending
- Manual payment approved
- Manual payment rejected
- App update required
- Maintenance mode
- Reseller credit explanation
- Playlist transfer expired
- Playlist transfer not supported
- Channels or playlists request declined

## Macro - Product Boundary

Suggested response:

TV Project Platform is a licensed player platform. It does not provide channels, streams, playlists, or content. The platform manages software access, subscriptions, devices, payments, resellers, app versions, remote config, and related account features. Users are responsible for using their own legal playlist or provider information.

## Macro - Channel Request

Suggested response:

TV Project Platform does not provide TV channels, stream URLs, playlists, or content. Support can help with your account, subscription, device activation, app update, payment status, and platform usage, but we cannot provide or recommend channel sources.

## Macro - Playlist Request

Suggested response:

The platform does not provide playlists. Playlist information is entered inside the app by the user and stored locally on the device by default. Use only playlist or provider information that you are legally allowed to access.

## Macro - Login Issue

Suggested response:

Please confirm that you are using the correct account email. If password reset is available, use the password reset flow. Support will never ask for your password.

## Macro - Subscription Expired

Suggested response:

Your subscription appears to be expired. Subscriptions provide software/player access only. You may renew through the available payment or reseller flow when enabled.

## Macro - Device Activation Issue

Suggested response:

Device activation depends on your account status, subscription status, device limit, app version, and device status. Please check that your subscription is active and that your app is updated to the supported version.

## Macro - Device Limit Reached

Suggested response:

Your plan has a device limit. If the limit has been reached, you may need to remove an old device when that feature is available or contact support for review.

## Macro - Device Blocked

Suggested response:

This device is currently blocked and cannot pass license checks. Please contact support with your account email and device information. Do not send passwords or playlist credentials.

## Macro - Payment Pending

Suggested response:

Your payment is pending review or verification. Subscription access is extended only after payment is verified or approved by the backend.

## Macro - Manual Payment Approved

Suggested response:

Your manual payment has been approved. Subscription access should update according to the selected software/player access plan.

## Macro - Manual Payment Rejected

Suggested response:

Your manual payment was not approved. Please review the payment instructions or contact support with your payment reference. Do not send card details.

## Macro - App Update Required

Suggested response:

A newer app version is required. Please download and install the latest supported version from the official download page to continue using licensed player access.

## Macro - Maintenance Mode

Suggested response:

The platform is currently under maintenance. Please try again later. Maintenance mode affects platform access and does not relate to any provided channels or content because the platform does not provide channels or content.

## Macro - Reseller Credit

Suggested response:

Reseller credit is used for software/player subscription operations. Credit changes are transaction-based and include a history record. Reseller credit does not represent channel, stream, playlist, or content access.

## Macro - Playlist Transfer Expired

Suggested response:

The temporary playlist profile transfer has expired. You may create a new transfer for your own device when the feature is enabled. The platform does not provide playlists and does not store playlist credentials permanently by default.

## Support Knowledge Base

A support knowledge base may be created later.

Suggested articles:

- What is TV Project Platform?
- Does the platform provide channels?
- How subscriptions work
- How device activation works
- How app updates work
- How payments work
- How manual payment review works
- How reseller credit works
- How resellers manage customers
- How local playlist profiles work
- How temporary playlist transfer works
- How to contact support safely

Knowledge base articles must respect product boundary.

## FAQ Support Requirements

Support FAQ should answer:

- Does the platform provide channels?
- Does the platform provide playlists?
- What am I paying for?
- How do I activate a device?
- Why is my license denied?
- Why is my subscription expired?
- Why is my device blocked?
- Why do I need an app update?
- How does reseller credit work?
- How does temporary playlist transfer work?

Answers must be product-boundary safe.

## Support Data Access

Support access should follow least privilege.

Support staff should only see what is necessary.

Support staff should not see:

- Password hashes
- Full tokens
- Payment card data
- Provider secrets
- Playlist credentials
- Encryption keys
- Database passwords
- Other reseller data outside scope
- Sensitive audit metadata unless authorized

## Role-Based Support Access

Customer support agents may eventually have limited access.

Possible future support role requires approval.

Support role may be allowed to:

- View basic user account status
- View subscription status
- View payment status
- View device status
- View safe audit summaries
- Add support notes
- Escalate tickets

Support role must not:

- Add reseller credit
- Approve payments
- Change roles
- View secrets
- View playlist credentials
- Access unrelated reseller data
- Modify app versions
- Modify remote config

## Support Role Is Post-MVP

A dedicated support staff role is post-MVP unless approved.

MVP may rely on admin users for support operations.

If a support role is added later, it must have strict permissions and audit logs.

## Audit Logging For Support

Support-related actions should be audit logged when implemented.

Actions may include:

- Support views user account
- Support updates support note
- Support escalates ticket
- Support closes ticket
- Support changes account status if allowed
- Support triggers password reset when supported
- Support reviews payment status
- Support reviews device status

Audit logs must not contain sensitive data.

## Support SLAs

Formal SLAs are post-MVP unless approved.

Possible response targets:

LOW:

- Response when available

NORMAL:

- Standard support response

HIGH:

- Prioritized review

URGENT:

- Immediate escalation to operators or engineering

Do not publish strict SLA guarantees unless approved.

## Support Hours

Support hours should be defined before public launch.

Support hours may depend on:

- Team availability
- Launch stage
- Region
- Payment provider support
- App release schedule

Do not promise 24/7 support unless the operation can actually provide it.

## Refund Support

Support may explain refund policy.

Support must not guarantee refunds outside approved policy.

Refund support may include:

- Refund eligibility explanation
- Payment status review
- Manual refund review escalation
- Provider refund reference later
- Admin review flow

Refund support must explain payments are for software/player access only.

Refund support must not discuss refunds for missing content because the platform does not provide content.

## Legal Support Boundary

Support may explain product terms at a high level.

Support must not provide legal advice.

Support should direct legal questions to the official terms, privacy policy, refund policy, and acceptable use policy.

Support must not verify third-party content legality.

Support should remind users to use only legal playlist or provider information.

## Abuse Support

Support should escalate abuse reports.

Abuse may include:

- Account sharing abuse
- Payment fraud
- Reseller abuse
- Unauthorized access
- Attempts to use platform for illegal content
- Attempts to sell channels through platform
- Attempts to distribute playlists through platform
- Attempts to bypass license checks

Abuse reports should be documented safely.

## Account Sharing Support

Account sharing rules should be defined in terms.

Support may explain:

- Device limits
- Account responsibility
- Subscription status
- Device activation limits
- Suspicious access review

Support must not help users bypass device limits.

## Fraud Support

Fraud-related issues must be escalated.

Possible fraud signals:

- Duplicate payment claims
- Suspicious reseller credit usage
- Many failed logins
- Unusual device activation patterns
- Cross-account access attempts
- Payment disputes
- Chargebacks later

Support must not accuse users without evidence.

Support should escalate to admin or security review.

## Bug Reports

Support should collect bug reports with safe details.

Useful details:

- Account email
- Role
- Device type
- App version
- Browser
- Error code
- Time of issue
- Steps to reproduce
- Screenshot with sensitive data removed

Do not collect passwords, tokens, card data, or playlist credentials.

## Feature Requests

Support may collect feature requests.

Feature requests should be categorized.

Requests that require approval:

- Real payment provider integration
- Email notifications
- SMS notifications
- Support ticket system
- Invoice generation
- PDF receipts
- Advanced reseller reports
- Encrypted cloud playlist sync
- Multi-language UI

Requests that violate product boundary must be rejected.

## Forbidden Feature Requests

Support must reject feature requests for:

- Channel lists
- Stream URLs
- IPTV playlist marketplace
- Content catalogs
- Channel packages
- Stream hosting
- Stream relay
- Stream transcoding
- CDN stream delivery
- Broadcast schedules
- Public playlist search
- Provider credential sharing

## Support Documentation Links

Support should rely on approved documentation.

Important files:

- README.md
- PROJECT_STATE.md
- AI_HANDOFF.md
- ROADMAP.md
- SECURITY.md
- LEGAL_SCOPE.md
- project-bible directory
- docs directory

Support knowledge should not contradict project-bible decisions.

## New Chat Support Handoff

Future assistants should check:

- docs/new-chat-start-message.md
- AI_HANDOFF.md
- PROJECT_STATE.md
- project-bible files

Support answers must preserve product decisions.

Do not invent implementation status.

Do not assume the backend or frontend is complete unless PROJECT_STATE.md says so.

## Support Testing Requirements

Support-related tests should verify:

- Support copy does not imply content access.
- FAQ states channels are not provided.
- Payment support copy says software/player access only.
- Playlist transfer support copy says transfer is temporary.
- Support forms do not ask for passwords.
- Support forms do not ask for card data.
- Support forms do not ask for playlist credentials.
- Support role cannot access admin-only actions when added.
- Support role cannot view sensitive data when added.

## Support UI Requirements

Support UI may include:

- Support page
- FAQ links
- Contact form later
- Ticket list later
- Ticket detail later
- Safe attachment upload later
- Category selector
- Priority selector
- Product boundary statement

Support UI must not include:

- Channel request form
- Playlist request form
- Stream URL request form
- Provider recommendation form
- Content request form

## Support Form Fields

A future support form may include:

- Name
- Email
- Category
- Subject
- Message
- Account reference
- Device type
- App version
- Payment reference when needed
- Safe screenshot upload later

The form should warn users not to submit passwords, card data, tokens, or playlist credentials.

## Support Attachment Rules

Attachments are post-MVP unless approved.

If support attachments are added:

- Validate file type.
- Limit file size.
- Scan files where practical.
- Store securely.
- Avoid public exposure.
- Redact sensitive data when possible.
- Do not accept playlist files as support-provided content.
- Do not use uploads for stream hosting.

## Support Metrics

Future support metrics may include:

- Open tickets
- Resolved tickets
- Average response time
- Common categories
- Payment issue count
- Device activation issue count
- App update issue count
- Reseller credit issue count
- Escalation count

Metrics must not track channel or content support because the platform does not provide content.

## Support Quality Checklist

Before sending a support response, verify:

- The answer is accurate.
- The answer respects product boundary.
- The answer does not provide channels.
- The answer does not provide streams.
- The answer does not provide playlists.
- The answer does not request sensitive data.
- The answer does not expose internal secrets.
- The answer does not promise unauthorized actions.
- The answer gives a clear next step.

## MVP Support Scope

MVP support should include:

- Basic support page
- FAQ page
- Product boundary explanation
- Account support guidance
- Subscription support guidance
- Device activation support guidance
- Payment support guidance
- Reseller credit support guidance
- App update support guidance
- Manual support process through admin users

MVP does not require a full ticket system unless approved.

## Post-MVP Support Scope

Post-MVP support may include:

- Ticket system
- Support staff role
- Support dashboard
- Support macros
- Email notifications
- Attachment uploads
- Support analytics
- Knowledge base
- User-facing ticket history
- SLA tracking
- Escalation workflow

Each post-MVP support feature requires approval.

## Forbidden Support Behavior

Support must not:

- Provide channels.
- Provide stream URLs.
- Provide playlists.
- Recommend IPTV providers.
- Sell channel packages.
- Troubleshoot third-party content as platform content.
- Ask for passwords.
- Ask for CVV.
- Ask for full card numbers.
- Ask for playlist credentials.
- View or expose secrets.
- Bypass license checks.
- Bypass payment verification.
- Modify reseller credit without approved admin workflow.
- Delete credit transaction history.
- Encourage illegal content access.

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

Do not create conflicting alternative support files.

## Final Rule

Support must help users with the licensed player platform only.

Support may help with accounts, subscriptions, devices, licenses, payments, resellers, app versions, remote config, audit logs, and optional temporary playlist transfer.

Support must not provide channels, streams, playlists, provider credentials, content recommendations, channel packages, or broadcast access.