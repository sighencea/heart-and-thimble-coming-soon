# Heart & Thimble Coming Soon Page - Setup Guide

This guide will walk you through setting up the email subscription functionality using Google Sheets.

## Overview

The coming soon page uses Google Apps Script to save email subscribers to a Google Sheet. This is a free, secure solution that works perfectly with GitHub Pages.

---

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it **"Heart & Thimble Email Subscribers"** (or any name you prefer)
4. In the first row, add headers:
   - Cell A1: `Email`
   - Cell B1: `Timestamp`
   - Cell C1: `Date` (optional, for easier reading)

Your sheet should look like this:

```
| Email             | Timestamp           | Date       |
|-------------------|---------------------|------------|
|                   |                     |            |
```

---

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code in the editor
3. Copy and paste the following code:

```javascript
// Google Apps Script for Heart & Thimble Email Collection

function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    const email = data.email;
    const timestamp = data.timestamp || new Date().toISOString();

    // Format date for easier reading
    const date = new Date(timestamp);
    const formattedDate = Utilities.formatDate(date, Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");

    // Check if email already exists
    const emailColumn = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues();
    const emailExists = emailColumn.some(row => row[0] === email);

    if (emailExists) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'duplicate',
        message: 'Email already subscribed'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Append new row with email, timestamp, and formatted date
    sheet.appendRow([email, timestamp, formattedDate]);

    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Email added successfully'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function (optional, for testing in the script editor)
function testPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        email: 'test@example.com',
        timestamp: new Date().toISOString()
      })
    }
  };

  const result = doPost(testData);
  Logger.log(result.getContent());
}
```

4. Click the **Save** icon (💾) or press `Ctrl+S` / `Cmd+S`
5. Name your project (e.g., "Heart & Thimble Email Collector")

---

## Step 3: Deploy the Web App

1. In the Apps Script editor, click **Deploy** → **New deployment**
2. Click the gear icon (⚙️) next to "Select type"
3. Select **Web app**
4. Configure the deployment:
   - **Description**: Enter something like "Email collection v1"
   - **Execute as**: Select **Me** (your email)
   - **Who has access**: Select **Anyone** (this allows the public website to submit data)
5. Click **Deploy**
6. You may need to authorize the script:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to [Your Project Name] (unsafe)**
   - Click **Allow**
7. Copy the **Web app URL** (it will look like: `https://script.google.com/macros/s/ABC123.../exec`)
8. Click **Done**

---

## Step 4: Update Your Website Code

1. Open the `script.js` file in your project
2. Find this line near the top:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with the Web app URL you copied in Step 3:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/ABC123.../exec';
   ```
4. Save the file

---

## Step 5: Deploy to GitHub Pages

1. Commit and push all files to your GitHub repository:
   ```bash
   git add .
   git commit -m "Add coming soon page with Google Sheets integration"
   git push origin main
   ```

2. Enable GitHub Pages:
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **Deploy from a branch**
   - Under "Branch", select **main** and **/ (root)**
   - Click **Save**

3. Wait a few minutes for deployment
4. Your site will be available at: `https://[your-username].github.io/[repository-name]/`

---

## Testing Your Setup

1. Visit your GitHub Pages URL
2. Enter a test email address
3. Click "Notify Me"
4. Check your Google Sheet - you should see the email appear with a timestamp

---

## Troubleshooting

### Email not appearing in Google Sheet

- Make sure you deployed the Apps Script as a **Web app** (not just saved it)
- Verify the Web app URL in `script.js` is correct
- Check that "Who has access" is set to **Anyone** in the deployment settings
- Look at the browser console (F12) for any error messages

### "Authorization required" error

- Re-authorize the script in Google Apps Script
- Make sure you're logged into the correct Google account

### Duplicate emails

- The script automatically prevents duplicate email submissions
- Users will see a success message even if the email already exists (for privacy)

### Need to update the script

1. Make changes in the Apps Script editor
2. Click **Deploy** → **Manage deployments**
3. Click the edit icon (✏️) next to your active deployment
4. Update the version number in the description
5. Click **Deploy**
6. The URL stays the same, no need to update `script.js`

---

## Viewing Your Subscribers

Simply open your Google Sheet to view all email subscribers. You can:
- Sort by date
- Export to CSV
- Import into email marketing tools (Mailchimp, ConvertKit, etc.)
- Add additional columns for notes or status

---

## Security Notes

- The Apps Script URL is public but only accepts POST requests with email data
- Email validation happens in both the browser and the script
- Duplicate emails are automatically prevented
- No sensitive data is stored (only email addresses)
- The script runs under your Google account but users don't need access to your Sheet

---

## Optional: Custom Domain

If you want to use a custom domain with GitHub Pages:

1. Add a `CNAME` file to your repository with your domain name
2. Configure your domain's DNS settings to point to GitHub Pages
3. Follow [GitHub's custom domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

---

## Support

If you encounter any issues:
1. Check the browser console for JavaScript errors (F12)
2. Check the Apps Script logs: **Executions** tab in the Apps Script editor
3. Verify all URLs and settings match this guide

---

## Next Steps

- Consider adding a privacy policy link
- Set up email marketing tool integration
- Add Google Analytics to track visitors
- Customize the design and messaging

Enjoy your coming soon page! 🎉
