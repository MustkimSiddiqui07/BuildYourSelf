# Nutrition tracker

Track daily calories, protein, carbs, fat and fiber. Choose a goal (lean bulk, bulk, fat loss or maintain), get a target from your body details, see pop-up alerts, meal ideas and a target tracker. Everything is stored in your own browser (localStorage). No account or server database.

## Run it

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
npm start          # http://localhost:3000
npm run dev        # same, restarts if server.js changes
npm run check      # syntax-check all JavaScript files
```

The server prints a **Network** address too. Open it on your phone (same Wi-Fi) to test the mobile layout.

You can also double-click `index.html`. It works without a server because the scripts are plain files, not modules.

### Docker

```bash
docker build -t nutrition-tracker .
docker run --rm -p 3000:3000 nutrition-tracker
```

### Deploy

It is a static site. Upload the folder (without `server.js`, `scripts/`, `Dockerfile`) to Netlify, GitHub Pages, Vercel or any web host.

## Project structure

```
index.html            page structure only
css/
  base.css            colors (light and dark), reset, typography
  layout.css          page grid, cards
  components.css      forms, buttons, tracker, dialogs, avatar
  themes.css          colour theme palettes (ocean, violet, sunset, rose)
  responsive.css      phone, tablet, large screen, touch, print
js/                   loaded in this order by index.html
  config.js           YOUR name and social media links (edit this)
  data.js             foods, goal categories, meal ideas
  utils.js            helpers ($, esc, fmt) and the food table
  storage.js          state and localStorage load/save
  nutrition.js        calorie math, plan, daily score
  foodlog.js          add foods, custom foods, preview
  ui.js               main screen rendering
  tracker.js          reached, close and missed days
  suggestions.js      breakfast, lunch, snack, dinner ideas
  setup.js            body details and goal selection
  alerts.js           over and under target pop-ups
  profile.js          name and profile photo editor
  theme.js            light/dark/auto mode and colour themes
  welcome.js          welcome pop-up (first visit, new account, welcome back)
  footer.js           footer owner name and social media buttons
  app.js              event wiring and start-up
server.js             tiny static server (no dependencies)
scripts/check.js      syntax check
```

## Customize

- Add foods: edit the `FOODS` table in `js/data.js` (`name|kcal|protein|carbs|fat|fiber|piece weight`, per 100 g).
- Change meal ideas: edit `SUG` in `js/data.js`. Food names must match the table.
- Change goal percentages: edit `CATS` in `js/data.js`.
- Footer name and social links: edit `js/config.js` (paste your links between the quotes; leave one empty to hide it).
- Theme options: edit `THEMES` in `js/data.js` and add a matching palette in `css/themes.css`.
- Data is saved under the key `nutri-tracker-v1`. Clear it in your browser to start over.

Calorie targets use the Mifflin-St Jeor estimate. They are estimates, not medical advice.
