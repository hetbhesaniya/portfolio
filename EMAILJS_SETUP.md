# EmailJS Setup Instructions

## ✅ EmailJS Integration Complete!

Your contact form is now integrated with **EmailJS** - a professional email service that's perfect for portfolios and impresses recruiters!

## 🚀 Why EmailJS?

- ✅ **Professional & Industry Standard** - Used by thousands of developers
- ✅ **Free Tier Available** - 200 emails/month (perfect for portfolios)
- ✅ **Easy Integration** - No backend needed
- ✅ **Reliable** - Handles email delivery professionally
- ✅ **Great for Recruiters** - Shows you know how to integrate third-party services

## 📝 Setup Steps

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Add Email Service
1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended)
4. Follow the setup instructions
5. **Copy the Service ID** (you'll need this)

### 3. Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template structure:

```
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}} ({{from_email}})

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. The template variables you can use:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{message}}` - Message content
   - `{{to_name}}` - Your name (Het Bhesaniya)
5. **Copy the Template ID** (you'll need this)

### 4. Get Public Key
1. Go to **Account** → **General**
2. Find your **Public Key**
3. **Copy the Public Key** (you'll need this)

### 5. Configure Environment Variables
1. In your project root, create a file named `.env.local`
2. Add the following with your values:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. Replace the placeholder values with your actual IDs and keys from EmailJS

### 6. Restart Development Server
After creating `.env.local`, restart your Next.js dev server:
```bash
npm run dev
```

## ✨ Features

- ✅ Real email sending
- ✅ Success/Error messages
- ✅ Loading states
- ✅ Form validation
- ✅ Professional UI feedback

## 🔒 Security Notes

- The `.env.local` file is already in `.gitignore` (won't be committed)
- EmailJS uses public keys (safe for frontend)
- Free tier is perfect for portfolio use

## 📧 Testing

1. Fill out the contact form on your portfolio
2. Submit it
3. Check your email inbox (you should receive the message)
4. You'll see a success message on the form

## 💡 Pro Tips for Recruiters

When talking about this feature:
- "I integrated EmailJS for the contact form to enable direct communication"
- "The form uses async/await for proper error handling and user feedback"
- "I implemented loading states and success/error messages for better UX"

---

**Need Help?** Check EmailJS docs: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)




