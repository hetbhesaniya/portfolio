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

#### Configure the Subject Line
In the **Subject** field, change it to:
```
New Contact Form Message from {{from_name}}
```
Or keep it simple:
```
Portfolio Contact: {{from_name}}
```

#### Edit the Email Content
1. Click the **"Edit Content"** button (or click in the content area)
2. Clear the existing content
3. Paste this template:

```
New message received from your portfolio contact form!

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio website.
```

**Important:** Use these exact variable names (they match your code):
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
- `{{message}}` - The message content

#### Configure Email Settings (Right Panel)

**To Email ***
- Set to your email address (e.g., `hetbhesaniya0096@gmail.com`)
- This is where you'll receive messages

**From Name**
- Set to: `Portfolio Contact Form`
- Or: `{{from_name}}` (will show sender's name)

**From Email ***
- Keep "Use Default Email Address" checked
- This uses your EmailJS service email

**Reply To ***
- Set to: `{{from_email}}`
- **This is important!** When you reply, it will go to the sender

**Bcc & Cc**
- Leave empty (unless you want copies sent elsewhere)

#### Save and Test the Template
1. Click the blue **"Save"** button (top right)
2. Optional: Click **"Test It"** to test with sample data

#### Get Your IDs
1. **Template ID**: After saving, you'll see your template list. Click on your template and copy the **Template ID**
2. **Service ID**: Go to **Email Services** in the left sidebar, click on your service, and copy the **Service ID**
3. **Public Key**: Go to **Account** → **General**, and copy the **Public Key**

### 4. Configure Environment Variables
1. In your project root, create a file named `.env.local`
2. Add the following with your values:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. Replace the placeholder values with your actual IDs and keys from EmailJS

### 5. Restart Development Server
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

## ❓ Troubleshooting

**Template variables not working?**
- Make sure variable names match exactly: `{{from_name}}`, `{{from_email}}`, `{{message}}`
- No extra spaces in variable names

**Not receiving emails?**
- Check spam folder
- Verify "To Email" is correct
- Make sure you've added and verified your email service

**Getting errors?**
- Double-check all three values in `.env.local` are correct
- Make sure `.env.local` is in the project root (same folder as `package.json`)
- Restart your dev server after creating/changing `.env.local`

---

**Need Help?** Check EmailJS docs: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
