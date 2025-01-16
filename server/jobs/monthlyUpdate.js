import cron from 'node-cron'; 
import { connectToDatabase } from '../config/db.js';

// Resets the membership days for each user on the first day of every month
const updateMembershipDays = async () => {
    try {
        const db = await connectToDatabase();
        
        // Disable safe updates. Doesnt work without this part
        await db.query('SET SQL_SAFE_UPDATES = 0;');
        
        // Update days_remaining based on membership_id
        await db.query(`
            UPDATE membership_remaining mr
            JOIN users u ON mr.user_id = u.id
            SET mr.days_remaining = CASE 
                WHEN u.membership_id = 1 THEN 12
                WHEN u.membership_id = 2 THEN 16
                WHEN u.membership_id = 3 THEN 1000
                ELSE mr.days_remaining
            END;
        `);
        
        // Re-enable safe updates
        await db.query('SET SQL_SAFE_UPDATES = 1;');
        
        console.log('Membership days updated successfully.');
    } catch (err) {
        console.error('Error updating membership days:', err.message);
    }
};

// Runs on the first day of every month at midnight
cron.schedule('0 0 1 * *', () => {
    console.log('Running monthly membership update...');
    updateMembershipDays();
});

