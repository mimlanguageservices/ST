# Essay Submission System

A web application that allows students to submit essays, which are then automatically corrected using Claude AI and sent via email to both the teacher and student.

## Features

- Student form with name, teacher email, student email, essay question, and essay response
- Integration with Claude API for grammar and spelling correction
- Automatic email sending to both teacher (original essay) and student (original + corrected essay)
- Responsive design
- Deployed on Netlify with serverless functions

## Setup

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

3. Start local development server:
   ```bash
   netlify dev
   ```

### Deployment to Netlify

1. Create a new site on Netlify
2. Connect your GitHub repository
3. Set environment variables in Netlify:
   - `SENDGRID_API_KEY`: Your SendGrid API key
   - `FROM_EMAIL`: The email address to send from (must be verified in SendGrid)

4. Deploy automatically via GitHub integration

## Environment Variables

You need to set these in your Netlify dashboard:

- `SENDGRID_API_KEY`: Your SendGrid API key for sending emails
- `FROM_EMAIL`: The verified sender email address

## Usage

1. Students fill out the form with their information and essay
2. Upon submission, the essay is sent to Claude API for correction
3. Two emails are sent:
   - Teacher receives the original essay
   - Student receives both original and corrected versions

## Files Structure

- `index.html`: Main application file
- `netlify/functions/send-emails.js`: Serverless function for email sending
- `netlify.toml`: Netlify configuration
- `package.json`: Dependencies and scripts

## API Keys

The Claude API key is currently hardcoded in the HTML file. For production use, consider moving this to environment variables as well for better security.

## Email Service

This application uses SendGrid for email delivery. You'll need to:
1. Create a SendGrid account
2. Verify your sender email address
3. Generate an API key
4. Set the environment variables in Netlify