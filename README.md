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
### New Storybook Page
Purpose: Import photos, process with Vision API + Gemini, generate narrative storybook.<br/>
Layout:<br/>
1. Photo Import Section (top):<br/>
  a. Buttons: “Import from Google Photos” / “Import from Pinterest”<br/>
  b. Album / photo grid view with selectable photos<br/>
  c. Progress bar: “Fetching photos…”
2. Processing Section:
  a. After selection:
    i. “Analyze Photos with Vision API”
    ii. “Generate Story with Gemini API”
  b. Show real-time progress (e.g., “Processing image 3/12”)
  c. Log and display processing status for transparency
3. Storybook Preview (scroll or page-flip view):
  a. Left panel: photo
  b. Right panel: AI-generated story / narrative
  c. Mood & theme icons displayed
  d. Option to regenerate story or choose style (poetic, travel guide, humorous)
4. Action Buttons:
  a. Save Storybook
  b. Export / Share
### Insights Page
Purpose: Analyse and visualize trends from all user storybooks.<br/>
Components:<br/>
1. Mood Timeline Graph: shows mood evolution across storybooks<br/>
2. Word Cloud / Theme Map: highlights most frequent objects, keywords, themes<br/>
3. Visual Trends: collage of top objects/colors detected via Vision API<br/>
4. Entry Patterns: e.g., "Most stories created on weekends"<br/>
5. AI Recommendations: tips based on user’s narrative patterns (“Try a travel story style next
time”)<br/>
### Sign-In / Sign-Up Page
Purpose: Authenticate user and enable photo access from Social Network X.<br/>
Layout:<br/>
1. OAuth buttons: "Sign in with Google" / "Sign in with Pinterest"<br/>
2. Optional minimal email/password login<br/>
3. Side illustration: pen merging with digital brain<br/>
### Storybook Display/ Read Mode
Purpose: Read previously generated AI storybooks.<br/>
Layout:<br/>
1. Page-flip view or scrollable panel:<br/>
a. Image on left<br/>
b. Gemini-generated narrative on right<br/>
c. Mood & theme icons<br/>
d. Buttons: Regenerate Story | Export | Share<br/>
## Flow Interaction Notes
1. User logs in via OAuth → imports photos from Social Network X.
2. Selected photos are filtered against Firestore to remove already processed images.
3. Each new photo → processed via Vision API → objects, scenes, faces, text extracted.
4. Vision API outputs passed to Gemini API → generates narrative story.
5. Combined photo + narrative + mood/theme tags → saved in Firestore.
6. Dashboard / Storybook View / Insights pages render stored AI storybooks and analytics.
## Page Flow Diagram
## System Diagram
## Flow of Control Details
### STEP 1+2 – Retrieve User Photos [UP]
Trigger: User clicks “Import Photos” in the New Storybook Page.<br/>
<pre>• Action:<br/>
     o Authenticate with Social Network X (Google Photos / Pinterest) via OAuth.<br/>
     o Fetch list of albums/photos via their API.<br/>
     o Log API call for analytics.<br/>
     o Output: [UP] → array of user photos (URLs, titles, timestamps).<br/>
### STEP 3a – Filter Already Processed Photos
   • Action:<br/>
    o Query Firestore to check which photo URLs are already processed.<br/>
    o Filter [UP] → [UP'] containing only new photos.<br/>
    o Log analytics<br/>
    o Output: [UP'] → new photos to process.<br/>
### STEP 3b – Process Photos with AI
   • Loop over each photo i in [UP']:<br/>
     1. Vision API Call:<br/>
       ▪ Analyze images for objects, scenes, faces, text.<br/>
       ▪ Store output as OutputXXX[i].<br/>
       ▪ Log API call with latency & response<br/>
     2. Gemini API Call:<br/>
       • Generate narrative based on OutputXXX[i] and user context.<br/>
       • Store output as OutputZZZ[i].<br/>
       • Log API calls and processing times<br/>
     3. Store in Hash / Data Structure<br/>
       <code>Hash[photoURL] = {
"userName": userName,
"photoURL": photoURL,
"visionOutput": OutputXXX[i],
"geminiOutput": OutputZZZ[i]
}
</code>

