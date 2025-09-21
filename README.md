# 🍓 Pomoberry

Pomoberry is a **giftable Pomodoro application** designed to motivate and inspire productivity in a fun, personalized way.  
Instead of just being a timer, Pomoberry adds a personal touch: you (or a friend) can attach **Pomokeys** that unlock custom notes and recordings, turning focus sessions into something encouraging and unique.

---

## ✨ Features
- ⏱️ **Pomodoro Timer** – Stay productive with focus, short break, and long break cycles.  
- 💌 **Custom Notes** – Cute motivational messages that appear during your sessions.  
- 🎵 **Custom Recordings** – Personalized alarm sounds or voice notes to brighten your focus time.  
- 🎁 **Giftable Experience** – Share Pomoberry with someone you care about, making productivity a thoughtful gift.  
- 🌸 **Cute & Aesthetic UI** – A warm, playful design with friendly visuals to make working enjoyable.  

---

## 🚀 Tech Stack
- **Frontend:** React + Vite (deployed on Vercel)  
- **Backend:** Node.js + Express + MongoDB (deployed on Render)  
- **Storage:** Supabase (used for storing custom recordings and media files)  

---

## 🔒 Recordings, Storage & Privacy
Pomoberry was built with the idea of gifting encouragement, so your recordings and notes are handled carefully:  
- 🎵 **Recordings** are uploaded and stored securely in **Supabase storage**. Each file gets a unique, private path.  
- 🔑 **Access Control** – Recordings are never public by default; they are retrieved through **temporary signed URLs** that expire after a short time.  
- 📝 **Notes** are stored in MongoDB alongside your Pomokey, linked only to your account.  
- 🔐 **Privacy First** – Nothing is shared with others unless you choose to gift your Pomoberry key.  
- ❌ **No Tracking** – Pomoberry doesn’t sell or track your data; its purpose is motivation, not analytics.  

---

## 💡 Vision
Pomoberry isn’t just about tracking time—it’s about motivation and care.  
Future versions will expand customization options, add more giftable features, and continue blending productivity with encouragement.
