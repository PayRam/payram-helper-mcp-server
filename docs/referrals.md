# Referral FAQ's

### Referral Campaigns

* [How do I set up a referral campaign?](#how-do-i-set-up-a-referral-campaign)

#### How do I set up a referral campaign?

PayRam’s dashboard provides a **Referral Campaign** workflow (under *Growth → Campaigns*). To set one up:

* **Create a new campaign**: In the PayRam Dashboard, go to *Growth → Campaigns → Create New Campaign*. Enter the campaign name, description, budget, duration, and select which events will trigger rewards. Campaigns are tied to a specific project and have their own event rules. Save the campaign – PayRam will generate an `event_key` (a unique identifier for your trigger event).
* **Embed referral dashboard**: Use PayRam’s iframe-based referral dashboard on your site. Your backend must call PayRam’s referral-auth API to get an iframe URL, then set an `<iframe>` on your page with that URL. This allows users to log in to the referral dashboard.
* **Link referrers and referees**: When a new user signs up with a referral code (from a referrer), call the PayRam **Referee** API. Send a POST to `/api/v1/referral/referee` with your API key and a JSON body including the referee’s email, the referrer’s code, and a unique referenceID. This links the new user to their referrer in PayRam’s system.
* **Trigger events**: When a configured action happens (e.g. first purchase), call the **Event Log** API. Send a POST to `/api/v1/referral/event-log` with your API key and JSON containing `eventKey` (the key from campaign setup), the referee’s referenceID, and optionally `amount`. This notifies PayRam of the event so it can apply rewards.

By following these steps (create campaign, embed the widget, link users, and log events), you fully integrate PayRam’s referral/affiliate system.
