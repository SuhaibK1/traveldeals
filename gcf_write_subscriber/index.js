const {Firestore} = require('@google-cloud/firestore');

exports.writeToFirestore = async (message, context) => {
    
    console.log(`Encoded message: ${message.data}`);

    const incomingMessage = Buffer.from(message.data, 'base64').toString('utf-8');

    const parsedMessage = JSON.parse(incomingMessage);

    console.log(`Decoded message: ${JSON.stringify(parsedMessage)}`);
    console.log(`Email address: ${parsedMessage.email_address}`);

    // Error Handling - Check if watch_regions is defined and is an array
    if (!Array.isArray(parsedMessage.watch_regions)) {
        console.error("watch_regions is not an array or is undefined.");
        return;
    }

    // Log the watch regions
    console.log('watch_regions:');
    parsedMessage.watch_regions.forEach((region, index) => {
        console.log(`${index}: ${region}`);
    });

    // Establish a reference to firestore
    const firestore = new Firestore({
        projectId: "sp24-41200-traveldeals"
    });
       
    // Create a data object
    let dataObject = {};

    dataObject.email_address = parsedMessage.email_address;
    dataObject.watch_regions = parsedMessage.watch_regions;

    // Add the data object to firstore collection
    let collectionRef = firestore.collection('subscribers');
    let documentRef = await collectionRef.add(dataObject);
    console.log(`Document Created: ${documentRef.id}`);

};