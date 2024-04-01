<<<<<<< HEAD
require('dotenv').config()
const sgMail = require('@sendgrid/mail');
const {Firestore} = require('@google-cloud/firestore');

exports.sendDeal = async (event, context) => {
    const triggerResource = context.resource;

    console.log(`Function triggered by event on: ${triggerResource}`);
    console.log(`Event type: ${context.eventType}`);

    // Print the field named "headline" in the document
    let headline = event.value.fields.headline.stringValue;
    console.log(`Headline: ${headline}`);

    // Print all of the locations as strings
    const location = [];
    console.log("Location:");
    event.value.fields.location.arrayValue.values.forEach((c) => {
        location.push(c.stringValue);
        console.log(c.stringValue);
    });

    const firestore = new Firestore({
        projectId: "sp24-41200-traveldeals"
    });


    // Query Firestore to find subscribers watching the location
    const subsRef = firestore.collection('subscribers');
    const snapshot = await subsRef.where('watch_regions', 'array-contains-any', location).get();

    if (snapshot.empty) {
        console.log(`No subscribers watching ${location}`);
        return;
    }

    console.log(`Found ${snapshot.size} subscribers`);

    // Iterate through the subscribers and send email notifications
    snapshot.forEach(async doc => {
        const subscriberData = doc.data();
        const emailAddress = subscriberData.email_address;

        console.log(`Sending deal email to ${emailAddress}`);

        // Set up SendGrid API key
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        // Create email message
        const msg = {
            to: emailAddress,
            from: process.env.SENDGRID_SENDER,
            subject: `(skankodi)New Travel Deal For You!`,
            text: `(skankodi)Check out your new travel deal ASAP: ${headline}`,
            html: `<p>(skankodi)Check out your new travel deal ASAP: <strong> ${headline}</strong></p>`
        };

        // Send email through SendGrid
        sgMail
        .send(msg)
        .then(() => {
            console.log(`Email sent to ${emailAddress}`);
        }, 
        error => {
          console.error(error);
        });
    });
};
=======
require('dotenv').config()
const sgMail = require('@sendgrid/mail');
const {Firestore} = require('@google-cloud/firestore');

exports.sendDeal = async (event, context) => {
    const triggerResource = context.resource;

    console.log(`Function triggered by event on: ${triggerResource}`);
    console.log(`Event type: ${context.eventType}`);

    // Print the field named "headline" in the document
    let headline = event.value.fields.headline.stringValue;
    console.log(`Headline: ${headline}`);

    // Print all of the locations as strings
    const location = [];
    console.log("Location:");
    event.value.fields.location.arrayValue.values.forEach((c) => {
        location.push(c.stringValue);
        console.log(c.stringValue);
    });

    const firestore = new Firestore({
        projectId: "sp24-41200-traveldeals"
    });


    // Query Firestore to find subscribers watching the location
    const subsRef = firestore.collection('subscribers');
    const snapshot = await subsRef.where('watch_regions', 'array-contains-any', location).get();

    if (snapshot.empty) {
        console.log(`No subscribers watching ${location}`);
        return;
    }

    console.log(`Found ${snapshot.size} subscribers`);

    // Iterate through the subscribers and send email notifications
    snapshot.forEach(async doc => {
        const subscriberData = doc.data();
        const emailAddress = subscriberData.email_address;

        console.log(`Sending deal email to ${emailAddress}`);

        // Set up SendGrid API key
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        // Create email message
        const msg = {
            to: emailAddress,
            from: process.env.SENDGRID_SENDER,
            subject: `(skankodi)New Travel Deal For You!`,
            text: `(skankodi)Check out your new travel deal ASAP: ${headline}`,
            html: `<p>(skankodi)Check out your new travel deal ASAP: <strong> ${headline}</strong></p>`
        };

        // Send email through SendGrid
        sgMail
        .send(msg)
        .then(() => {
            console.log(`Email sent to ${emailAddress}`);
        }, 
        error => {
          console.error(error);
        });
    });
};
>>>>>>> 85e6b06d60c2324c4d5bfb0042776acac86f90a0
