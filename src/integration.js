const {App} = require('@slack/bolt');
const {SLACK_SIGNING_SECRET, SLACK_BOT_TOKEN, CHANNEL_ID} = process.env

const app = new App({
    signingSecret: SLACK_SIGNING_SECRET,
    token: SLACK_BOT_TOKEN,
});

// Function to check user statuses and send notifications
async function checkUserStatuses() {
    try {
        const users = await app.client.users.list();

        for (const user of users.members) {
            const {presence} = await app.client.users.getPresence({user: user.id});

            if (presence === 'active' && user.id !== CHANNEL_ID) {
                const date = new Date();
                console.log(`User ${user.real_name} is online now. ${date}`);

                // Notify when a user is active
                await app.client.chat.postMessage({
                    channel: CHANNEL_ID, // Your user ID to send a direct message
                    text: `User <@${user.id}> is online now. ${date}`,
                });
            }
        }
    } catch (error) {
        console.log(error)
    }
}

// Start the app
async function startApp() {
    await app.start();
    console.log('----------Bot is running----------');
}

module.exports = {
    startApp,
    checkUserStatuses,
}
