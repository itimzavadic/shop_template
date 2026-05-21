# Design System

## 1. Overview
This is a modern, minimalist e-commerce platform focused on curated fashion, footwear, and accessories. The design emphasizes product imagery, presented in a clean, uncluttered layout with a monochromatic color palette. The user interface is sparse and functional, letting the photography and product information take center stage. There are no obvious platform-specific CSS variable prefixes (like `--sqs-` or `--wf-`) to identify the underlying platform explicitly.

## 2. Colors
The color palette is predominantly monochromatic, relying on black, white, and various shades of grey, with product imagery providing visual interest and color.

*   **Primary Background**: `rgb(255, 255, 255)` (White) - Dominant background for content areas and product grids.
*   **Secondary Background**: `rgb(240, 240, 240)` (Light Grey) - Used for background sections such as the "Winter '28" editorial block.
*   **Primary Text**: `rgb(0, 0, 0)` (Black) - Used for most headings, navigation, and primary product information.
*   **Secondary Text**: `rgb(120, 120, 120)` (Mid Grey) - Used for smaller text, prices, and descriptive labels.
*   **Border Color**: `rgb(229, 231, 235)` (Light Grey) - Subtle borders, not visibly prominent in the screenshot.
*   **Accent Color**: There is no prominent brand accent color visible on the page that carries significant visual weight across multiple elements. The design relies on a neutral palette. While the CSS variables include `--accent: #16DB65;`, this color is not visually utilized as an accent in the screenshot.

## 3. Typography
The typography is clean and modern, primarily using one sans-serif font family.

*   **Font Family**: `NeueHaasGroteskDisplayPro, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`
*   **Font Sizes**:
    *   `14px` (e.g., product titles)
    *   `12px` (e.g., product prices, "Shop Now" links, category tags)
    *   `10px` (e.g., "Latest Arrivals" section title)
    *   `9px` (e.g., small labels like "NEW", "LATEST")
*   **Font Weights**:
    *   `400` (Regular)
    *   `500` (Medium)
*   **Letter Spacing**:
    *   `0.2896px` (Appears to be used for headings and navigation to give a slightly open feel).
*   **Line Heights**:
    *   `18px`
    *   `16px`
    *   `12px`
    *   `9px`

## 4. Spacing & Layout
The layout emphasizes clear visual separation and structured grids.

*   **Header Padding**: Minimal, contributing to a sparse header density.
*   **Section Padding**: Varied, but sections are generally full-width.
    *   `28px` (e.g., horizontal padding for full-bleed sections)
    *   `0px 12px` (e.g., inner padding for product cards)
    *   `0px 16px` (e.g., horizontal padding within content containers)
*   **Element Spacing**:
    *   `6px 0px 0px` (e.g., spacing below product names)
    *   `8px 0px 0px` (e.g., spacing below categories)
    *   `0px auto 0px 0px` (e.g., for left-aligned auto-margin elements)
*   **Grid Gaps**:
    *   `--grid-gap: .5rem` (small gaps between grid items)
    *   `--grid-gap-y: 3rem` (larger vertical gaps between grid rows)
*   **Dominant Layout Pattern**: Vertically stacked full-width sections. Within these sections, a strong grid pattern is used for product listings (2-column, 4-column, sometimes 3-column in "Staff Selects"). Hero sections often use a 2-column full-bleed image grid. Editorial content blocks (e.g., "Winter '28") feature a left-aligned image with right-aligned text.

## 5. Photography & Visual Style
Photography is a primary design element and the main carrier of brand emotion.

*   **Usage**: Images are used prominently, often full-bleed at the top of the page, or within clean, contained grids for product listings and editorial features. Text is sometimes overlaid on hero images.
*   **Photographic Style**: A mix of professional studio shots for products (e.g., sunglasses, footwear) and candid, lifestyle, or editorial photography for featured collections and models. The overall aesthetic is high-fashion, clean, and aspirational.
*   **Brand Emotion**: Imagery is the primary emotional carrier, conveying a sense of curated style, quality, and a fashionable lifestyle.

