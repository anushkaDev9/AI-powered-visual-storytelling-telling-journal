# AI-powered-visual-storytelling-telling-journal
## Project Description:
The Visual Storytelling Journal is a web-based Single Page Application (SPA) that transforms users’
personal photo collections into engaging narrative storybooks. By integrating the Google Vision API,
the system extracts meaningful details such as objects, scenes, and text from images, while the Google
Gemini API weaves these insights into creative, diary-like narratives. Users can connect their Google
Photos or Pinterest accounts, select albums, and instantly generate unique storybooks that combine
visuals with AI-driven storytelling. All results are stored securely in Google Firestore, allowing users to
revisit, share, and personalize their journals, making photo memories more meaningful and
interactive.
## Mock up interfaces
### Intro/Public Home Page
Purpose: Introduce the app to visitors and encourage sign-up/sign-in.
1. Hero Section: <br/>
   a. Headline: *Turn your photos into AI-powered stories*<br/>
   b. Subheading: *Import your memories, and let AI craft them into visual narratives.*<br/>
   c. Background illustration: abstract AI + journaling / pen motif<br/>
2. Feature Highlights Section:<br/>
   a. Cards or icons explaining:<br/>
     i. Import photos from Google Photos or Pinterest<br/>
     ii. Vision API extracts objects, scenes, text<br/>
     iii. Gemini generates creative story narratives<br/>
     iv. Save and revisit AI-generated storybooks<br/>
3. Call-to-Action (CTA) Buttons:<br/>
   a. “Sign Up” / “Sign In”<br/>
   b. Optional “Learn More”<br/>
4. Optional Visuals / Testimonials:<br/>
   a. Sample AI story screenshots or user quotes<br/>
### Dashboard Page
Purpose: Overview of user’s AI storybooks and quick access to new entries.
Layout:
1. Top Navigation Bar:<br/>
  a. Logo: “Visionary Journal AI” (top left)<br/>
  b. Menu: Home | My Storybooks | Insights | Settings | Sign Out<br/>
2. Intro Section:<br/>
  a. Welcome message: *Turn your photos into AI-powered stories.*<br/>
  b. Big central button: “New Storybook” (floating/central)<br/>
3. Recent Storybooks Panel:<br/>
  a. Card-style previews of AI-generated storybooks:<br/>
    i. Thumbnail of first image + short narrative excerpt<br/>
    ii. Mood tag (Happy / Reflective / Adventurous)<br/>
    iii. Date of creation<br/>
4. Quick Stats / Insights Section:<br/>
   a. Word count trend across stories<br/>
   b. Mood distribution<br/>
   c. Most common themes / objects from Vision API<br/>
