# Cerebrum Shopify section

This is an add-on for an existing Shopify Online Store 2.0 theme, not a complete theme ZIP. It has not been uploaded or validated against a live Shopify store.

1. Duplicate the selected native theme as an unpublished draft.
2. Add `sections/cerebrum-editorial.liquid` and optionally `templates/page.cerebrum.json` to the corresponding theme folders.
3. Add the Cerebrum editorial section through the homepage theme editor, or assign the `cerebrum` template to a new Page for review. Do not replace the live homepage before testing.
4. Choose a real published collection, set the actual artwork photograph and caption, and add artist/journal story blocks. Product images, vendor, price, links and availability come from Shopify's product records.
5. Configure the native theme header with the existing logo and navigation. Its product pages, cart, policies, language selector, search and hosted checkout remain the shopping implementation. Translate section settings through the store's supported translation workflow.
6. Configure legal seller identity, payments, tax treatment, delivery zones/rates and returns. One-off stock must be tracked with overselling disabled.
7. Run theme validation inside the Shopify workflow, preview mobile and desktop, and complete a test order, inventory check, confirmation and refund before domain cutover.

No card-entry form or client-side inventory is implemented. The static editorial prototype is a visual reference; it does not claim to have a live cart.

Documentation used: https://shopify.dev/docs/storefronts/themes/architecture/sections and https://shopify.dev/docs/api/liquid/objects/product .


The page template now contains both maker stories: musucus and otumn. Upload `commerce-preview/assets/musucus-logo.webp` and `commerce-preview/assets/otumn-logo.jpg` to Shopify Files and select each in its story block’s **Maker logo** field. Both official destinations are preconfigured.
