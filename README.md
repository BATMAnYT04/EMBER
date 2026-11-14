# EMBER website — GitHub Pages

A responsive, single-page event and experiences website built with plain HTML, CSS and JavaScript.

## Files
- `index.html` — page structure and content
- `style.css` — responsive visual design
- `script.js` — navigation, enquiry form and interactions
- `config.js` — public contact details and Formspree endpoint
- `privacy.html` — starter privacy notice (review before launch)

## 1. Preview locally
Open `index.html` in a browser. The site can be previewed without a build step.

## 2. Connect the enquiry form (Formspree)
The form is not connected until you configure it.

1. Create an account at https://formspree.io/
2. Create a new form and verify the email address where you want to receive enquiries.
3. Copy the endpoint Formspree gives you. It looks like `https://formspree.io/f/abcdefgh`.
4. Open `config.js` and replace `https://formspree.io/f/YOUR_FORM_ID` with your real endpoint.
5. Update `contactEmail`, `instagramHandle`, and `instagramUrl`.
6. Submit a test enquiry from the published site and confirm that it arrives.

Formspree's free plan and limits may change; check its current plan details. The endpoint is public by design. Do not place passwords, secret API keys, payment credentials or other private secrets in this repository.

## 3. Personalise before launch
Search the files for `EMBER`, `yourdomain.com`, `@ember`, and `Greater Noida` and update them as needed. Replace the sample photos with photos you own or have permission to use. Check that all package prices and inclusions are accurate. Remove or revise any services you do not actually offer.

The package amounts are illustrative starting ranges, not guaranteed quotes.

## 4. Publish with GitHub Pages
1. Create a GitHub repository, for example `ember-website`.
2. Upload all files from this folder to the repository root (not inside an extra nested folder).
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then save.
6. Wait for the Pages deployment to finish. GitHub will show the published URL in the Pages section.

## 5. Before announcing the website
- Configure and test the form.
- Update the contact details and social links.
- Add a real privacy notice and contact email.
- Confirm permission to use every image, logo, font and testimonial.
- Test on a phone and desktop.
- Verify that all prices, package descriptions, locations and claims are accurate.

## Notes
GitHub Pages is static hosting. It does not itself store form entries or send email. The form sends submissions to the third-party endpoint configured in `config.js`.
