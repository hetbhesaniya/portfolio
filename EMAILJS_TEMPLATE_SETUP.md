# EmailJS Template Setup - Step by Step Guide

You're now on the template editor page. Follow these steps:

## 📝 Step 1: Configure the Subject Line

In the **Subject** field (top left), change it to:

```
New Contact Form Message from {{from_name}}
```

Or keep it simple:
```
Portfolio Contact: {{from_name}}
```

## 📧 Step 2: Edit the Email Content

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

## ⚙️ Step 3: Configure Email Settings (Right Panel)

### To Email *
- ✅ Already set to: `hetbhesaniya0096@gmail.com`
- This is where you'll receive messages

### From Name
- Set to: `Portfolio Contact Form`
- Or: `{{from_name}}` (will show sender's name)

### From Email *
- ✅ Keep "Use Default Email Address" checked
- This uses your EmailJS service email

### Reply To *
- Set to: `{{from_email}}`
- **This is important!** When you reply, it will go to the sender

### Bcc & Cc
- Leave empty (unless you want copies sent elsewhere)

## ✅ Step 4: Save the Template

1. Click the blue **"Save"** button (top right)
2. Your template is now saved!

## 🧪 Step 5: Test It (Optional but Recommended)

1. Click the **"Test It"** button (top right)
2. Fill in test values:
   - Name: Test User
   - Email: test@example.com
   - Message: This is a test message
3. Check your inbox - you should receive the test email

## 📋 Step 6: Copy Your Template ID

1. After saving, you'll see your template list
2. Click on your template name ("Contact Us" or whatever you named it)
3. In the template details, you'll see the **Template ID**
4. Copy this ID - you'll need it for your `.env.local` file

## 🔑 Step 7: Get Your Other IDs

### Service ID:
1. Go to **Email Services** in the left sidebar
2. Click on your service
3. Copy the **Service ID**

### Public Key:
1. Go to **Account** → **General** (left sidebar)
2. Find **Public Key**
3. Copy it

## 📁 Step 8: Create .env.local File

1. In your project root folder, create a file named `.env.local`
2. Add these lines (replace with your actual values):

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=paste_your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=paste_your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=paste_your_public_key_here
```

3. Save the file

## 🚀 Step 9: Restart Your Server

1. Stop your dev server (Ctrl+C)
2. Run: `npm run dev`
3. Try submitting the contact form - it should work!

---

## 💡 Quick Checklist

- [ ] Subject line configured
- [ ] Email content edited with correct variables
- [ ] Reply To set to `{{from_email}}`
- [ ] Template saved
- [ ] Service ID copied
- [ ] Template ID copied  
- [ ] Public Key copied
- [ ] `.env.local` file created with all three values
- [ ] Server restarted
- [ ] Form tested

---

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




