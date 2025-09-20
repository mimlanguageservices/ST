const sgMail = require('@sendgrid/mail');

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const {
      studentName,
      teacherEmail,
      studentEmail,
      essayQuestion,
      originalEssay,
      correctedEssay
    } = JSON.parse(event.body);

    // You'll need to set SENDGRID_API_KEY as an environment variable in Netlify
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Email to teacher
    const teacherMsg = {
      to: teacherEmail,
      from: process.env.FROM_EMAIL, // Set this in Netlify environment variables
      subject: `Essay Submission from ${studentName}`,
      text: `Student: ${studentName}
Student Email: ${studentEmail}

Question: ${essayQuestion}

Original Essay:
${originalEssay}`,
      html: `
        <h2>Essay Submission</h2>
        <p><strong>Student:</strong> ${studentName}</p>
        <p><strong>Student Email:</strong> ${studentEmail}</p>
        <p><strong>Question:</strong> ${essayQuestion}</p>
        <h3>Original Essay:</h3>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${originalEssay.replace(/\n/g, '<br>')}
        </div>
      `
    };

    // Email to student
    const studentMsg = {
      to: studentEmail,
      from: process.env.FROM_EMAIL,
      subject: 'Your Essay Submission - Original and Corrected Version',
      text: `Hello ${studentName},

Thank you for submitting your essay. Below you'll find both your original submission and a corrected version.

Question: ${essayQuestion}

Your Original Essay:
${originalEssay}

Corrected Version:
${correctedEssay}`,
      html: `
        <h2>Hello ${studentName},</h2>
        <p>Thank you for submitting your essay. Below you'll find both your original submission and a corrected version.</p>

        <p><strong>Question:</strong> ${essayQuestion}</p>

        <h3>Your Original Essay:</h3>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
          ${originalEssay.replace(/\n/g, '<br>')}
        </div>

        <h3>Corrected Version:</h3>
        <div style="background-color: #e8f5e8; padding: 15px; border-radius: 5px;">
          ${correctedEssay.replace(/\n/g, '<br>')}
        </div>
      `
    };

    // Send both emails
    await Promise.all([
      sgMail.send(teacherMsg),
      sgMail.send(studentMsg)
    ]);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Emails sent successfully'
      })
    };

  } catch (error) {
    console.error('Error sending emails:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Failed to send emails',
        details: error.message
      })
    };
  }
};