## 6. Elevation & Shadows
No significant box shadows or elevation are visible on elements within the screenshot. The design is flat and clean. The `boxShadows` array in the tokens is empty, reinforcing this observation.

## 7. Border & Shape
*   **Border Radius**: Elements primarily have sharp, rectilinear edges. A subtle `4px` border-radius is present in the tokens, but not visibly prominent on significant UI elements in the screenshot. Product images appear to be sharp-edged.
*   **Borders**: Minimal usage. Elements are mostly separated by white space rather than explicit borders.

## 8. Components
*   **Header**: White background, dense (logo left, navigation right).
*   **Navigation**: Text-based links (MENU, SEARCH, CART) in ALL CAPS. Logo is text "ABOVE THE CLOUDS" in ALL CAPS.
*   **Hero Sections**: Large, often full-bleed image blocks, sometimes divided into two columns, with overlaid text in Title Case and a "SHOP NOW" call-to-action.
*   **Product Cards**: Images with product name (Title Case), brand name (Title Case), and price (e.g., $110.00) below. Sometimes includes a small "NEW" or category tag.
*   **Call-to-Action Links**: "SHOP NOW" in ALL CAPS, usually black text on a white background or directly on an image.
*   **Editorial Blocks**: Sections combining an image and descriptive text, often introducing new collections or themes.
*   **Scroll Indicator**: A small circular black button with a white dot, floating on the right edge of the viewport, indicating scroll position/interaction.

## 9. Content Structure Pattern
The page is structured as a series of vertically stacked, full-width content blocks. These blocks alternate between:
*   Large hero image sections (often 2-column layouts).
*   Horizontal grid layouts for product listings (typically 4-column, but also 2-column or 3-column variants).
*   Editorial or featured collection blocks with a combination of image and text.
The overall flow is a curated showcase of products and brands, leading the user through different collections and categories.

## 10. Brand Voice
The brand voice is sophisticated, curated, and direct, reflecting a high-end fashion retailer.
*   **Curatorial**: Emphasizes "Globally Curated Fashion, Footwear & Accessories" (from title) and featuring specific brands like "MHL. By Margaret Howell", "Metalwood", "ERL", and "Larriet".
*   **Concise & Direct**: Headings are brief and informative, e.g., "Latest Footwear", "Staff Selects", "Winter '28".
*   **Quality & Craft**: The introduction to "Larriet" ("A return to essentials. Designed in Melbourne and built to layer, last and live in;") speaks to product quality, timelessness, and functionality.
*   **Engaging but Understated**: Uses phrases like "we're pleased to welcome the latest collection from Larriet" to engage without being overly promotional.

## 11. Brand Assets & Key Concepts
*   **Brand Name**: "ABOVE THE CLOUDS"
*   **Featured Brands/Collections**: "MHL. By Margaret Howell", "Metalwood", "ERL", "Larriet", "Cherrys Los Angeles"
*   **Product Categories**: "Latest Footwear", "Latest Arrivals", "Staff Selects", "Winter '28"
*   **Brand Philosophy (Larriet)**: "A return to essentials. Designed in Melbourne and built to layer, last and live in;"

## 12. Do's and Don'ts
*   **DO** prioritize high-quality, professional photography as the primary visual storytelling element.
*   **DO** maintain a clean, minimalist aesthetic with ample white space.
*   **DO** use a monochromatic color palette of black, white, and greys, allowing product colors to stand out.
*   **DO** keep typography clean, legible, and consistent, using NeueHaasGroteskDisplayPro.
*   **DO** use clear, concise headings and product descriptions.
*   **DO** structure content in distinct, full-width vertical sections, often employing grid layouts for products.
*   **DO** use ALL CAPS for navigation links and the brand logo, and Title Case for product names and major headings.
*   **DON'T** introduce extraneous colors as accents unless explicitly part of a new brand campaign.
*   **DON'T** use heavy shadows or complex gradients; maintain a flat design.
*   **DON'T** clutter the layout with unnecessary UI elements or excessive text.
*   **DON'T** deviate from the established font family and minimal font variations.