# 🍓 Pomoberry

Pomoberry is a **giftable Pomodoro application** designed to motivate and inspire productivity in a fun, personalized way.  

Instead of just being a timer, Pomoberry adds a personal touch: you (or a friend) can attach custom motivational notes and alarm recordings through **Pomokeys**, turning focus sessions into something encouraging, unique and personalized.

---

##  Features
- **Pomodoro Timer** – Stay productive with focus, short break, and long break cycles.  
- **Custom Notes** – Cute motivational messages that appear during your sessions.  
- **Custom Recordings** – Personalized alarm sounds or voice notes to brighten your focus time.  
- **Giftable Experience** – Share Pomoberry with someone you care about, making productivity a thoughtful gift.  

---

## Tech Stack
- **Frontend:** React + Vite (deployed on Vercel)  
- **Backend:** Node.js + Express + MongoDB (deployed on Render)  
- **Storage:** Supabase (used for storing custom recordings and media files)  

---

## Recordings, Storage & Privacy
Pomoberry was built with the idea of gifting encouragement, so your recordings and notes are handled carefully:  
- **Recordings** are uploaded and stored securely in **Supabase storage**. Each file gets a unique, private path.  
- **Access Control** – Recordings are never public by default; they are retrieved through **temporary signed URLs** that expire after 24 hours.  
- **Notes** are stored in MongoDB alongside your Pomokey, linked only to your account.  
- **Privacy First** – Nothing is shared with others unless you choose to gift your Pomoberry key.  
- **No Tracking** – Pomoberry doesn’t sell or track your data; its purpose is motivation, not analytics.  

---

## Vision
Pomoberry isn’t just about tracking time—it’s about motivation and care.  
Future updates will include:  
- **More customization** – Themes, characters, and new alarm styles.  
- **Responsive design** – Optimized layouts for mobile, tablet, and desktop experiences.  
- **Expanded gift features** – Easier ways to send personalized Pomoberry sessions to friends.  
- **Smarter notifications** – Subtle reminders and encouragements beyond just alarms.

--- 

## Status
Pomoberry is **undergoing active testing and continuous improvement**.  
Features, performance, and design are being refined to provide a smoother and more enjoyable experience with each update.

