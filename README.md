# Cheapify Site

DEPLOY
npm run build // en lugar de npx vite build
npm run dev


netlify login
netlify deploy
netlify deploy --prod


## Reddit
### NikosK87
Some feedback: it’s not super straightforward to understand how it works right now. I’d suggest simplifying the UI.

For each item, just show the cheapest option you recommend (based on lowest price). That way, the first screen basically looks like a shopping list with the cheapest items and where to buy them. I don’t need to see the priciest alternative up front—those could be shown if I click into an item. For example: click on “bananas” and then you can see all the options.

Also, I’d rethink the supermarket color coding. Having “Asda” in green doesn’t help—green should mean “cheapest.” I’d go with a traffic-light style (green = cheapest, amber = mid, red = most expensive).

Ideas for future releases: • Search function • Ability to sort items • Option to include/exclude certain supermarkets (e.g. if I don’t have Aldi nearby, I don’t need to see it even if it’s the cheapest) • Select items into a basket/shopping list and show total savings at the end

And just a general note: building an app like this takes time and effort. Even if someone doesn’t like it, let’s give constructive, respectful feedback. Saying “it’s shit” doesn’t help. Explaining why and offering suggestions does.