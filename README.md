# Heart & Thimble - Coming Soon Page

A beautiful, responsive coming soon landing page for Heart & Thimble, featuring email subscription collection via Google Sheets.

## Features

- Clean, elegant design with warm color palette
- Responsive layout (mobile, tablet, and desktop)
- Email subscription form with validation
- Google Sheets integration for subscriber storage
- Animated SVG logo with heart and thimble illustration
- Instagram social link
- No database required - perfect for GitHub Pages

## Preview

The page features:
- **Background**: Warm beige (#f5e6d3)
- **Primary text**: Brown (#8b7355)
- **Accents**: Rust brown (#a07856) and sage green (#88a896)
- **Typography**: Serif font for the title, sans-serif for body text

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/[your-username]/heart-and-thimble-coming-soon.git
cd heart-and-thimble-coming-soon
```

### 2. Set Up Google Sheets Integration

Follow the detailed instructions in [SETUP.md](SETUP.md) to:
1. Create a Google Sheet for subscribers
2. Deploy a Google Apps Script web app
3. Update the script URL in `script.js`

### 3. Deploy to GitHub Pages

```bash
git add .
git commit -m "Configure Google Sheets integration"
git push origin main
```

Then enable GitHub Pages in your repository settings (Settings → Pages → Source: main branch).

## Files

- `index.html` - Main HTML structure
- `styles.css` - All styling and responsive design
- `script.js` - Form handling and Google Sheets integration
- `SETUP.md` - Detailed setup instructions for Google Sheets
- `README.md` - This file

## Customization

### Change Colors

Edit `styles.css` and replace the color variables:
- Background: `#f5e6d3`
- Primary text: `#8b7355`
- Accents: `#a07856`, `#88a896`

### Update Content

Edit `index.html` to change:
- Page title
- Description text
- Instagram URL (already set to @heart_and_thimble)

### Modify Logo

The SVG logo can be customized in `index.html` within the `.logo` div.

## Technologies Used

- HTML5
- CSS3 (with animations)
- Vanilla JavaScript (no frameworks)
- Google Apps Script (backend)
- Google Sheets (database)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

This project is open source and available for personal and commercial use.

## Support

For setup help, see [SETUP.md](SETUP.md) or open an issue on GitHub.

---

Made with care for Heart & Thimble 🧵❤️
